import { useState } from 'react'
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  
  const handleNameChange = (event) => { setNewName(event.target.value) }
  const handleNumberChange = (event) => { setNewNumber(event.target.value) }
  const handleSearchText = (event) => { 
    const searchText = event.target.value;
    setSearchText(searchText)
    if(!!searchText.length) {
      const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(searchText.toLowerCase()))
      setPersons(filteredPersons)
    }
  }
  const addName = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber }
    const nameExists = persons.map(person => person.name).includes(newName)
    if(nameExists) {
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={searchText} onChange={handleSearchText}/>
      <h2>Add a new</h2>
      <ContactForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Contacts contacts={persons}/>
    </div>
  )
}

export default App