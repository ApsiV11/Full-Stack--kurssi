import React from 'react'
import Input from './Input'
import Button from './Button'

const PersonForm = ({handleNameChange, handleNumberChange, handleFormSend}) => (
    <form>
    <Input text="name:" handleChange={handleNameChange} />
    <Input text="number:" handleChange={handleNumberChange} />
    <Button text="add" type="submit" handleClick={handleFormSend} />
  </form>
)

export default PersonForm