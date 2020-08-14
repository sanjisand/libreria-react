import './styles/body.css'
import Section from './Section'
//
import React, {useEffect} from 'react'
//
import {useDispatch, useSelector} from 'react-redux'
import {
	getBookByCategoryAction1,
	getBookByCategoryAction2,
	getBookByCategoryAction3,
} from '../redux/bookDucks'


const Body = () => {

	const dispatch = useDispatch()
	const libros1 = useSelector(store => store.books.section1)
	const libros2 = useSelector(store => store.books.section2)
	const libros3 = useSelector(store => store.books.section3)

	useEffect( () => {

		const dataFetch = () => {
			dispatch(getBookByCategoryAction1('Autosuperación'))
			dispatch(getBookByCategoryAction2('Thriller'))
			dispatch(getBookByCategoryAction3('Suspenso'))
		}
		dataFetch()

	}, [dispatch])

	return (
		<section className='section-container'>
			<Section
				category = 'Autosuperación'
				books={libros1}
			/>
			<Section
				category = 'Thriller'
				books={libros2}
			/>
			<Section
				category = 'Suspenso'
				books={libros3}
			/>
		</section>
	)
}

export default Body
