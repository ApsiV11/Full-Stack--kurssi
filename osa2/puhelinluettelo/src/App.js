import React, { useState, useEffect } from 'react'
import FilterForm from './components/FilterForm'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  useEffect(() => {
    console.log('effect')
    personService.getPersons().then(persons => setPersons(persons))
  }, [])

  const [newPerson, setNewPerson] = useState({name:'', number:''})
  const [filter, setFilter] = useState('')

  const [notification, setNotification] = useState(null)
  const [notificationColor, setNotificationColor] = useState('green')

  const handleNameChange = (event) => {
    setNewPerson({...newPerson, name:event.target.value})
  }

  const handleNumberChange = (event) => {
    setNewPerson({...newPerson, number:event.target.value})
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleFormSend = (event) => {
      event.preventDefault()

      const index=persons.findIndex((person) =>
      person.name===newPerson.name)

      if(index!==-1){
        if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
          personService.updatePerson(persons[index].id, newPerson)
          .then(updatedPerson => setPersons(persons.map(person =>
            person.name!==updatedPerson.name ? person : updatedPerson
          )))
          .catch(error => {
            console.log(error)
            showNotification(`Information of ${newPerson.name} has already been removed from srver`, "red")
          })
           showNotification(`Successfully updated ${newPerson.name}!`, "green")
         }
      }
      else{
        personService.createPerson(newPerson)
        .then(person => setPersons(persons.concat(person)))
        showNotification(`Successfully created ${newPerson.name}!`, "green")      
      }
  }

  const showPersons = persons.filter((person) => 
  person.name.toLowerCase()
  .includes(filter.toLowerCase()) 
  || person.number.toLowerCase()
  .includes(filter.toLowerCase())
  )

  const deletePerson = (event) =>{
    const personName=event.target.id
    if(window.confirm(`Delete ${personName}?`)){
      const index=persons.find( person =>
        person.name===personName).id
        personService.deletePerson(index)
        
        setPersons(persons.filter(person =>
          person.name!==personName
        ))
        showNotification(`Successfully deleted ${personName}!`, "green")  
    }
  }

  const showNotification = (text, color) =>{
    setNotification(text)
    setNotificationColor(color)
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} color={notificationColor} />
      <FilterForm handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm handleNameChange={handleNameChange}
       handleNumberChange={handleNumberChange}
       handleFormSend={handleFormSend}
       />
      <h3>Numbers</h3>
      <Persons showPersons={showPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App