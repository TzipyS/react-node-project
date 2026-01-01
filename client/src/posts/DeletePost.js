import Axios from "axios";

const deletePost = async ({id, posts, setPosts}) => {
        const originalPosts = [...posts];

        setPosts(posts.filter(p => p._id !== id));
        try {
            await Axios.delete("http://localhost:4500/api/posts", { data: { _id: id } });
        } catch (error) {
            console.error("Error deleting post:", error);
            setPosts(originalPosts);
        }
    };

export default deletePost;
