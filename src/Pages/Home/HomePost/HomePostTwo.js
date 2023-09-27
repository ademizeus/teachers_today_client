import React, { useState } from 'react';

const HomePostTwo = ({mainPost}) => {

    const mediaKeys = Object.keys(mainPost).filter((key) => key.startsWith("img") || key.startsWith("video"));
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaKeys.length);
    };
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaKeys.length) % mediaKeys.length);
    };
    return (
        <div>
            <div className='postMethod mt-5'>
      <div className="card postCard bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{mainPost.paragraph}</h2>
          <p>{mainPost.NewDate}</p>
        </div>
        <div className="ml-5 mt-5 mb-5 flex">
          {mediaKeys.length > 0 && mediaKeys[currentIndex].startsWith("img") && (
            <div key={mediaKeys[currentIndex]}>
              <img src={mainPost[mediaKeys[currentIndex]]} alt={`Image ${mediaKeys[currentIndex].slice(3)}`} />
            </div>
          )}
          {mediaKeys.length > 0 && mediaKeys[currentIndex].startsWith("video") && (
            <div key={mediaKeys[currentIndex]}>
              <video width="320" height="240" controls>
                <source src={mainPost[mediaKeys[currentIndex]]} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        <button onClick={handlePrev} disabled={currentIndex === 0}>Previous</button>
        <button onClick={handleNext} disabled={currentIndex === mediaKeys.length - 1}>Next</button>
      </div>
    </div>
        </div>
    );
};

export default HomePostTwo;