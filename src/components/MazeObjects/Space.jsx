/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from 'react'

function Space({ x, z }) {
  return (
    <mesh position={[x + 0.5, -0.5, z + 0.5]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default Space
