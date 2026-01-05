import { Link } from "react-router-dom";
import { useEffect, useState } from "react"
import FormDialog from "./createPost";
import deletePost from "./DeletePost";
import Button from '@mui/material/Button';
import {fetchPosts as ApifetchPosts}from "./ApiPosts";
import UpdatePostDialog from "./UpdatePost"



const Posts = () => {
    const [posts, setPosts] = useState([])
    
    const fetchPosts = async () => {
        try {
            const { data } = await ApifetchPosts();
            setPosts(data)
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    if (posts.length === 0) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="posts">
            <FormDialog />
            {posts.map((post) => (
                <div key={post._id} className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <Button
                        variant="outlined"
                        onClick={() => deletePost({ id: post._id, posts, setPosts })} >
                        Delete
                    </Button>
                    <UpdatePostDialog post={post} posts={posts} setPosts={setPosts} />
                </div>

            ))}
            <Link to="/">Home</Link>
        </div>
        
    )
}
export default Posts;