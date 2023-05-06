// Final version: v1.0.0
/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import * as styles from '@styles/multiplier.module.css'

function Multiplier({ randomizer, cte, scale, min, max }) {
  const alphabet = useMemo(
    () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    [],
  )

  function generateRandomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  function getIntRandomArbitrary() {
    return Math.floor(Math.random() * (max - min) + min)
  }

  const rows = useMemo(() => {
    const chars = randomizer.split('')
    const arr = new Array(cte).fill(chars)
    return arr.map((item, index) => (
      <div className={styles.row} key={`item-${index}`}>
        {item.map((i, j) => (
          <div
            className={styles.char}
            style={{
              fontSize: `${getIntRandomArbitrary() * scale}rem`,
            }}
            key={`item-${index}-char-${j}`}
          >
            {generateRandomLetter()}
          </div>
        ))}
      </div>
    ))
  }, [randomizer, cte, scale, min, max])

  return <div>{rows}</div>
}

Multiplier.propTypes = {
  randomizer: PropTypes.string.isRequired,
  cte: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
}

export default Multiplier
