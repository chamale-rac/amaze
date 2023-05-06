import React, { useState, useEffect, useContext } from 'react'
import * as styles from '@styles/maze.module.css'

import Experimental from '@components/Experimental'

import { AppContext } from '@context/AppContext'
import { testArr } from '@utils/parser'

function Maze() {
  const { width, height } = useContext(AppContext)

  // eslint-disable-next-line no-unused-vars
  const [mazeData, setMazeData] = useState(null)

  useEffect(() => {
    /*
      fetch(`https://maze.uvgenios.online/?type=json&w=${width}&h=${height}`)
      .then((response) => response.json())
      .then((data) => {
        setMazeData(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      }) */
    /*
    setMazeData(testArr) */

    setMazeData(testArr)
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
