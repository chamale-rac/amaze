// Final version: v1.0.0
import React, { useRef, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '@context/AppContext'

function Draggable({ children }) {
  const elementRef = useRef(null)
  const { position, updatePosition } = useContext(AppContext)

  useEffect(() => {
    const element = elementRef.current
    let pos1 = 0
    let pos2 = 0
    let pos3 = position.x // Use the position from the context
    let pos4 = position.y // Use the position from the context

    function elementDrag(e) {
      e.preventDefault()
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      element.style.top = `${element.offsetTop - pos2}px`
      element.style.left = `${element.offsetLeft - pos1}px`

      // Update the position in the context
      updatePosition(element.offsetLeft - pos1, element.offsetTop - pos2)
    }

    function closeDragElement() {
      document.onmouseup = null
      document.onmousemove = null
    }

    function dragMouseDown(e) {
      e.preventDefault()
      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
    }

    element.addEventListener('mousedown', dragMouseDown)
    return () => {
      element.removeEventListener('mousedown', dragMouseDown)
    }
  }, [])

  return (
    <div
      ref={elementRef}
      style={{
        bottom: `${position.y}px`, // Use the position from the context
        left: `${position.x}px`, // Use the position from the context
        cursor: 'move',
        position: 'absolute',
        width: '500px',
        height: '100px',
        backgroundColor: 'transparent',
        userSelect: 'none',
      }}
    >
      <span>drag ↑◙</span>
      {children}
    </div>
  )
}

Draggable.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Draggable
