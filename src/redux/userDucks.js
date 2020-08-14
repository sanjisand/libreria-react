import axios from "axios"
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

//___________state____________
const initialState = {
	token: null,
	error: null,
	loading: true,
	username: null,
	id: null
}

//___________Types____________
const AUTH_START = 'AUTH_START'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const AUTH_FAIL = 'AUTH_FAIL'
const AUTH_LOGOUT = 'AUTH_LOGOUT'
const SIGN_UP = 'SIGN_UP'
const SIGN_UP_FAIL = 'SIGN_UP_FAIL'

//___________Reducer____________
export default function User(state = initialState, action){

	switch (action.type){
		case AUTH_START:
			return{
				state,
				error: null,
				loading: true
			}
		
		case AUTH_SUCCESS:
			return{
				...state,
				...action.payload,
				loading: false
			}

		case AUTH_FAIL:
			return{
				state,
				error: action.error,
				loading: false
			}

		case SIGN_UP:
			return{
				...state,
				...action.payload
			}

		case AUTH_LOGOUT:
			return{
				state,
				token: null
			}

		case SIGN_UP_FAIL: 
			return{
				...state,
				error: action.payload
			}

		default:
			return state
	}
} 


//___________Action____________
export const authStart = () => {
	
	return{
		type: AUTH_START
	}
}


export const authSuccess = (token, username, id ) => {
	
	return{
		type: AUTH_SUCCESS,
		payload: {
			token,
			username,
			id
		}
	}
}

export const authFail = error => {

	return{
		type: AUTH_FAIL,
		error
	}
}

export const signUpFail = error => {
	return{
		type: SIGN_UP_FAIL,
		payload: error
	}
}

export const checkTimeAuthExpiration = expirationTime => {
	
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime*1000)
	}
}

export const logout = () => {

	localStorage.removeItem('user')
	localStorage.removeItem('expirationDate')

	return{
		type: AUTH_LOGOUT
	}
}

export const authLogin = (username, password) =>  async(dispatch) => {

	try {
		const res = await axios.post('http://127.0.0.1:8000/rest-auth/login/', {
			username,
			password
		})
		const token = res.data.key
		console.log(res.data)
		localStorage.setItem('token', token)
		dispatch({
            type: AUTH_SUCCESS,
            payload: {token}
        })
		
	} catch (error) {
		console.log(error)
	}
}

export const authSignUp = (data) => {

	return (dispatch) => {
	
		fetch('http://127.0.0.1:8000/users/api/create-user/', {
			method: 'POST',
			headers: { 
				'Authorization': 'Token 52fd5386ef934dd6ce985d90eb4bc3165e6a67cd',
				'Content-Type': 'application/json '
			},
			body: JSON.stringify(data)
		})
		.then(async res => {
			const resp = await res.json()
			if( res.status === 201 ){
				Swal.fire({
					title: 'Usuario creado con exito', 
					icon: 'success',
					showConfirmButton: false,
					allowOutsideClick: false,
					footer: "<a class='btn-iniciar' href='http://localhost:3000/login'>Iniciar sesión</a>"
				})
			}
			else if ( res.status === 400 ){
				dispatch( signUpFail(resp) )
			}
			console.log(resp, res.status)
		})
		.catch(error => console.error('Error:', error))
	}
} 

export const startGoogleLogin = () => {
	
	return ( dispatch ) => {

		firebase.auth().signInWithPopup(googleAuthProvider)
			.then( ({ user }) => {
				
				const userData = {
					id: user.uid,
					username: user.displayName
				}
				localStorage.setItem('user', userData)
				
				dispatch( authSuccess(null, user.displayName, user.uid) )
			})
	}
}

export const startLogout = () => {

	return async (dispatch) => {
		await firebase.auth().signOut()
		dispatch( logout() )
	}
}
