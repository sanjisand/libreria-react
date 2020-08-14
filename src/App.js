
import './components/styles/styles.css'
//
import React from 'react'
import { Provider } from 'react-redux'
import generateStore from './redux/store'
import { AppRoutes } from './router/AppRoutes'


const App = () => {

	const store = generateStore()

	return (
		<Provider store={store}>
			<AppRoutes />
    	</Provider>
	)
}

export default App
