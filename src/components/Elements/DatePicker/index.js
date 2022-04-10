import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { useState, useEffect } from 'react'
import { SingleDatePicker } from 'react-dates'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Event } from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import isString from 'lodash/isString'
import isUndefined from 'lodash/isUndefined'
import Select from '@material-ui/core/Select'
import { Container } from './styles'
import noop from 'lodash/noop'
import { withStyles } from '@material-ui/core/styles'
import ArrowLeft from '@material-ui/icons/ArrowLeft'
import ArrowRight from '@material-ui/icons/ArrowRight'
import CalendarDay from '../components/CalendarDay'
import isNil from 'lodash/isNil'
import clsx from 'clsx'
import MenuItem from '@material-ui/core/MenuItem'

const LeftIcon = withStyles({
  root: {
    position: 'absolute',
    top: '18px',
    lineHeight: ' .78',
    borderRadius: ' 3px',
    left: '0',
    fontSize: 34,
  },
})(ArrowLeft)

const RightIcon = withStyles({
  root: {
    position: 'absolute',
    top: '18px',
    lineHeight: ' .78',
    borderRadius: ' 3px',
    right: '0',
    fontSize: 34,
  },
})(ArrowRight)

const DatePickerWrapper = ({
  label,
  numberOfMonths = 2,
  date,
  onDatesChange = noop,
  dateFormat = 'MM/DD/YYYY',
  direction,
  className,
  blockedDates,
  events,
  renderCustomDay = true,
  startDate, // this prop is used to disable selection before startDate
  readOnly = false, // to make input field non-editable via keyboard
  placeholder, // this prop is used to show placeholder value if date prop is null
  showPastDates = false, // this prop is used to disable past dates
  error,
  disabled,
  openDirection = 'down',
  isBirthDatePicker = false,
  withPortal = false,
  validate = true,
}) => {
  const [focused, setFocused] = useState(null)
  const [monthYearFocused, setMonthYearFocused] = useState(null)
  const [isValid, setIsValid] = useState(true)

  const dateToMoment = date => (isString(date) ? moment(date) : date)

  const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    let i
    const years = []
    for (i = moment().year() - 1; i >= moment().year() - 100; i--) {
      years.push(
        <MenuItem value={i} key={`year-${i}`}>
          {i}
        </MenuItem>
      )
    }
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <Select
            value={month.month()}
            onOpen={() => setMonthYearFocused(true)}
            onClose={() => setMonthYearFocused(false)}
            onChange={e => {
              setMonthYearFocused(false)
              onMonthSelect(month, e.target.value)
            }}>
            {moment.months().map((label, value) => (
              <MenuItem value={value} key={value}>
                {label}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <Select
            onOpen={() => setMonthYearFocused(true)}
            onClose={() => setMonthYearFocused(false)}
            value={month.year() <= moment().year() - 1 ? month.year() : ''}
            onChange={e => {
              setMonthYearFocused(false)
              onYearSelect(month, e.target.value)
            }}>
            {years}
          </Select>
        </div>
      </div>
    )
  }

  const checkFormat = date => {
    const isValidDate =
      isUndefined(date) || isNil(date) ? true : moment(date, dateFormat, true).isValid()

    setIsValid(isValidDate)
  }

  useEffect(() => {
    if (validate) {
      checkFormat(date)
    }
  }, [])

  const renderDay = day => {
    return !renderCustomDay ? (
      <span>{day.format('D')}</span>
    ) : (
      <CalendarDay day={day} blockedDates={blockedDates} events={events} />
    )
  }
  const isOutsideRange = day =>
    startDate
      ? day.isBefore(moment(startDate))
      : showPastDates
      ? false
      : day.isBefore(moment(), 'day')
  return (
    <Container
      isValid={isValid && !error}
      className={clsx(className, disabled && 'date_picker_container_disabled')}>
      <SingleDatePicker
        id={label || 'date'}
        date={date ? dateToMoment(date) : null}
        onDateChange={onDatesChange}
        focused={focused}
        onFocusChange={({ focused }) => {
          if (isBirthDatePicker) {
            if (!monthYearFocused) {
              setFocused(focused)
            }
          } else {
            setFocused(focused)
          }
        }}
        numberOfMonths={numberOfMonths}
        navPrev={isBirthDatePicker ? <></> : <LeftIcon />}
        navNext={isBirthDatePicker ? <></> : <RightIcon />}
        anchorDirection={direction}
        renderDayContents={renderDay}
        openDirection={openDirection}
        isOutsideRange={isOutsideRange}
        readOnly={readOnly}
        placeholder={placeholder}
        disabled={disabled}
        renderMonthElement={isBirthDatePicker ? renderMonthElement : null}
        initialVisibleMonth={
          isBirthDatePicker
            ? date
              ? () => dateToMoment(date)
              : () => moment().subtract(1, 'year')
            : null
        }
        transitionDuration={0}
        withPortal={withPortal}
      />
      <Event
        disabled={disabled}
        className={clsx('right-icon', disabled && 'right-icon--disabled')}
      />
      {label ? <Typography className="label">{label}</Typography> : null}
    </Container>
  )
}

DatePickerWrapper.propTypes = {
  label: PropTypes.string,
  dateFormat: PropTypes.string,
  numberOfMonths: PropTypes.number,
  date: PropTypes.shape({}),
  onDatesChange: PropTypes.func.isRequired,
  direction: PropTypes.string,
  className: PropTypes.string,
  blockedDates: PropTypes.array,
  events: PropTypes.array,
  renderCustomDay: PropTypes.bool,
  startDate: PropTypes.shape({}),
  readOnly: PropTypes.bool,
  error: PropTypes.any,
  placeholder: PropTypes.string,
  openDirection: PropTypes.string,
  showPastDates: PropTypes.bool,
  validate: PropTypes.bool,
  disabled: PropTypes.bool,
  isBirthDatePicker: PropTypes.bool,
}

export default DatePickerWrapper
