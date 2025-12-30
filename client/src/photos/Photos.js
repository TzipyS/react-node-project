import { Link } from "react-router-dom";
import Axios from "axios";
import { useEffect, useState } from "react";

const Photos = () => {
    const [photos, setPhotos] = useState([])    
    const fetchPhotos = async () => {
        try {
            const {data} = await Axios.get("http://localhost:4500/api/photos")
            setPhotos(data)
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    }
    useEffect(() => {
        fetchPhotos()
    }, [])
    if (photos.length === 0) {
        return <h1>Loading...</h1>
    }
    return (
        <div className="photos">
            {photos.map((photo) => (
                <div key={photo._id} className="photo-item">
                    <h3>{photo.title}</h3>
                    <img src={`http://localhost:4500${photo.imageUrl}`} alt={photo.title} 
                    onError={(e) => e.target.src = "/placeholder.png"} // במקרה שתמונה לא נטענת
                    />
                </div>
            ))}
            <Link to="/">Home</Link>
        </div>
    )
}
export default Photos;