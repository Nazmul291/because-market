import React from "react"

function CloseCircleButtonIcon(props) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="currentColor" />
      <line
        x1="9.8714"
        y1="10.0425"
        x2="22.1279"
        y2="22.299"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="10.043"
        y1="22.299"
        x2="22.2995"
        y2="10.0425"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default CloseCircleButtonIcon
