import styled from 'styled-components'

import theme from 'components/Theme'

export const Container = styled.div`
  position: relative;
  height: 56px;
  cursor: pointer;
  .label {
    position: absolute;
    top: -5px;
    left: 11px;
    font-size: 11px;
    color: ${p => (p.isValid ? theme.colors.n50 : theme.colors.errorColor)};
    padding-left: 6px;
    padding-right: 6px;
    line-height: 12px;
    background-color: ${theme.colors.white};
  }

  .left-icon {
    position: absolute;
    left: 16px;
    top: 16px;
    color: ${theme.colors.n50};
  }
  .right-icon {
    position: absolute;
    right: 16px;
    pointer-events: none;
    z-index: 0;
    top: 16px;
    color: ${theme.colors.n50};
  }

  .right-icon--disabled {
    opacity: 0.38;
  }

  .SingleDatePicker_picker,
  .SingleDatePicker_picker__portal {
    z-index: 99999;
  }

  .CalendarMonthGrid,
  .CalendarMonth,
  .DayPicker,
  .CalendarDay__blocked_out_of_range,
  .CalendarDay__default,
  .CalendarDay__default_2 {
    z-index: 1;
    background: ${theme.colors.neutral} !important;
    background-color: ${theme.colors.white} !important ;
    border: none !important;
    outline: 0;
  }

  .CalendarDay__default:hover {
    background: ${theme.colors.n10} !important;
    border-radius: 100%;
  }

  .SingleDatePicker,
  .SingleDatePicker__withBorder {
    width: 100% !important;
    border-radius: 3px;
  }

  .DateInput_input__focused {
    border-color: ${theme.palette.primary.main};
  }

  .DateInput_input {
    padding: 18px 18px 14px;
    font-size: 16px;
    font-weight: 400;
    border: 0 !important;
    box-sizing: border-box;
    z-index: 1;
    line-height: 20px;
    color: ${theme.colors.black};
    cursor: pointer;
  }

  .DateInput {
    width: 100% !important;
  }

  .DateInput:first-of-type {
    .DateInput_input {
      padding-left: 16px;
    }
  }

  .SingleDatePickerInput {
    width: 100%;
  }

  .SingleDatePickerInput,
  .SingleDatePickerInput_withBorder {
    border-radius: 4px;
    overflow: hidden;
    border: ${p => (p.isValid ? '1px' : '2px')} solid
      ${p => (p.isValid ? theme.colors.tabBorderGray : theme.colors.errorColor)} !important;
  }

  &:hover {
    .SingleDatePickerInput,
    .SingleDatePickerInput_withBorder {
      border: ${p => (p.isValid ? '1px' : '2px')} solid
        ${p => (p.isValid ? theme.colors.tabBorderGray : theme.colors.errorColor)} !important;
    }
  }

  .CalendarDay__selected_span {
    color: ${theme.colors.white};
    font-size: 13.75px;
    font-weight: 600;
    letter-spacing: 1.25px;
    line-height: 12px;
    text-align: center;
    position: relative;
    z-index: 999;
  }

  .CalendarDay__selected:hover {
    color: ${theme.colors.white};
    outline: none;
  }

  td.CalendarDay__selected {
    color: ${theme.colors.white};
    font-size: 13.75px;
    font-weight: 600;
    letter-spacing: 1.25px;
    line-height: 16px;
    text-align: center;
    position: relative;
    cursor: pointer;
    outline: none;
  }

  /*  week header */
  .CalendarMonth_caption {
    text-transform: capitalize;
  }
  .DayPicker_weekHeader {
    text-transform: uppercase;
  }

  .DayPicker_weekHeader,
  .CalendarMonth_caption {
    color: #111115;
    font-size: '18px';
    font-weight: '600';
    letter-spacing: '1.64px';
    line-height: '16px';
    text-align: center;
  }

  .CalendarDay__selected_span::before {
    display: block;
    position: absolute;
    content: '';
    width: 100%;
    height: 30px;
    background: ${theme.palette.primary.light} !important;
    left: 0;
    top: 4px;
    z-index: -1;
  }

  .DayPickerKeyboardShortcuts_show__bottomRight {
    display: none;
  }

  /* Start selected day */

  .CalendarDay__selected:after {
    display: block;
    position: absolute;
    content: '';
    width: 30px;
    height: 30px;
    left: 4px;
    top: 4px;
    z-index: -1;
    border-radius: 50%;
    background: ${theme.palette.primary.main} !important;
  }
  .date_picker_container_disabled {
    pointer-events: none;
  }
  .DateInput__disabled {
    background: ${theme.colors.white};
    .right-icon {
      opacity: 0.38;
    }
  }
  .DateInput_input__disabled {
    pointer-events: none;
    background: ${theme.colors.white};
    font-style: normal;
    opacity: 0.38;
  }
`
