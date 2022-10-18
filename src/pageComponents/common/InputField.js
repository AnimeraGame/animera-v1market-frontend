import PropTypes from 'prop-types'
import styled from 'styled-components'

import theme from 'components/Theme'

const Input = styled.div`
  input {
    background-color: ${theme.colors.n10};
    padding: 0px 60px 0px 14px;
    border-radius: 10px;
    overflow: hidden;
    border: none;
    outline: none;
    height: 54px;
    max-width: 250px;
    min-width: 220px;
    color: ${({ error }) => (error ? theme.colors.errorColor : 'currentColor')};

    ${props => props.theme.breakpoints.down('sm')} {
      max-width: 100%;
      width: 100%;
    }

    :focus,
    :active {
      background-color: ${theme.colors.n10};
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const InputField = ({
  t,
  value,
  onChange,
  className,
  inputType = 'text',
  error,
  ...rest
}) => {
  return (
    <Input className={className} error={error}>
      <input type={inputType} value={value} onChange={onChange} {...rest} />
    </Input>
  )
}

InputField.propTypes = {
  t: PropTypes.func,
  error: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  inputType: PropTypes.string,
  onChange: PropTypes.func,
}

export default InputField
