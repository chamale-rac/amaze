import React from 'react'
import * as styles from '@styles/main.module.css'

import Multiplier from '@components/Multiplier'
import Form from '../components/Form'
import Button from '../components/Button'

function Land() {
  return (
    <div className={styles.container}>
      <div className={styles.col}>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <div>m</div>
            <div>a</div>
            <div>z</div>
            <div>e</div>
            <div>ma</div>
            <div>ze</div>
            <div>maze</div>
          </div>
          <Multiplier text="abcdefg" cte={10} scale={0.27} min={10} max={20} />
        </div>
      </div>
      <div className={styles.col}>
        <Button />
      </div>
      <div className={styles.col}>
        <Form />
      </div>
    </div>
  )
}

export default Land
