import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => {
return (
<h2>{text}</h2>
)
}

const Button = ({text, handleClick}) => {
  return (
  <button onClick={handleClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  const lineValue = () => {
    const sum=value[0]+value[1]+value[2]
    if(text==="all"){
      return sum
    }
    if(text==="average"){
      return (1*value[0]+(-1)*value[2])/sum
    }
    if(text==="positive"){
      return "".concat(value[0]/sum*100, " %")
    }
    else{
      return value
    }
  }
  return(<tr><td>{text}</td><td>{lineValue()}</td></tr>)
}

const Statistics = ({values}) => {
  if(values[0]+values[1]+values[2]>0){
    return (
      <div>
      <Header text="statistics" />
        <table>
          <tbody>
            <StatisticLine text="good" value={values[0]} />
            <StatisticLine text="neutral" value={values[1]} />
            <StatisticLine text="bad" value={values[2]} />
            <StatisticLine text="all" value={values} />
            <StatisticLine text="average" value={values} />
            <StatisticLine text="positive" value={values} />
          </tbody>
        </table>
      </div>
    )
  }
  else{
    return (
      <div>
        <Header text="statistics" />
        <div>
          <p>{"No feedback given"}</p>
        </div>
      </div>
    )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let values = [good, neutral, bad]

  return (
    <div>
      <Header text="give feedback" />
      <div>
        <Button text="good" handleClick={() => setGood(good+1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral+1)} />
        <Button text="bad" handleClick={() => setBad(bad+1)} />
      </div>
      <Statistics values={values} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)