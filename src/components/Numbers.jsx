import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { AppContext } from '@context/AppContext'

import * as styles from '@styles/numbers.module.css'

function Numbers({ min, max, header }) {
  const { globalHeight, globalWidth, width, height } = useContext(AppContext)

  const factorialArray = () => {
    const arr = []

    for (let i = min; i <= max; i += 1) {
      arr.push(i)
    }

    return arr
  }

  const selected = (item) => {
    if (header === 'Width') {
      return width === item ? styles.selected : ''
    }
    return height === item ? styles.selected : ''
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{`${header}::`}</div>
      <div className={styles.wrapper}>
        {factorialArray().map((item) => (
          <div
            className={`${styles.number} ${selected(item)}`}
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (header === 'Width') {
                globalWidth(item)
              } else {
                globalHeight(item)
              }
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.arrows}>axy</div>
        <div className={styles.actual}>
          {header === 'Width' ? width : height}
        </div>
      </div>
    </div>
  )
}

Numbers.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
}

export default Numbers
