import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createHrefToPage, makePostRequest } from "../../utils"
import { EmailForm } from "../components/EmailForm"
import { EMAIL_SUCCESS } from "../route-const"

const URL = `${process.env.PERCHE_API_URL}/auth/code`
const QUIZ_URL = process.env.FUNNEL_QUIZ_URL

const ERROR_CODES = {
  ACCOUNT_NOT_FOUND: "ACCOUNT_NOT_FOUND",
  AUTH_EMAIL_SENT: "AUTH_EMAIL_SENT",
}

const ERROR_MESSAGES = {
  [ERROR_CODES.ACCOUNT_NOT_FOUND]:
    "We were not able to find an account with this email. Would you like to create an account with us?",
  [ERROR_CODES.AUTH_EMAIL_SENT]:
    "An email with an authentication link has already been sent",
  OTHER: "Something went wrong with your request. Please try again later",
}

export const PageSignIn = (props) => {
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [isCreateAccount, setCreateAccount] = useState(false)

  const resetError = useCallback(() => {
    setError(null)
  }, [setError])

  const handleSubmit = useCallback(
    (email) => {
      if (isCreateAccount) {
        window.location.replace(QUIZ_URL)
        return
      }

      makePostRequest(URL, { email })
        .then(() => {
          navigate(createHrefToPage(EMAIL_SUCCESS))
        })
        .catch((errorCode) => {
          setError(ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.OTHER)

          if (errorCode === ERROR_CODES.ACCOUNT_NOT_FOUND) {
            setCreateAccount(true)
          }
        })
    },
    [isCreateAccount, navigate]
  )

  return (
    <EmailForm
      buttonText={isCreateAccount ? "Create Account" : "Access Portal"}
      onChange={resetError}
      onSubmit={handleSubmit}
      error={error}
      {...props}
    />
  )
}
