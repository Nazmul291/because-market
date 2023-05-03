import React, { memo, useState, useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { OfferCountdown } from "./OfferCountdown"
import { formatDollarPrice, getProductId } from "../../../../utils"
import { WeeklyOffersPortalTemplate } from "./WeeklyOffersPortalTemplate"
import ModalWindow from "../../../../rUI/ModalWindow"
import RenderHtml from "../../../../rUI/RenderHtml"
import segment from "../../../../integrations/segment"

WeeklyOffersItem.propTypes = {
  product: PropTypes.object,
  hasNextShipment: PropTypes.bool,
  shipment: PropTypes.shape({}),
  pdpId: PropTypes.string,
  onSubscribe: PropTypes.func,
  onAddToNextBoxOnly: PropTypes.func,
  onBuyItNow: PropTypes.func,
}

export function WeeklyOffersItem({
  product,
  hasNextShipment,
  shipment,
  pdpId,
  onSubscribe,
  onAddToNextBoxOnly,
  onBuyItNow,
  ...props
}) {
  const imageUrl = product.images[0]?.src
  const discount = product.weeklyOfferDiscount?.value || null
  const price = product.variants[0]?.priceV2
  const shortDescription = product.weeklyOfferDescription?.value || ""

  const [modalOpen, setModalOpen] = useState(
    Boolean(getProductId(product.id) === pdpId)
  )

  const handleButtonClick = useCallback(() => {
    segment.track("S2-Weekly Offers - See details click")
    setModalOpen(true)
    segment.track("S2-Campaign Offer Modal Page Load")
  }, [setModalOpen])

  const closeModal = useCallback(() => {
    document.body.style.overflow = "auto"
    setModalOpen(false)
  }, [setModalOpen])

  const getDiscountedPrice = useCallback(() => {
    const disc = price.amount * (1 - discount / 100)
    return { ...price, amount: disc.toFixed(2) }
  }, [price, discount])

  return (
    <>
      <StyledWeeklyOffersItem {...props}>
        {discount ? (
          <StyledDiscountStripe>{discount}% OFF</StyledDiscountStripe>
        ) : null}
        <StyledWeeklyOffersItemMain>
          <StyledWeeklyOffersItemImage
            style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : "none" }}
          />
          <StyledWeeklyOffersItemInfo>
            <StyledWeeklyOffersItemTitle>
              {product.title}
            </StyledWeeklyOffersItemTitle>
            <StyledRenderHtmlWeeklyOffersItemDescription
              html={shortDescription}
              tagName="p"
            />
            {discount ? (
              <div style={{ display: "flex" }}>
                <StyledWeeklyOffersItemPrice>
                  {formatDollarPrice(getDiscountedPrice().amount)}
                </StyledWeeklyOffersItemPrice>
                <StyledPriceWithoutDiscount>
                  {formatDollarPrice(price.amount)}
                </StyledPriceWithoutDiscount>
              </div>
            ) : (
              <StyledWeeklyOffersItemPrice>
                {formatDollarPrice(price.amount)}
              </StyledWeeklyOffersItemPrice>
            )}
          </StyledWeeklyOffersItemInfo>
        </StyledWeeklyOffersItemMain>
        <StyledWeeklyOffersItemActions>
          {Boolean(product.expiryDate?.value) && (
            <OfferCountdown deadline={product.expiryDate?.value} />
          )}
          <StyledWeeklyOffersItemButton onClick={handleButtonClick}>
            See details
          </StyledWeeklyOffersItemButton>
        </StyledWeeklyOffersItemActions>
      </StyledWeeklyOffersItem>

      <ModalWindow
        appElement={"#MainContent"}
        fullScreen={true}
        open={modalOpen}
        discount={discount}
        children={
          <WeeklyOffersPortalTemplate
            product={product}
            shortDescription={shortDescription}
            hasNextShipment={hasNextShipment}
            shipment={shipment}
            discount={discount}
            onSubscribe={onSubscribe}
            onAddToNextBoxOnly={onAddToNextBoxOnly}
            onBuyItNow={onBuyItNow}
          />
        }
        onCloseModal={closeModal}
      />
    </>
  )
}

const StyledWeeklyOffersItem = styled.section`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 16px 31px;
  border-top: 1px solid rgba(104, 119, 153, 0.19);
  overflow: hidden;

  &:first-of-type {
    border-top: none;
  }

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    border: 1px solid rgba(86, 101, 130, 0.09);
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px 3px rgb(0 0 0 / 2%);
    padding: 10px;
    margin-bottom: 20px;
    overflow: hidden;

    &:first-of-type {
      border-top: 1px solid rgba(86, 101, 130, 0.09);
    }
  }
`

const StyledWeeklyOffersItemMain = styled.div`
  display: contents;

  @media screen and (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
`

const StyledWeeklyOffersItemImage = styled.div`
  width: 122px;
  height: 122px;
  max-width: 122px;
  max-height: 122px;
  margin: 14px;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: contain;

  @media screen and (max-width: 1024px) {
    width: 80px;
    height: 80px;
    margin: 0 10px 0 0;
  }
`

const StyledWeeklyOffersItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 14px;

  @media screen and (max-width: 1024px) {
    padding: 0;
  }
`

const StyledWeeklyOffersItemTitle = styled.h3`
  color: #566582;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 20px;
  line-height: 29.6px;
  margin: 13px 0 0;
  padding: 0;

  @media screen and (max-width: 1024px) {
    font-family: "Graphik Semibold";
    font-size: 16px;
    line-height: 25px;
    margin: 0 0 10px;
    padding: 0;
  }
`

const StyledRenderHtmlWeeklyOffersItemDescription = styled(RenderHtml)`
  color: #878787;
  font-size: 15px;
  letter-spacing: -0.2px;
  line-height: 24px;
  max-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding: 0;
  margin: 0 0 0.5em;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
    line-height: 19px;
    margin: 0 0 0.5em;
    padding: 0;
  }
`

const StyledWeeklyOffersItemPrice = styled.div`
  padding: 14px 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #18cac5;
  font-family: "Graphik Medium";
  font-size: 20px;
  font-weight: 500;
  line-height: 24.64px;
  text-align: center;
  width: fit-content;

  @media screen and (max-width: 1024px) {
    font-size: 14px;
    line-height: 24px;
  }
`

const StyledWeeklyOffersItemActions = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 230px;
  padding: 14px;
  text-decoration: none;

  @media screen and (max-width: 1024px) {
    max-width: 100%;
    width: 100%;
  }
`

const StyledWeeklyOffersItemButton = styled.button`
  cursor: pointer;
  width: 100%;
  height: 60px;
  border-radius: 5px;
  background-color: #0be5da;
  padding: 14px 10px;
  margin-top: 20px;
  color: #fff;
  font-family: "Graphik Medium";
  font-size: 18px;
  letter-spacing: -0.51px;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledPriceWithoutDiscount = styled.span`
  margin-left: 32px;
  padding: 14px 0 0;
  color: gray;
  font-family: "Graphik Medium";
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  line-height: 24.64px;
  text-decoration: line-through;

  @media screen and (max-width: 1024px) {
    font-size: 12px;
    line-height: 24px;
  }
`

const StyledDiscountStripe = styled.div`
  background-color: rgb(84, 98, 135);
  color: white;
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  left: -44px;
  top: 14px;
  height: 22px;
  width: 140px;
  border-radius: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateZ(-45deg);
  transition: none;
`

export default memo(WeeklyOffersItem)
