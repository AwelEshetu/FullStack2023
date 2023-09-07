import { useState } from 'react'

const Button = ({label, handleClick}) => {
  return <button onClick={handleClick}>{label}</button>
}

const Header = ({label}) => {
  return <h1>{label}</h1>
}

const Anecdote = ({anecdote, vote}) => {
  return (
    <>
    {anecdote}
    <p>has {vote} votes</p>
    </>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleNext = () => {
    const next = Math.floor(Math.random() * anecdotes.length);
    setSelected(next)
  }

  const handleVote = () => {
    const voteCopy = [...votes];
    voteCopy[selected] +=1
    setVotes(voteCopy)
  }
  
  const maxVote = () => {
    return Math.max(...votes);
  }

  const topAnecdote =() => {
    const vote = maxVote()
    const topVotedIndex = votes.indexOf(vote);
    return anecdotes[topVotedIndex]
  }

  return (
    <div>
      <Header label="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <div>
        <Button label="vote" handleClick={handleVote}/>
        <Button label="next anecdote" handleClick={handleNext}/>
      </div>
      <div>
      <Header label="Anecdote with most votes"/>
      <Anecdote anecdote={topAnecdote()} vote={maxVote()} />
      </div>
    </div>
  )
}

export default App