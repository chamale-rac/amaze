/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
// import Astro from './Astro'

// eslint-disable-next-line no-unused-vars
function MovableObject({ collisionObjects = [] }) {
  const isMoving = useRef(false)
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '../../public/models/astro.glb',
  )
  const { actions } = useAnimations(animations, group)

  function fadeToAction(activeAction, previousAction, duration) {
    if (previousAction !== activeAction) {
      previousAction.fadeOut(duration)
    }

    activeAction
      .reset()
      .setEffectiveTimeScale(1)
      .setEffectiveWeight(1)
      .fadeIn(duration)
      .play()
  }

  const mesh = useRef()
  const velocity = useRef([0, 0])

  const targetRotation = useRef({ x: 0, y: 0, z: 0 })

  // Smoothly update the rotation of the mesh
  function handleMove() {
    fadeToAction(actions.Running, actions.Idling, 0.2)
    isMoving.current = true
    setTimeout(() => {
      // Call your function here after the delay
      console.log('The function was called.')
      fadeToAction(actions.Idling, actions.Running, 1)
    }, 800) // Wait for 1 seconds before calling the function
    setTimeout(() => {
      // Call your function here after the delay
      isMoving.current = false
    }, 2000)
  }

  useEffect(() => {
    actions.Idling.play()
  }, [])

  useFrame(() => {
    if (isMoving.current) {
      // Update the position of the mesh based on the current velocity
      mesh.current.position.x += velocity.current[0]
      mesh.current.position.z += velocity.current[1]

      // Dampen the velocity over time to create a smoother movement
      velocity.current[0] *= 0.99
      velocity.current[1] *= 0.99

      // Update the rotation of the mesh
      mesh.current.rotation.y +=
        (targetRotation.current.y - mesh.current.rotation.y) * 0.1
    }
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isMoving.current) {
        switch (event.key) {
          case 'ArrowUp':
            velocity.current[1] += 0.01
            targetRotation.current.y = 0
            handleMove()
            break
          case 'ArrowDown':
            velocity.current[1] -= 0.01
            targetRotation.current.y = Math.PI

            handleMove()
            break
          case 'ArrowLeft':
            velocity.current[0] += 0.01
            targetRotation.current.y = Math.PI / 2

            handleMove()
            break
          case 'ArrowRight':
            velocity.current[0] -= 0.01
            targetRotation.current.y = -Math.PI / 2

            handleMove()
            break
          default:
            break
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <mesh ref={mesh} position={[0.5, 0, 0.5]}>
      <group ref={group} dispose={null}>
        <group name="Scene">
          <group name="Armature">
            <primitive object={nodes.Root} />
            <skinnedMesh
              name="Astronaut"
              geometry={nodes.Astronaut.geometry}
              material={materials.Astronaut}
              skeleton={nodes.Astronaut.skeleton}
            />
          </group>
        </group>
      </group>
    </mesh>
  )
}

export default MovableObject

useGLTF.preload('../../public/models/astro.glb')
