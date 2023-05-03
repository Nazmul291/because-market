import React from "react"
import { styled } from "@linaria/react"
import LoadingSpinner from "../rUI/LoadingSpinner/LoadingSpinner"

export const withLoading = (Component, loadingContent = null) => {
  const wrapped = ({ loading, loaderSize = 64, ...props }) =>
    loading ? (
      loadingContent ? (
        loadingContent
      ) : (
        <StyledLoadingWrapper>
          <LoadingSpinner size={loaderSize} />
        </StyledLoadingWrapper>
      )
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
