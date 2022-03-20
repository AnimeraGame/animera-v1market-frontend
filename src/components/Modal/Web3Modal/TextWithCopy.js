import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined'
import { IconButton } from '@material-ui/core'

import { Body1, Body2, FontWeights } from 'components/Typography'
import theme from 'components/Theme'

const ListItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 12px 12px 8px 12px;
  border-bottom: 1px solid ${theme.colors.n50};
  position: relative;
`

const Labels = styled.div`
  display: flex;
  flex-flow: column wrap;
`

const CopiedText = styled.div`
  position: absolute;
  bottom: 0;
  right: 10px;
  color: ${theme.colors.primaryColor};
`

const TextWithCopy = ({ label = '', title = '', textToCopy = 'copied' }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 500)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  return (
    <ListItem>
      <Labels>
        <Body2>{label}</Body2>
        <Body1>{title}</Body1>
      </Labels>
      <CopyToClipboard text={textToCopy} onCopy={() => setCopied(true)}>
        <IconButton disabled={copied}>
          <FileCopyOutlinedIcon fontSize="small" />
        </IconButton>
      </CopyToClipboard>
      {copied ? (
        <CopiedText>
          <Body2 fontWeight={FontWeights.medium}>Copied</Body2>
        </CopiedText>
      ) : null}
    </ListItem>
  )
}

TextWithCopy.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  textToCopy: PropTypes.string,
}

export default TextWithCopy
