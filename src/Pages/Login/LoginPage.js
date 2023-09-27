import React, { useState } from 'react';
import './LoginPage.css'
import StudentLogin from './StudentLogin';
import TeacherLogin from './TeacherLogin';

const LoginPage = () => {
    const [active, setActive] = useState("FirstCard")
    return (
        <div>
            <div className='mt-10 signUpBanner max-w-[1600px] mx-auto flex justify-center items-center'>
                <h1 className='text-center bannerText'>Log In</h1>
            </div>
            <div className='flex flex-col justify-center items-center '>
                <div className='flex justify-between items-center w-[664px] mt-10 px-10'>
                    <div><h1 className='chooseTxt'>Choose Yourself to Sign Up :</h1>
                        <hr className='chooseLine mt-1'></hr>
                    </div>
          
                        <div class="flex items-center pl-3">
                            <input checked={active === "FirstCard"} onClick={() => setActive("FirstCard")} id="horizontal-list-radio-license" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label for="horizontal-list-radio-license" class="w-full py-3 ml-2  dark:text-gray-300 radioText">Student/Guardian</label>
                        </div>
                        <div class="flex items-center pl-3">
                            <input onClick={() => setActive("SecondCard")} id="horizontal-list-radio-id" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label for="horizontal-list-radio-id" class="w-full py-3 ml-2 radioText dark:text-gray-300">Tutor</label>
                        </div>
                    </div>
                
                <div className='mt-10 p-5'>
                    {active === "FirstCard" && <StudentLogin title="1" />}
                    {active === "SecondCard" && <TeacherLogin title="2" />}
                  
                </div>
            </div>

        </div>
    );
};

export default LoginPage;