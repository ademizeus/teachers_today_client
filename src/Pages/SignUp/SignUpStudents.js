import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../Hook/useToken';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUpStudents = () => {
    const { register, handleSubmit, formState: { errors },  watch } = useForm();
    const { createUser, updateUser } = useContext(AuthContext);
    const [signUpError, setSignUPError] = useState('');
    const [createdUserEmail, setCreatedUserEmail] = useState('')
    const [token] = useToken(createdUserEmail);
    const navigate = useNavigate();
    const password = watch('password', '');

    if(token){
        navigate('/');
    }

    const handleSignUp = (data) => {
        setSignUPError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast('User Created Successfully.')
                const userInfo = {
                    displayName: data.name
                }
                updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email, data.phone);
                    })
                    .catch(err => console.log(err));
            })
            .catch(error => {
                console.log(error)
                setSignUPError(error.message)
            });
    }

    const saveUser = (name, email, phone) =>{
        const user ={name, email, phone};
        fetch('http://localhost:8000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data =>{
            setCreatedUserEmail(email);
        })
    }
    return (
        <div className=' flex justify-center items-center'>
        <div className='w-[664px]'>
            <h2 className='text-xl text-center'>Student Sign Up</h2>
            <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="input input-bordered w-full " />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className='grid grid-cols-2 gap-5'>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Phone</span></label>
                    <input type="phone" {...register("phone", {
                        required: true
                    })} className="input input-bordered w-full " />
                    {errors.phone && <p className='text-red-500'>{errors.phone.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Email</span></label>
                    <input type="email" {...register("email", {
                        required: true
                    })} className="input input-bordered w-full " />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                </div>
               
                <div className='grid grid-cols-2 gap-5'>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Password</span></label>
                    <input type="password" {...register("password", {
                        required: "Password is required",
                        // minLength: { value: 6, message: "Password must be 6 characters long" },
                        // pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: 'Password must have uppercase, number and special characters' }
                    })} className="input input-bordered w-full " />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                <div className="form-control w-full ">
                        <label className="label"> <span className="label-text">Confirm Password</span></label>
                        <input type="password" {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: value => value === password || "Passwords do not match"
                        })} className="input input-bordered w-full " />
                        {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
                    </div>
                </div>
                <input className='btn btn-accent w-full mt-4 bg-indigo-700 text-white' value="Sign Up" type="submit" />
                {signUpError && <p className='text-red-600'>{signUpError}</p>}
            </form>
            <p>Already have an account <Link className='text-secondary' to="/login">Please Login</Link></p>
            

        </div>
    </div>
    );
};

export default SignUpStudents;