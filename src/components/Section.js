import BookCard from './BookCard'
//
import React, {Fragment} from 'react'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import withWidth from '@material-ui/core/withWidth'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import { makeStyles, Tooltip } from '@material-ui/core'

const useStyles = makeStyles({
	verMas:{
		marginTop:40,
		marginBottom: 40
	}
})

const Section = ({category, books}) => {

	const clases = useStyles()

	return (
		<Fragment>
			<Typography variant="h5" align='left' color="textSecondary" >
				{category}
			</Typography>
			<Divider variant="middle" />
			<Grid container justify="flex-start" direction="row" spacing={2}>
				{ 
					books.map( item => (
						<Grid item xs={12} sm={6} md={4} lg={2} xl={2} key={item.id} >
							<Hidden smDown >
								<BookCard
									price = {item.price}
									book_cover = {item.book_cover}
									rate = {item.rate}
									responsive = {false}
									id = {item.id}
									title = {item.title}
								/>
							</Hidden>
							<Hidden mdUp >
								<BookCard
									price = {item.price}
									book_cover = {item.book_cover}
									rate = {item.rate}
									responsive = {true}
									id = {item.id}
									title = {item.title}
								/>
							</Hidden>
						</Grid>
						
					))
				}
			</Grid>
			<Typography align='center' className={clases.verMas} >
				<Tooltip title="Ver más" arrow placement='top'>
					<IconButton color='primary' aria-label="ver todo">
						<ArrowForwardIosIcon/>
					</IconButton>
				</Tooltip>
			</Typography>
		</Fragment>
	)
}

export default withWidth()(Section)
