import {updatePost as ApiupdatePost} from "./ApiPosts";

const handleCheckboxChange = async ({id, posts, setPosts}) => {
        const post = posts.find(p => p._id === id)
        const updatedPost = {
            _id: post._id,
            title: post.title,
            body: post.body,
        }
        setPosts(posts.map(p => p._id === id ? updatedPost : p))
        try {
            await ApiupdatePost(updatedPost);
        } catch (error) {
            console.error("Error updating post:", error)
            setPosts(posts)
        }
    };

export default handleCheckboxChange;