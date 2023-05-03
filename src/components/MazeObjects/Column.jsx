/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from 'react'

function Column({ x, z }) {
  return (
    <mesh position={[x, 0.375, z]}>
      <boxBufferGeometry args={[0.3, 0.75, 0.3]} />
      <meshStandardMaterial color="black" />
    </mesh>
  )
}

export default Column
