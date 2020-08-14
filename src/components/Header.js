import Search from './Search'
import HeaderSlide from './HeaderSlide'
import Nav from './Nav'
import './styles/header.css'
import React, {Fragment, useEffect} from 'react'
//
import withWidth from '@material-ui/core/withWidth'
import Hidden from '@material-ui/core/Hidden'
//
import {useDispatch, useSelector} from 'react-redux'
import {getBookAction} from '../redux/bookDucks'

const Header = () => {

	const dispatch = useDispatch()
	let libro = useSelector(store => store.books.results)

	useEffect(() => {
		
		const dataFetch = () => {
			dispatch(getBookAction())
		}
		dataFetch()

	}, [dispatch])

	return (
		<Fragment>
			<Hidden mdDown>
				<header id='header' onLoad={ () => dispatch(getBookAction())}>
					<Nav/>
					<HeaderSlide
						books={libro}
						time={7000}
					/>
				</header>
			</Hidden>
				<Search
					inSearchResults={false}
				/>
			
			<Hidden lgUp>
				<Nav/>
			</Hidden>
		</Fragment>
	)
}

export default withWidth()(Header)
