import React, { useContext, Fragment, useEffect } from 'react';
import contactContext from '../../context/contacts/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Contacts = () => {
	const { contacts, filtered, getContacts, loading } = useContext(contactContext);

	useEffect(() => {
		getContacts();
		//eslint-disable-next-line
	}, []);

  if(contacts !== null && contacts.length === 0 && !loading) {
    return (
      <h4>Please Add A Contact</h4>
    )
  }

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? filtered.map((contact) => (
								<CSSTransition key={contact._id} timeout={500} classNames='item'>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: contacts.map((contact) => (
								<CSSTransition key={contact._id} timeout={500} classNames='item'>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
