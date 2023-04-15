import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as styles from '@styles/button.module.css'

function Button({ to }) {
  return (
    <div className={styles.container}>
      <Link className={styles.button} to={to} />
    </div>
  )
}

Button.propTypes = {
  to: PropTypes.string.isRequired,
}

export default Button
