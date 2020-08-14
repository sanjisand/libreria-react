import './styles/bookcard.css'
import React from 'react'
import { Button, Tooltip, IconButton} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import { makeStyles } from '@material-ui/core/styles'
//
import {shopCarAction} from '../redux/bookDucks'
import {useDispatch} from 'react-redux'

const useStyles = makeStyles((theme) => ({
	shopCar:{
		color: '#fff',
		marginRight:5,
		marginLeft:5,
	},
}));

const useStylesBootstrap = makeStyles((theme) => ({
	arrow: {
		color: theme.palette.common.black,
	},
	tooltip: {
		backgroundColor: theme.palette.common.black,
	},
}));

const BootstrapTooltip = (props) => {
	const classes = useStylesBootstrap();

	return <Tooltip arrow classes = {classes} {...props}/>;
}

const BookCard = (props) => {

	const {id, title, rate, book_cover, price, responsive} = props
	const classes = useStyles();
	const dispatch = useDispatch()

	//funciones
	const handleShopCar = (id, title, price) => {
		const data = {
			id,
			title,
			price
		}
		dispatch(shopCarAction(data))
	}

	return (
		<div className="card">
			<div className={responsive ? 'card-rate-price' : 'card-rate-price hide animated-show'}>
				<Rating name="read-only" value={rate} readOnly size='small' />
				<p>{ '$' + price }</p>
			</div>
			<div className="card-body">
				<img src={book_cover} alt="book card"/>
			</div>
			<div className={responsive ? 'card-footer' : 'card-footer hide animated-show2'}>
				<BootstrapTooltip title='Agregar a carrito' placement='top' className={classes.tootip}>
					<IconButton 
						aria-label="AddShoppingCar" className={classes.shopCar} 
						size="medium"
						onClick={ () => handleShopCar(id, title, price)}
					>
						<AddShoppingCartIcon fontSize='large'/>
					</IconButton>
				</BootstrapTooltip>
				<Button 
					size="medium" 
					color="secondary" 
					variant='contained' 
					disableElevation
					href={`/libros/${id}/${title}`}
				>
					Comprar
				</Button>
			</div>
		</div>
	)
}

export default BookCard
