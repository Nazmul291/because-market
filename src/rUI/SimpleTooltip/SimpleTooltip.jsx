import React from "react"
import PropTypes from "prop-types"
import { Tooltip } from "react-tooltip"
import "react-tooltip/dist/react-tooltip.css"
import RenderNode from "../RenderNode"
import SimpleTooltipBody from "./SimpleTooltipBody"

const TOOLTIP_ID = "tooltip-id"

const VARIANT_WHITE = "white"
const PLACE_BOTTOM = "bottom"

SimpleTooltip.propTypes = {
  tooltip: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  variant: PropTypes.oneOf([VARIANT_WHITE]),
  place: PropTypes.oneOf([PLACE_BOTTOM]),
  noArrow: PropTypes.bool,
  clickable: PropTypes.bool,
}

function SimpleTooltip({
  tooltip,
  children,
  variant = VARIANT_WHITE,
  place = PLACE_BOTTOM,
  noArrow = true,
  clickable = true,
}) {
  return (
    <>
      <RenderNode node={children} data-tooltip-id={TOOLTIP_ID} />
      <Tooltip
        id={TOOLTIP_ID}
        wrapper={SimpleTooltipBody}
        data-tooltip-variant={variant}
        place={place}
        noArrow={noArrow}
        clickable={clickable}
      >
        {tooltip}
      </Tooltip>
    </>
  )
}

export default SimpleTooltip
