import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '@context/AppContext'

function Game() {
  const { height, time } = useContext(AppContext)
  return (
    <div>
      <Link to="/">↔return</Link>
      {height}
      {time.toString()}
    </div>
  )
}

export default Game
