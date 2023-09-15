'use client';

import { useState, useEffect } from 'react'
import PromptCard from './PromptCard';
import { set } from 'mongoose';

const PromtCardList = ({ data, handleTagClick }) => {
  // console.log("promtcardlist- data: ", data);
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard key={index} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchText(e.target.value);
  }

  const handleTagClick = (tag) => {
    setSearchText(tag);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data)
    }
    // console.log("fetchData:", posts);
    fetchPosts();
    
  }, []);

  useEffect(()=> {
    const filtered = posts.filter((post)=> {
      return post.prompt.toLowerCase().includes(searchText.toLowerCase()) 
        || post.tag.toLowerCase().includes(searchText.toLowerCase())
        || post.creator.username.toLowerCase().includes(searchText.toLowerCase())
    });
      setFilteredPosts(filtered)
  }, [searchText, posts])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      { filteredPosts.length === 0 ? <p className='text-center mt-10'>No posts found</p>:
      <PromtCardList data={filteredPosts} handleTagClick={handleTagClick} />}
    </section>
  )
}

export default Feed