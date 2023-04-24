/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unknown-property */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'

import * as styles from '@styles/experimental.module.css'
import MovableObject from './MovableObject'

// eslint-disable-next-line no-unused-vars
function Experimental({ rawArr }) {
  // eslint-disable-next-line no-unused-vars
  const [mappedObjects, setMappedObjects] = useState(true)
  // Positions of other objects in the grid
  /*

  const transformObject = (type, idx, x, z) => {
    if (type === 'column') {
      return <Column key={idx} x={x} z={z} />
    }
  }
  */

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
          <gridHelper args={[10, 10]} />
          <MovableObject collisionObjects={collisionObjects} />
          {/*
            collisionObjects.map((obj, idx) =>
              transformObject(obj.type, idx, obj.x, obj.z),
            )
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
