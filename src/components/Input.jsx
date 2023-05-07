import React from 'react'
import PropTypes from 'prop-types'

import * as styles from '@styles/input.module.css'

function Input({ header, min, max, setFunction, variable }) {
  const [internalVariable, setInternalVariable] = React.useState(variable)
  const handleChange = (event) => {
    setFunction(Number(event.target.value))
    setInternalVariable(Number(event.target.value))
  }

  return (
    <div className={styles.container}>
      <label>
        {`${header}=`}
        <input
          type="number"
          value={variable || null}
          onChange={handleChange}
          disabled={false}
        />
        <br />
        {internalVariable < min && `min=${min}`}
        {internalVariable > max && `max=${max}`}
      </label>
    </div>
  )
}

Input.propTypes = {
  header: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  setFunction: PropTypes.func.isRequired,
  variable: PropTypes.number.isRequired,
}

export default Input
