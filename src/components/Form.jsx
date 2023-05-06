import React, { useContext } from 'react'
import * as styles from '@styles/form.module.css'

import { AppContext } from '@context/AppContext'

import Numbers from './Numbers'
import Pill from './Pill'
import Input from './Input'

function Form() {
  const { globalTime, time } = useContext(AppContext) // For time
  const { globalHeight, globalWidth, width, height } = useContext(AppContext) // For width and height
  const { skin, globalSkin } = useContext(AppContext) // For skin

  return (
    <div className={styles.container}>
      <div className={styles.title}>Configs</div>
      <div className={styles.wrapper}>
        <Numbers
          min={4}
          max={10}
          setFunction={globalWidth}
          variable={width}
          header="Width"
        />
        <Numbers
          min={4}
          max={10}
          setFunction={globalHeight}
          variable={height}
          header="Height"
        />
        <div>
          <Pill
            header="skin"
            options={['β', 'Ψ', 'λ']}
            variable={skin}
            setFunction={globalSkin}
          />
          <label className={styles.label}>
            time?
            <input
              className={styles.check}
              type="checkbox"
              checked={time}
              onChange={(e) => globalTime(e.target.checked)}
            />
          </label>
          {time && <Input header="secs" min={60} max={1000} />}
        </div>
      </div>
    </div>
  )
}

export default Form
