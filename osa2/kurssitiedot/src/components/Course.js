import React from 'react'

const Header = ({name}) => {
    return(
    <h2>{name}</h2>
    )
  }
  
  const Part = ({item}) => {
    return(
    <div>
      <li>{item.name} {item.exercises}</li>
    </div>
    )
  }
  
  const Total = ({parts}) => {
    
    return(
      <p>
        <b>total of {parts.reduce((total, part) => 
          total+=part.exercises
        , 0)} exercises</b>
      </p>
    )
  }
  
  const Content = ({parts}) => {
    return(
    <div>
      <ul>
        { parts.map(part => 
          <Part key={part.id} item={part} />
        )}
      </ul>
      <Total parts={parts} />
    </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      </div>
    )
  }

  export default Course