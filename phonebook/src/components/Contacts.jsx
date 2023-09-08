const Contacts = ({contacts, handleDelete}) => {
    return (
        contacts.map((contact) => ( 
            <div key={contact.name} >
                {contact.name} {contact.number}
                <button onClick={() => handleDelete(contact.id)}>delete</button>
            </div>
        ))  
    )
}

export default Contacts
