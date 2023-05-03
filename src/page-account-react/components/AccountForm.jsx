import React, { useCallback, useEffect, useRef, useState } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { applyStyleIfHasProperty, isMobile } from "../../utils"

AccountForm.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  cancelText: PropTypes.string,
  submitText: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  disabled: PropTypes.bool,
  submitDisabled: PropTypes.bool,
  children: PropTypes.node,
  error: PropTypes.node,
  className: PropTypes.string,
}

export function AccountForm({
  title,
  description,
  cancelText = "Cancel",
  submitText = "Apply Changes",
  disabled = false,
  submitDisabled = false,
  onCancel,
  onSubmit,
  children,
  error,
  className,
  ...props
}) {
  const formRef = useRef()
  const [isValid, setValidity] = useState(false)

  const handleSubmit = useCallback(
    (event) => {
      if (typeof onSubmit === "function") {
        const formData = Object.fromEntries(new FormData(event.target))
        onSubmit(formData, formRef)
        event.preventDefault()
        document.body.style.overflow = "auto"
      }
    },
    [onSubmit, formRef]
  )

  const checkFormValidity = useCallback(() => {
    const form = formRef?.current

    if (form) {
      setValidity(form.checkValidity())
    }
  }, [formRef])

  useEffect(() => {
    checkFormValidity()
  }, [checkFormValidity])

  return (
    <StyledForm
      ref={formRef}
      onChange={checkFormValidity}
      onSubmit={handleSubmit}
      className={`${className ? `${className} ` : ""}account-form`}
      {...props}
    >
      {Boolean(title) && <StyledTitle>{title}</StyledTitle>}
      {Boolean(description) && (
        <StyledDescription>{description}</StyledDescription>
      )}
      <div>
        {Boolean(children) && <StyledFormContent>{children}</StyledFormContent>}
        {isMobile() ? (
          <StyledFormActions>
            <StyledFormButton
              type="submit"
              disabled={!isValid || disabled || submitDisabled}
              primary
            >
              {submitText}
            </StyledFormButton>
            {typeof onCancel === "function" && (
              <StyledFormButton
                type="button"
                onClick={onCancel}
                disabled={disabled}
              >
                {cancelText}
              </StyledFormButton>
            )}
          </StyledFormActions>
        ) : (
          <StyledFormActions>
            {typeof onCancel === "function" && (
              <StyledFormButton
                type="button"
                onClick={onCancel}
                disabled={disabled}
              >
                {cancelText}
              </StyledFormButton>
            )}
            <StyledFormButton
              type="submit"
              disabled={!isValid || disabled || submitDisabled}
              primary
            >
              {submitText}
            </StyledFormButton>
          </StyledFormActions>
        )}
      </div>
      {Boolean(error) && <StyledError>{error}</StyledError>}
    </StyledForm>
  )
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 600px;
  margin: 0;
  padding: 0;
  text-align: center;

  @media only screen and (max-width: 415px) {
    flex-wrap: wrap;
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
`

const StyledFormContent = styled.fieldset`
  padding: 50px 0;

  @media only screen and (max-width: 415px) {
    flex-wrap: wrap;
    width: 100%;
  }
`

const StyledFormActions = styled.fieldset`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & button {
    margin-right: 13px;
  }

  & button:last-of-type {
    margin-right: 0;
  }

  @media only screen and (max-width: 415px) {
    flex-wrap: wrap;
    width: 100%;

    & button {
      margin-right: 0;
      width: 100%;
    }

    & button:last-of-type {
      margin-top: 6px;
    }
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

const StyledError = styled.p`
  margin: 0;
  padding: 1em;
  color: red;
  text-align: center;
`
