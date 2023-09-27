import React, { useEffect, useState, useRef } from 'react';
import './HomePost.css'
import { Button } from 'react-day-picker';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import HomePostTwo from './HomePostTwo';


const HomePost = () => {

    const [post, setPost] = useState([]);
    const [like, setLike] = useState(0);
    const [isLike, setIsLike] = useState(false);



    const fetchPost = async () => {
        try {
            const response = await fetch('http://localhost:8000/addPost');
            const data = await response.json();
            setPost(data);
        } catch (error) {
            console.error('Error fetching Post:', error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    // const handleNext = () => {
    //     setCurrentIndex((prevIndex) => prevIndex + 1);
    // };

    // const handlePrev = () => {
    //     setCurrentIndex((prevIndex) => prevIndex - 1);
    // };

    // const [currentIndex, setCurrentIndex] = useState(0);


    // // Create an array to store the keys of images and videos
    // const mediaKeys = post.reduce((keys, mainPost) => {
    //     return keys.concat(Object.keys(mainPost).filter((key) => key.startsWith("img") || key.startsWith("video")));
    // }, []);

    // Initialize the currentIndex state with 0
    // const [currentIndex, setCurrentIndex] = useState(0);

    // const handlePrev = () => {
    //     // Decrease the currentIndex by 1, but ensure it doesn't go below 0
    //     setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    // };

    // const handleNext = () => {
    //     // Increase the currentIndex by 1, but ensure it doesn't go beyond the length of the posts array
    //     setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, post.length - 1));
    // };

    const [currentIndex, setCurrentIndex] = useState(0);


    return (
        <div>


            <div>
            <div>
      {post.map((mainPost, index) => (
        <HomePostTwo key={index} mainPost={mainPost} />
      ))}
    </div>
            </div>



        </div>




    );
};

export default HomePost;