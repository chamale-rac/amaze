// Final version: v1.0.0
import React from 'react'
import PropTypes from 'prop-types'

import * as styles from '@styles/numbers.module.css'

function Numbers({ min, max, setFunction, variable, header }) {
  const [internalVariable, setInternalVariable] = React.useState(variable)

  const factorialArray = () => {
    const arr = []

    for (let i = min; i <= max; i += 1) {
      arr.push(i)
    }

    return arr
  }

  const handleChange = (option) => {
    setFunction(option)
    setInternalVariable(option)
  }

  const selected = (item) => {
    return internalVariable === item ? styles.selected : ''
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
              handleChange(item)
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.arrows}>axy</div>
        <div className={styles.actual}>{internalVariable}</div>
      </div>
    </div>
  )
}

Numbers.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  header: PropTypes.string.isRequired,
  setFunction: PropTypes.func.isRequired,
  variable: PropTypes.number.isRequired,
}

export default Numbers
