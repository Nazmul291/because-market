import React, { memo, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { format, sub } from "date-fns"
import { Calendar } from "./Calendar"
import { IconCalendar } from "../../rUI/icons/IconCalendar"
import { applyStyleIfHasProperty, noop } from "../../utils"
import imgChangeDate from "../../../assets/changedate.png"
import segment from "../../integrations/segment"

ChangeShippingDateForm.propTypes = {
  minDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  maxDate: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
  currentDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]),
  startDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]),
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
}

export function ChangeShippingDateForm({
  minDate,
  maxDate,
  currentDate,
  startDate,
  onCancel = noop,
  onSubmit = noop,
}) {
  const [newDate, setNewDate] = useState(currentDate)
  const [calendarClicked, setCalendarClicker] = useState(false)

  const handleSubmit = useCallback(
    (e) => {
      segment.track("S2-Calendar Cancel Button Clicked")
      onSubmit(newDate)
      e.preventDefault()
      document.body.style.overflow = "auto"
    },
    [newDate, onSubmit]
  )

  const handleChanged = useCallback(
    (date) => {
      segment.track("S2-New Date Clicked")
      setNewDate(date)
      setCalendarClicker(true)
    },
    [setNewDate, setCalendarClicker]
  )

  const lastDay = sub(newDate, { days: 1 })

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledTitle>When do you want us to ship your next refill?</StyledTitle>
      <StyledDescription>
        <StyledSubtitle>Your next refill ships</StyledSubtitle>
        <StyledSubtitleDate>
          <IconCalendar />
          {format(startDate, "LLLL d, yyyy")}
        </StyledSubtitleDate>
      </StyledDescription>

      <StyledFormContent>
        <StyledImage
          src={imgChangeDate}
          alt={"Change your next refill date"}
          style={{ maxHeight: "366px" }}
        />

        <StyledCalendarWrapper>
          <Calendar
            minDate={minDate}
            maxDate={maxDate}
            currentDate={currentDate}
            newDate={newDate}
            onChange={handleChanged}
          />

          <StyledLastDaySection>
            <StyledLastDayCaption>
              Last day to update order and shipment:
            </StyledLastDayCaption>
            <StyledLastDayDate>
              {format(lastDay, "LLLL d, yyyy")}
            </StyledLastDayDate>
          </StyledLastDaySection>

          <StyledFormActions>
            <StyledFormButton type="submit" disabled={!calendarClicked} primary>
              Apply Changes
            </StyledFormButton>
            {!onCancel ? null : (
              <StyledFormButton type="button" onClick={onCancel}>
                Cancel
              </StyledFormButton>
            )}
          </StyledFormActions>
        </StyledCalendarWrapper>
      </StyledFormContent>
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 911px;

  @media only screen and (max-width: 1024px) {
    width: 90%;
  }
`

const StyledTitle = styled.h2`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0 0 12px;
  color: #566582;
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 35px;
  font-weight: 300;
  line-height: 42px;
  text-align: center;

  @media only screen and (max-width: 415px) {
    font-size: 26px;
    line-height: 35px;
  }
`

const StyledDescription = styled.p`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  color: #566582;
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 20px;
  font-weight: 300;
  line-height: 42px;

  @media only screen and (max-width: 415px) {
    flex-direction: column;
  }
`

const StyledSubtitle = styled.span`
  opacity: 0.77;
  color: #566582;
  font-family: "Graphik Semibold";
  font-size: 13px;
  font-weight: 500;
  line-height: 42px;
  text-transform: uppercase;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 12px;
  white-space: nowrap;

  @media only screen and (max-width: 415px) {
    margin-right: 0;
  }
`

const StyledSubtitleDate = styled.span`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  color: #2acabe;
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 20px;
  font-weight: 500;
  line-height: 42px;
  text-transform: none;
  white-space: nowrap;

  & svg {
    width: 28px;
    height: 28px;
    fill: #2acabe;
    margin-left: 25px;
    margin-right: 20px;
  }
`

const StyledFormContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: start;
  width: 100%;
  margin: 30px 0;
  padding-left: 40px;

  @media only screen and (max-width: 1024px) {
    flex-wrap: wrap;
    padding-left: 0;
  }
`

const StyledImage = styled.img`
  max-width: 90%;
  height: auto;
  margin: 0;

  @media only screen and (max-width: 1024px) {
    max-width: 70%;
  }

  @media only screen and (max-width: 415px) {
    max-width: 90%;
  }
`

const StyledCalendarWrapper = styled.div`
  margin: 0 0 0 24px;
  padding: 0;

  div.because-calendar {
    width: auto;
    margin-top: 0;
  }

  div.because-calendar
    .react-datepicker__month
    .react-datepicker__week
    .react-datepicker__day {
    line-height: inherit;
    border: 2px solid transparent;
    text-align: center;
  }
`

const StyledLastDaySection = styled.div`
  border: none;
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const StyledLastDayCaption = styled.small`
  display: block;
  margin: 0;
  padding: 0;
  color: #878b98;
  font-family: "Graphik Regular";
  font-size: 14px;
  line-height: 25px;
  letter-spacing: -0.5px;
  white-space: nowrap;
  border: none;
`

const StyledLastDayDate = styled.strong`
  display: block;
  margin: 0;
  padding: 0;
  font-family: "Graphik Medium";
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  color: #566582;
  border: none;
`

const StyledFormActions = styled.fieldset`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  & button {
    margin-right: 0;
    width: 100%;
  }

  & button:last-of-type {
    margin-top: 6px;
  }
`

const StyledFormButton = styled.button`
  line-height: 65px;
  padding: ${applyStyleIfHasProperty("primary", "0 50px", "0 25px")};
  background-color: ${applyStyleIfHasProperty("primary", "#66efda", "#fff")};
  color: ${applyStyleIfHasProperty("primary", "#364157", "#566582")};
  font-family: "Graphik Semibold";
  font-size: 17px;
  font-weight: 600;
  border: ${applyStyleIfHasProperty(
    "primary",
    "1px solid #66efda",
    "1px solid rgba(86, 101, 130, 0.85)"
  )};
  border-radius: 6px;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover,
  &:active {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    filter: grayscale(1);
    cursor: not-allowed;
  }
`

export default memo(ChangeShippingDateForm)
