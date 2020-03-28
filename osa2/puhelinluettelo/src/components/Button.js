import React from 'react'

const Button = ({id, text, type, handleClick}) => (
    <button id={id} 
      type={type} 
      onClick={handleClick}
      >{text}</button>
)

export default Button