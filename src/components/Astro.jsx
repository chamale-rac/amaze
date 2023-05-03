/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

function Astro({ activeAnimation = 'Idling' }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF(
    '../../public/models/astro.glb',
  )
  const { actions } = useAnimations(animations, group)

  const animationNames = animations.map((animation) => animation.name)

  console.log(animationNames)

  useEffect(() => {
    if (activeAnimation) {
      actions[activeAnimation].play()
    } else {
      actions[activeAnimation].stop()
    }
  }, [activeAnimation, actions])

  return (
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
  )
}

export default Astro

useGLTF.preload('../../public/models/astro.glb')
