import React, { useMemo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"
import { DetailsCard } from "./DetailsCard"
import { OptionColumn } from "./OptionColumn"

SubscriptionDetailsItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    onlineStoreUrl: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  onActionClick: PropTypes.func,
}

export function SubscriptionDetailsItem({
  product,
  onActionClick = noop,
  ...props
}) {
  const titleLink = useMemo(
    () =>
      Boolean(product.onlineStoreUrl) && (
        <a
          href={product.onlineStoreUrl}
          target="_blank"
          rel="noreferrer noopener"
        >
          {product.title}
        </a>
      ),
    [product]
  )

  return (
    product && (
      <DetailsCard
        title={titleLink}
        {...props}
        action="Adjust My Preferences"
        onActionClick={onActionClick}
      >
        {product.variants && product.variants[0] && (
          <StyledItemOptions>
            {product.variants[0].selectedOptions.map(({ name, value }, idx) => (
              <OptionColumn key={idx} title={name} value={value} />
            ))}
          </StyledItemOptions>
        )}
      </DetailsCard>
    )
  )
}

const StyledItemOptions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;

  & > * {
    flex: 1;
  }
`
