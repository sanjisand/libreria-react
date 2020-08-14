import React, { useState, useEffect } from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import { useSelector } from 'react-redux';
//
import { Favorite } from '../components/Favorite'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import BookDetail from '../components/BookDetail'
import Inicio from '../components/Inicio'
import SearchResults from '../components/SearchResults'
import FinishShop from '../components/FinishShop'


export const AppRoutes = () => {

	const { id } = useSelector(state => state.users)
	const [isAuthenticated, setIsAuthenticated] = useState(true)

	useEffect(() => {
		if( id ){
			setIsAuthenticated(true)
		}
	}, [ id ])

	return (
	
		<Router>
			<div>
				<Switch>
					<Route path='/' component={Inicio} exact />
					<Route path='/libros/:idB/:titleB' component={BookDetail} exact />
					<Route path='/login' component={Login} exact />
					<Route path='/search/:title' component={SearchResults} />
					<Route path='/signup' component={SignUp} />
					<Route path='/shop' component={FinishShop} />
				
					{/* Private */}
					<Route 
						path='/favorite'
					>
						<Favorite isAuth= { isAuthenticated } />
					</Route>

					<Redirect to='/' />	
				</Switch>
			</div>
		</Router>
	)
}
