import React, { memo, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { StopwatchIcon } from "../../../../rUI/icons/StopwatchIcon"

OfferCountdown.propTypes = {
  deadline: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
}

const UPDATE_INTERVAL_MS = 1000

const PERIOD_TITLES = {
  days: "Days",
  hours: "Hrs.",
  minutes: "Min.",
  seconds: "Sec.",
}

const breakToPeriods = (date) => {
  const PERIOD_SEC_MS = 1000
  const PERIOD_MIN_MS = PERIOD_SEC_MS * 60
  const PERIOD_HOUR_MS = PERIOD_MIN_MS * 60
  const PERIOD_DAY_MS = PERIOD_HOUR_MS * 24

  const now = Date.now()
  const timestamp = new Date(date).getTime()

  let differenceMS = timestamp - now

  if (differenceMS < 0) {
    differenceMS = 0
  }

  const [days, hours, minutes, seconds] = [
    PERIOD_DAY_MS,
    PERIOD_HOUR_MS,
    PERIOD_MIN_MS,
    PERIOD_SEC_MS,
  ].reduce((periods, period) => {
    const times = Math.floor(differenceMS / period)
    differenceMS = differenceMS - period * times
    return [...periods, isNaN(times) ? 0 : times]
  }, [])

  return { days, hours, minutes, seconds }
}

export function OfferCountdown({ deadline }) {
  const [periods, setPeriods] = useState({})

  useEffect(() => {
    const updateTime = () => {
      const p = breakToPeriods(deadline)
      const isOver = Object.values(p).every((v) => v === 0)

      if (isOver) {
        clearInterval(intervalID)
      }

      setPeriods(p)
    }

    const intervalID = setInterval(updateTime, UPDATE_INTERVAL_MS)

    updateTime()

    return () => clearInterval(intervalID)
  }, [deadline])

  return (
    <StyledOfferCountdownContainer>
      <StopwatchIcon />
      {Object.entries(periods).map(([periodName, value]) => (
        <StyledPeriod key={periodName}>
          <StyledPeriodTitle>{PERIOD_TITLES[periodName]}</StyledPeriodTitle>
          <StyledPeriodValue>
            {value.toString().length < 2
              ? value.toString().padStart(2, "0")
              : value}
          </StyledPeriodValue>
        </StyledPeriod>
      ))}
    </StyledOfferCountdownContainer>
  )
}

const StyledOfferCountdownContainer = styled.figure`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-style: normal;

  & > svg {
    width: 30px;
    margin-right: 10px;
    fill: #18cac5;
  }
`

const StyledPeriod = styled.div`
  display: flex;
  flex-direction: column-reverse;
  min-width: 42px;

  &:last-of-type > strong:after {
    display: none;
  }
`

const StyledPeriodTitle = styled.small`
  color: #727b8e;
  font-family: "Graphik Regular";
  font-size: 12px;
  line-height: 22.4px;
  margin-top: -9px;
`

const StyledPeriodValue = styled.strong`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #566582;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;

  &:after {
    content: ":";
    margin: 0 8px;
  }
`

export default memo(OfferCountdown)
