import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
  return (
    <div>
    <h2>{text}</h2>
    </div>
  )
}

const Button = ({text, handleClick}) => {
  return (
  <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({anecdotes, points, index}) => {
  return (
    <>
    <div>{anecdotes[index]}</div>
    <div>{"".concat("has ", points[index], " votes")}</div>
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Display anecdotes={anecdotes} points={points} index={selected} />
    
      <Button text="vote" handleClick= { () => {
        const copy=[...points]
        copy[selected]++
        setPoints(copy)
      }
        } />
    
      <Button text="next anecdote" handleClick= { () =>
         setSelected(Math.floor(Math.random()*(anecdotes.length)))} />
      
      <Header text="Anecdote with the most votes" />

      <Display anecdotes={anecdotes} points={points} index={points.indexOf(Math.max(...points))} />
      </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)