/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as styles from '@styles/land.module.css'

function Width({ children, maxWidth }) {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return width > maxWidth ? (
    <>{children}</>
  ) : (
    <div className={styles.container}>
      <div className={styles.col}>
        <div className={styles.wrapper}>
          This game is not available on mobile devices.
          <div className={styles.title}>
            <div>m</div>
            <div>a</div>
            <div>z</div>
            <div>e</div>
            <div>ma</div>
            <div>ze</div>
            <div>maze</div>
          </div>
        </div>
      </div>
    </div>
  )
}

Width.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.number,
}

Width.defaultProps = {
  maxWidth: 992,
}

export default Width
