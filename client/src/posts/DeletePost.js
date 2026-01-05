import {deletePost as ApideletePost} from "./ApiPosts";

const deletePost = async ({id, posts, setPosts}) => {
        const originalPosts = [...posts];

        setPosts(posts.filter(p => p._id !== id));
        try {
            await ApideletePost({ _id: id });
        } catch (error) {
            console.error("Error deleting post:", error);
            setPosts(originalPosts);
        }
    };

export default deletePost;

