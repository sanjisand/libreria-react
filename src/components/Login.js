import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './styles/auth.scss'
//
import {authLogin, startGoogleLogin} from '../redux/userDucks'
import { useForm } from '../hooks/useForm'
import { Link, Redirect } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {

	const dispatch = useDispatch()
	const { id, token } = useSelector(state => state.users)
	const [isChecking, setIsChecking] = useState(false)
	const [ formValues, handleInputChange ] = useForm({
		username: '',
		password: ''
	})
	const { username, password } = formValues 

	//funciones 
	const handleLogin = e => {

		e.preventDefault()
		//dispatch( startLoginusernamePassword(username, password) )  
	}

	const handleGoogleLogin = () => {
		dispatch( startGoogleLogin() )
	}

	useEffect(() => {

		if( id || token !== null ){
			setIsChecking(true)
		}
	}, [isChecking, id, token])

	if( isChecking ){
		return <Redirect to='/' />
	}
	return (
		<>
			<div className='auth__main'>
				<div className="auth__box-container">
					<h3 className='auth__title mb-1' >Iniciar sesión</h3>
					
					<form 
						onSubmit={ handleLogin } 
						className = 'animate__animated animate__fadeIn animate__faster' 
					>
						<input 
							className='auth__input' 
							type="text" 
							name="username" 
							placeholder="Nombre se usuario"
							autoComplete='off'
							onChange={ handleInputChange }
							value={ username }
						/>
						<input 
							className='auth__input' 
							type="password" 
							name="password" 
							placeholder="contraseña"
							onChange={ handleInputChange }
							value={ password }
						/>

						<button
							type='submit'
							className='btn btn-primary btn-block'
						>
							Entrar
						</button>
						
						<div className='auth__social-network mt-5 mb-5'>

							<div className="google-btn" onClick={ handleGoogleLogin }>
								<div className="google-icon-wrapper">
									<img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
								</div>
								<p className="btn-text">
									<b>Iniciar sesión con Google</b>
								</p>	
							</div>
						</div>
						<p>
							¿Aun no tienes una cuenta? Crea una nueva 
							<Link 
								to='/signup' 
								className='link'	
							> Aqui
							</Link>
						</p>
					</form>	
				</div>
			</div>
		</>
	)
}

export default Login
