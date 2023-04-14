import React from 'react'
import PropTypes from 'prop-types'

import * as styles from '@styles/numbers.module.css'

function Numbers({ min, max, header }) {
  const factorialArray = () => {
    const arr = []

    for (let i = min; i <= max; i += 1) {
      arr.push(i)
    }

    return arr
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{`${header}::`}</div>
      <div className={styles.wrapper}>
        {factorialArray().map((item) => (
          <div className={styles.number} style={{ cursor: 'pointer' }}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.arrows}>axy</div>
        <div className={styles.selected}>100</div>
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
