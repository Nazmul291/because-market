import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"
import Modal from "../Modal"
import { PORTAL_SURVEY } from "../../const"

SurveyPopup.propTypes = {
  eventCode: PropTypes.number,
  onReasonSelected: PropTypes.func,
  onCloseClick: PropTypes.func,
}

function SurveyPopup({
  eventCode = 1,
  onReasonSelected = noop,
  onCloseClick = noop,
}) {
  const surveyItem = PORTAL_SURVEY.items.find(
    (item) => item.eventCode === eventCode
  )

  const reasonItems = (
    <>
      {surveyItem.reasons.map((item, idx) => (
        <StyledReason key={idx}>
          <StyledInput
            type="radio"
            name="reason"
            id={`_${item.reasonId}`}
            value={item.reason}
            onClick={() => onReasonSelected(surveyItem.eventName, item)}
          />
          <StyledLabel htmlFor={`_${item.reasonId}`}>{item.reason}</StyledLabel>
        </StyledReason>
      ))}
    </>
  )

  return (
    <Modal
      header={<StyledQuestion>{surveyItem.question}</StyledQuestion>}
      children={reasonItems}
      onCloseClick={() => onCloseClick(surveyItem.eventName)}
    />
  )
}

const StyledQuestion = styled.div`
  background-color: #679;
  color: #fff;
  padding: 0px 35px 0px 20px;
  font-family: "Graphik Regular";
  font-size: 22px;
  line-height: 1.5;
  font-weight: 700;
  border: none;
  max-width: 700px;
`

const StyledReason = styled.div`
  padding: 0 18px;
`

const StyledInput = styled.input`
  cursor: pointer;
`

const StyledLabel = styled.label`
  margin-left: 0.5rem;
  cursor: pointer;
  line-height: 2.5;
  outline: none;
  user-select: none;
`

export default SurveyPopup
