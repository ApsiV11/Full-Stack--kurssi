import React from 'react'
import Button from'./Button'

const Number = ({name, number, deletePerson}) => (
    <li>{name} {number} 
        <Button id={name}
          text="delete" 
          type="submit"
          handleClick={deletePerson}
        /></li>
)

export default Number