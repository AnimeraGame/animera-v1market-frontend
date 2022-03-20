import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import useTranslation from 'next-translate/useTranslation'
import InboxIcon from '@material-ui/icons/Inbox'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

import { Body1 } from 'components/Typography/index'
import theme from 'components/Theme/index'

const Container = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  background: ${theme.colors.white};
  box-shadow: ${({ shadow }) => (shadow ? theme.colors.cardShadow : 'none')};
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  .inner_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      margin-bottom: 20px;
      color: ${theme.colors.n40};
      height: 64px;
      width: 64px;
    }
  }
`

const Placeholder = ({ type, message, className = '', showShadow = true }) => {
  const { t } = useTranslation('common')
  return (
    <Container shadow={showShadow}>
      <div className={`inner_container ${className}`}>
        {type === 'error' && <ErrorOutlineIcon />}
        {type === 'empty' && <InboxIcon />}
        <Body1>
          {type === 'error' && (message || t('technicalError'))}
          {type === 'empty' && (message || t('noData'))}
        </Body1>
      </div>
    </Container>
  )
}

Placeholder.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  showShadow: PropTypes.bool,
  className: PropTypes.string,
}

export default Placeholder
