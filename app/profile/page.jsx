'use client'

import React, { Component } from 'react'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Profile from '@components/profile'


const MyProfile = () => {
    const { data: session } = useSession()
    const [myPosts, setMyPosts] = useState([])

    useEffect(()=>{
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json()

            setPosts(data)
            if(session.user._id) fetchPosts()
        }
    }, [session?.user.id])
    
    const handleEdit = (id) => {}

    const handleDelete = async (id) => {}

  return (
    <Profile
        name = "My"
        desc = "My Profile"
        data = {myPosts}
        handleEdit = {handleEdit}
        handleDelete = {handleDelete}
    />
  )
}

export default MyProfile