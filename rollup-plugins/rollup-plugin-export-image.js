import {
  readFileSync,
  statSync,
  createReadStream,
  createWriteStream,
} from "node:fs"
import { writeFile } from "node:fs/promises"
import { resolve, extname, basename } from "node:path"
import { createHash } from "node:crypto"
import { createFilter } from "@rollup/pluginutils"
import svgToMiniDataURI from "mini-svg-data-uri"
import toSlugCase from "to-slug-case"

const defaults = {
  dom: false,
  exclude: null,
  include: null,
  exportSize: 250,
  globalVar: "IMAGES",
  liquidDir: "snippets",
}

const mimeTypes = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
}

const domTemplate = ({ dataUri }) => `
  var img = new Image();
  img.src = "${dataUri}";
  export default img;
`

const constTemplate = ({ dataUri }) => `
  var img = "${dataUri}";
  export default img;
`

const domGlobalTemplate = ({ varName, globalVar }) => `
  var img = new Image();
  img.src = ${globalVar}["${varName}"];
  export default img;
`

const constGlobalTemplate = ({ varName, globalVar }) => `
  var img = ${globalVar}["${varName}"];
  export default img;
`

const getDataUri = ({ format, isSvg, mime, source }) =>
  isSvg ? svgToMiniDataURI(source) : `data:${mime};${format},${source}`

const getVarName = ({ id }) => {
  const ext = extname(id)
  const name = basename(id, ext)
  const fileHash = createHash("sha256").update(id).digest("hex").substring(0, 7)

  return `${name}.${fileHash}${ext}`
}

const renderLiquidImageFile = ({ entries, globalVar }) => `
<!-- import ${globalVar} -->
<script>
var ${globalVar} = {
  ${entries
    .map(([key, assetFile]) => `"${key}": "{{ '${assetFile}' | asset_url }}"`)
    .join(",")}
};
</script>
<!-- /end import ${globalVar} -->
`

function copyFile(src, dest) {
  return new Promise((resolve, reject) => {
    const read = createReadStream(src)
    read.on("error", reject)
    const write = createWriteStream(dest)
    write.on("error", reject)
    write.on("finish", resolve)
    read.pipe(write)
  })
}

export default function image(opts = {}) {
  const options = Object.assign({}, defaults, opts)
  const filter = createFilter(options.include, options.exclude)
  const images = new Map()

  return {
    name: "rollup-plugin-image-export",

    load(id) {
      if (!filter(id)) {
        return null
      }

      const mime = mimeTypes[extname(id)]
      if (!mime) {
        // not an image
        return null
      }
      const size = statSync(id).size

      if (size > options.exportSize) {
        const varName = getVarName({ id })
        const code = options.dom
          ? domGlobalTemplate({ varName, globalVar: options.globalVar })
          : constGlobalTemplate({ varName, globalVar: options.globalVar })

        images.set(varName, id)

        return code.trim()
      }
      const isSvg = mime === mimeTypes[".svg"]
      const format = isSvg ? "utf-8" : "base64"
      const source = readFileSync(id, format).replace(/[\r\n]+/gm, "")
      const dataUri = getDataUri({ format, isSvg, mime, source })
      const code = options.dom
        ? domTemplate({ dataUri })
        : constTemplate({ dataUri })

      return code.trim()
    },
    generateBundle: async function write(outputOptions) {
      const entries = []

      await Promise.all(
        [...images.entries()].map(async ([name, filePath]) => {
          const ext = extname(name)
          const destName = `${basename(name, ext)}.bundle${ext}`
          const destPath = resolve(outputOptions.dir, destName)
          entries.push([name, destName])
          return await copyFile(filePath, destPath)
        })
      )

      const liquid = renderLiquidImageFile({
        entries,
        globalVar: options.globalVar,
      })

      const liquidFileName = `${toSlugCase(
        outputOptions.name
      )}-image-bundle.liquid`
      const liquidFilePath = resolve(options.liquidDir, liquidFileName)

      await writeFile(liquidFilePath, liquid)
    },
  }
}
