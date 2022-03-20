import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ModalHoc from 'components/Modal/ModalHoc'
import { filterModalStyles } from './modalStyles'

const ModalContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 300px;

  ${props => props.theme.breakpoints.down('xs')} {
    padding: 16px;
  }
`

const FiltersModalHoc = ({ t, isOpen, onClose, children }) => {
  // hooks
  const classes = filterModalStyles()

  return (
    <ModalHoc
      disableBackdropClick
      classes={classes}
      openModal={isOpen}
      onClose={onClose}
      title={t('filters')}>
      <ModalContainer>{children}</ModalContainer>
    </ModalHoc>
  )
}

FiltersModalHoc.propTypes = {
  t: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
}

export default FiltersModalHoc
