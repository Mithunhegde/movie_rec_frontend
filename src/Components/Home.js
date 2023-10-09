import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import '../App.css';

function Home() {

    const [formData, setFormData] = React.useState({
        description: ''
      });

    function onChange(e){
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
          });
    }

    async function search(){
        const response = await axios.post('http://localhost:3001/api/users/movies', formData);
        console.log("respoinse is")
        console.log(response.data)
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
        </article>
    </div>
  )
}

export default Home