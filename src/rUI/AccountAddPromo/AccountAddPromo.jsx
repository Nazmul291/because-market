import React, { useState, useCallback, useEffect } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"
import StrokedButton from "../StrokedButton"
import AccountAddPromoApplied from "./AccountAddPromoApplied"
import AccountAddPromoForm from "./AccountAddPromoForm"
import { SIZE_SMALL } from "../StrokedButton/StrokedButton"
import LoadingSpinner from "../LoadingSpinner"

AccountAddPromo.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  error: PropTypes.string,
  disabled: PropTypes.bool,
  onSubmit: PropTypes.func,
  onOpenForm: PropTypes.func,
}

function AccountAddPromo({
  value,
  loading = false,
  error = null,
  disabled = false,
  onSubmit = noop,
  onOpenForm = noop,
  ...props
}) {
  const [showForm, setShowForm] = useState(false)
  const [submittedForm, setSubmittedForm] = useState(false)

  const hasValue = value?.length > 0

  const handleOpenForm = useCallback(() => {
    onOpenForm()
    setShowForm(true)
  }, [onOpenForm])

  const handleCloseForm = useCallback(() => {
    setShowForm(false)
    setSubmittedForm(false)
  }, [])

  const handleSubmitForm = useCallback(
    (value) => {
      onSubmit(value)
      setSubmittedForm(true)
    },
    [onSubmit]
  )

  useEffect(() => {
    if (!showForm || !submittedForm || loading) {
      return
    }

    if (!error) {
      handleCloseForm()
      return
    }
  }, [showForm, submittedForm, loading, error, handleCloseForm])

  return (
    <StyledRoot {...props}>
      {showForm ? (
        <AccountAddPromoForm
          error={error}
          disabled={loading}
          onClose={handleCloseForm}
          onSubmit={handleSubmitForm}
        />
      ) : hasValue ? (
        <AccountAddPromoApplied value={value} onClick={handleOpenForm} />
      ) : (
        <StrokedButton
          disabled={disabled}
          onClick={handleOpenForm}
          size={SIZE_SMALL}
        >
          Add Promo Code
        </StrokedButton>
      )}

      {loading && (
        <StyledLoaderLayout>
          <StyledLoader />
        </StyledLoaderLayout>
      )}
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  position: relative;
  width: 100%;
`

const StyledLoaderLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLoader = styled(LoadingSpinner)`
  margin: 0;
`

export default AccountAddPromo
