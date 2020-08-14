import Nav from './Nav'
import Search from './Search'
import Footer from './Footer'
import './styles/bookdetail.css'
//
import React, { Fragment, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import {Favorite, ShoppingCart} from '@material-ui/icons' 
import { Divider} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
//
import {useDispatch, useSelector} from 'react-redux'
import {getBookByIdAction, shopCarAction} from '../redux/bookDucks'

const BookDetail = () => {

	let {idB} = useParams()
	const dispatch = useDispatch()
	const book = useSelector(store => store.books.results)

	const handleShopCar = (id, title, price) => {
		const data = {
			id,
			title,
			price
		}
		dispatch(shopCarAction(data))
	}

	useEffect(() => {

		const dataFetch = () => {
			dispatch(getBookByIdAction(idB))
		}
		dataFetch()

	}, [dispatch, idB])

	return (
		<Fragment>
			<Nav/>
			<Search
				inSearchResults={false}
			/>
			<section className='book-detail-container'>	
				<Grid container spacing={1}  justify='center' alignContent='center'>
					<Grid item md={12} lg={4} xl={4}>
						<Grid container direction='column' alignContent='center' alignItems='center'>
							<div className='img-container'>
								<img src={book.book_cover} alt={book.title}/>
							</div>
							
							<Rating name="read-only" value={book.rate !== undefined ? book.rate : 0} readOnly size='medium' />
							<p>
								Precio: ${book.price}
							</p>
							<div className="btn-container">
								<Button 
									style={{marginBottom:8}}
									startIcon={<Favorite/>} 
									disableElevation color='secondary'
									fullWidth variant='contained'
								>
									Agregar a favoritos
								</Button>
								<Button 
									startIcon={<ShoppingCart/>} 
									disableElevation fullWidth
									variant='contained' color='primary'
									onClick={() => handleShopCar(book.id, book.title, book.price)}
								>
									Agregar al carrito
								</Button>
							</div>
						</Grid>
					</Grid>
					<Grid item md={12} lg={8} xl={8}> 
						<Divider variant='middle'/>
						<Grid container direction='column' justify='flex-start'>
							<h1> {book.title} </h1>
							<span className='author'> {book.author}, {book.editorial}</span>
							<div className="info-container">
								<p>
									{book.description}
								</p>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</section>
			<Footer/>
		</Fragment>
	)
}

export default BookDetail
