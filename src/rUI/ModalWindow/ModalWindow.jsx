import React, { memo } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import Modal from "react-modal"
import { PlusIcon } from "../icons/PlusIcon"
import { isMobile } from "../../utils"

import "./modal.css"

ModalWindow.propTypes = {
  appElement: PropTypes.string.isRequired,
  fullScreen: PropTypes.bool,
  centerVertically: PropTypes.bool,
  open: PropTypes.bool,
  discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
  onCloseModal: PropTypes.func,
}

function ModalWindow({
  appElement,
  fullScreen = true,
  centerVertically = false,
  open,
  discount = null,
  children,
  onCloseModal,
}) {
  Modal.setAppElement(appElement)

  const wrapperStyle = centerVertically
    ? {
        height: isMobile() ? "fit-content" : "95vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }
    : {
        display: "flex",
      }

  const contentStyle = fullScreen
    ? {
        width: "100%",
        height: "100%",
        margin: 0,
        inset: 0,
      }
    : {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: isMobile() ? "100%" : "840px",
        minHeight: isMobile() ? "100%" : "fit-content",
      }

  return (
    <Modal
      isOpen={open}
      onRequestClose={onCloseModal}
      contentLabel="Modal"
      style={{
        overlay: {},
        content: contentStyle,
      }}
      closeTimeoutMS={500}
    >
      <div style={wrapperStyle}>
        {discount ? (
          <StyledDiscount>
            <div>{discount}%</div>
            <div>OFF</div>
          </StyledDiscount>
        ) : null}
        <div
          onClick={onCloseModal}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 2002,
            cursor: "pointer",
          }}
        >
          <StyledPlusIcon />
        </div>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "auto",
            paddingTop: "40px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      </div>
    </Modal>
  )
}

const StyledDiscount = styled.div`
  width: 70px;
  height: 70px;
  border: 0px solid #ffffff;
  border-radius: 50%;
  background-color: #00e1d5;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 2;
  transform: none;
  cursor: default;

  &:hover {
    transform: none;
  }

  div:first-of-type {
    font-family: "Graphik Semibold";
    font-size: 24px;
    line-height: 26px;
  }
`

const StyledPlusIcon = styled(PlusIcon)`
  width: 50px;
  height: 50px;
  background-color: transparent;
  color: #666;
  transform: rotate(45deg);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: rotate(225deg);
  }
`

export default memo(ModalWindow)
