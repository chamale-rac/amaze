import React from 'react'
import PropTypes from 'prop-types'

import * as styles from '@styles/input.module.css'

function Input({ header }) {
  return (
    <div className={styles.container}>
      <label>
        {`${header}=`}
        <input type="number" min={20} />
      </label>
    </div>
  )
}

Input.propTypes = {
  header: PropTypes.string.isRequired,
}
export default Input
