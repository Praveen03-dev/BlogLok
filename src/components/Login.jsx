import React, {useState} from 'react'
import {Form, Link, useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button, Input, Logo} from './index'
import {useDispatch} from 'react-redux'
import authService from '../appwrite/auth'
import { useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                console.log("Redux state userData Login:", userData);
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center h-[calc(100vh-var(--header-height))] px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 to-slate-700">
            <div className="w-96 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 mb-4 grid h-28 place-items-center">
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold text-white">
                        Sign in to your account
                    </h2>
                </div>

                <div className="px-8 py-6">
                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                    
                    <form onSubmit={handleSubmit(login)} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                                {...register("email", {
                                    required: true,
                                    validate: {
                                        matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || "Email address must be valid"
                                    }
                                })}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                                {...register("password", {
                                    required: true
                                })}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        >
                            <b>Sign In</b>
                        </Button>
                    </form>
                </div>

                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-center text-sm text-gray-600">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login