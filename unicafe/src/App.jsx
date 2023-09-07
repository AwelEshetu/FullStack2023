import { useState } from 'react'

const Button = ({handleClick, label}) =>{
  return(
    <button onClick={handleClick}>{label}</button>
  )
}

const Header = ({title}) => {
  return (
    <h4>{title}</h4>
  )
}

const NoFeedBack = () => {
  return <p>No feedback given</p>
}

const StatisticLine = ({label, value, suffix=null}) => {
  return(
    <tr>
      <td>{label} {value} {suffix}</td>
    </tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const total = good - bad;
  const average = total / all ;
  const positive = (good / all) * 100 ;
  if(all > 0){
    return(
      <>
      <h3>Statistics</h3>
      <table>
        <tbody>
          <StatisticLine label="good" value={good} />
          <StatisticLine label="neutral" value={neutral} />
          <StatisticLine label="bad" value={bad} />
          <StatisticLine label="all" value={all} />
          <StatisticLine label="average" value={average} />
          <StatisticLine label="positive" value={positive} suffix="%"/>
        </tbody>
    </table>
    </>
    )
  }
  return <NoFeedBack />
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const title = "Give feedback";
  const handleGood = () => {
    setGood(good +1)
  }

  const handleBad = () => {
    setBad(bad +1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <Header title={title} />
      <div>
        <Button handleClick={handleGood} label="good"/>
        <Button handleClick={handleNeutral} label="neutral"/>
        <Button handleClick={handleBad} label="bad"/> 
      </div>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App