import React, { useCallback } from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { noop } from "../../utils"
import { useControlledState } from "../../hooks"

AccountAccordion.propTypes = {
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  children: PropTypes.node,
  opened: PropTypes.bool,
  onChange: PropTypes.func,
}

function AccountAccordion({
  title,
  children,
  opened,
  onChange = noop,
  ...props
}) {
  const [isOpen, setOpen] = useControlledState(opened, onChange)

  const handleCloseOpenClick = useCallback(() => {
    setOpen(!isOpen)
  }, [isOpen, setOpen])

  return (
    <StyledRoot {...props}>
      <StyledHeader onClick={handleCloseOpenClick}>
        <StyledTitle>{title}</StyledTitle>
        <StyledOpenClose>{isOpen ? "-" : "+"}</StyledOpenClose>
      </StyledHeader>
      {isOpen && <StyledContent>{children}</StyledContent>}
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
`

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.15px;
  line-height: 42px;
  padding: 0.75em 1em;
`
const StyledTitle = styled.div`
  position: relative;
  line-height: 1em;
  padding-left: 1.5em;

  &::before {
    content: "";
    height: 12px;
    width: 12px;
    border: 3px solid #3ce2cf;
    border-radius: 50%;
    position: absolute;
    top: 6px;
    left: 0px;
  }
`
const StyledOpenClose = styled.div`
  margin-left: 8px;
`
const StyledContent = styled.div`
  padding: 0.75em 2.75em 1.5em;
`

export default AccountAccordion
