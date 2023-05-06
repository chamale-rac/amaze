/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
// import Astro from './Astro'

// eslint-disable-next-line no-unused-vars
function MovableObject({ collisionObjects, initialPosition = [1, 2] }) {
  const hasIncreasedSpeed = useRef(false)
  const isMoving = useRef(false)
  const hasLoose = useRef(false)
  const group = useRef()
  const firstMove = useRef(true)
  const { nodes, materials, animations } = useGLTF('models/astro.glb')
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

  useEffect(() => {
    // eslint-disable-next-line prefer-destructuring
    mesh.current.position.x = initialPosition[0]
    // eslint-disable-next-line prefer-destructuring
    mesh.current.position.z = initialPosition[1]
  }, [])

  const velocity = useRef([0, 0])

  const targetRotation = useRef({ x: 0, y: 0, z: 0 })

  function checkCollision(playerX, playerZ, squares, radius) {
    for (let i = 0; i < squares.length; i += 1) {
      const squareX = squares[i][0]
      const squareZ = squares[i][1]

      const dx = playerX - squareX
      const dz = playerZ - squareZ

      const distanceSquared = dx * dx + dz * dz

      if (distanceSquared < radius * radius) {
        // player is inside this square
        console.log('is inside square')
        if (squares[i][2] === 'goal') {
          console.log('is inside goal')
          fadeToAction(actions.Idling, actions.Running, 0.2)
          setTimeout(() => {
            isMoving.current = false
            // won function
          }, 50)
          return i
        }
        return i
      }
    }

    // player is not inside any square
    fadeToAction(actions.Idling, actions.Running, 0.4)

    setTimeout(() => {
      isMoving.current = false
      hasLoose.current = true
    }, 50)
    console.log('is not inside any square')
    return -1
  }
  // Smoothly update the rotation of the mesh
  function handleMove() {
    if (firstMove.current) {
      fadeToAction(actions.Running, actions.Idling, 0.2)
      firstMove.current = false
      isMoving.current = true
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isMoving.current) {
        checkCollision(
          mesh.current.position.x,
          mesh.current.position.z,
          collisionObjects,
          0.7,
        )
      }
    }, 100)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    actions.Idling.play()
  }, [])

  useFrame(() => {
    if (isMoving.current) {
      // Update the position of the mesh based on the current velocity
      mesh.current.position.x += velocity.current[0] * 0.5
      mesh.current.position.z += velocity.current[1] * 0.5

      // Update the rotation of the mesh
      mesh.current.rotation.y +=
        (targetRotation.current.y - mesh.current.rotation.y) * 0.1
    }
    if (hasLoose.current) {
      mesh.current.position.y -= 0.01
      mesh.current.rotation.x -= 0.01
    }
  })

  useEffect(() => {
    const handleKeyDown = (event) => {
      const add = hasIncreasedSpeed.current ? 0.04 : 0.02
      if (!hasLoose.current) {
        switch (event.key) {
          case 'ArrowUp':
            velocity.current[1] = add
            velocity.current[0] = 0
            targetRotation.current.y = 0
            handleMove()
            break
          case 'ArrowDown':
            velocity.current[1] = -add
            velocity.current[0] = 0
            targetRotation.current.y = Math.PI

            handleMove()
            break
          case 'ArrowLeft':
            velocity.current[0] = add
            velocity.current[1] = 0
            targetRotation.current.y = Math.PI / 2

            handleMove()
            break
          case 'ArrowRight':
            velocity.current[0] = -add
            velocity.current[1] = 0
            targetRotation.current.y = -Math.PI / 2
            handleMove()
            break
          case ' ':
            hasIncreasedSpeed.current = !hasIncreasedSpeed.current
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
            <meshNormalMaterial />
          </group>
        </group>
      </group>
    </mesh>
  )
}

export default MovableObject

useGLTF.preload('models/astro.glb')
