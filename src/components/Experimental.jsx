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

function Experimental({ rawArr }) {
  const { width, height, skin } = useContext(AppContext)
  const [mappedObjects, setMappedObjects] = useState()
  const playerPosition = useRef([0, 0])
  const goalPosition = useRef([0, 0])
  const collisionObjects = useRef([])

  useEffect(() => {
    setMappedObjects(rawArrToMappable(rawArr))
  }, [])

  // Chat gpt fix it
  const addToCollisionObjects = (type, x, z) => {
    const obj = [x - height - height / 2 + 0.5, z - width + 0.5, type]
    collisionObjects.current.push(obj)
    if (type === 'player') {
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

  return (
    <div className={styles.container}>
      {mappedObjects ? (
        <Canvas>
          <ambientLight intensity={0.06} />
          <pointLight
            castShadow
            position={[10, 10, 10]}
            color={parseInt(skin, 16)}
          />
          <PerspectiveCamera
            makeDefault
            position={[-12, 12, -12]}
            fov={45}
            near={0.1}
            far={1000}
          />
          <OrbitControls />
          <MovableObject
            collisionObjects={collisionObjects.current}
            initialPosition={playerPosition.current}
            goalPosition={goalPosition.current}
          />
          <Goal initialPosition={goalPosition.current} />

          {mappedObjects.map((obj, idx) =>
            transformObject(obj.type, idx, obj.x, obj.z),
          )}
        </Canvas>
      ) : (
        <p>Loading maze data...</p>
      )}
    </div>
  )
}

Experimental.propTypes = {
  rawArr: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

export default Experimental
