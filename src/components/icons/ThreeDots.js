import React from "react";
import { multiply } from "../../helpers/calculate";

const CIRCLE_Y = 18

function SvgThreeDots({r, circleY, x = 15, xOffset = 30, ...props}) {
  const scale = multiply(r, 0.45);
  return (
    <svg fill="#fff" {...props}>
      <circle cx={x} cy={circleY} r={r}>
        <animate
          attributeName="r"
          begin="0s"
          calcMode="linear"
          dur="0.8s"
          from={r}
          repeatCount="indefinite"
          to={r}
          values={`${r};${scale};${r}`}
        />
        <animate
          attributeName="fill-opacity"
          begin="0s"
          calcMode="linear"
          dur="0.8s"
          from={1}
          repeatCount="indefinite"
          to={1}
          values="1;.5;1"
        />
      </circle>
      <circle cx={x + xOffset} cy={circleY} fillOpacity={0.3} r={r}>
        <animate
          attributeName="r"
          begin="0s"
          calcMode="linear"
          dur="0.8s"
          from={4.5}
          repeatCount="indefinite"
          to={4.5}
          values={`${scale};${r};${scale}`}
        />
        <animate
          attributeName="fill-opacity"
          begin="0s"
          calcMode="linear"
          dur="0.8s"
          from={0.5}
          repeatCount="indefinite"
          to={0.5}
          values=".5;1;.5"
        />
      </circle>
      <circle cx={x + (2 * xOffset)} cy={circleY} r={r}>
        <animate
          attributeName="r"
          begin="0s"
          calcMode="linear"
          dur="0.8s"
          from={r}
          repeatCount="indefinite"
          to={r}
          values={`${r};${scale};${r}`}
        />
        <animate
          attributeName="fill-opacity"
          begin="0s"
          calcMode="linear"
          dur="0.8s"
          from={1}
          repeatCount="indefinite"
          to={1}
          values="1;.5;1"
        />
      </circle>
    </svg>
  );
}

SvgThreeDots.defaultProps = {
  circleY: CIRCLE_Y,
  height: 30,
  r: 10,
  width: 90,
}

export default SvgThreeDots;
