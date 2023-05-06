import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

function Draggable({ children }) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    let pos1 = 0
    let pos2 = 0
    let pos3 = 0
    let pos4 = 0

    function elementDrag(e) {
      e.preventDefault()
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      element.style.top = `${element.offsetTop - pos2}px`
      element.style.left = `${element.offsetLeft - pos1}px`
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
        bottom: '20px',
        left: '710px',
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
