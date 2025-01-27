import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../store/authSlice'
import {Button, Input, Logo} from './index'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

/******  4506f1d3-6658-4b95-854d-fa59a3b8ddc8  *******/function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [error, setError] = useState("")
    const {register, handleSubmit, watch} = useForm()

    const create = async(data) => {
        setError("")                    //jitne bhi errors honge toh usko clear kr do
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser(data)
                if(userData) dispatch(login(userData));
                console.log("Redux state userData singup:", userData);
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 to-slate-700">
            <div className="w-96 bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 mb-4 grid h-28 place-items-center">
                    <div className="mb-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold text-white">
                        Create an account
                    </h2>
                </div>

                <div className="px-8 py-6">
                    {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                    
                    <form onSubmit={handleSubmit(create)} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="Full Name"
                                placeholder="Enter your full name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                                {...register("name", {
                                    required: true,
                                })}
                            />
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
                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm your password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: (value) => value === watch("password") || "Passwords do not match"
                                })}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                        >
                            <b>Sign Up</b>
                        </Button>
                    </form>
                </div>

                <div className="px-8 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup

