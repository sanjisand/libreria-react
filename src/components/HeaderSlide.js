import React, {useState, useEffect} from 'react'
import { Button, Typography } from '@material-ui/core'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const HeaderSlide = ({books, time}) => {

	const [activeIndex, setActiveIndex] = useState(0)

	const left = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1)
		} else {
			setActiveIndex(books.length - 1)
		}
	}

	const right = () => {
		if (activeIndex < books.length - 1) {
			setActiveIndex(activeIndex + 1)
		} else {
			setActiveIndex(0)
		}
	}

	useEffect(
		() => {
			const tick = setInterval(() => {
				if (activeIndex < books.length - 1) {
					setActiveIndex(activeIndex + 1)
				} else {
					setActiveIndex(0)
				}
			}, time)

			return () => clearInterval(tick)
		},[activeIndex, books.length, time]
	)

	return (
		<div>
			<button className='arrow-left' onClick={left}>
				<ArrowBackIosIcon/>
			</button>
			<button className='arrow-right' onClick={right}>
				<ArrowForwardIosIcon/>
			</button>
			{books.map((book, index) => (
				<div 
					className={
						index === activeIndex
						  ? 'header-container slideShow'
						  : 'header-container slideHide'
					  }
					style={{backgroundImage: 'url(' +book.image+ ')'}}
					key={book.id}
				>
					<div className="card">
						<div className='card-imagen'>
							<img src={book.book_cover} alt={book.title}/>
						</div>
						<div className="card-body">
							<div className="card-text">
								<Typography variant='h3' >
									{book.title}
								</Typography>
								<p>
									{book.description}
								</p>

								<Button 
									variant="contained" color="secondary"
									href={`/libros/${book.id}/${book.title}`}
								>
									Ver Libro
								</Button>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default HeaderSlide
