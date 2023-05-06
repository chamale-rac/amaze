import React, { useState } from 'react'
import PropTypes from 'prop-types'

import * as styles from '@styles/input.module.css'

function Input({ header, min, max }) {
  const [value, setValue] = useState('')

  const handleInputChange = (e) => {
    let newValue = e.target.value
    if (newValue < min) {
      newValue = 'min'
    }
    if (newValue > max) {
      newValue = 'max'
    }
    setValue(newValue)
  }

  return (
    <div className={styles.container}>
      <label>
        {`${header}=`}
        <input type="number" onChange={handleInputChange} />
        <br />
        {value === 'min' && `min=${min}`}
        {value === 'max' && `max=${max}`}
      </label>
    </div>
  )
}

Input.propTypes = {
  header: PropTypes.string.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
}

export default Input
