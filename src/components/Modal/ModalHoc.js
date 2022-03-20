import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { IconButton, Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import theme from 'components/Theme'

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  text-align: left;
  position: relative;
  /* .MuiOutlinedInput-root {
    max-height: 42px;
    min-height: 42px;
  } */
  .MuiTableCell-stickyHeader {
    background: ${theme.colors.white};
  }
`

const ModalHeader = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${theme.colors.borderColor};
  justify-content: space-between;
  align-items: center;
  .title {
    font-size: 18px;
  }
  .MuiDialogTitle-root {
    padding: 15px 32px 15px 20px;
    width: auto;
  }
  /* .close {
    border: none;
    position: absolute;
    right: 0px;
    top: 0px;
  } */
`

const ModalHoc = ({
  openModal,
  fullWidth,
  width,
  scroll,
  onClose,
  title,
  children,
  actions,
  classes,
  disableBackdropClick = false,
  disableEscapeKeyDown = false,
  disableCloseIcon = false,
}) => (
  <Dialog
    classes={classes}
    fullWidth={fullWidth}
    keepMounted
    maxWidth="md"
    disableBackdropClick={disableBackdropClick}
    disableEscapeKeyDown={disableEscapeKeyDown}
    width={width}
    open={openModal}
    onClose={onClose}
    aria-labelledby="modal-title"
    aria-describedby="modal-description">
    <ModalHeader className="header">
      <DialogTitle id="modal-title">{title}</DialogTitle>
      <IconButton
        disabled={disableCloseIcon}
        onClick={onClose}
        data-tc="close-popup"
        className="close">
        <CloseOutlined />
      </IconButton>
    </ModalHeader>
    <MainSection id="modal-description">
      <DialogContent dividers={scroll === 'paper'}>{children}</DialogContent>
    </MainSection>
    {actions && actions.length && (
      <DialogActions>
        {actions.map(button => {
          return button
        })}
      </DialogActions>
    )}
  </Dialog>
)

ModalHoc.propTypes = {
  children: PropTypes.oneOfType([PropTypes.shape(), PropTypes.array]),
  openModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  fullWidth: PropTypes.bool,
  classes: PropTypes.shape(),
  disableBackdropClick: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  disableCloseIcon: PropTypes.bool,
}

export default ModalHoc
