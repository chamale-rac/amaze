import React from 'react'
import * as styles from '@styles/form.module.css'

function Form() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Configs</div>
      <form>
        <label>Width:</label>
        <input type="number" id="w_number" name="w_number" min="4" max="100" />
        <label>Height:</label>
        <input type="number" id="h_number" name="h_number" min="4" max="100" />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default Form
