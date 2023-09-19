import PromptCard from '@components/PromptCard'
import React from 'react'

const page = () => {
    const post = {
        creator: {
            username: 'test',
            _id: '123'
        },
        prompt: 'test prompt',
        tag: '# test tag',
        likes: 0
    }

return (
    <>
        <div>Demo Page</div>
        <PromptCard
            post={post}
        />
    </>
)
}

export default page
