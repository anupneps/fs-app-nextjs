'use client';

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';

const PromtCardList = ({data, handleTagClick}) => {
  // console.log("promtcardlist- data: ", data);
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post, index) => (
        <PromptCard key={index} post={post} handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    
  }

  useEffect(() => {
    const fetchPosts= async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      console.log(data)
      setPosts(data);
    }
    // console.log("fetchData:", posts);

    fetchPosts();
  }, []);

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
     <PromtCardList data={posts} handleTagClick={()=>{}}/>
    </section>
  )
}

export default Feed