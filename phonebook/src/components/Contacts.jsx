const Contacts = ({contacts}) => {
    return (
        contacts.map((contact) => ( 
            <div key={contact.name}>
                <p>{contact.name} {contact.number}</p>
            </div>
        ))  
    )
}

export default Contacts
