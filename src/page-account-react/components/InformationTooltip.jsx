import React, { useCallback, useEffect, useRef, useState } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"

const TOOLTIP_MARGIN_PX = 15

const getSpaceAroundElement = (element) => {
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  const { top, left, width, height } = element.getBoundingClientRect()

  const bottom = viewportHeight - top - height
  const right = viewportWidth - left - width

  return {
    top,
    left,
    bottom,
    right,
  }
}

InformationTooltip.propTypes = {
  position: PropTypes.oneOfType([
    PropTypes.oneOf(["top", "right", "bottom", "left"]),
    PropTypes.arrayOf(PropTypes.oneOf(["top", "right", "bottom", "left"])),
  ]),
  alwaysShow: PropTypes.bool,
  redded: PropTypes.bool,
  children: PropTypes.node,
}

export function InformationTooltip({
  position,
  alwaysShow,
  redded = false,
  children,
  ...props
}) {
  const signRef = useRef()
  const tooltipRef = useRef()

  const [shown, setShown] = useState(alwaysShow)

  const toggleShown = useCallback(() => {
    if (!alwaysShow) {
      setShown(!shown)
    }
  }, [alwaysShow, shown, setShown])

  const updateTooltipPosition = useCallback(() => {
    const signElement = signRef.current
    const tooltipElement = tooltipRef.current

    if (signElement && tooltipElement) {
      let tooltipClassNames = []

      if (position) {
        if (Array.isArray(position)) {
          tooltipClassNames = position
        } else {
          tooltipClassNames.push(position)
        }
      } else {
        const { top, left, bottom, right } = getSpaceAroundElement(signElement)
        const horizontalSpace = { left, right }
        const verticalSpace = { top, bottom }

        const { width: tooltipWidth, height: tooltipHeight } =
          tooltipElement.getBoundingClientRect()

        tooltipClassNames = [
          ...Object.entries(horizontalSpace)
            .filter(([, space]) => space >= tooltipWidth + TOOLTIP_MARGIN_PX)
            .map(([key]) => key),
          ...Object.entries(verticalSpace)
            .filter(([, space]) => space >= tooltipHeight + TOOLTIP_MARGIN_PX)
            .map(([key]) => key),
        ]
      }

      tooltipElement.classList.remove("top", "left", "bottom", "right")
      tooltipElement.classList.add(...tooltipClassNames)
    }
  }, [position])

  useEffect(updateTooltipPosition, [updateTooltipPosition])

  return (
    <StyledInformationContainer {...props} onMouseEnter={updateTooltipPosition}>
      {redded ? (
        <StyledInfoSignRed ref={signRef} onClick={toggleShown}>
          i
        </StyledInfoSignRed>
      ) : (
        <StyledInformationSign ref={signRef} onClick={toggleShown}>
          i
        </StyledInformationSign>
      )}
      <StyledTooltipContainer
        ref={tooltipRef}
        className={shown ? "always-show" : null}
      >
        <StyledTooltip>
          <StyledTooltipContent>{children}</StyledTooltipContent>
        </StyledTooltip>
      </StyledTooltipContainer>
    </StyledInformationContainer>
  )
}

const StyledInformationContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  &:hover > div,
  &:active > div {
    pointer-events: inherit !important;
    opacity: 1 !important;

    @media screen and (max-width: 1024px) {
      display: block;
    }
  }
`

const StyledInformationSign = styled.i`
  display: inline-block;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  font-style: normal;
  color: #9699a3;
  background-color: #eee;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`

const StyledInfoSignRed = styled.i`
  display: inline-block;
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
  font-style: normal;
  color: #fff;
  background-color: #ca4433;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`

const StyledTooltipContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1000;
  padding: 15px;
  transform: translate(-50%, 0);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;

  @media screen and (max-width: 1024px) {
    display: none;
  }

  &.always-show {
    pointer-events: inherit;
    opacity: 1;
  }

  &.left.top {
    transform: translate(-100%, -100%);
    padding-right: 0;
    margin-left: 9px;

    & > div:before {
      margin: 0;
      top: auto;
      bottom: -4px;
      left: auto;
      right: 4px;
    }
  }

  &.left,
  &.left.bottom,
  &.left.top.bottom {
    transform: translate(-100%, 0);
    padding-right: 0;
    margin-left: 9px;

    & > div:before {
      margin: 0;
      top: -4px;
      bottom: auto;
      left: auto;
      right: 4px;
    }
  }

  &.right.top {
    transform: translate(0%, -100%);
    padding-left: 0;
    margin-left: -9px;

    & > div:before {
      margin: 0;
      top: auto;
      bottom: -4px;
      left: 4px;
      right: auto;
    }
  }

  &.right,
  &.right.bottom,
  &.right.top.bottom {
    transform: translate(0, 0);
    padding-left: 0;
    margin-left: -9px;

    & > div:before {
      margin: 0;
      top: -4px;
      bottom: auto;
      left: 4px;
      right: auto;
    }
  }

  &.top,
  &.left.right.top {
    transform: translate(-50%, -100%);
  }

  &.bottom,
  &.left.right.bottom,
  &.left.right.top.bottom {
    transform: translate(-50%, 0);
  }

  &.left.right,
  &.left.right.top,
  &.left.right.bottom,
  &.left.right.top.bottom {
    margin-left: 0;

    & > div:before {
      margin: 0 auto;
      left: 0;
      right: 0;
    }
  }
`

const StyledTooltip = styled.div`
  position: relative;
  background-color: #fff;
  box-shadow: 0 0 10px rgb(0 0 0 / 25%);
  border-radius: 5px;

  &:before {
    position: absolute;
    top: -4px;
    left: 0;
    right: 0;
    margin: 0 auto;
    display: block;
    content: " ";
    width: 9px;
    height: 9px;
    background-color: #fff;
    transform: rotate(45deg);
    z-index: 1;
  }
`

const StyledTooltipContent = styled.div`
  position: relative;
  z-index: 2;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-radius: 5px;
  overflow: hidden;
`
