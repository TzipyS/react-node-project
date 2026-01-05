import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import deletePhoto from './DeletePhoto';
import UpdatePhotoDialog from "./UpdatePhoto"
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';





export default function TitlebarImageList({ photos, setPhotos }) { // צריך להעביר setPhotos
    return (
        <ImageList
            sx={{
                width: '100%',
                height: 'auto',
                margin: 0,
            }}
            cols={3}
            gap={8}
        >
            {photos.map((photo) => (
                <ImageListItem key={photo._id}>
                    <img
                        src={`http://localhost:4500${photo.imageUrl}`}
                        alt={photo.title}
                        loading="lazy"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'cover',
                        }}
                        onError={(e) => (e.target.src = '/placeholder.png')}
                    />

                    <ImageListItemBar
                        title={photo.title}
                        actionIcon={
                            <>
                                {/* <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${photo.title}`}
                                >
                                    <InfoIcon />
                                </IconButton> */}

                                {/* <Button
                                    variant="outlined"
                                    startIcon={<DeleteIcon />}
                                    sx={{ color: 'white', borderColor: 'white', ml: 1 }}
                                    onClick={() => deletePhoto({ id: photo._id, photos, setPhotos })}
                                >
                                    DELETE
                                </Button> */}

                                <UpdatePhotoDialog photo={photo} photos={photos} setPhotos={setPhotos} />
                                    
                                <IconButton aria-label="delete"
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    onClick={() => deletePhoto({ id: photo._id, photos, setPhotos })}
                                >
                                    <DeleteIcon />
                                </IconButton>

                            </>
                        }
                    />
                </ImageListItem>
            ))}
        </ImageList>
    );
}
