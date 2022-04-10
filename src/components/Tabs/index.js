import { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MaterialTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import isArray from 'lodash/isArray'
import flatten from 'lodash/flatten'

import theme from 'components/Theme'

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;

  .MuiTabs-fixed {
    overflow: unset !important;
  }
  .MuiTab-textColorPrimary {
    color: ${theme.colors.black};
  }

  .MuiTabs-indicator {
    bottom: -1px;
    height: 3px;
    z-index: 1;
  }
`

const Tabs = ({
  onChange,
  indicatorColor = 'primary',
  className,
  tabs,
  tabClassName,
  children,
  swipeable,
  value = null,
  variant = 'fullWidth',
  keepMounted,
  a11yProps,
  textColor = 'primary',
}) => {
  const [currentValue, setCurrentValue] = useState(value || 0)
  useEffect(() => {
    if (value !== null) {
      setCurrentValue(value)
    }
  }, [value])

  const handleChange = (event, newValue) => {
    if (onChange) {
      onChange(newValue)
    } else {
      setCurrentValue(newValue)
    }
  }
  const childTabs = isArray(children) ? flatten(children) : [children]

  return (
    <Container>
      <MaterialTabs
        value={currentValue}
        onChange={handleChange}
        indicatorColor={indicatorColor}
        textColor={textColor}
        variant={variant}
        className={className}>
        {tabs.map((t, index) => (
          <Tab
            key={index}
            label={t}
            className={tabClassName}
            data-tc={`tab-${t}`}
            {...() => a11yProps(index)}
          />
        ))}
      </MaterialTabs>
      {keepMounted
        ? childTabs.map((tab, index) => (
            <div key={tabs[index]} style={{ display: index === currentValue ? 'block' : 'none' }}>
              {tab}
            </div>
          ))
        : childTabs[currentValue]}
    </Container>
  )
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  indicatorColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  textColor: PropTypes.string,
  tabClassName: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number,
  variant: PropTypes.oneOf(['standard', 'fullWidth', 'scrollable']),
  keepMounted: PropTypes.bool,
  a11yProps: PropTypes.func,
}

export default Tabs
