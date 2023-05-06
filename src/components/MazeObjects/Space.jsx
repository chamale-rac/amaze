/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from 'react'

function Space({ x, z }) {
  return (
    <mesh position={[x, -0.25, z]}>
      <boxBufferGeometry args={[1, 0.5, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default Space
