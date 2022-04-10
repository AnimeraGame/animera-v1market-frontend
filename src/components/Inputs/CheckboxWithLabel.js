import PropTypes from 'prop-types'
import { FormControlLabel, Checkbox } from '@material-ui/core'

const CheckboxWithLabel = ({ item, handleChange, label, disabled, color = 'secondary' }) => {
  return (
    <>
      <FormControlLabel
        key={item.id}
        control={
          <Checkbox
            onChange={handleChange}
            checked={item.checked}
            color={color}
            name={item.title}
            disabled={disabled}
          />
        }
        label={label}
      />
    </>
  )
}

CheckboxWithLabel.propTypes = {
  item: PropTypes.object, // item will contain the properties to show in the checkbox
  handleChange: PropTypes.func, // onChange function for the checkbox state
  label: PropTypes.object, // label of the checkbox
  disabled: PropTypes.bool, // disabled state of the checkbox
  color: PropTypes.oneOf(['default', 'primary', 'secondary']), // will be used to color the checkbox
}

export default CheckboxWithLabel
