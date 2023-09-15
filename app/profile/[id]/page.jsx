'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Profile from '@components/profile'

const UserProfile = ({params}) => {
    const [posts, setposts] = useState([])
    const searchParams = useSearchParams();
    const userName = searchParams.get('name')
    console.log("userprofile- params: ", params)
    useEffect(()=>{
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params?.id}/posts`)
            const data = await response.json()
            setposts(data)
        }
        if(params?.id){
            fetchPosts()
        } 
    }, [params.id])
    
  return (
    <Profile
        name = {userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data = {posts}
    />
  )
}

export default UserProfile