import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import IconButton from '@material-ui/core/IconButton'
import TableRow from '@material-ui/core/TableRow'
import Table from '@material-ui/core/Table'
import styled from 'styled-components'
import TimeAgo from 'react-timeago'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import includes from 'lodash/includes'
import toLower from 'lodash/toLower'
import isEmpty from 'lodash/isEmpty'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'

import theme from 'components/Theme/index'
import { H4, FontWeights, Body2 } from 'components/Typography'
import { extractFirstLastChars, isSubstring } from 'lib/util/stringUtil'

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-flow: column nowrap;
  max-width: 900px;
  color: ${theme.colors.n10};
  margin: 16px auto 0px;

  .trading-header {
    margin-bottom: 20px;
  }
  ${props => props.theme.breakpoints.down('xs')} {
    padding: 0px 12px;
  }
`

const StyledTable = styled(Table)`
  color: ${theme.colors.n10};
  .MuiTableRow-head {
    border-bottom: 2px solid ${theme.colors.n80};
    border-top: 2px solid ${theme.colors.n80};
    .MuiTableCell-head {
      font-size: 16px;
      padding-top: 4px;
      padding-bottom: 4px;
    }
  }
  th,
  td {
    color: ${theme.colors.n10};
  }

  ${props => props.theme.breakpoints.down('xs')} {
    .MuiTableCell-root {
      padding: 8px 12px;
    }
  }
  .svg-icon {
    padding: 4px;
    color: ${theme.colors.primaryColor};
    :hover {
      background-color: ${theme.colors.n70};
    }
  }
  .MuiIconButton-root.Mui-disabled {
    color: ${theme.colors.n60};
  }
  .copy-icon {
    padding: 4px;
    margin-left: 4px;
    color: ${theme.colors.n10};
    :hover {
      background-color: ${theme.colors.n70};
    }
  }
  .wallet-address {
    display: flex;
    align-items: center;
    position: relative;
  }
`
const CopiedText = styled.div`
  position: absolute;
  top: -15px;
  right: 30%;
  color: ${theme.colors.primaryColor};
`

const getLabel = text => {
	const isCreated = isSubstring(text, 'create')
	const isMinted = isSubstring(text, 'mint')
	const isPurchased = isSubstring(text, 'buy')
	if (isCreated) return 'Listed'
	if (isMinted) return 'Minted'
	if (isPurchased) return 'Purchased'
}

const HistoryTable = ({ histories, t }) => {
	const [copied, setCopied] = useState({})

	useEffect(() => {
		if (!isEmpty(copied)) {
			const timeout = setTimeout(() => setCopied({}), 500)
			return () => clearTimeout(timeout)
		}
	}, [copied])

	return (
		<Container>
			<H4 className="trading-header">{t('tradingHistory')}</H4>
			<TableContainer component="div">
				<StyledTable aria-label="Trading History of the NFT">
					<TableHead>
						<TableRow>
							<TableCell component="th">Token Id</TableCell>
							<TableCell component="th">{t('price')}</TableCell>
							<TableCell component="th">{t('from')}</TableCell>
							<TableCell component="th">{t('to')}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{histories.map((item, index) => (
							<TableRow key={index} >
								<TableCell>{item.tokenId}</TableCell>
								<TableCell className="price">
									<div style={{ whiteSpace: 'nowrap' }}>
										{item.price ? item.price + ' BNB ' : ''}
									</div>
								</TableCell>
								<TableCell className="from-address">
									<div className="wallet-address" title={item.from}>
										{extractFirstLastChars(item.from)}
										<CopyToClipboard
											text={item.from}
											onCopy={() =>
												setCopied({
													type: 'from',
													index,
												})
											}>
											<IconButton className="copy-icon" disabled={!isEmpty(copied)}>
												<FileCopyOutlinedIcon fontSize="small" />
											</IconButton>
										</CopyToClipboard>
										{copied?.index === index && copied?.type === 'from' ? (
											<CopiedText>
												<Body2 fontWeight={FontWeights.medium}>{t('copied')}</Body2>
											</CopiedText>
										) : null}
									</div>
								</TableCell>
								<TableCell className="to-address">
									{/* {getLabel(item.transactionType) === 'Purchased' ? ( */}
									<div className="wallet-address" title={item.to}>
										{extractFirstLastChars(item.to)}
										<CopyToClipboard
											text={item.to}
											onCopy={() =>
												setCopied({
													type: 'to',
													index,
												})
											}>
											<IconButton className="copy-icon" disabled={!isEmpty(copied)}>
												<FileCopyOutlinedIcon fontSize="small" />
											</IconButton>
										</CopyToClipboard>
										{copied?.index === index && copied?.type === 'to' ? (
											<CopiedText>
												<Body2 fontWeight={FontWeights.medium}>{t('copied')}</Body2>
											</CopiedText>
										) : null}
									</div>
									{/* ) : (
                    ''
                  )} */}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</StyledTable>
			</TableContainer>
		</Container >
	)
}

HistoryTable.propTypes = {
	histories: PropTypes.array,
	t: PropTypes.func,
}

export default HistoryTable
