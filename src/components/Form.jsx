import React, { useContext } from 'react'
import * as styles from '@styles/form.module.css'

import { AppContext } from '@context/AppContext'

import Numbers from './Numbers'
import Pill from './Pill'
import Input from './Input'

function Form() {
  const { globalTime, time } = useContext(AppContext) // For apply time
  const { globalHeight, globalWidth, width, height } = useContext(AppContext) // For width and height
  const { globalSkin, skin } = useContext(AppContext) // For skin
  const { seconds, globalSeconds } = useContext(AppContext) // For seconds

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
            options={['0xbd58e8', '0x80ebc4', '0x264ecc']}
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
          {time && (
            <Input
              header="secs"
              min={60}
              max={1000}
              variable={seconds}
              setFunction={globalSeconds}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Form
