import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";



const Search = ({ data }) => {

    const [filteredPosts, setFilteredPosts] = useState([]);
    const [query, setQuery] = useState("");



    useEffect(() => {
        if (!data) return;
        const filteredPosts = data.filter(post =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.body.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredPosts(filteredPosts);
    }, [query, data]);



    return (
        <div>
            <div>
                <TextField onChange={(e) => setQuery(e.target.value)}
                    id="outlined-basic" label="Search" variant="outlined" />
            </div>
        </div>

    );
}
export default Search;