import React, { useEffect, useState } from 'react';
import './AllUsers.css'
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-hot-toast';

const AllUsers = () => {

    const [Users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/allUsers');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    //ADMIN START

    const handleMakeAdmin = id => {
        fetch(`http://localhost:8000/users/admin/${id}`, {
          method: 'PUT',
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.modifiedCount > 0) {
              toast.success('Make admin successful.')
    
              // Re-fetch the updated user data
              fetchUsers(); // Call the fetchUsers function again to update the user data
            }
          })
          .catch(error => {
            console.error('Error:', error);
            // Handle any errors that occur during the request
          });
      }

    //ADMIN END

    // delete users 

    const handleRemoveItem = (id) => {
        const proceed = window.confirm(
          'Are you sure, you want to cancel this order',
        );
        if (proceed) {
          fetch(`http://localhost:8000/users/${id}`, {
            method: 'DELETE',
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.deletedCount > 0) {
                fetchUsers();
                // alert('deleted successfully');
    
                // const remaining = Users.filter((odr) => odr._id !== id);
                // setUsers(remaining);
              }
            });
        }
      };


    return (
        <div className='mt-10'>
            <h1 className='mainTxt'>All USERS</h1>
            <div className='searchField'>
                <input type="text"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search Email: info-user@gmail.com" className="shadow-xl  input input-bordered input-primary w-full max-w-2xl m-10 " />

            </div>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                NO.
                            </th>
                            <th scope="col" class="px-6 py-3">
                                NAME
                            </th>
                            <th scope="col" class="px-6 py-3">
                                EMAIL
                            </th>
                            <th scope="col" class="px-6 py-3">
                                ROLE
                            </th>
                            <th scope="col" class="px-6 py-3">
                                DELETE USER
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {Users.length === 0 ? <div><Loading /></div> : Users.filter((info) => info.email.toLowerCase().includes(query)).map((user, index) => (
                            <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td class="px-6 py-4">
                                    {user.name}
                                </td>
                                <td class="px-6 py-4">
                                    {user.email}
                                </td>
                                <td class="px-6 py-4">{user?.role !== 'admin' && 
                                  <button onClick={() => handleMakeAdmin(user._id)} class="inline-flex items-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium rounded-md">
                                  <span class="material-symbols-outlined">
                                      shield_person
                                  </span>

                                  MAKE ADMIN
                              </button>
                                }</td>

                                <td  class="px-6 py-4">
                                    <button  onClick={() => handleRemoveItem(user._id)} class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>

                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default AllUsers;