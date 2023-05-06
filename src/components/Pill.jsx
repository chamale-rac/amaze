// Final version: v1.0.0
import React from 'react'
import PropTypes from 'prop-types'

import * as styles from '@styles/pill.module.css'

function Pill({ header, options, variable, setFunction }) {
  return (
    <div className={styles.container}>
      <ul>
        <li className={styles.header}>
          {header}
          <ul>
            {options.map((option) => (
              <li
                onClick={() => setFunction(option)}
                className={`${styles.option} ${
                  variable === option ? styles.selected : ''
                }`}
              >
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  )
}

Pill.propTypes = {
  header: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  variable: PropTypes.string.isRequired,
  setFunction: PropTypes.func.isRequired,
}

export default Pill
