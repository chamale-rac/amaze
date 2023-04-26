/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import Astro from './Astro'

// eslint-disable-next-line no-unused-vars
function MovableObject({ collisionObjects = [] }) {
  const mesh = useRef()
  const velocity = useRef([0, 0])

  const targetRotation = useRef({ x: 0, y: 0, z: 0 })

  // Smoothly update the rotation of the mesh

  useFrame(() => {
    // Update the position of the mesh based on the current velocity
    mesh.current.position.x += velocity.current[0]
    mesh.current.position.z += velocity.current[1]

    // Dampen the velocity over time to create a smoother movement
    velocity.current[0] *= 0.9
    velocity.current[1] *= 0.9

    // Update the rotation of the mesh
    mesh.current.rotation.y +=
      (targetRotation.current.y - mesh.current.rotation.y) * 0.1
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          velocity.current[1] += 0.1
          targetRotation.current.y = 0
          break
        case 'ArrowDown':
          velocity.current[1] -= 0.1
          targetRotation.current.y = Math.PI
          break
        case 'ArrowLeft':
          velocity.current[0] += 0.1
          targetRotation.current.y = Math.PI / 2
          break
        case 'ArrowRight':
          velocity.current[0] -= 0.1
          targetRotation.current.y = -Math.PI / 2
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <mesh ref={mesh} position={[0.5, 0, 0.5]}>
      <Astro />
    </mesh>
  )
}

export default MovableObject
