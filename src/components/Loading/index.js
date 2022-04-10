import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Skeleton from '@material-ui/lab/Skeleton'
import times from 'lodash/times'
import isNumber from 'lodash/isNumber'

const absoluteCss = css`
  position: absolute;
  height: 100%;
  width: ${({ width }) => width || `100%;`};
  z-index: 2;
  left: 0;
  top: 0;
`

const ProgressContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.bgColor ? props.bgColor : 'transparent')};
  ${({ absolute }) => absolute && absoluteCss}
`

const ProgressLoading = ({
  skeleton,
  size,
  bgColor,
  color = 'primary',
  absolute,
  className,
  width = '100%',
  variant = 'text',
  height = 50,
  animation = 'wave',
  noLoader = false,
  children,
  style = {},
}) => {
  return skeleton ? (
    times(isNumber(skeleton) ? skeleton : 1).map(i => {
      return (
        <Skeleton
          width={!children && width}
          style={style}
          key={i}
          variant={variant}
          height={!children && height}
          className={className}
          animation={animation}>
          {children}
        </Skeleton>
      )
    })
  ) : (
    <ProgressContainer
      className={className}
      bgColor={bgColor}
      absolute={absolute}
      width={width}
      style={style}
      data-tc="progress-loading">
      {!noLoader && <CircularProgress color={color} size={size} />}
      {children}
    </ProgressContainer>
  )
}

ProgressLoading.propTypes = {
  size: PropTypes.number,
  bgColor: PropTypes.string,
  absolute: PropTypes.bool,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  skeleton: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  variant: PropTypes.string,
  animation: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.object,
}

export default ProgressLoading
