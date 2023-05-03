import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"
import RenderNode from "../RenderNode"
import AccountProductForm from "../AccountProductForm"
import AccountProductGallery from "../AccountProductGallery"

AccountProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    handle: PropTypes.string,
    images: PropTypes.array,
    description: PropTypes.string,
    onlineStoreUrl: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({})),
    variants: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  selectedVariantId: PropTypes.string,
  editable: PropTypes.bool,
  formFooter: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  quantity: PropTypes.number,
  showQuantity: PropTypes.bool,
  onSubmit: PropTypes.func,
}

function AccountProductDetails({
  product,
  selectedVariantId = null,
  editable = true,
  formFooter = null,
  footer = null,
  quantity,
  showQuantity,
  onSubmit = noop,
  ...props
}) {
  return (
    <StyledProductContainer {...props}>
      <StyledProductTitle>{product?.title}</StyledProductTitle>
      <StyledProductGrid>
        <StyledProductAside>
          <AccountProductGallery images={product?.images} />
        </StyledProductAside>

        <AccountProductForm
          product={product}
          selectedVariantId={selectedVariantId}
          editable={editable}
          quantity={quantity}
          showQuantity={showQuantity}
          footer={formFooter}
          onSubmit={onSubmit}
        />
      </StyledProductGrid>
      <RenderNode node={footer} product={product} />
    </StyledProductContainer>
  )
}

const StyledProductContainer = styled.article`
  width: 100%;
  max-width: 1127px;
  margin: 0 auto;
  text-align: left;
  color: #566582;
`

const StyledProductTitle = styled.h2`
  width: 100%;
  font-family: "Cooper Md BT W05 Regular";
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -0.12px;
  line-height: 46px;
`

const StyledProductGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 50%);

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(1, 100%);
  }
`

const StyledProductAside = styled.aside``

export default AccountProductDetails
