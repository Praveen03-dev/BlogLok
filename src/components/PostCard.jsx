import React from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {        //appwrite me $id ka use krna padta h (not id)
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
        <Link to={`/post/${$id}`}>
            <div className="aspect-w-16 aspect-h-9 w-full">
                {featuredImage ? (
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="rounded-t-lg w-full h-48 object-cover"
                    />
                ) : (
                    <div className="rounded-t-lg w-full h-48 bg-gray-100 flex items-center justify-center text-gray-500">
                        No image available
                    </div>
                )}
            </div>
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors duration-200">
                    {title}
                </h5>
                <div className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                    Read more
                    <svg 
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2" 
                        aria-hidden="true" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 14 10"
                    >
                        <path 
                            stroke="currentColor" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default PostCard
