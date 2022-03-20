import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import PropTypes from 'prop-types'
import LaunchIcon from '@material-ui/icons/Launch'
import toLower from 'lodash/toLower'
import includes from 'lodash/includes'
import get from 'lodash/get'
import dayjs from 'dayjs'

import Identicon from 'components/Elements/Identicon'
import { Body1, Body2, FontWeights } from 'components/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 750,
    display: 'flex',
    width: '100%',
    '& .blockie': {
      borderRadius: '50%',
      maxWidth: 48,
      maxHeight: 48,
      marginRight: 12,
    },
  },
  listItem: {
    borderBottom: `1px solid ${theme.core.colors.n30}`,
    marginBottom: 8,
  },
  linkIcon: {
    padding: 4,
    marginLeft: 8,
  },
}))

const History = ({ list, t }) => {
  const classes = useStyles()

  const getChain = item => get(item, 'chain', '')
  const getTransactionAddress = item => get(item, 'transactionHash', '')

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.demo}>
            <List>
              {list.map(item => (
                <ListItem key={item.transactionHash} classes={{ root: classes.listItem }}>
                  <ListItemAvatar>
                    <Identicon
                      size={8}
                      scale={8}
                      address={item.toWalletContract}
                      className="blockie"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Body1 component="span" fontWeight={FontWeights.medium}>
                        {'Listed for 500 zbnb'}
                      </Body1>
                    }
                    secondary={
                      <Body2 fontWeight={FontWeights.medium} component="span">
                        {dayjs(item.datetime).format('MMM DD, YYYY hh:mm A')}
                        <Link
                          href={
                            includes(toLower(getChain(item)), 'testnet')
                              ? `https://testnet.bscscan.com/tx/${getTransactionAddress(item)}`
                              : `https://bscscan.com/tx/${getTransactionAddress(item)}`
                          }
                          target="_blank"
                          rel="noopener">
                          <IconButton className={classes.linkIcon}>
                            <LaunchIcon fontSize="small" />
                          </IconButton>
                        </Link>
                      </Body2>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

History.propTypes = {
  t: PropTypes.func,
  list: PropTypes.array,
}

export default History
