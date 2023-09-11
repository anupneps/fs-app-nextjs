'use client';

import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, userRouter } from 'next/navigation';
import next from 'next';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  console.log("promtcard data :",post)
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div>
          <Image
            src={post.creator.image}
            alt="user profile picture"
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div>
            <h3>{post.creator.username}</h3>
            <p>{post.creator.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PromptCard