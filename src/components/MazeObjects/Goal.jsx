/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from 'react'

function Goal({ initialPosition }) {
  return (
    <mesh position={[initialPosition[0], 0.5, initialPosition[1]]}>
      <torusKnotBufferGeometry args={[0.2, 0.1, 65, 8]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default Goal
