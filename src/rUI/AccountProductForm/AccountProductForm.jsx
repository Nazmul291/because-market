import React, { useEffect, useCallback, useState, useMemo } from "react"
import { styled } from "@linaria/react"
import PropTypes from "prop-types"
import { useSelectProductVariant } from "../../hooks"
import {
  PRODUCT_SIZE_OPTION,
  PRODUCT_PACK_SIZE_OPTION,
  PRODUCT_COLOR_OPTION,
  PRODUCT_SIZE_OPTIONS,
  PRODUCT_SELECT_SIZE_OPTION,
} from "../../const"
import RenderNode from "../RenderNode"
import AccountProductOption from "../AccountProductOption"
import UnderwearSizeGuideModal from "../UnderwearSizeGuideModal"
import AccountProductInputQuantity from "../AccountProductInputQuantity"
import { isEqualOptionName, noop, normalizeString } from "../../utils"

const EXCLUDE_FUNNEL_OPTIONS_NAME_NORMALIZED = [
  normalizeString(PRODUCT_COLOR_OPTION),
  normalizeString(PRODUCT_PACK_SIZE_OPTION),
]
AccountProductForm.propTypes = {
  product: PropTypes.object,
  selectedVariantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  quantity: PropTypes.number,
  editable: PropTypes.bool,
  showQuantity: PropTypes.bool,
  funnelView: PropTypes.bool,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

function AccountProductForm({
  product,
  selectedVariantId,
  quantity = 1,
  editable = true,
  showQuantity = true,
  funnelView = false,
  footer,
  onChange = noop,
  onSubmit = noop,
  ...props
}) {
  const [showUnderwearSizeModal, setShowUnderwearSizeModal] = useState(false)
  const [viewOptions, setViewOptions] = useState([])
  const [currentQuantity, setCurrentQuantity] = useState(quantity)

  const [
    { availableOptions, selectedVariant, selectedOptionsGrouped },
    { setVariantByOption },
  ] = useSelectProductVariant(
    product,
    selectedVariantId,
    useCallback(
      (variant) => {
        onChange({ variant, quantity: currentQuantity })
      },
      [currentQuantity, onChange]
    )
  )

  const filteredOption = useMemo(
    () =>
      funnelView
        ? availableOptions.filter(({ name }) => {
            const normName = normalizeString(name)

            return !EXCLUDE_FUNNEL_OPTIONS_NAME_NORMALIZED.some((optName) =>
              normName.includes(optName)
            )
          })
        : availableOptions,
    [availableOptions, funnelView]
  )

  const handleQuantityChange = useCallback(
    (quantity) => {
      setCurrentQuantity(quantity)
      onChange({ variant: selectedVariant, quantity })
    },
    [selectedVariant, onChange]
  )

  const handleOptionChange = useCallback(
    (name, value) => {
      if (viewOptions.length < filteredOption.length) {
        setViewOptions([...viewOptions, filteredOption[viewOptions.length]])
      }
      setVariantByOption(name, value)
    },
    [viewOptions, filteredOption, setVariantByOption]
  )

  const handleShowUnderwearSizeModal = useCallback(() => {
    setShowUnderwearSizeModal(true)
  }, [])

  const handleCloseUnderwearSizeModal = useCallback(() => {
    setShowUnderwearSizeModal(false)
  }, [])

  useEffect(() => {
    if (!filteredOption?.length) {
      setViewOptions([])
      return
    }

    if (selectedVariantId) {
      setViewOptions([...filteredOption])
      return
    }

    setViewOptions([filteredOption[0]])
  }, [selectedVariantId, filteredOption, funnelView])

  return (
    <>
      <StyledProductForm {...props}>
        {showQuantity && (
          <StyledOptionSection>
            <StyledQuantity
              label="Quantity"
              value={currentQuantity}
              onChange={handleQuantityChange}
            />
          </StyledOptionSection>
        )}

        {viewOptions.map((option) => (
          <StyledOptionSection key={option.id}>
            <AccountProductOption
              disabled={!editable}
              funnelView={funnelView}
              label={
                isEqualOptionName(option.name, PRODUCT_SIZE_OPTIONS) &&
                !funnelView ? (
                  <StyledSizeLabel>
                    {PRODUCT_SIZE_OPTION}
                    <StyledSizeGuideLabel
                      onClick={handleShowUnderwearSizeModal}
                      className="product-guide-label"
                    >
                      <StyledSizeGuideImg src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAQCAYAAAD52jQlAAAAAXNSR0IArs4c6QAAA85JREFUOBGVkn9sE2UYx+99767t1vXHxqZzg7CBs4Bx/MjQDDMVgTTKJCRjgygzGTi3QAwSJRr+0OCw4DAhAZJJZFE3hQUTFePEsbAmDmcZbk0mdVtnaWlpO9ff7d364368vm+hifpXfS65J8/3vs/n7r3nAdSDONl/fZPdM9957ebMRjkjqFTqgnjz1nUjLKv45Pj+F2ZzvnwyIKbvx35vNJ3/6TSkJG1xmd5Ns2xITKXLw8FoBYa7Tr3V0rGxptKaDzDrGZmYNq7f0xUzvnH2C6vDU0PEwXFbeTb/antq28Ez5ob2j51Of6SKaHnF+raPxtq6vhxGCNGk4ezXIx88v6/bNnB9oo3UJy8P62pbTe4P+4ZMpM4noMsdXPZIZYkNACCd6htSXx2b2TFimVnz3ehtIwG827ItVlys9fvmI8vzARIPVCtofvSX6Zcm7K7VR1418q2N9Qc69xlNrVvWvkcMP9scW+xz3se1anWY1PkEMDQfuxUMc3UrKkrurX5s6YWmzesGDaU63y2Xf+Xwb/YdFqvjtbk7fn3Hns0Dh1ueORZKJFmIj/VfuAAEoC/SZKbHb9jB0u1Hp/c3NdyQBMl9dXTq9SIFQ+EOgCTExviULiUIFMsyaSXDCuoCNokfAoAwknARohAxZ0sghxNJ5dMban5gaAAUoQQfPXdoV9fo1NQ5b0gwxPlMkYKm8eSAJOAJUpRICTKELIVoqKCRmBaxcj8YhqIYfBUqGdEy63lx4IrlIKNgaWrOF4bE0lBbG8HJct/+/+97T1ws1WlU7RDhYywmM1kC/igwH41WR6Oo+J/IQICvWOC47O7m9Hg8vsQf+ffuRmOcCkBIMYIggcoynfDArGk6+vmP7Y2bzuC6JwfYffzC+TpDlQ/XHTlt74nLb9KA2orr+pwmydnfTEEJofTyMn3J6f7h978aGn85EuPUSBaV5Kt9weAqkl2eUFk6JRSR5rv+0JqsFohouURSTzSHZ6HG7HSqEJQJlmIO7Gq41Htl7B0xI6FDrzzbXaIrjAf5lM9q99Z2fzbYt6q6on6JVhXlM+IChrHNb/d8s/aJqu2lOnVATEsxAjV9OthbvuyhHqVCESbLQA982z8Zj3EP35z8sz6RzGj8gfgKuzfERbhFw6TN/RyNXzLvixhn7wVV7jCnsd527gSFBVwwknjScfevlW2Hj4T+sHubeUmCfEqo9vvDG8iKUWazmbk2y+284wl2Wmfcj0KA1IsZEeAlz7AMVMqiLDIMpPBhWLwmSTwMJW6TIUIYBZSyIKUhBAyeOb3bWNf7N4SJwz5DciUAAAAAAElFTkSuQmCC" />
                      View Size Guide
                    </StyledSizeGuideLabel>
                  </StyledSizeLabel>
                ) : isEqualOptionName(
                    option.name,
                    PRODUCT_SELECT_SIZE_OPTION
                  ) && funnelView ? (
                  <StyledSizeLabel>{PRODUCT_SIZE_OPTION}</StyledSizeLabel>
                ) : null
              }
              option={option}
              value={selectedOptionsGrouped[option.name]}
              onChange={(value) => handleOptionChange(option.name, value)}
            />
          </StyledOptionSection>
        ))}

        <RenderNode
          node={footer}
          editable={editable}
          product={product}
          selectedVariant={selectedVariant}
          quantity={currentQuantity}
          onSubmit={onSubmit}
        />
      </StyledProductForm>
      {showUnderwearSizeModal && (
        <UnderwearSizeGuideModal onCloseClick={handleCloseUnderwearSizeModal} />
      )}
    </>
  )
}

const StyledProductForm = styled.form``

const StyledSizeLabel = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledSizeGuideLabel = styled.div`
  display: flex;
  cursor: pointer;
  font-size: 12px;
  text-decoration: underline dotted;
`

const StyledSizeGuideImg = styled.img`
  margin-right: 4px;
`

const StyledOptionSection = styled.section`
  width: 100%;
  padding-bottom: 20px;

  &:last-child {
    padding-bottom: 0px;
  }
`

const StyledQuantity = styled(AccountProductInputQuantity)`
  width: 129px;
`

export default AccountProductForm
