import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"

AccountSection.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  loading: PropTypes.bool,
  error: PropTypes.node,
}

export function AccountSection({ title, children, loading, error, ...props }) {
  return (
    <StyledSection loading={loading ? 1 : 0} error={error} {...props}>
      <StyledTitle className="account-section__title">{title}</StyledTitle>
      <StyledContent className="account-section__content">
        {children}
      </StyledContent>
      {Boolean(error) && <StyledError>{error}</StyledError>}
    </StyledSection>
  )
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  padding-left: 0 !important;
  padding-right: 0 !important;
  background-color: #fff;
  box-shadow: 1.6px 1.2px 10px 0 rgb(0 0 0 / 4%);
  border: 1px solid #dadbdc;
  border-top: 5px solid
    ${({ loading, error }) => (loading ? "#ccc" : error ? "red" : "#566582")};
  border-radius: 0 0 7px 7px;
  margin-bottom: 50px;
`

const StyledTitle = styled.h2`
  padding: 27px 32px 12px;
  color: #566582;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 22px;
  font-weight: 500;
  line-height: 42px;
  text-align: left;
`

const StyledContent = styled.div`
  padding: 0 32px 50px;
  color: #747e92;
  font-family: "Graphik Regular";
  font-size: 14px;
  text-align: left;
`

const StyledError = styled.p`
  margin: 0;
  padding: 1em 1em 2em;
  text-align: center;
  color: red;
  font-size: 14px;
`
