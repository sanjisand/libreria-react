import axios from 'axios'

// constantes
const dataInicial = {
    loading: false,
    search:[],
    results: [],
    section1:[],
    section2:[],
    section3:[],
    fav:[],
    shopCar:[]
}

// types
const DELETE_SHOP_CAR = 'DELETE_SHOP_CAR'
const GET_BOOK_SUCCESS = 'GET_BOOK_SUCCESS'
const GET_SHOP_CAR = 'GET_SHOP_CAR'
const GET_BOOK_BY_TITLE = 'GET_BOOK_BY_TITLE'
const GET_BOOK_BY_CATEGORY_SUCCESS1 = 'GET_BOOK_BY_CATEGORY_SUCCESS1'
const GET_BOOK_BY_ID_SUCCESS = 'GET_BOOK_BY_ID_SUCCESS'
const GET_BOOK_BY_CATEGORY_SUCCESS2 = 'GET_BOOK_BY_CATEGORY_SUCCESS2'
const GET_BOOK_BY_CATEGORY_SUCCESS3 = 'GET_BOOK_BY_CATEGORY_SUCCESS3'
const GET_BOOK_START = 'GET_BOOK_START'

// reducer
export default function bookReducer(state = dataInicial, action){

    switch(action.type){
        case GET_BOOK_SUCCESS:
            return {
				...state, 
                ...action.payload,
			}
        case GET_BOOK_START:
            return {
				...state, 
				loading: true
			}
        case GET_BOOK_BY_CATEGORY_SUCCESS1:
            return {
                ...state,
                ...action.payload
			}
        case GET_BOOK_BY_CATEGORY_SUCCESS2:
            return {
                ...state,
                ...action.payload
			}
        case GET_BOOK_BY_CATEGORY_SUCCESS3:
            return {
                ...state,
                ...action.payload
			}
        case GET_BOOK_BY_ID_SUCCESS:
            return {
                ...state,
                ...action.payload
			}
        case GET_BOOK_BY_TITLE:
            return {
                ...state,
                ...action.payload
			}
        case GET_SHOP_CAR:
            return {
                ...state,
                ...action.payload
			}
        case DELETE_SHOP_CAR:
            return {
                ...state,
                ...action.payload
			}
        
        default:
            return state
    }
}


// acciones
export const getBookStart = () => {
    return {
        type: GET_BOOK_START
    }
}

export const shopCarAction = (data) => {
    let car = []

    if(localStorage.getItem('shopCar')){
        car = JSON.parse(localStorage.getItem('shopCar'))
        if (!car.find(item => item.id === data.id)){
            car.push(data)
            localStorage.setItem('shopCar', JSON.stringify(car))
        }
    }
    else{
        car.push(data)
        localStorage.setItem('shopCar', JSON.stringify(car))
    }
    return (dispatch) => {
        dispatch({
            type: GET_SHOP_CAR,
            payload:{
                shopCar:car
            }
        })
    }
}
export const deleteItemShopCarAction = (id) => {
    let car = []
    car = JSON.parse(localStorage.getItem('shopCar'))
    const carFiltrado = car.filter(item => id !== item.id)
    localStorage.setItem('shopCar', JSON.stringify(carFiltrado))
    return (dispatch) => {
        dispatch({
            type: DELETE_SHOP_CAR,
            payload:{
                shopCar:carFiltrado
            }
        })
    }
}

export const getBookAction = () => async (dispatch) => {

    if(localStorage.getItem('inHome')){
        dispatch({
            type: GET_BOOK_SUCCESS,
            payload: {results: JSON.parse(localStorage.getItem('inHome'))}
        })
    }
    else{
        try {
            dispatch(getBookStart())
            const res = await axios.get('http://127.0.0.1:8000/books/api/list')
            const inHome = res.data.filter(libro => libro.in_home === true)
            localStorage.setItem('inHome', JSON.stringify(inHome))
            
            dispatch({
                type: GET_BOOK_SUCCESS,
                payload: {
                    results: inHome,
                    loading: false
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const getBookByTitleAction = (title) => async (dispatch) => {
    try {
        const res = await axios.get('http://127.0.0.1:8000/books/api/search?title=' + title)
        dispatch({
            type: GET_BOOK_BY_TITLE,
            payload: {
                search: res.data,
            }
        })
    } catch (error) {
        console.log(error)
    }
   
}

export const getBookByIdAction = (id) => async (dispatch) => {

    try {
        const res = await axios.get(`http://127.0.0.1:8000/books/api/detail/${id}/`)
        dispatch({
            type: GET_BOOK_BY_ID_SUCCESS,
            payload: {
                results: res.data
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export const getBookByCategoryAction1 = (category) => async (dispatch) => {

    if(localStorage.getItem('sec1')){
        dispatch({
            type: GET_BOOK_BY_CATEGORY_SUCCESS1,
            payload: {section1: JSON.parse(localStorage.getItem('sec1'))}
        })
    }
    else{
        try {
            const res = await axios.get(`http://127.0.0.1:8000/books/api/list-by-category/?category=${category}`)
            localStorage.setItem('sec1', JSON.stringify(res.data))
            dispatch({
                type: GET_BOOK_BY_CATEGORY_SUCCESS1,
                payload: {
                    section1: res.data
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

}
export const getBookByCategoryAction2 = (category) => async (dispatch) => {

    if(localStorage.getItem('sec2')){
        dispatch({
            type: GET_BOOK_BY_CATEGORY_SUCCESS2,
            payload: {section2: JSON.parse(localStorage.getItem('sec2'))}
        })
    }
    else{
        try {
            const res = await axios.get(`http://127.0.0.1:8000/books/api/list-by-category/?category=${category}`)
            localStorage.setItem('sec2', JSON.stringify(res.data))
            dispatch({
                type: GET_BOOK_BY_CATEGORY_SUCCESS2,
                payload: {
                    section2: res.data
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export const getBookByCategoryAction3 = (category) => async (dispatch) => {

    if(localStorage.getItem('sec3')){
        dispatch({
            type: GET_BOOK_BY_CATEGORY_SUCCESS3,
            payload: {section3: JSON.parse(localStorage.getItem('sec3'))}
        })
    }
    else{
        try {
            const res = await axios.get(`http://127.0.0.1:8000/books/api/list-by-category/?category=${category}`)
            localStorage.setItem('sec3', JSON.stringify(res.data))
            dispatch({
                type: GET_BOOK_BY_CATEGORY_SUCCESS3,
                payload: {
                    section3: res.data
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
