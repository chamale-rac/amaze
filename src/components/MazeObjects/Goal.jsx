/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Goal({ initialPosition }) {
  const mesh = useRef()

  useFrame(() => {
    mesh.current.rotation.x += 0.01
    mesh.current.rotation.y += 0.01
  })

  return (
    <mesh ref={mesh} position={[initialPosition[0], 0.5, initialPosition[1]]}>
      <torusKnotBufferGeometry args={[0.2, 0.1, 90, 8]} />
      <meshNormalMaterial />
    </mesh>
  )
}

export default Goal
