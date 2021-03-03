import './App.css';

import { Fragment } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import ContactState from './context/contacts/ContactState';
import AuthState from './context/auth/AuthState';

const App = () => {
	return (
		<AuthState>
			<ContactState>
				<Router>
					<Fragment>
						<Navbar />
						<div className='container'>
							<Switch>
								<Route exact path='/'>
									<Home />
								</Route>
								<Route path='/about'>
									<About />
								</Route>
								<Route path='/register'>
								<Register />
							</Route>
							<Route path='/login'>
							<Login />
						</Route>
							</Switch>
						</div>
					</Fragment>
				</Router>
			</ContactState>
		</AuthState>
	);
};

export default App;
