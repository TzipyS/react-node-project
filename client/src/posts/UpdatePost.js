import Axios from "axios";

const handleCheckboxChange = async ({id, posts, setPosts}) => {
        const post = posts.find(p => p._id === id)
        const updatedPost = {
            _id: post._id,
            title: post.title,
            body: post.body,
        }
        setPosts(posts.map(p => p._id === id ? updatedPost : p))
        try {
            await Axios.put("http://localhost:4500/api/posts", updatedPost)
        } catch (error) {
            console.error("Error updating post:", error)
            setPosts(posts)
        }
    };

export default handleCheckboxChange;