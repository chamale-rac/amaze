/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React from 'react'
import { Edges } from '@react-three/drei'

function Space({ x, z }) {
  return (
    <mesh position={[x, -0.25, z]}>
      <boxBufferGeometry args={[1, 0.5, 1]} />
      <meshNormalMaterial />
      <Edges color="black" />
    </mesh>
  )
}

export default Space
