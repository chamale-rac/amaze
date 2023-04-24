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

  useFrame(() => {
    // Update the position of the mesh based on the current velocity
    mesh.current.position.x += velocity.current[0]
    mesh.current.position.z += velocity.current[1]

    // Dampen the velocity over time to create a smoother movement
    velocity.current[0] *= 0.9
    velocity.current[1] *= 0.9
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          velocity.current[1] += 0.1
          break
        case 'ArrowDown':
          velocity.current[1] -= 0.1
          break
        case 'ArrowLeft':
          velocity.current[0] += 0.1
          break
        case 'ArrowRight':
          velocity.current[0] -= 0.1
          break
        default:
          break
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <mesh ref={mesh} position={[0.5, 0, 0.5]}>
        <Astro />
      </mesh>
    </>
  )
}

export default MovableObject
