import React, { useState, useEffect } from 'react'
import * as styles from '@styles/maze.module.css'

import Experimental from '@components/Experimental'

function Maze() {
  const [mazeData, setMazeData] = useState(null)

  useEffect(() => {
    fetch('http://maze.uvgenios.online/?type=text&w=10&h=10')
      .then((response) => response.text())
      .then((data) => setMazeData(data))
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className={styles.container}>
      {mazeData ? (
        <Experimental rawArr={mazeData} />
      ) : (
        <p>Loading maze data...</p>
      )}
    </div>
  )
}

export default Maze
