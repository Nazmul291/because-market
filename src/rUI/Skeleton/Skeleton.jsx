import React from "react"
import { styled } from "@linaria/react"

function Skeleton(props) {
  return <StyledSkeleton {...props} />
}

const StyledSkeleton = styled.figure`
  display: inline-block;
  width: 100%;
  min-height: 1em;
  position: relative;
  overflow: hidden;
  background-color: #f5f7f9;
  border-radius: 4px;

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(#fff, 0) 0,
      rgba(#fff, 0.2) 20%,
      rgba(#fff, 0.85) 60%,
      rgba(#fff, 0)
    );
    animation: shimmer 2s infinite;
    content: "";
  }
`

export default Skeleton
