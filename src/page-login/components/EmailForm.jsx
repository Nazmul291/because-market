import React, { useCallback, useState } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { noop, validateEmail } from "../../utils"
import { HeroSection } from "./HeroSection"
import { HeroTitle } from "./HeroTitle"

EmailForm.propTypes = {
  buttonText: PropTypes.string,
  error: PropTypes.node,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

export function EmailForm({
  buttonText = "Submit",
  error = null,
  onChange = noop,
  onSubmit = noop,
  ...props
}) {
  const [valid, setValid] = useState(false)

  const handleSubmit = useCallback(
    (event) => {
      const { email } = Object.fromEntries(new FormData(event.target))

      onSubmit(email)

      event.preventDefault()
      event.stopPropagation()
    },
    [onSubmit]
  )

  const handleInputChanged = useCallback(
    (event) => {
      const { value: email } = event.target
      setValid(validateEmail(email))
      onChange(email)
    },
    [onChange]
  )

  return (
    <HeroSection {...props}>
      <StyledForm onSubmit={handleSubmit}>
        <HeroTitle>Easily manage your Because account.</HeroTitle>
        <StyledFormRow>
          <StyledControlsWrapper>
            <StyledInput
              type="email"
              id="email"
              name="email"
              data-recurly="email"
              placeholder="Enter your email"
              maxLength="100"
              pattern="^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$"
              onChange={handleInputChanged}
              required
            />
            <StyledButton type="submit" disabled={!valid}>
              {buttonText}
            </StyledButton>
          </StyledControlsWrapper>
        </StyledFormRow>
        <StyledFormRow>
          <StyledControlsWrapper>
            <StyledErrorMessage>{error}</StyledErrorMessage>
          </StyledControlsWrapper>
        </StyledFormRow>
      </StyledForm>
    </HeroSection>
  )
}

const StyledForm = styled.form`
  justify-content: center;
  flex: 0 0 100%;
  max-width: 100%;

  @media (max-width: 576px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 0 15px;
  }

  @media (min-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    flex: 0 0 66.6666666667%;
    max-width: 66.6666666667%;
  }
`

const StyledFormRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;

  @media (max-width: 576px) {
    margin-left: 0;
    margin-right: 0;
  }
`

const StyledControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex: 0 0 100%;
  max-width: 100%;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media (min-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`

const StyledInput = styled.input`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  max-width: 419px;
  height: 63px;
  border: solid 1px rgba(86, 101, 130, 0.27);
  background-color: #fff;
  outline: none;
  padding-left: 33px;
  font-family: Graphik Medium;
  font-size: 1.0625rem;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.22;
  letter-spacing: -0.36px;
  text-align: left;
  color: #566583;
`

const StyledButton = styled.button`
  outline: none;
  width: 185px;
  height: 64px;
  border-radius: 8px;
  background-color: #566583;
  font-family: Graphik Semibold;
  font-size: 1rem;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 2.5;
  letter-spacing: -0.32px;
  text-align: center;
  color: #fff;
  filter: grayscale(0);
  transition: filter 0.2s ease-in-out;

  &:disabled {
    filter: grayscale(1);
    pointer-events: none;
  }

  @media (max-width: 576px) {
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
  }
`

const StyledErrorMessage = styled.p`
  font-family: "Cooper Lt BT W05 Regular";
  font-size: 1rem;
  font-weight: 300;
  text-align: left;
  margin-bottom: 48px;
  line-height: 2;
  letter-spacing: -0.4px;
  color: red;

  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
`
