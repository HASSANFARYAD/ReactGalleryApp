import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { UNSPLASH_ACCESS_KEY } from './config/constants';
import { FaCamera } from 'react-icons/fa';
import './App.css';

const App = () => {
    const [search, setSearch] = useState("Nepal")
    const [imageList, setImageList] = useState([])

    useEffect(() => {
        fetchImages(search)
    }, [])

    /**
     * description: Fetch images from unsplash api
     * @param {string} search - search query
     */
    const fetchImages = (query) => {
        if (search) {
            axios.get(`https://api.unsplash.com/search/collections?client_id=${UNSPLASH_ACCESS_KEY}&per_page=12&query=${query}`)
                .then(res => {
                    setImageList(res.data.results)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    return (
        <div>
            <h1 className="heading">Pictures <span>You Need</span></h1>
            <p className="sub-heading">Search for your favourite images</p>
            <div className='search-bar'>
                <input type="text" placeholder="Search Images"
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchImages(search)} />
                <button onClick={() => fetchImages(search)}>Search</button>
            </div>
            <div className="image-list">
                {imageList.length === 0 && <p className="no-image">No Images Found</p>}
                {imageList.length > 0 && imageList.map((image, index) => {
                    return (
                        <figure className="image" key={index}>
                            <a href={image.cover_photo ? image.cover_photo.urls.regular : "./No image.png"} target="_blank" rel='noreferrer'>
                                <img src={image.cover_photo ? image.cover_photo.urls.regular : './No image.png'} alt={image.cover_photo ? image.cover_photo.alt_description : "Anonymous"} />
                            </a>
                            <div className="overlay"><FaCamera style={{ marginBottom: "-2px" }} /> {image.cover_photo ? image.cover_photo.user.name : "Anonymous"}</div>
                        </figure>
                    )
                })}
            </div>
        </div>
    )
}

export default App