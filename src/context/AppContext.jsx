/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const AppContext = createContext()

export function AppProvider({ children }) {
  const [height, setHeight] = useState(5)
  const [width, setWidth] = useState(5)
  const [skin, setSkin] = useState('β')
  const [time, setTime] = useState(false)
  const [seconds, setSeconds] = useState(20)
  const [position, setPosition] = useState({ x: 710, y: 20 })

  function updatePosition(x, y) {
    setPosition({ x, y })
  }

  const globalHeight = (param) => {
    setHeight(param)
  }

  const globalWidth = (param) => {
    setWidth(param)
  }

  const globalSkin = (param) => {
    console.log('skin', param)
    setSkin(param)
  }

  const globalTime = (param) => {
    setTime(param)
  }

  const globalSeconds = (param) => {
    setSeconds(param)
  }

  return (
    <AppContext.Provider
      value={{
        height,
        width,
        skin,
        time,
        seconds,
        position,
        globalHeight,
        globalWidth,
        globalSkin,
        globalTime,
        globalSeconds,
        updatePosition,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
