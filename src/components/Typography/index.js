/* eslint-disable react/display-name */
// Implementation of Typography components found here:
// https://projects.invisionapp.com/share/Y9SFVGB5FJ7#/screens/367992892_Typography

import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import values from 'lodash/values'

export const FontWeights = {
  bold: 700,
  semiBold: 600,
  medium: 500,
  regular: 400,
}

const fontWeights = values(FontWeights)
const fontWeightPropType = PropTypes.oneOf(fontWeights)

export const H1 = React.forwardRef(
  ({ children, fontWeight = FontWeights.medium, style, ...restProps }, ref) => (
    <Typography ref={ref} variant="h1" {...restProps} style={{ fontWeight, ...style }}>
      {children}
    </Typography>
  )
)

H1.propTypes = {
  children: PropTypes.node.isRequired,
}

export const H2 = React.forwardRef(
  ({ children, fontWeight = FontWeights.medium, style, ...restProps }, ref) => (
    <Typography ref={ref} variant="h2" {...restProps} style={{ fontWeight, ...style }}>
      {children}
    </Typography>
  )
)

H2.propTypes = {
  children: PropTypes.node.isRequired,
  fontWeight: fontWeightPropType,
  style: PropTypes.object,
}

export const H3 = React.forwardRef(
  ({ children, fontWeight = FontWeights.medium, style, ...restProps }, ref) => (
    <Typography ref={ref} variant="h3" {...restProps} style={{ fontWeight, ...style }}>
      {children}
    </Typography>
  )
)

H3.propTypes = {
  children: PropTypes.node.isRequired,
  fontWeight: fontWeightPropType,
  style: PropTypes.object,
}

export const H4 = React.forwardRef(
  ({ children, fontWeight = FontWeights.medium, style, ...restProps }, ref) => (
    <Typography ref={ref} variant="h4" {...restProps} style={{ fontWeight, ...style }}>
      {children}
    </Typography>
  )
)

H4.propTypes = {
  children: PropTypes.node.isRequired,
}

export const H5 = React.forwardRef(
  ({ children, fontWeight = FontWeights.medium, style, ...restProps }, ref) => (
    <Typography ref={ref} variant="h5" {...restProps} style={{ fontWeight, ...style }}>
      {children}
    </Typography>
  )
)

H5.propTypes = {
  children: PropTypes.node.isRequired,
}

export const H6 = React.forwardRef(
  ({ children, fontWeight = FontWeights.medium, style, ...restProps }, ref) => (
    <Typography ref={ref} variant="h6" {...restProps} style={{ fontWeight, ...style }}>
      {children}
    </Typography>
  )
)

H6.propTypes = {
  children: PropTypes.node.isRequired,
}

export const Subtitle1 = React.forwardRef(({ children, fontWeight, style, ...restProps }, ref) => (
  <Typography ref={ref} variant="subtitle1" {...restProps} style={{ fontWeight, ...style }}>
    {children}
  </Typography>
))

Subtitle1.propTypes = {
  children: PropTypes.node.isRequired,
  fontWeight: PropTypes.oneOf([FontWeights.semiBold, FontWeights.bold]),
  style: PropTypes.object,
}

export const Subtitle2 = React.forwardRef(({ children, fontWeight, style, ...restProps }, ref) => (
  <Typography ref={ref} variant="subtitle2" {...restProps} style={{ fontWeight, ...style }}>
    {children}
  </Typography>
))

Subtitle2.propTypes = {
  children: PropTypes.node.isRequired,
  fontWeight: PropTypes.oneOf([FontWeights.semiBold, FontWeights.bold]),
  style: PropTypes.object,
}

export const Body1 = React.forwardRef(({ children, fontWeight, style, ...restProps }, ref) => (
  <Typography ref={ref} variant="body1" {...restProps} style={{ fontWeight, ...style }}>
    {children}
  </Typography>
))

Body1.propTypes = {
  children: PropTypes.node.isRequired,
  fontWeight: PropTypes.oneOf([
    FontWeights.regular,
    FontWeights.medium,
    FontWeights.semiBold,
    FontWeights.bold,
  ]),
  style: PropTypes.object,
}

export const Body2 = React.forwardRef(
  ({ children, fontWeight = FontWeights.regular, style, ...restProps }, ref) => (
    <Typography ref={ref} variant="body2" {...restProps} style={{ fontWeight, ...style }}>
      {children}
    </Typography>
  )
)

Body2.propTypes = {
  children: PropTypes.node,
  fontWeight: PropTypes.oneOf([
    FontWeights.regular,
    FontWeights.medium,
    FontWeights.semiBold,
    FontWeights.bold,
  ]),
  style: PropTypes.object,
}

export const Button = React.forwardRef(({ children, ...restProps }, ref) => (
  <Typography ref={ref} variant="button" display="block" {...restProps}>
    {children}
  </Typography>
))

Button.propTypes = {
  children: PropTypes.node.isRequired,
}

export const Caption = React.forwardRef(
  ({ children, fontWeight = FontWeights.medium, style, ...restProps }, ref) => (
    <Typography
      ref={ref}
      variant="caption"
      display="block"
      {...restProps}
      style={{ fontWeight, ...style }}>
      {children}
    </Typography>
  )
)

Caption.propTypes = {
  children: PropTypes.node.isRequired,
  fontWeight: fontWeightPropType,
  style: PropTypes.object,
  color: PropTypes.string,
}
