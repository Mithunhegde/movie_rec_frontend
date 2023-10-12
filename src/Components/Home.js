import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import '../App.css';

function Home() {

    const [formData, setFormData] = React.useState({
        description: ''
      });

    const [imageUrls,setImageUrl]= React.useState([]);
    const [images, setImages] = React.useState([]);


    React.useEffect(() => {
        // Function to fetch images using Promises
        const fetchImages = () => {
          const imagePromises = imageUrls.map((url) =>
            fetch(url)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
                }
                return response.blob();
              })
              .then((blob) => URL.createObjectURL(blob))
              .catch((error) => {
                console.error('Error fetching image:', error);
                return null;
              })
          );
    
          // Wait for all image Promises to resolve
          Promise.all(imagePromises)
            .then((imageData) =>{
                const filteredImages = imageData.filter((image) => image !== null);
                setImages(filteredImages);
            }) // Filter out any null values
            .catch((error) => console.error('Error fetching images:', error));
        };
    
        if (imageUrls.length > 0) {
          fetchImages();
        }
        
      }, [imageUrls]);

    function onChange(e){
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    }

    async function search(){
        try{
            const response = await axios.post('http://localhost:3001/api/users/movies', formData);
            console.log("respoinse is",response.data.equivalentColumnValues);
            setImageUrl(response.data.equivalentColumnValues);
        }
        catch(e){
            console.log("error is",e);        
        }

    }

    React.useEffect(()=>{
        const token= localStorage.getItem("token");
        if(token){
            const user=jwt_decode(token);
            if(!user){
                localStorage.removeItem("token");
                window.location.href="/";
            }
        }
    },[])
  return (
    <div className='homepage'>
        <header className='header'>
            <strong>Movie Recomender</strong>
        </header>
        <article>
        <div className='articleheading'>
        enter an imaginary movie description with characters of your liking
        </div>
            <textarea 
            name='description'
            value={formData.description}
            onChange={onChange} 
            type='text' 
            className='input'/>
        <div className='search'>
            <button onClick={search}>SUGGEST MOVIES</button>
        </div>
        <div className='image'>
        {images.map((image, index) => (

            <div key={index}>
                <img key={index} src={image} alt={`Image ${index}`}  />
            </div>

      ))}
                  </div>
 
        </article>
    </div>
  )
}

export default Home