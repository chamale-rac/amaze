import React from 'react'
import PropTypes from 'prop-types'

import * as styles from '@styles/pill.module.css'

function Pill({ header, options }) {
  return (
    <div className={styles.container}>
      <ul>
        <li>
          {header}
          <ul>
            {options.map((option) => (
              <li>
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
}

export default Pill
