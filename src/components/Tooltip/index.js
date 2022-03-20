import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Caption, Subtitle2, FontWeights } from '../Typography'
import themes from '../Theme'

function arrowGenerator(color) {
  return {
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      marginTop: '-0.95em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${color} transparent`,
      },
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.95em',
      width: '2em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${color} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      marginLeft: '-0.95em',
      height: '2em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${color} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      marginRight: '-0.95em',
      height: '2em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${color}`,
      },
    },
  }
}

const Container = styled.div`
  padding: 10px;

  .gray {
    margin-top: 6px;
    color: ${themes.colors.n60};
  }
`

const TooltipComponent = ({ title = '', text = '', width, placement = 'top', ...rest }) => {
  const useStylesArrow = makeStyles(theme => ({
    tooltip: {
      position: 'relative',
      backgroundColor: theme.core.colors.white,
      color: 'black',
      boxShadow: '0 1px 2px 0 rgba(44,44,61,0.2), 0 8px 10px 0 rgba(44,44,61,0.3)',
      width: width,
      maxWidth: '100%',
    },
    arrow: {
      position: 'absolute',
      fontSize: 6,
      '&::before': {
        content: '""',
        margin: 'auto',
        display: 'block',
        width: 0,
        height: 0,
        borderStyle: 'solid',
      },
    },
    popper: arrowGenerator(themes.colors.white),
  }))
  const { arrow, ...classes } = useStylesArrow()
  const [arrowRef, setArrowRef] = React.useState(null)

  return (
    <Tooltip
      classes={classes}
      placement={placement}
      enterTouchDelay={0}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...rest}
      title={
        <Container>
          <Subtitle2 style={{ color: themes.colors.n70 }} fontWeight={FontWeights.semiBold}>
            {title}
          </Subtitle2>
          <Caption fontWeight={FontWeights.medium} className={title ? 'gray' : null}>
            {text}
          </Caption>

          <span className={arrow} ref={setArrowRef} />
        </Container>
      }
    />
  )
}

TooltipComponent.propTypes = {
  title: PropTypes.node,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  width: PropTypes.number,
  placement: PropTypes.string,
}

export default TooltipComponent
