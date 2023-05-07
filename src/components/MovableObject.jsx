/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'

function MovableObject({
  collisionObjects,
  initialPosition = [1, 2],
  winFunction,
  looseFunction,
  restartFunction,
  timeLeft,
}) {
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
    if (timeLeft <= 0) {
      fadeToAction(actions.Idling, actions.Running, 0.4)
      isMoving.current = false
      hasLoose.current = true
      looseFunction(true)
    }
  }, [timeLeft])

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
        if (squares[i][2] === 'goal') {
          fadeToAction(actions.Idling, actions.Running, 0.2)
          setTimeout(() => {
            isMoving.current = false
            if (dx < dz) {
              mesh.current.position.x -= 1
            } else {
              mesh.current.position.z -= 1
            }
          }, 50)
          setTimeout(() => {
            winFunction(true)
          }, 200)
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
      looseFunction(true)
    }, 50)
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
      const add = hasIncreasedSpeed.current ? 0.08 : 0.02
      if (!hasLoose.current) {
        switch (event.key) {
          case 'w':
            velocity.current[1] = add
            velocity.current[0] = 0
            targetRotation.current.y = 0
            handleMove()
            break
          case 's':
            velocity.current[1] = -add
            velocity.current[0] = 0
            targetRotation.current.y = Math.PI

            handleMove()
            break
          case 'a':
            velocity.current[0] = add
            velocity.current[1] = 0
            targetRotation.current.y = Math.PI / 2

            handleMove()
            break
          case 'd':
            velocity.current[0] = -add
            velocity.current[1] = 0
            targetRotation.current.y = -Math.PI / 2
            handleMove()
            break
          case 'q':
            hasIncreasedSpeed.current = !hasIncreasedSpeed.current
            break

          default:
            break
        }
      }

      switch (event.key) {
        case 'r':
          actions.Running.stop()
          restartFunction()
          mesh.current.position.x = initialPosition[0]
          mesh.current.position.z = initialPosition[1]
          mesh.current.rotation.y = 0
          mesh.current.rotation.x = 0
          mesh.current.position.y = 0
          hasIncreasedSpeed.current = false
          hasLoose.current = false
          firstMove.current = true
          isMoving.current = false
          fadeToAction(actions.Idling, actions.Running, 0.2)
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
      <group ref={group} dispose={null}>
        <group name="Scene">
          <group name="Armature">
            <primitive object={nodes.Root} />
            <skinnedMesh
              name="Astronaut"
              geometry={nodes.Astronaut.geometry}
              material={materials.Astronaut}
              skeleton={nodes.Astronaut.skeleton}
            >
              <meshPhysicalMaterial
                roughness={0}
                metalness={0}
                reflectivity={1}
                clearcoat={0.5}
              />
            </skinnedMesh>
          </group>
        </group>
      </group>
    </mesh>
  )
}

export default MovableObject

useGLTF.preload('models/astro.glb')
