import React, { useEffect, useState } from 'react';
import './HomeDesign.css';

const HomeDesign = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCount(prevCount => {
          if (prevCount === 3000) {
            clearInterval(interval);
            return 3000;
          }
          return prevCount + 5;
        });
      }, 2); // 3 milliseconds, for a 3-second interval
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const [countTwo, setCountTwo] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCountTwo(prevCount => {
          if (prevCount === 5000) {
            clearInterval(interval);
            return 5000;
          }
          return prevCount + 10;
        });
      }, 2); // 3 milliseconds, for a 3-second interval
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const [countThree, setCountThree] = useState(0);


    useEffect(() => {
        const targetCount = 4.8;
        const interval = 400; // 4.8 seconds in milliseconds
    
        // Calculate the increment based on the desired count and interval
        const increment = (targetCount / interval) * 100;
    
        const countInterval = setInterval(() => {
          setCountThree(prevCount => {
            const nextCount = prevCount + increment;
            if (nextCount >= targetCount) {
              clearInterval(countInterval);
              return targetCount;
            }
            return nextCount;
          });
        }, interval);
    
        return () => clearInterval(countInterval); // Cleanup on component unmount
      }, []);
    

    return (
        <div className=' max-w-[1320px] mx-auto mt-20'>
            <div className='max-w-[100%] mx-auto'>
            <div class="flex flex-col sm:flex-row h-[auto] sm:h-[320px]">
            <div class="lg:w-[1000px] flex-grow flex-col item-center">
                <div className='h-10 w-full'>
                    <h1 className='homeHeading'>Find the best tuitions & resources in your neighborhood, effortlessly!</h1>
                </div>
                <div className='flex justify-between mt-32'>
                    <div className='h-20 w-56  flex flex-col'>
                      <div className='flex'>
                      <div>
                            <img className='' src='https://i.ibb.co/WFj11Xg/Group-379.png' alt=''></img>
                        </div>
                        <div className='flex flex-col ml-5'>
                            <div>
                                <h1 className='countText'>{countTwo}+</h1>
                            </div>
                            <div>
                                <h1 className='countPera'>Export Tutors</h1>
                            </div>
                        </div>
                      </div>
                      <hr className='h-2 bg-indigo-700 w-32 mt-2'></hr>
                    </div>
                    <div className='h-20 w-56 '>
                    <div className='h-20 w-56  flex flex-col'>
                      <div className='flex'>
                      <div>
                            <img className='' src='https://i.ibb.co/C72Bfhr/Group-378.png' alt=''></img>
                        </div>
                        <div className='flex flex-col ml-5'>
                            <div>
                                <h1 className='countText'>{count}+</h1>
                            </div>
                            <div>
                                <h1 className='countPera'>Students</h1>
                            </div>
                        </div>
                      </div>
                      <hr className='h-2 bg-teal-500 w-32 mt-2'></hr>
                    </div>
                    </div>
                    <div className='h-20 w-56 '>
                    <div className='h-20 w-56  flex flex-col'>
                      <div className='flex'>
                      <div>
                            <img className='' src='https://i.ibb.co/w6J51WP/Group-381.png' alt=''></img>
                        </div>
                        <div className='flex flex-col ml-5'>
                            <div>
                                <h1 className='countText'>{countThree.toFixed(1)}/5</h1>
                            </div>
                            <div>
                                <h1 className='countPera'>Tutor Rating</h1>
                            </div>
                        </div>
                      </div>
                      <hr className='h-2 bg-yellow-400 w-32 mt-2'></hr>
                    </div>
                    </div>
                </div>
            </div>

    <div class=" flex justify-end items-center flex-grow sm:mb-0 sm:mr-5">
        <img src='https://i.ibb.co/TtTQx6w/5437681-2.png' alt=''></img>
    </div>
  </div>
            </div>
           


        </div>
    );
};

export default HomeDesign;
