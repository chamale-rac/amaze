/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { rawArrToMappable } from '@utils/parser'

import * as styles from '@styles/experimental.module.css'
import { Column, HorizontalWall, VerticalWall } from '@components/MazeObjects'

import MovableObject from './MovableObject'
import { AppContext } from '@context/AppContext'

// eslint-disable-next-line no-unused-vars
function Experimental({ rawArr }) {
  const { width, height } = useContext(AppContext)
  // eslint-disable-next-line no-unused-vars
  const [mappedObjects, setMappedObjects] = useState()

  useEffect(() => {
    setMappedObjects(rawArrToMappable(rawArr))
  }, [])

  // Positions of other objects in the grid
  /*
  


  */

  // eslint-disable-next-line consistent-return
  const transformObject = (type, idx, x, z) => {
    if (type === 'column') {
      return <Column key={idx} x={x - height / 2} z={z - width / 2} />
    }
  }

  // eslint-disable-next-line no-unused-vars
  const collisionObjects = [
    { x: 5, z: -5, type: 'column' },
    { x: 5, z: -4, type: 'column' },
  ]

  return (
    <div className={styles.container}>
      {mappedObjects ? (
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight castShadow position={[10, 10, 10]} />
          <PerspectiveCamera
            makeDefault
            position={[-12, 12, -12]}
            fov={45}
            near={0.1}
            far={1000}
          />
          <OrbitControls />
          <gridHelper args={[height, width]} />

          <MovableObject collisionObjects={collisionObjects} />
          {/*
           */}
          {/**
            
          {mappedObjects.map((obj, idx) =>
            transformObject(obj.type, idx, obj.x, obj.z),
          )}
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
