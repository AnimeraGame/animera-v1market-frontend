import { TextField } from '@material-ui/core'
import { Field, getIn } from 'formik'
import PropTypes from 'prop-types'
import React from 'react'
import has from 'lodash/has'
import ExpandIcon from '@material-ui/icons/ExpandMore'
import { StyledErrorMessage, SFormHelperText, SFormControl } from './styles'

const CustomTextField = ({
  t,
  id,
  label,
  helperText,
  children,
  disabled,
  onChange,
  type = 'text',
  notRequired = false,
  fullWidth = false,
  multiline = false,
  placeholder = null,
  size = 'medium',
  InputProps,
  inputProps,
  noLabel = false,
  parentId = null,
  ...rest
}) => {
  const handleChange = formikOnChange => e => {
    if (onChange) {
      onChange(e)
    }
    formikOnChange(e)
  }
  return (
    <Field name={id}>
      {({ field: { value, onChange, onBlur }, form: { errors, touched } }) => (
        <SFormControl fullWidth={fullWidth}>
          <TextField
            select={!!children}
            error={has(errors, id) && has(touched, parentId || id)}
            id={id}
            name={id}
            value={value}
            onChange={handleChange(onChange)}
            onBlur={onBlur}
            color="primary"
            fullWidth
            margin="normal"
            multiline={multiline}
            rows={4}
            label={!noLabel && `${label || t(`placeholder.${id}`)}`}
            variant="outlined"
            type={type}
            inputProps={inputProps}
            placeholder={placeholder}
            disabled={disabled}
            size={size}
            InputProps={InputProps}
            InputLabelProps={
              type === 'number' || placeholder
                ? {
                    shrink: true,
                  }
                : null
            }
            SelectProps={{
              IconComponent: ExpandIcon,
            }}
            {...rest}>
            {children}
          </TextField>
          {helperText && <SFormHelperText>{helperText}</SFormHelperText>}
          {has(errors, id) && has(touched, parentId || id) && (
            <StyledErrorMessage className={'validation-error'}>
              {getIn(errors, id)}
            </StyledErrorMessage>
          )}
        </SFormControl>
      )}
    </Field>
  )
}

CustomTextField.propTypes = {
  t: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  helperText: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  notRequired: PropTypes.bool,
  fullWidth: PropTypes.bool,
  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  inputProps: PropTypes.object,
  InputProps: PropTypes.object,
  size: PropTypes.string,
  noLabel: PropTypes.bool,
}

export default CustomTextField
