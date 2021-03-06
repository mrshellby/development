// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import React from 'react'
import { number, string, bool, shape, node } from 'prop-types'
import styled from 'styled-components'

import theme from '../../theme'
import mq from '../../theme/mediaQueries'
import { StyledCircle, StyledScoreSubscript } from './Grade.styles'

export const calculatePercentage = (points, maxPoints) => {
  return points / maxPoints
}

export const percentageToRingColor = (percentage) =>
  percentage < 0.3
    ? '#F02B41'
    : percentage < 0.7
    ? theme.tokens.colorPaletteGray500
    : '#63D19E'

export const percentageToBackgroundColor = (percentage) =>
  percentage === 0
    ? '#FEEBED'
    : percentage < 1
    ? theme.tokens.colorPaletteGray100
    : '#CBFFE7'

export const percentageToTextColor = (percentage) =>
  percentage === 0 ? '#F02B41' : theme.colorText

const SVGCircle = ({ circleProps, largeAtMediaQuery, color, className }) => (
  <circle
    cx={0.5}
    cy={0.5}
    r={circleProps.radius}
    stroke={color}
    strokeWidth={circleProps.strokeWidth}
    strokeDasharray={`${circleProps.circumference} ${circleProps.circumference}`}
    strokeDashoffset={circleProps.dashOffset}
    fillOpacity={0}
    transform="rotate(-90 0.5 0.5)"
    className={className}
  />
)

const circlePropTypes = shape({
  strokeWidth: number.isRequired,
  radius: number.isRequired,
  circumference: number.isRequired,
  dashOffset: number.isRequired,
})

SVGCircle.propTypes = {
  circleProps: circlePropTypes.isRequired,
  largeAtMediaQuery: string,
  color: string.isRequired,
  className: string,
}

// Map all measurements to [0, 1] space
const scaleMeasurements = ({ size, ...otherMeasurements }) => {
  const scaledMeasurements = {
    size: 1,
  }

  for (const k of Object.keys(otherMeasurements)) {
    scaledMeasurements[k] = otherMeasurements[k] / size
  }

  return scaledMeasurements
}

const getCircleProps = (percentage, { size, strokeWidth }) => {
  // Half of the stroke is drawn outside of the radius, make sure the total size is correct
  const radius = 0.5 * size - 0.5 * strokeWidth
  const circumference = 2 * Math.PI * radius
  const dashOffset = (1 - percentage) * circumference

  return {
    strokeWidth,
    radius,
    circumference,
    dashOffset,
  }
}

const Ring = ({
  percentage,
  color,
  size,
  strokeWidth,
  largeAtMediaQuery,
  largeSize,
  ...props
}) => {
  const measurements = scaleMeasurements({
    size,
    strokeWidth,
  })

  return (
    <svg viewBox="0 0 1 1" {...props}>
      <SVGCircle
        largeAtMediaQuery={largeAtMediaQuery}
        circleProps={getCircleProps(percentage, measurements)}
        color={color}
      />
    </svg>
  )
}

Ring.propTypes = {
  percentage: number.isRequired,
  color: string.isRequired,
  size: number,
  strokeWidth: number,
  largeAtMediaQuery: string,
  largeSize: number,
}

const StyledRing = styled(Ring)`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
`

const PercentageRing = ({ className, children, ...props }) => {
  return (
    <div className={className}>
      <StyledRing {...props} />
      {children}
    </div>
  )
}

PercentageRing.propTypes = {
  className: string,
  children: node,
}

const StyledPercentageRing = styled(PercentageRing)`
  position: relative;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;

  ${(p) =>
    p.largeAtMediaQuery
      ? mq[p.largeAtMediaQuery]`
        width: ${(p) => p.largeSize}px;
        height: ${(p) => p.largeSize}px;
      `
      : ''}
`

const Grade = ({
  totalScore,
  size,
  strokeWidth,
  largeAtMediaQuery,
  largeSize,
  staticBackgroundColor,
  withText,
  ...props
}) => {
  const { points, maxPoints } = totalScore
  const percentage = calculatePercentage(points, maxPoints)
  const backgroundColor =
    staticBackgroundColor || percentageToBackgroundColor(percentage)

  // Half of the stroke is drawn outside of the radius, make sure the total size is correct
  const radius = 0.5 * size - 0.5 * strokeWidth
  // Draw the circle so that it overlaps the inner half of the ring
  const circleOffset = 0.5 * strokeWidth

  const scaleFactor = largeSize / size
  const largeRadius = scaleFactor * radius
  const largeCircleOffset = scaleFactor * circleOffset

  return (
    <StyledPercentageRing
      percentage={percentage}
      size={size}
      strokeWidth={strokeWidth}
      color={percentageToRingColor(percentage)}
      largeAtMediaQuery={largeAtMediaQuery}
      largeSize={largeSize}
      {...props}
    >
      <StyledCircle
        radius={radius}
        offset={circleOffset}
        largeAtMediaQuery={largeAtMediaQuery}
        largeRadius={largeRadius}
        largeOffset={largeCircleOffset}
        backgroundColor={backgroundColor}
        textColor={percentageToTextColor(percentage)}
      >
        {withText && (
          <>
            {points}
            <StyledScoreSubscript largeAtMediaQuery={largeAtMediaQuery}>
              /{maxPoints}
            </StyledScoreSubscript>
          </>
        )}
      </StyledCircle>
    </StyledPercentageRing>
  )
}

Grade.propTypes = {
  totalScore: shape({
    points: number.isRequired,
    maxPoints: number.isRequired,
  }).isRequired,
  // All sizes are measured in pixels
  size: number,
  strokeWidth: number,
  // Use function names from `theme/mediaQueries`
  largeAtMediaQuery: string,
  largeSize: number,
  withText: bool,
  // If truthy, always use this background color regardless of score
  staticBackgroundColor: string,
}

Grade.defaultProps = {
  size: 35,
  strokeWidth: 4,
  largeSize: 80,
  withText: true,
}

export default Grade
