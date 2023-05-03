import { styled } from "@linaria/react"

const SimpleTooltipBody = styled.div`
  max-width: calc(100vw - 40px);
  border-radius: 6px;
  padding: 15px;
  color: #000;
  text-align: justify;
  background-color: #fff;
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25);
  z-index: 10000;
`

export default SimpleTooltipBody
