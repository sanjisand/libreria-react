import './styles/search.css'
import logo from '../static/fukuro2.png'
//
import React, { useRef, useState, useEffect } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import {useHistory} from 'react-router-dom'
//
import {getBookByTitleAction} from '../redux/bookDucks'
import {useDispatch} from 'react-redux'

const Search = ({inSearchResults}) => {

	const isearch = useRef()
	const history = useHistory()
	const [title, setTitle] = useState('')
	const dispatch = useDispatch()
	
	const handleSearch = e => {
		if(inSearchResults){
			e.preventDefault()
			dispatch(getBookByTitleAction(title))
		}
		else{
			if(isearch.current.value !== ''){
				history.push(`/search/${title}`)
			}
			else{
				e.preventDefault()
			}
		}
	}

	useEffect(() => {
		
	}, [title])

	return (
		<div className='search-container'>
			<div className="search-brand">
				<img src={logo} alt=""/>
				<span>Fukuro</span>
			</div>
			<form className='search-form' method='GET' onSubmit={(e) => handleSearch(e) }>
				<div className='input-container'>
					<input 
						type="search" 
						className='search-input' 
						placeholder='Buscar libro' 
						ref={isearch}
						onChange={() => setTitle(isearch.current.value)}
					/>
					<button type='submit'>
						<SearchIcon fontSize='large' />
					</button>
				</div>
			</form>

		</div>
	)
}

export default Search
