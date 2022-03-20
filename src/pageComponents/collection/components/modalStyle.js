import { makeStyles } from '@material-ui/core/styles'
import styled, { css } from 'styled-components'

import theme from 'components/Theme'

export const modalStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialogContent-root': {
      padding: '0px',
      overflow: 'visible',
    },
    '& .MuiOutlinedInput-root': {
      minHeight: 54,
      maxHeight: 54,
    },
    '& .MuiOutlinedInput-multiline': {
      maxHeight: 'unset',
    },
    '& .MuiDialog-paperScrollPaper': {
      maxWidth: 750,
      overflow: 'visible',
      minHeight: 300,
      width: 750,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        margin: 16,
      },
    },
    '& .header': {
      borderBottom: 'none',
      padding: '20px 32px 0px',
      [theme.breakpoints.down('xs')]: {
        padding: '16px 16px 0px',
      },
      '& .MuiIconButton-root': {
        border: `1px solid ${theme.core.colors.n20}`,
        backgroundColor: theme.core.colors.white,
        padding: 6,
        '&:hover': {
          backgroundColor: theme.core.colors.n10,
        },
      },
    },
    '& .MuiDialogTitle-root': {
      flexFlow: 'row wrap',
      padding: '15px 16px 15px 0px',
      '& .MuiTypography-h6': {
        fontSize: 24,
        lineHeight: '28px',
      },
    },
  },
}))

export const ModalContainer = styled.div`
  width: 100%;
  padding: 0px 32px 20px;
  display: flex;
  flex-direction: column;

  ${props => props.theme.breakpoints.down('xs')} {
    padding: 16px;
  }
`

export const common = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-flow: row nowrap;
  width: 100%;
  ${props => props.theme.breakpoints.down('sm')} {
    flex-wrap: wrap;
  }
`

export const HistoryContainer = styled.div`
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

export const TabPanel = styled.div`
  padding: 20px 0px 12px;
  display: flex;
  align-items: center;
  min-height: 350px;
  flex-flow: column nowrap;

  ${props => props.theme.breakpoints.down('xs')} {
    padding: 0px;
  }

  .body {
    padding-bottom: 20px;
    width: 100%;
  }

  .connect-error {
    color: ${theme.colors.errorColor};
  }

  .row {
    ${common};
    margin: 16px 0px 32px;
    position: relative;

    .label {
      padding-right: 20px;
    }
    .error {
      color: ${theme.colors.errorColor};
      position: absolute;
      bottom: -20px;
      right: 0px;
    }
  }

  .fees {
    ${common};
    margin: 8px 0px;
    .label {
      padding-right: 20px;
      color: ${theme.colors.n50};
    }
  }
  .set-price-error {
    color: ${theme.colors.errorColor};
    margin-top: 16px;
  }

  .org-fee {
    border-bottom: 2px solid ${theme.colors.n30};
  }

  .org-fee-label {
    padding-bottom: 8px;
  }

  .input-box {
    position: relative;
    max-width: 220px;
    margin-left: auto;

    ${props => props.theme.breakpoints.down('sm')} {
      max-width: 100%;
      width: 100%;
      margin-top: 12px;
    }
  }

  .date-picker {
    margin-left: auto;
    ${props => props.theme.breakpoints.down('sm')} {
      padding-top: 12px;
    }
    .SingleDatePicker {
      min-width: 220px;

      ${props => props.theme.breakpoints.down('sm')} {
        min-width: 100%;
      }

      input {
        background-color: ${theme.colors.n10};
      }
    }
    .SingleDatePickerInput__withBorder {
      border: none !important;
      border-radius: 10px;
      background-color: ${theme.colors.n10};
    }
  }

  .footer {
    width: 100%;
    margin: auto 0px 0px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;

    ${props => props.theme.breakpoints.down('xs')} {
      flex-direction: column;
    }

    button {
      min-width: 150px;
      ${props => props.theme.breakpoints.down('xs')} {
        width: 100%;
        min-width: 70px;
      }
    }
    .MuiButton-contained {
      margin-right: 0px;
      ${props => props.theme.breakpoints.down('xs')} {
        width: 100%;
        order: -1;
        margin: 8px 0px;
      }
    }
    .MuiButton-text {
      margin-right: auto;
      margin-left: 0px;
      :hover {
        background-color: ${theme.colors.lightRed};
      }
      ${props => props.theme.breakpoints.down('xs')} {
        width: 100%;
        order: 3;
      }
    }
  }
`

export const TabContainer = styled.div`
  width: 100%;
  .tabs-container {
    max-width: 326px;
  }
`
