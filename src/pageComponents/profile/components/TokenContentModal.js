import { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import get from 'lodash/get'
import { Link } from '@material-ui/core'

import { FontWeights, Body1, Body2 } from 'components/Typography'
import ModalHoc from 'components/Modal/ModalHoc'
import { modalStyles } from './modalStyle'
import History from './TransactionHistory'
import Tabs from 'components/Tabs'
import theme from 'components/Theme'

const ModalContainer = styled.div`
  width: 100%;
  padding: 0px 32px 20px;
  display: flex;
  flex-direction: column;

  ${props => props.theme.breakpoints.down('xs')} {
    padding: 16px;
  }
`

const HistoryContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-flow: column nowrap;

  .MuiTab-root {
    width: 50%;
  }

  .history-label {
    width: 100%;
    margin-bottom: 12px;
  }
`

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  flex-flow: column nowrap;

  a {
    margin: 16px 0px;
    color: ${theme.colors.blue};
    font-size: 16px;
    line-height: 22px;
  }

  ul {
    margin: 12px 0px;
    width: 100%;
    padding: 0px 32px 0px 16px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row wrap;
    margin-bottom: 8px;
  }
`

const TabPanel = styled.div`
  padding: 20px 0px 12px;
  display: flex;
  align-items: center;
  min-height: 350px;
  flex-flow: column nowrap;
`

const TokenContentModal = ({ t, isOpen, onClose, tokenData, modalType }) => {
  // hooks
  const classes = modalStyles()
  const [activeTab, setActiveTab] = useState(0)

  const handleTabChange = value => {
    setActiveTab(value)
  }

  return (
    <ModalHoc
      disableBackdropClick
      classes={classes}
      openModal={isOpen}
      onClose={onClose}
      title={modalType === 'HISTORY' ? t('history') : t('exclusiveContent')}>
      <ModalContainer>
        {modalType === 'HISTORY' ? (
          <HistoryContainer>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              tabs={[t('history'), t('bids')]}>
              <TabPanel>
                <div className="history-label">
                  <Body1 fontWeight={FontWeights.regular}>{t('historyLabel')}</Body1>
                </div>
                <History t={t} list={get(tokenData, 'transactions', [])} />
              </TabPanel>
              <TabPanel>
                <Body1 fontWeight={FontWeights.regular}>{t('noBidsYet')}</Body1>
              </TabPanel>
            </Tabs>
          </HistoryContainer>
        ) : (
          <Content>
            <Body2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis condimentum lacus
              nec laoreet. Maecenas <b>purus diam, iaculis quis malesuada et,</b> congue ut odio. Ut
              quam augue, tempor at vulputate et, tincidunt nec nibh.
            </Body2>
            <Link href="#">Some link details</Link>
            <ul>
              <li>
                <Body1 fontWeight={FontWeights.regular}>&#8226; Item 1</Body1>
                <Body1 fontWeight={FontWeights.medium}>Value 1</Body1>
              </li>
              <li>
                <Body1 fontWeight={FontWeights.regular}> &#8226; Item 2</Body1>
                <Body1 fontWeight={FontWeights.medium}>Value 2</Body1>
              </li>
            </ul>
            <Body2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In iaculis condimentum lacus
              nec laoreet. Maecenas purus diam, <b>iaculis quis malesuada et,</b> congue ut odio. Ut
              quam augue, tempor at <b>vulputate et, tincidunt nec nibh.</b>
            </Body2>
          </Content>
        )}
      </ModalContainer>
    </ModalHoc>
  )
}

TokenContentModal.propTypes = {
  t: PropTypes.func,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  tokenData: PropTypes.object,
  modalType: PropTypes.string,
}

export default TokenContentModal
