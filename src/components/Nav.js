import React from 'react'
import PropTypes from 'prop-types'
import {AppBar, Toolbar} from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import MenuNav from './MenuNav'

function ElevationScroll(props) {
	const {
		children,
		window
	} = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};


const Nav = (props) => {
	return (
		<ElevationScroll {...props}>
			<AppBar color='transparent'>
				<Toolbar>
					<MenuNav/>
				</Toolbar>
			</AppBar>
		</ElevationScroll>
	)
}

export default Nav
