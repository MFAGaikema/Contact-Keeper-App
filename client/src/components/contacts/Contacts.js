import React, {useContext, Fragment} from 'react'
import contactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';

import {CSSTransition, TransitionGroup} from 'react-transition-group';

const Contacts = () => {
  const {contacts, filtered} = useContext(contactContext);

  contacts.length === 0 && <h4>Please Add A Contact</h4>

  return (
    <Fragment>
      <TransitionGroup>
      {filtered !== null ? 
        filtered.map(contact => 
          <CSSTransition key={contact.id} timeout={500} classNames="item">
            <ContactItem contact={contact}/>
          </CSSTransition>) : 
        contacts.map(contact => 
          <CSSTransition key={contact.id} timeout={500} classNames="item">
            <ContactItem contact={contact}/>
          </CSSTransition>)}
      </TransitionGroup>
    </Fragment>
  )
}

export default Contacts
