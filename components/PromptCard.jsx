'use client';

import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faThumbsUp} from '@fortawesome/free-solid-svg-icons';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [liked, setLiked] = useState(post.likes);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(''), 3000);
  }

  const handleProfile = () => {
    if(post.creator._id === session?.user.id){
      return router.push('/profile')
    }
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }
 
  const handleLikeClick = async () => {
    try {
      const updatedLikes = liked + 1;
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: 'PATCH',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({ ...post, likes: updatedLikes }),
      })
      if (res.ok) {
        setLiked(updatedLikes);
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleProfile}>
          <Image
            // src={post.creator.image}
            src='/assets/images/user.png'
            alt="A"
            width={40}
            height={40}
            className='rounded-full object-contain border-2 border-black-200'
            onClick={() => router.push(`/profile?id=${post.creator._id}`)}
          />
          <div>
            <h3>{post.creator.username}</h3>
            <p>{post.creator.email}</p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
            width={12}
            height={12}
            alt='copy to clipboard'
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <div className='flex justify-between font-inter text-sm '>
      <p className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}>{post.tag}</p>
      <p className='justify-end cursor-pointer' onClick={handleLikeClick} ><span className='mr-2'><FontAwesomeIcon icon={faThumbsUp} /></span>{liked}</p>
      </div>
      
      
      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>Edit</p>
          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
}

export default PromptCard