import React from "react"
import { styled } from "@linaria/react"
import Image from "../Image"
import Modal from "../Modal"
import CloseCircleButtonIcon from "../icons/CloseCircleButtonIcon"
import src from "./img/underwear-size.jpg"

function UnderwearSizeGuideModal(props) {
  return (
    <Modal CloseIcon={StyledIcon} {...props}>
      <StyledImage src={src} />
    </Modal>
  )
}

const StyledIcon = styled(CloseCircleButtonIcon)`
  cursor: pointer;
  color: #c4c4c4;
`

const StyledImage = styled(Image)`
  max-height: 80vh;
  max-width: 60vw;

  @media only screen and (max-width: 1024px) {
    max-height: 100%
    max-width: 100%;
  }
`

export default UnderwearSizeGuideModal
