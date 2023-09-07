const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  const Part = ({parts}) => parts.map(({name, exercises}) =>
    <p key={name}>{name} {exercises}</p>
    )

  const Header = ({course}) => {
    return (
      <h1>{course}</h1>
    )
  }

  const Content = ({parts}) =>{
    return (
      <>
        <Part parts={parts} />
      </>
    )
  }

  const Total = ({parts}) => {
    const total = parts.reduce((acc, curValue) => acc + curValue.exercises, 0) 
    return (
      <p>Number of exercises {total}</p>
    )
  }

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App