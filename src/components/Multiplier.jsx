/* eslint-disable react/no-array-index-key */
import React from 'react'
import PropTypes from 'prop-types'

import * as styles from '@styles/multiplier.module.css'

function Multiplier({ text, cte, scale, min, max }) {
  const chars = text.split('')
  const arr = new Array(cte).fill(chars)

  function generateRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }

  function getIntRandomArbitrary() {
    return Math.floor(Math.random() * (max - min) + min)
  }

  return (
    <div>
      {arr.map((item, index) => (
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
      ))}
    </div>
  )
}

Multiplier.propTypes = {
  text: PropTypes.string.isRequired,
  cte: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
}

export default Multiplier
