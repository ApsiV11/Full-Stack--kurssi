import React from 'react'
import Input from './Input'

const FilterForm = ({handleFilterChange}) => (
    <form>
      <Input text="filter shown with" handleChange={handleFilterChange} />
    </form>
)

export default FilterForm