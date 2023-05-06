/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
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

// eslint-disable-next-line no-unused-vars
function Experimental({ rawArr }) {
  const { width, height } = useContext(AppContext)
  // eslint-disable-next-line no-unused-vars
  const [mappedObjects, setMappedObjects] = useState()
  const playerPosition = useRef([0, 0])
  const goalPosition = useRef([0, 0])
  const collisionObjects = useRef([])

  useEffect(() => {
    setMappedObjects(rawArrToMappable(rawArr))
  }, [])

  // Positions of other objects in the grid
  /*
  


  */

  // eslint-disable-next-line consistent-return
  const transformObject = (type, idx, x, z) => {
    if (type === 'space') {
      collisionObjects.current.push([
        x - height - height / 2 + 0.5,
        z - width + 0.5,
        'space',
      ])
      return (
        <Space
          key={idx}
          x={x - height - height / 2 + 0.5}
          z={z - width + 0.5}
        />
      )
    }
    if (type === 'player') {
      collisionObjects.current.push([
        x - height - height / 2 + 0.5,
        z - width + 0.5,
        'player',
      ])
      playerPosition.current = [x - height - height / 2 + 0.5, z - width + 0.5]
      return (
        <Space
          key={idx}
          x={x - height - height / 2 + 0.5}
          z={z - width + 0.5}
        />
      )
    }
    if (type === 'goal') {
      collisionObjects.current.push([
        x - height - height / 2 + 0.5,
        z - width + 0.5,
        'goal',
      ])
      goalPosition.current = [x - height - height / 2 + 0.5, z - width + 0.5]
      return (
        <Space
          key={idx}
          x={x - height - height / 2 + 0.5}
          z={z - width + 0.5}
        />
      )
    }
  }

  // eslint-disable-next-line no-unused-vars

  return (
    <div className={styles.container}>
      {mappedObjects ? (
        <Canvas>
          <ambientLight intensity={0.06} />
          <pointLight castShadow position={[10, 10, 10]} color={0xbd58e8} />
          <PerspectiveCamera
            makeDefault
            position={[-12, 12, -12]}
            fov={45}
            near={0.1}
            far={1000}
          />
          <OrbitControls />

          {/*
          <gridHelper args={[height, width]} />
           */}
          <MovableObject
            collisionObjects={collisionObjects.current}
            initialPosition={playerPosition.current}
            goalPosition={goalPosition.current}
          />
          <Goal initialPosition={goalPosition.current} />

          {mappedObjects.map((obj, idx) =>
            transformObject(obj.type, idx, obj.x, obj.z),
          )}
          {/**
            
             */}
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
