import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";

const Posts = () => {
    const [posts, setPosts] = useState([])
    const fetchPosts = async () => {
        try {
            const {data} = await Axios.get("http://localhost:4500/api/posts")
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
            {posts.map((post) => (
                <div key={post.id} className="post-item">
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
            <Link to="/">Home</Link>
        </div>
    )
}   
export default Posts;