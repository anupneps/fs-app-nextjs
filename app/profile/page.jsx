'use client'

import React from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Profile from '@components/profile'

const MyProfile = () => {
    const { data: session } = useSession()
    const [myPosts, setMyPosts] = useState([])
    const router = useRouter()
    
    useEffect(()=>{
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()
            setMyPosts(data)
        }
        if(session?.user.id){
            fetchPosts()
        } 
    }, [session?.user.id])
    
    const handleEdit = ()=> {
        router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (id) => {}

  return (
    <Profile
        name = {`${session?.user.name.split(' ')[0]}'s`}
        desc = "My Profile"
        data = {myPosts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default MyProfile