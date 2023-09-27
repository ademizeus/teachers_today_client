import React, { useEffect, useState } from 'react';
import './AllTutors.css';

const AllTutors = () => {

    const [allTutors, setAllTutors] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [Area, setArea] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedTutorType, setSelectedTutorType] = useState('');

    const fetchDistricts = async () => {
        try {
            const response = await fetch('http://localhost:8000/allDistrict');
            const data = await response.json();
            setDistricts(data);
        } catch (error) {
            console.error('Error fetching Districts:', error);
        }
    };

    useEffect(() => {
        fetchDistricts();
    }, []);


    const fetchArea = async () => {
        try {
            const response = await fetch('http://localhost:8000/allArea');
            const data = await response.json();
            setArea(data);
        } catch (error) {
            console.error('Error fetching Districts:', error);
        }
    };

    useEffect(() => {
        fetchArea();
    }, []);



    const fetchAllTutors = async () => {
        try {
            const response = await fetch('http://localhost:8000/allTutors');
            const data = await response.json();
            setAllTutors(data);
        } catch (error) {
            console.error('Error fetching AllTutors:', error);
        }
    };

    useEffect(() => {
        fetchAllTutors();
    }, []);


    const filterTutors = () => {
        // Implement filtering based on selectedDistrict and selectedArea
        // For simplicity, assuming 'district' and 'area' properties in the tutors data
        return allTutors.filter(teacher => {
            if (selectedDistrict && teacher.district !== selectedDistrict) {
                return false;
            }
            if (selectedArea && teacher.area !== selectedArea) {
                return false;
            }
            if (selectedGender && teacher.gender !== selectedGender) {
                return false;
            }
            if (selectedClass && teacher.class !== selectedClass) {
                return false;
            }
            if (selectedTutorType && teacher.tuitionType !== selectedTutorType) {
                return false;
            }
            return true;
        });
    };

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    const handleAreaChange = (event) => {
        setSelectedArea(event.target.value);
    };

    const handleGenderChange = (event) => {
        setSelectedGender(event.target.value)
    }
    const handleClassChange = (event) => {
        setSelectedClass(event.target.value)
    }
    const handleTutorTypeChange = (event) => {
        setSelectedTutorType(event.target.value)
    }

    return (
        <div className='mt-20'>
            <div className='tittleBox max-w-[1600px] mx-auto flex justify-center items-center'>
            <h1 className='titleText'>Job List</h1>

            </div>
            <div className='max-w-[100%] mx-auto mt-20 grid lg:grid-cols-4 sm:grid-cols-2 gap-5'>
            <div className='searchBarBox h-[1000px] top-0 lg:sticky lg:col-span-1 p-10'>
                <div>
                    
                </div>
            <h2>Select District:</h2>
                        <select onChange={handleDistrictChange}>
                            <option value="">All</option>
                            <option value="" disabled>Select District</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.district}>
                                    {district.district}
                                </option>
                            ))}
                        </select>
                        <h2>Select Gender:</h2>
                        <select onChange={handleGenderChange}>
                            <option value="">All</option>
                            <option value="male" >Male</option>
                            <option value="female" >Female</option>

                        </select>
                        <h2>Select Class:</h2>
                        <select onChange={handleClassChange}>
                            <option value="">All</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                            <option value="5" >5</option>
                            <option value="6" >6</option>
                            <option value="7" >7</option>
                            <option value="8" >8</option>
                            <option value="9" >9</option>
                            <option value="10" >10</option>
                            <option value="11" >11</option>
                            <option value="12" >12</option>


                        </select>
                        <div>
                            <input
                                type="radio"
                                value=""
                                name="gender"
                                onChange={handleGenderChange}
                            />
                            <label>All</label>

                            <input
                                type="radio"
                                value="male"
                                name="gender"
                                onChange={handleGenderChange}
                            />
                            <label>Male</label>

                            <input
                                type="radio"
                                value="female"
                                name="gender"
                                onChange={handleGenderChange}
                            />
                            <label>Female</label>
                        </div>
            </div> 
            <div className='bg-orange-200  lg:col-span-3'>
            <div className='mt-10  w-full'>
                    {
                        filterTutors().map(teacher =>
                            <div className="card card-side bg-base-100 shadow-2xl mt-10">
                                <div className="avatar mx-5 my-5">
                                    <div className="w-56 rounded-xl">
                                        <img src={teacher.img} alt='' />
                                    </div>
                                </div>                            <div className="card-body">
                                    <h2 className="card-title">{teacher.name}</h2>
                                    <p className='text-indigo-500 mt-3'>{teacher.joiningDate}</p>
                                    <p className='text-indigo-500 mt-3'>{teacher.district}</p>
                                    <p className='text-indigo-500 mt-3'>{teacher.area}</p>
                                    <p className='text-indigo-500 mt-3'>{teacher.gender}</p>
                                    <p className='text-indigo-500 mt-3'>{teacher.class}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">details</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            </div>
            {/* <div className='grid  grid-cols-3  gap-5'>
                <div className='w- bg-indigo-200 h-[1000px] sticky top-0 mt-20 rounded'>
                    <div className='w- bg-indigo-200 h-[1000px] sticky top-0 mt-20 rounded'>
                        <h2>Select District:</h2>
                        <select onChange={handleDistrictChange}>
                            <option value="">All</option>
                            <option value="" disabled>Select District</option>
                            {districts.map((district) => (
                                <option key={district.id} value={district.district}>
                                    {district.district}
                                </option>
                            ))}
                        </select>

                        <h2>Select Area:</h2>
                        <select onChange={handleAreaChange}>
                            <option value="">All</option>
                            <option value="" disabled>Select District</option>
                            {Area.map((area) => (
                                <option key={area.id} value={area.area}>
                                    {area.area}
                                </option>
                            ))}
                        </select>
                        <h2>Select Gender:</h2>
                        <select onChange={handleGenderChange}>
                            <option value="">All</option>
                            <option value="male" >Male</option>
                            <option value="female" >Female</option>

                        </select>
                        <h2>Select Class:</h2>
                        <select onChange={handleClassChange}>
                            <option value="">All</option>
                            <option value="1" >1</option>
                            <option value="2" >2</option>
                            <option value="3" >3</option>
                            <option value="3" >3</option>
                            <option value="4" >4</option>
                            <option value="5" >5</option>
                            <option value="6" >6</option>
                            <option value="7" >7</option>
                            <option value="8" >8</option>
                            <option value="9" >9</option>
                            <option value="10" >10</option>
                            <option value="11" >11</option>
                            <option value="12" >12</option>


                        </select>
                        <div>
                            <input
                                type="radio"
                                value=""
                                name="gender"
                                onChange={handleGenderChange}
                            />
                            <label>All</label>

                            <input
                                type="radio"
                                value="male"
                                name="gender"
                                onChange={handleGenderChange}
                            />
                            <label>Male</label>

                            <input
                                type="radio"
                                value="female"
                                name="gender"
                                onChange={handleGenderChange}
                            />
                            <label>Female</label>
                        </div>
                 
                    </div>
                </div>
                <div className='mt-10 col-span-2 w-full'>
                    {
                        filterTutors().map(teacher =>
                            <div className="card card-side bg-base-100 shadow-2xl mt-10">
                                <div className="avatar mx-5 my-5">
                                    <div className="w-56 rounded-xl">
                                        <img src={teacher.img} alt='' />
                                    </div>
                                </div>                            <div className="card-body">
                                    <h2 className="card-title">{teacher.name}</h2>
                                    <p className='text-indigo-500 mt-3'>{teacher.joiningDate}</p>
                                    <p className='text-indigo-500 mt-3'>{teacher.district}</p>
                                    <p className='text-indigo-500 mt-3'>{teacher.area}</p>
                                    <p className='text-indigo-500 mt-3'>{teacher.gender}</p>
                                    <p className='text-indigo-500 mt-3'>{teacher.class}</p>
                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">details</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div> */}
        </div>
    );
};

export default AllTutors;