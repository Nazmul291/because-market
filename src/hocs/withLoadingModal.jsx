import React from "react"
import { styled } from "@linaria/react"
import LoadingSpinner from "../rUI/LoadingSpinner/LoadingSpinner"
import { Modal } from "../rUI"

export const withLoadingModal = (Component) => {
  const wrapped = ({ loading, loaderSize = 64, ...props }) =>
    loading ? (
      <Modal hiddenCloseButton>
        <StyledLoadingWrapper>
          <LoadingSpinner size={loaderSize} />
        </StyledLoadingWrapper>
      </Modal>
    ) : (
      <Component {...props} />
    )

  return wrapped
}

const StyledLoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
