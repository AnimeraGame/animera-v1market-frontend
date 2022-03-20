import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import includes from 'lodash/includes'

// local imports
import { Body1, FontWeights } from 'components/Typography'
import ModalHoc from '../ModalHoc'
import theme from 'components/Theme'
import TextWithCopy from './TextWithCopy'
import { testnetInstructions, mainnetInstructions, supportedNetworkIds } from './config'

const modalStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialogContent-root': {
      padding: '0px',
    },
    '& .MuiOutlinedInput-root': {
      minHeight: 54,
      maxHeight: 54,
    },
    '& .MuiOutlinedInput-multiline': {
      maxHeight: 'unset',
    },
    '& .MuiDialog-paperScrollPaper': {
      maxWidth: 650,
      overflowX: 'hidden',
      width: 600,
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
  },
}))

const ModalContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .list {
    display: flex;
    width: 100%;
    flex-flow: column nowrap;
    margin-bottom: 12px;
  }
`

const InfoHeader = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 8px;
  background-color: ${theme.colors.primaryColorHover};

  .instruction {
    padding: 0px 2px;
    display: inline-flex;

    svg {
      padding-left: 2px;
    }
  }
`

const options = includes(supportedNetworkIds, 97) ? testnetInstructions : mainnetInstructions

const WrongNetworkModal = ({ open, onClose, isMetaMaskAvailable }) => {
  // hooks
  const { t } = useTranslation('common')
  const classes = modalStyles()

  return (
    <ModalHoc classes={classes} openModal={open} onClose={onClose} title={t('wrongNetwork')}>
      <ModalContainer>
        {isMetaMaskAvailable ? (
          <>
            <InfoHeader>
              <Body1 fontWeight={FontWeights.regular}>{t('wrongNetworkWarning')}</Body1>
              <Body1 fontWeight={FontWeights.regular}>
                {t('goTo')}
                <span className="instruction">
                  <b>{t('metaMask')}</b> <ArrowForwardIcon fontSize="small" />
                </span>
                <span className="instruction">
                  <b>{t('settings')}</b> <ArrowForwardIcon fontSize="small" />
                </span>
                <span className="instruction">
                  <b>{t('networks')}</b>
                </span>
                {t('copyTheSettings')}
              </Body1>
            </InfoHeader>
            <div className="list">
              {options.map(option => (
                <TextWithCopy
                  key={option.label}
                  label={t(option.label)}
                  title={option.title}
                  textToCopy={option.textToCopy}
                />
              ))}
            </div>
          </>
        ) : (
          <InfoHeader>
            <Body1 fontWeight={FontWeights.regular}>{t('wrongNetworkWarningWallet')}</Body1>
          </InfoHeader>
        )}
      </ModalContainer>
    </ModalHoc>
  )
}

WrongNetworkModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  isMetaMaskAvailable: PropTypes.bool,
}

export default WrongNetworkModal
