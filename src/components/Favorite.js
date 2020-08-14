import React from 'react'
import { useEffect } from 'react'
import { Redirect } from 'react-router-dom'

export const Favorite = ({ isAuth }) => {

	if (isAuth){
		return <Redirect to='/login' />
	}
	return (
		<div>
			privado
		</div>
	)
}
