/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

function MovableObject({ speed = 1, collisionObjects = [] }) {
  const mesh = useRef()
  const direction = useRef([0, 0]) // Store the direction of movement
  const elevation = useRef(0)

  // Check for collisions with other objects
  const checkCollision = (x, z) => {
    return collisionObjects.some((obj) => obj.x === x && obj.z === z)
  }

  const move = (dx, dz) => {
    const newX = mesh.current.position.x + dx
    const newZ = mesh.current.position.z + dz

    if (!checkCollision(newX, newZ)) {
      mesh.current.position.x = newX
      mesh.current.position.z = newZ
    }
  }

  useFrame(() => {
    const [dx, dz] = direction.current
    const newX = mesh.current.position.x + dx
    const newZ = mesh.current.position.z + dz
    if (!checkCollision(newX, newZ)) {
      if (elevation.current <= 1 && elevation.current > 0) {
        mesh.current.position.y =
          0.25 + Math.sin(Math.abs(elevation.current) * 2) * 0.2
        elevation.current -= 0.02
      }

      mesh.current.rotation.x += (dz - mesh.current.rotation.x) * 0.9 // Smoothly interpolate the rotation
      mesh.current.rotation.z += (dx - mesh.current.rotation.z) * 0.9 // Smoothly interpolate the rotation
      direction.current[0] -= dx * 0.1
      direction.current[1] -= dz * 0.1
    }
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          move(0, speed)
          direction.current = [0, -(90 * Math.PI) / 180]
          elevation.current = 1
          break
        case 'ArrowDown':
          move(0, -speed)
          direction.current = [0, (90 * Math.PI) / 180]
          elevation.current = 1
          break
        case 'ArrowLeft':
          move(-speed, 0)
          direction.current = [-(90 * Math.PI) / 180, 0]
          elevation.current = 1
          break
        case 'ArrowRight':
          move(speed, 0)
          direction.current = [(90 * Math.PI) / 180, 0]
          elevation.current = 1
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [speed])

  return (
    <mesh ref={mesh} position={[0.5, 0.25, 0.5]}>
      <boxBufferGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  )
}

export default MovableObject
