import React from "react"

export const Loader = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="#00b5cb"
    {...props}
  >
    <circle transform="translate(8)" cy="16" r="0">
      <animate
        attributeName="r"
        values="0; 4; 0; 0"
        dur="1.2s"
        repeatCount="indefinite"
        begin="0"
        keyTimes="0;0.2;0.7;1"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
        calcMode="spline"
      />
    </circle>
    <circle transform="translate(16)" cy="16" r="0">
      <animate
        attributeName="r"
        values="0; 4; 0; 0"
        dur="1.2s"
        repeatCount="indefinite"
        begin=".3"
        keyTimes="0;0.2;0.7;1"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
        calcMode="spline"
      />
    </circle>
    <circle transform="translate(24)" cy="16" r="0">
      <animate
        attributeName="r"
        values="0; 4; 0; 0"
        dur="1.2s"
        repeatCount="indefinite"
        begin=".6"
        keyTimes="0;0.2;0.7;1"
        keySplines="0.2 0.2 0.4 0.8;0.2 0.6 0.4 0.8;0.2 0.6 0.4 0.8"
        calcMode="spline"
      />
    </circle>
  </svg>
)
