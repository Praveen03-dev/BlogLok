import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='rounded-lg border border-white/10 bg-primary px-7 py-3 text-base font-medium text-white hover:bg-opacity-90'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn