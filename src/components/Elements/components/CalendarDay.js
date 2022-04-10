import PropTypes from 'prop-types'
import styled from 'styled-components'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { Event } from '@material-ui/icons'
import moment from 'moment'
import find from 'lodash/find'
import filter from 'lodash/filter'

import Tooltip from 'components/Tooltip'
import theme from 'components/Theme'

const Day = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: ${props => (props.withEvent ? `1px solid ${theme.colors.green}` : 'none')};
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  margin-left: 2px;
  &:hover {
    background: ${theme.colors.red};
  }
`

const Dot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 18px;
  left: -5px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${theme.colors.yellow};

  div {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background-color: ${theme.colors.n70};
  }
`

const Events = styled.div`
  display: flex;
  flex-direction: column;
`

const CalendarDay = ({ day, events, blockedDates }) => {
  const isDayBlocked =
    blockedDates && find(blockedDates, d => moment(d, 'YYYY-MM-DD').isSame(day, 'day'))
  const isEventDay =
    events &&
    find(
      events.map(e => e.timeOrDuration.at),
      d => moment(d, 'YYYY-MM-DD').isSame(day, 'day')
    )

  const todayEvents = events
    ? filter(events, e => moment(e.timeOrDuration.at, 'YYYY-MM-DD').isSame(day, 'day'))
    : []

  const renderInnerDay = () =>
    isDayBlocked ? (
      <>
        {day.format('D')}
        <Dot>
          <div />
        </Dot>
      </>
    ) : (
      day.format('D')
    )

  return isEventDay ? (
    <Tooltip
      width={600}
      text={
        <Events>
          {todayEvents.map((e, i) => {
            return (
              <ListItem divider={i < todayEvents.length - 1} key={e.title}>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText
                  primary={`${e.timeOrDuration.formattedSummary} - ${e.title}`}
                  secondary={e.location.title}></ListItemText>
              </ListItem>
            )
          })}
        </Events>
      }>
      <Day withEvent>{renderInnerDay()}</Day>
    </Tooltip>
  ) : (
    <Day>{renderInnerDay()}</Day>
  )
}

CalendarDay.propTypes = {
  day: PropTypes.object,
  events: PropTypes.array,
  blockedDates: PropTypes.array,
}

export default CalendarDay
