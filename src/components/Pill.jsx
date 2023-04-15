import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { AppContext } from '@context/AppContext'

import * as styles from '@styles/pill.module.css'

function Pill({ header, options }) {
  const { skin, globalSkin } = useContext(AppContext)

  return (
    <div className={styles.container}>
      <ul>
        <li className={styles.header}>
          {header}
          <ul>
            {options.map((option) => (
              <li
                onClick={() => globalSkin(option)}
                className={`${styles.option} ${
                  skin === option ? styles.selected : ''
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
}

export default Pill
