import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

import theme from 'components/Theme'

export const modalStyles = makeStyles(theme => ({
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
      maxWidth: 450,
      overflowX: 'hidden',
      width: 450,
      [theme.breakpoints.down('xs')]: {
        width: '93%',
        margin: 12,
      },
    },
  },
}))

export const ModalContainer = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;

  p {
    margin: 20px 0px;
  }

  button {
    width: 100%;
    border-radius: 4px;
    margin: 20px 0px 12px;

    img {
      opacity: ${({ isConnecting }) => (isConnecting ? '0.3' : 1)};
    }
  }
`

export const ErrorWrapper = styled.div`
  button {
    background-color: ${theme.colors.errorColor};
    :hover {
      background-color: ${theme.colors.darkRed};
    }
  }
`

export const BNBWrapper = styled.div`
  background-color: ${theme.colors.n10};
  border: 1px solid ${theme.colors.n30};
  border-radius: 8px;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  ${props => props.theme.breakpoints.down('xs')} {
    display: none;
  }

  span {
    margin-left: 8px;
  }
`
