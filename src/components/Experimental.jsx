/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useContext, useRef } from 'react'
import PropTypes from 'prop-types'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { rawArrToMappable } from '@utils/parser'

import * as styles from '@styles/experimental.module.css'
import { Space, Goal } from '@components/MazeObjects'

import { AppContext } from '@context/AppContext'
import MovableObject from './MovableObject'

function Experimental({
  rawArr,
  winFunction,
  looseFunction,
  restartFunction,
  timeLeft,
}) {
  const { width, height, skin } = useContext(AppContext)
  const [mappedObjects, setMappedObjects] = useState()
  const playerPosition = useRef([0, 0])
  const goalPosition = useRef([0, 0])
  const collisionObjects = useRef([])

  // Chat gpt fix it
  const addToCollisionObjects = (type, x, z) => {
    const obj = [x - height - height / 2 + 0.5, z - width + 0.5, type]
    collisionObjects.current.push(obj)
    if (type === 'player') {
      console.log('player')
      playerPosition.current = obj.slice(0, 2)
    }
    if (type === 'goal') {
      goalPosition.current = obj.slice(0, 2)
    }
  }

  const transformObject = (type, idx, x, z) => {
    if (type === 'space' || type === 'player' || type === 'goal') {
      addToCollisionObjects(type, x, z)
      return (
        <Space
          key={idx}
          x={x - height - height / 2 + 0.5}
          z={z - width + 0.5}
        />
      )
    }
    return null
  }

  useEffect(() => {
    const transformedObjects = rawArrToMappable(rawArr).map((obj, idx) =>
      transformObject(obj.type, idx, obj.x, obj.z),
    )
    setMappedObjects(transformedObjects)
  }, [])

  const intensityPoint = 2
  return (
    <div className={styles.container}>
      {mappedObjects ? (
        <Canvas>
          <ambientLight intensity={1} color={0x000000} />
          <pointLight
            castShadow
            position={[0, 100, 40]}
            color={parseInt(skin, 16)}
            intensity={intensityPoint}
          />
          <pointLight
            castShadow
            position={[0, 100, 0]}
            color={parseInt(skin, 16)}
            intensity={intensityPoint}
          />

          <pointLight
            castShadow
            position={[0, 100, -40]}
            color={parseInt(skin, 16)}
            intensity={intensityPoint}
          />
          <PerspectiveCamera
            makeDefault
            position={[-12, 12, -22]}
            fov={45}
            near={0.1}
            far={1000}
          />
          <OrbitControls />
          <MovableObject
            winFunction={winFunction}
            looseFunction={looseFunction}
            restartFunction={restartFunction}
            collisionObjects={collisionObjects.current}
            initialPosition={playerPosition.current}
            goalPosition={goalPosition.current}
            timeLeft={timeLeft}
          />
          <Goal initialPosition={goalPosition.current} />
          {mappedObjects}
        </Canvas>
      ) : (
        <p>Loading maze data...</p>
      )}
    </div>
  )
}

Experimental.propTypes = {
  rawArr: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  winFunction: PropTypes.func.isRequired,
  looseFunction: PropTypes.func.isRequired,
  restartFunction: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
}

export default Experimental
