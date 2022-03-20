import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Slider from '@material-ui/core/Slider'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme => ({
  root: {
    width: 275,
    '& .MuiSlider-markLabel': {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '20px',
      paddingTop: 4,
    },
    '& .MuiSlider-markLabel[data-index="0"]': {
      left: '6% !important',
    },
    '& .MuiSlider-markLabel[data-index="1"]': {
      left: '85% !important',
    },
    '& .MuiSlider-mark': {
      display: 'none',
    },
    '& .MuiSlider-thumb.Mui-disabled': {
      marginLeft: '-12px',
      marginTop: '-8px',
      backgroundColor: theme.core.colors.lightOrange,
    },
    [theme.breakpoints.down('xs')]: {
      width: '95%',
    },
  },
}))

const useCustomTooltipStyles = makeStyles(theme => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}))

const CustomSlider = withStyles(theme => ({
  root: {
    color: theme.core.colors.primaryColorDark,
    height: 8,
  },
  thumb: {
    height: `24px !important`,
    width: '24px !important',
    backgroundColor: theme.core.colors.primaryColorDark,
    border: `4px solid ${theme.core.colors.n00}`,
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 10,
    borderRadius: 8,
  },
  rail: {
    height: 10,
    borderRadius: 8,
    backgroundColor: theme.core.colors.n40,
  },
}))(Slider)

const marks = [
  {
    value: 0,
    label: '0 BNB',
  },
  {
    value: 5000,
    label: '5000+ BNB',
  },
]

const ValueLabelComponent = ({ children, open, value }) => {
  const classes = useCustomTooltipStyles()

  return (
    <Tooltip
      arrow
      open={open}
      classes={classes}
      enterTouchDelay={0}
      placement="top"
      title={value === 5000 ? value + '+ BNB' : value + ' BNB'}>
      {children}
    </Tooltip>
  )
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
}

const CustomizedSlider = ({ value, setValue, ...rest }) => {
  const classes = useStyles()
  const [sliderValue, setSliderValue] = useState(value || [100, 1000])

  const handleFilterUpdate = (e, value) => {
    setSliderValue(value)
    setValue(value)
  }

  useEffect(() => {
    setSliderValue(value)
  }, [value])

  return (
    <div className={classes.root}>
      <CustomSlider
        ValueLabelComponent={ValueLabelComponent}
        aria-labelledby="price-range"
        value={sliderValue}
        onChange={(e, newValue) => setSliderValue(newValue)}
        step={50}
        onChangeCommitted={handleFilterUpdate}
        marks={marks}
        {...rest}
      />
    </div>
  )
}

CustomizedSlider.propTypes = {
  value: PropTypes.array,
  setValue: PropTypes.func,
}

export default CustomizedSlider
