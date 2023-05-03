import React, { useCallback, useLayoutEffect, useState } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import emailMisspelled, { top100 } from "email-misspelled"
import Input from "../Input"

const emailChecker = emailMisspelled({ domains: top100 })

InputEmail.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}

function InputEmail(props) {
  const { value, onChange } = props
  const [missedEmail, setMissedEmail] = useState(null)

  const handleClickMissedEmail = useCallback(
    (e) => {
      e.preventDefault()
      onChange({ target: { value: missedEmail } })
    },
    [missedEmail, onChange]
  )

  const footer = !missedEmail ? null : (
    <p className="small">
      Did you mean{" "}
      <MissLink href="#" onClick={handleClickMissedEmail}>
        {missedEmail}
      </MissLink>
      ?
    </p>
  )

  useLayoutEffect(() => {
    const miss = emailChecker(value)

    if (miss?.length) {
      setMissedEmail(miss[0].corrected)
    } else {
      setMissedEmail(null)
    }
  }, [value])

  return (
    <Root>
      <Input {...props} type="email" footer={footer} />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
`

const MissLink = styled.a`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
`

export default InputEmail
