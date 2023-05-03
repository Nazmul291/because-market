import React, { useCallback, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../../utils"
import CheckoutCard from "../../../rUI/CheckoutCard"
import Input from "../../../rUI/Input"
import Button from "../../../rUI/Button"
import Price from "../../../rUI/Price"

const ERROR_TEXT_FN = {
  COUPON_NOT_FOUND: (value) => `Promo code ${value} doesn't exist.`,
  COUPON_NOTHING_APPLY: (value) =>
    `Current order doesn't contain any products that are eligible for ${value}`,
  DEFAULT: () => `Error`,
}

CheckoutAddPromo.propTypes = {
  value: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  coupons: PropTypes.array,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
}

function CheckoutAddPromo({
  value,
  loading,
  error,
  coupons = [],
  onChange = noop,
  onRemove = noop,
  ...props
}) {
  const [isHidden, setHidden] = useState(true)
  const [promo, setPromo] = useState("")
  const [errorText, setErrorText] = useState(null)

  const hasCoupons = coupons?.length > 0

  const handleHeaderClick = useCallback(() => {
    setHidden(!isHidden)
  }, [isHidden])

  const handlePromoChange = useCallback(
    ({ target: { value } }) => setPromo(value),
    []
  )

  const handleApplyClick = useCallback(() => {
    onChange(promo)
  }, [promo, onChange])

  const handleRemoveClick = useCallback(() => {
    onRemove(value)
  }, [value, onRemove])

  useEffect(() => {
    if (promo && error && !loading && !errorText && !value) {
      const errorFN = ERROR_TEXT_FN[error] || ERROR_TEXT_FN.DEFAULT
      setErrorText(errorFN(promo))
    } else if (value && !loading && !error) {
      setPromo("")
      setErrorText(null)
    } else if (loading) {
      setErrorText(null)
    }
  }, [promo, value, loading, error, errorText])

  return (
    <Root {...props}>
      <Header>
        <OpenButton onClick={handleHeaderClick} data-underline={!value}>
          Add a Promo Code
        </OpenButton>
        {hasCoupons && (
          <RemoveButton onClick={handleRemoveClick}>Remove</RemoveButton>
        )}
      </Header>

      {hasCoupons &&
        coupons.map(({ name, type, value }) => (
          <PromoLayout key={name}>
            <CouponItem>
              <CouponItemFa className="fa fa-check" />
              <CouponItemContent>
                <strong>{name}</strong>
                <>
                  {" - applied "}
                  {type === "percent" ? (
                    `${value}%`
                  ) : (
                    <Price amountV2={value} />
                  )}
                  {" off"}
                </>
              </CouponItemContent>
            </CouponItem>
          </PromoLayout>
        ))}
      <InputLayout data-hidden={isHidden || Boolean(value)}>
        <InputPromo
          value={promo}
          error={errorText}
          onChange={handlePromoChange}
        />
        <ApplyButton onClick={handleApplyClick} disabled={loading}>
          Apply
        </ApplyButton>
      </InputLayout>
    </Root>
  )
}

const Root = styled(CheckoutCard)`
  padding: 10px 25px;
`

const Header = styled.div`
  color: #679;
  display: flex;
  justify-content: space-between;
`

const OpenButton = styled.div`
  font-size: 14px;
  cursor: pointer;

  &[data-underline="true"] {
    text-decoration: underline;
  }
`

const RemoveButton = styled.div`
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`

const InputLayout = styled.div`
  max-height: 0;
  overflow: hidden;
  display: flex;
  width: 100%;
  padding: 0;
  transition: all linear 0.5s;

  &[data-hidden="false"] {
    max-height: 100px;
    padding: 15px 0;
  }
`

const PromoLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const InputPromo = styled(Input)`
  width: 100%;
`

const CouponItem = styled.div`
  display: inline-flex;
  align-items: center;
  border: 2px solid #d3d3d3;
  padding: 5px;
  border-radius: 5px;
  margin-top: 15px;
`

const CouponItemFa = styled.em`
  background: #43eddc;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  margin-right: 15px;
`

const CouponItemContent = styled.div`
  max-width: calc(100% - 35px);
`

const ApplyButton = styled(Button)`
  margin: 0 0 0 10px;
  background: #679;
  border: none;
  outline: none;
  color: #fff;
  padding: 8px 12px;
  line-height: 22px;
  border-radius: 3px;
  min-height: 39px;
  max-height: 39px;
  font-size: 16px;
  font-style: normal;
`

export default CheckoutAddPromo
