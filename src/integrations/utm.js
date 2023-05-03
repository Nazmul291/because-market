// UTM query param
// example: utm_source=google&utm_medium=cpc&utm_campaign=Performance_Max_TopMargin&gclid=CjwKCAjwhNWZBhB_EiwAPzlhNoPSdoV4zDK92NvFE36fVWpBF0nQqLAN6fj6cYlEfbDa5lnweHSu0RoCGrEQAvD_BwE
export const UTM_SOURCE_QUERY = "utm_source"
export const UTM_MEDIUM_QUERY = "utm_medium"
export const UTM_CAMPAIGN_QUERY = "utm_campaign"
export const GCLID_QUERY = "gclid"

const UTM_QUERY_PARAMS = [UTM_MEDIUM_QUERY, UTM_CAMPAIGN_QUERY, GCLID_QUERY]

/**
 * Return UTM params from url search
 * @returns {Object.<key, value>|null} object of utm params
 */
export function getUTMParams() {
  const query = new URLSearchParams(location.search)
  const utmSource = query.get(UTM_SOURCE_QUERY)

  if (!utmSource) {
    return null
  }

  return UTM_QUERY_PARAMS.reduce(
    (acc, key) => {
      const value = query.get(key)

      if (!value) {
        return acc
      }

      acc[key] = query.get(key)
      return acc
    },
    {
      [UTM_SOURCE_QUERY]: utmSource,
    }
  )
}
