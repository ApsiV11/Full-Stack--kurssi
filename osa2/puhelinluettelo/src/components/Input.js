import React from 'react'

const Input = ({text, handleChange}) => (
    <div>
        {text} <input onChange={handleChange} />
    </div>
)

export default Input