import React from 'react'
import Number from './Number'

const Persons = ({showPersons, deletePerson}) => (
    <ul>
        {showPersons.map((person, i) => 
        <Number 
          key={i} 
          name={person.name} 
          number={person.number} 
          deletePerson={deletePerson} />
        )}
    </ul>
)

export default Persons