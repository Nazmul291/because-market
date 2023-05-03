import React, { useEffect } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { checkoutPreview } from "../../api/marketApi"
import { withLoading } from "../../hocs/withLoading"
import { useAsyncState } from "../../hooks/useAsyncState"
import Modal from "../../rUI/Modal"
import Price from "../../rUI/Price"
import { noop } from "../../utils"

const ModalAddToNextItems = withLoading(({ error, preview }) => {
  if (error) {
    return <div>Error on load preview</div>
  }

  if (!preview) {
    return <div />
  }

  return (
    <>
      <Items>
        <ItemsHeader>
          <tr>
            <td>Item name</td>
            <td>Amount</td>
          </tr>
        </ItemsHeader>
        <ItemsBody>
          {preview.items?.map(({ variant, subtotal }) => (
            <tr key={variant.variant_id}>
              <td>
                {variant.quantity} X {variant.title}
              </td>
              <td>
                <Price priceV2={{ amount: subtotal }} />
              </td>
            </tr>
          ))}
        </ItemsBody>
        <ItemsFooter>
          <tr>
            <td>TOTAL</td>
            <td>
              <Price priceV2={{ amount: preview.subtotal }} />
            </td>
          </tr>
        </ItemsFooter>
      </Items>
    </>
  )
})

ModalAddToNext.propTypes = {
  checkoutId: PropTypes.string,
  onClose: PropTypes.func,
}

function ModalAddToNext({ checkoutId, onClose = noop }) {
  const [state, loadPreview] = useAsyncState(checkoutPreview)

  const Header = (
    <>
      <HeaderTitle>Thanks for shopping with us!</HeaderTitle>
      <HeaderText>
        We've added the items you selected to your next regular Because
        shipments.
      </HeaderText>
    </>
  )

  useEffect(() => {
    loadPreview(checkoutId)
  }, [checkoutId, loadPreview])

  return (
    <Modal header={Header} onCloseClick={onClose}>
      <BodyTitle>Your Selections</BodyTitle>
      <ModalAddToNextItems
        loading={state.loading}
        preview={state.data}
        error={state.error}
      />
    </Modal>
  )
}

const HeaderTitle = styled.div`
  font-size: 24px;
  margin-bottom: 20px;
`

const HeaderText = styled.div`
  font-size: 16px;
`

const BodyTitle = styled.div`
  font-size: 20px;
  color: var(--theme-color--blue);
`

const Items = styled.table`
  margin-left: 1.5rem;
  border-collapse: collapse;
`

const ItemsHeader = styled.thead`
  color: #6c757d;
`

const ItemsBody = styled.tbody`
  border-bottom: 1px solid var(--theme-color--gray);
`

const ItemsFooter = styled.tfoot``

export default ModalAddToNext
