import { useState, useEffect } from 'react'
import personService from './services/persons'
 
import Contacts from './components/Contacts'
import Filter from './components/Filter'
import ContactForm from './components/ContactForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => { 
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

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
      window.alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const person = persons.find(person => person.name === newName)
      const updatedPerson = {...person, number: newNumber}
      personService.update(updatedPerson.id, updatedPerson)
        .then(returnedPerson => {
          const filteredPersons = persons.filter(person => person.id !== returnedPerson.id)
          setPersons(filteredPersons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(`the person '${person.name}' was already deleted from server`)
          const filteredPersons = persons.filter(person => person.id !== person.id)
          setPersons(filteredPersons)
        })
      return
    }
    personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      }
      )

  }

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    const confirm = window.confirm(`Delete ${person.name}?`)
    if(confirm) {
      personService.remove(id)
        .then(() => {
          const filteredPersons = persons.filter(person => person.id !== id)
          setPersons(filteredPersons)
        }).catch(error => {
          alert(`the person '${person.name}' was already deleted from server`)
          const filteredPersons = persons.filter(person => person.id !== id)
          setPersons(filteredPersons)
        })
    }
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
      <Contacts contacts={persons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App