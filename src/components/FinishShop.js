import Search from './Search'
import Nav from './Nav'
import Footer from './Footer'
import './styles/menunav.css'
//
import React, { Fragment, useState, useEffect } from 'react'
import { Grid, Typography, Divider } from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
//
import {useDispatch, useSelector} from 'react-redux'
import {deleteItemShopCarAction} from '../redux/bookDucks'

const FinishShop = () => {


	const dispatch = useDispatch()
	const [bookCar, setBookCar] = useState([])
	const total = useSelector(store => store.books.total)

	const deleteItem = id => {
		dispatch(deleteItemShopCarAction(id))
		setBookCar(JSON.parse(localStorage.getItem('shopCar')))
	}

	useEffect(() => {
		console.log(total)
		if(localStorage.getItem('shopCar')){
			setBookCar(JSON.parse(localStorage.getItem('shopCar')))
		}

	}, [dispatch, total])

	return (
		<Fragment>
			{
				bookCar <= 0 ? (
					<div>
						<Nav/>
						<Search 
							inSearchResults={false}
						/>

						<Typography variant='h3' align='center' >
							Parece que no tienes nada en tu carrito
						</Typography>
					</div>
				):(
					<div>
						<Nav/>
						<Search 
							inSearchResults={false}
						/>
						<Typography variant='h5' align='center' >
							Proceso de compra
						</Typography>
						<Grid container justify='center' direction='row'>
							<Grid item lg={3} xl={3}>
								<h4>Articulos a comprar:</h4>
								<div className='menu-car'>
									<div className='car-body'> 
										{
											bookCar.map(item => (
												<div key={item.id}>
													<div className='card-car'>
														<p className='p1'> {item.title}</p>
														<p className='p2'>${item.price}</p>
														<button onClick={ () => deleteItem(item.id)}>
															<HighlightOffIcon fontSize='large' />
														</button>
													</div>
													<Divider variant='middle'/>
												</div>
											))
										}
									</div>
								</div>
							</Grid>
							<Grid constainer justify='flex-end' lg={9} xl={9}>
								<Grid item alignItems='flex-end' spacing={3}>
									<div>
										<form className='form-pay' >
											<h4>Llena los siguientes datos para continuar</h4>
											<label htmlFor="noTarjeta">Numero de tarjeta:</label>
											<input type="number" id='noTarjeta' placeholder='16 digitos de su targeta' required/>
											<span>Titular: </span>
											<input type="text" placeholder='Titular' required/>
											<span>Fecha de caducidad: </span>
											<input type="month" placeholder='DD / YYYY' required/>
											<span>CVV:</span>
											<input type="number" name="" id="" placeholder='3 digitos ' required/>
											<button type='submit'>Proceder a pagar</button>
										</form>
									</div>
								</Grid>
							</Grid>
						</Grid>
					</div>
				)
			}
			<Footer />
		</Fragment>
	)
}

export 


default FinishShop
