import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { applyStyleIfHasProperty } from "../../utils"

OrderField.propTypes = {
  mobileTitle: PropTypes.string,
  from: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  colspan: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  highlighted: PropTypes.bool,
  mobile: PropTypes.bool,
  desktop: PropTypes.bool,
  positive: PropTypes.bool,
  children: PropTypes.node,
}

export function OrderField({
  mobileTitle,
  from,
  colspan,
  highlighted,
  mobile,
  desktop,
  positive,
  children,
  ...props
}) {
  return (
    <StyledOrderField
      from={from}
      colspan={colspan}
      highlighted={highlighted}
      mobile={mobile}
      desktop={desktop}
      positive={positive}
      {...props}
    >
      {Boolean(mobileTitle) && (
        <StyledMobileTitle>{mobileTitle}</StyledMobileTitle>
      )}
      <span>{children}</span>
    </StyledOrderField>
  )
}

const StyledOrderField = styled.div`
  display: ${applyStyleIfHasProperty("mobile", "none", "flex")};
  flex-direction: column;
  justify-content: center;
  padding: 20px 10px 20px 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-top: -1px;
  color: ${applyStyleIfHasProperty("positive", "#0acac0")};
  font-size: ${applyStyleIfHasProperty("highlighted", "16px", "14px")};
  font-family: ${applyStyleIfHasProperty("highlighted", '"Graphik Semibold"')};
  font-weight: ${applyStyleIfHasProperty("highlighted", 600)};
  line-height: 1em;
  grid-column: ${({ from, colspan }) =>
    from ? (colspan ? `${from} / span ${colspan}` : `${from} / auto`) : "auto"};

  @media screen and (max-width: 1024px) {
    display: ${applyStyleIfHasProperty("desktop", "none", "flex")};
  }
`

const StyledMobileTitle = styled.strong`
  display: none;
  padding-bottom: 5px;
  font-weight: normal;
  color: #747e92;
  font-family: "Graphik Regular";
  font-size: 14px;

  @media screen and (max-width: 1024px) {
    display: block;
  }
`
