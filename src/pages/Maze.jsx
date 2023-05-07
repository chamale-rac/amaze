/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useContext } from 'react'
import * as styles from '@styles/maze.module.css'
import { Link } from 'react-router-dom'

import Experimental from '@components/Experimental'

import { AppContext } from '@context/AppContext'
import Width from '@hooks/Width'

function Maze() {
  // eslint-disable-next-line no-unused-vars
  const { width, height, skin, time, seconds } = useContext(AppContext)

  const [won, setWon] = useState(false)
  const [loose, setLoose] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [newMap, setNewMap] = useState(false)
  const [help, setHelp] = useState(false)

  const [mazeData, setMazeData] = useState(null)

  const handleSetSeconds = () => {
    if (seconds <= 60) {
      setTimeLeft(60)
    } else if (seconds >= 1000) {
      setTimeLeft(1000)
    } else {
      setTimeLeft(seconds)
    }
  }

  const handleRestart = () => {
    handleSetSeconds()
    setWon(false)
    setLoose(false)
  }

  useEffect(() => {
    handleSetSeconds()
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (time && !loose && !won) {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setLoose(true)
            return prevTime
          }
          return prevTime - 1
        })
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [loose, won])

  // eslint-disable-next-line no-unused-vars
  const fetchMazeData = () => {
    fetch(`https://maze.uvgenios.online/?type=json&w=${width}&h=${height}`)
      .then((response) => response.json())
      .then((data) => {
        setMazeData(data)
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {})
  }

  useEffect(() => {
    /*
    setMazeData(testArr)
    
     */
    /* */

    fetchMazeData()
  }, [])

  const handleNewMap = () => {
    setNewMap(true)
    handleRestart()
    setMazeData(null)
    fetchMazeData()
    setTimeout(() => {
      setNewMap(false)
    }, 1000)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'h':
          setHelp((prev) => !prev)
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <Width>
      <div className={styles.container}>
        <Link className={styles.button} to="/">
          ← return fake button?
        </Link>

        {mazeData && !newMap ? (
          <Experimental
            rawArr={mazeData}
            winFunction={setWon}
            looseFunction={setLoose}
            restartFunction={handleRestart}
            timeLeft={timeLeft}
          />
        ) : (
          <div className={styles.prompt_real}>Loading maze...</div>
        )}
        {loose && (
          <div className={styles.prompt}>
            <div className={styles.options}>
              <Link className={styles.xd} to="/">
                ← return ?
              </Link>
              <button className={styles.xd} type="button">
                restart (press r)
              </button>

              <button
                className={styles.xd}
                type="button"
                onClick={() => handleNewMap()}
              >
                new map
              </button>
            </div>
            <div>Game over</div>
          </div>
        )}
        {won && (
          <div className={styles.prompt}>
            <div className={styles.options}>
              <Link className={styles.xd} to="/">
                ← return ?
              </Link>
              <button className={styles.xd} type="button">
                restart (press r)
              </button>
              <button
                className={styles.xd}
                type="button"
                onClick={() => handleNewMap()}
              >
                new map
              </button>
            </div>
            <div>You win!</div>
          </div>
        )}

        <div className={styles.info}>
          <div className={styles.time}>{time && `${timeLeft}sec`}</div>
          <div>
            {height}X{width}
          </div>
          <div>{skin}</div>
          <div className={styles.others}>
            {help && (
              <div className={styles.instructions}>
                Instructions:
                <li> q = alter speed</li>
                <li> awsd = move </li>
                <li> r = restart match</li>
                <li> Lclick & move = rotate scene</li>
                <li> scroll = zoom</li>
                <li> ctrl + Lclick = drag</li>
              </div>
            )}
            <div className={styles.help}> 'h' for help</div>
          </div>
        </div>
      </div>
    </Width>
  )
}

export default Maze
