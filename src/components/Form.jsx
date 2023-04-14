import React from 'react'
import * as styles from '@styles/form.module.css'

import Numbers from './Numbers'
import Pill from './Pill'
import Input from './Input'

function Form() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Configs</div>
      <div className={styles.wrapper}>
        <Numbers min={4} max={100} header="Width" />
        <Numbers min={4} max={100} header="Height" />
        <div>
          <Pill header="skin" options={['sk1', 'sk2', 'sk3']} />
          <label className={styles.label}>
            tempo?
            <input className={styles.check} type="checkbox" value="tempo" />
          </label>
          <Input header="seconds" />
        </div>
      </div>
    </div>
  )
}

export default Form
