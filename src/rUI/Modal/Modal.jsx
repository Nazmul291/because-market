import React from "react"
import { createPortal } from "react-dom"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"
import useModalRoot from "./useModalRoot"

Modal.propTypes = {
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onCloseClick: PropTypes.func,
  hiddenCloseButton: PropTypes.bool,
  CloseIcon: PropTypes.any,
}

function Modal({
  header,
  children,
  onCloseClick = noop,
  hiddenCloseButton = false,
  CloseIcon = null,
  ...props
}) {
  const rootEl = useModalRoot()

  const CloseComp = CloseIcon ?? CloseButton

  const content = (
    <Layout {...props}>
      <Wrapper>
        <ContentLayout>
          {header && <Header>{header}</Header>}
          {!hiddenCloseButton && (
            <CloseButtonPositionLayout>
              <CloseComp onClick={onCloseClick} />
            </CloseButtonPositionLayout>
          )}
          <Body>{children}</Body>
        </ContentLayout>
      </Wrapper>
    </Layout>
  )
  return createPortal(content, rootEl)
}

const Layout = styled.div`
  --width: auto;
  --max-width: 1124px;
  --body-padding: 1.5rem;
  --body-padding__mobile: 6px 1.5rem;
  --close-button__color: #ccc;

  position: fixed;
  display: flex;
  justify-content: center;
  color: #212529;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);

  overflow-x: hidden;
  overflow-y: auto;

  padding: 20px;

  @media only screen and (max-width: 1024px) {
    padding: 0;
  }

  z-index: 9999;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100% - (1.75rem * 2));

  position: relative;
  pointer-events: none;
  transform: translate(0, 0);
  margin: auto;
  justify-content: center;
  padding: 20px;
  width: var(--width);

  @media only screen and (max-width: 767px) {
    padding: 10px;
  }
`

const ContentLayout = styled.div`
  position: relative;
  border-radius: 7.5px;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
  width: var(--width);
  max-width: var(--max-width);
`

const Header = styled.div`
  background-color: var(--theme-color--blue);
  padding: 1.5rem;
  color: var(--theme-color--white);
`

const Body = styled.div`
  padding: var(--body-padding);

  @media only screen and (max-width: 1024px) {
    padding: var(--body-padding__mobile);
  }
`

const CloseButtonPositionLayout = styled.div`
  top: 1rem;
  right: 1rem;
  position: absolute;
`

const CloseButton = styled.button`
  cursor: pointer;
  width: 20px;
  height: 20px;
  text-indent: -9999px;
  overflow: hidden;
  outline: none;
  border: none;
  background: none;
  padding: 0;
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--close-button__color);
  text-shadow: 0 1px 0 #fff;

  &::before,
  &::after {
    position: absolute;
    left: 10px;
    content: " ";
    height: 21px;
    width: 2px;
    top: 0;
    background-color: currentColor;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`

export default Modal
