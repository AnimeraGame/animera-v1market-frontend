import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import PropTypes from 'prop-types'
import InputAdornment from '@material-ui/core/InputAdornment'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  root: {
    // padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
    position: 'relative',
    marginRight: 12,
    '& .MuiOutlinedInput-root': {
      minHeight: 56,
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginRight: 0,
    },
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  progress: {
    position: 'absolute',
    left: '45%',
  },
}))

const SearchInput = ({
  searchText = '',
  placeholder = 'Search',
  onChange = null,
  onEnter = null,
  onSearchClick = null,
  onClearClick = () => {},
  searching = false,
}) => {
  const [value, setValue] = useState(searchText)
  const classes = useStyles()

  useEffect(() => {
    setValue(searchText)
  }, [searchText])

  const handleEnterKey = e => {
    const isEnterPressed = e.key === 'Enter'
    if (isEnterPressed && onChange) {
      onChange(value)
    }
  }
  const handleClearIcon = () => {
    if (onClearClick) onClearClick('')
    setValue('')
  }

  return (
    <TextField
      className={clsx(classes.input, classes.root)}
      placeholder={placeholder}
      onChange={e => setValue(e.target.value)}
      inputProps={{ 'aria-label': placeholder }}
      value={value}
      onKeyPress={handleEnterKey}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="start">
            <ClearIcon
              style={{ cursor: 'pointer', visibility: value.length ? 'visible' : 'hidden' }}
              disabled={searching || !value.length}
              onClick={handleClearIcon}
            />
          </InputAdornment>
        ),
        readOnly: !!searching,
      }}
    />
  )
}

SearchInput.propTypes = {
  searchText: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onEnter: PropTypes.func,
  onSearchClick: PropTypes.func,
  onClearClick: PropTypes.func,
  searching: PropTypes.bool,
}

export default SearchInput
