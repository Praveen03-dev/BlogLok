import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {},[])
    appwriteService.getPosts([]).then((posts) => {          //query ka return array me aata h
        if(posts) {
            setPosts(posts.documents)
        }
    }).catch((err) => console.log(err))

    if(posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <p>Login to read Posts</p>
                        </div>
                    </div>   
                </Container>        
            </div>
        )
    }

    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}    
                </div>   
            </Container>
        </div>
    )
}

export default Home