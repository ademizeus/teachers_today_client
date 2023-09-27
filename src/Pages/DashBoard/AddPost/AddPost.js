
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { initializeApp } from "firebase/app";
import Loading from "../../Shared/Loading/Loading";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDlbFDMF53VID-lQNtHBv013ARrPZXIUEY",
    authDomain: "political-portfolio.firebaseapp.com",
    projectId: "political-portfolio",
    storageBucket: "political-portfolio.appspot.com",
    messagingSenderId: "830906600717",
    appId: "1:830906600717:web:263f6b6d10075a6cedb444"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const AddPost = () => {
    const [query, setQuery] = useState("");

    const imageHostKey = "a0ec58a16d428e589983dbc812e4c0e5";
    console.log(imageHostKey);




    // const handleAddProduct = data => {
    //     const images = data.img; // data.img is an array of selected files

    //     const uploadPromises = [];

    //     // Upload each image to the server using fetch and store the upload promises
    //     for (let i = 0; i < images.length; i++) {
    //       const formData = new FormData();
    //       formData.append('image', images[i]);

    //       const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    //       const uploadPromise = fetch(url, {
    //         method: 'POST',
    //         body: formData
    //       }).then(res => res.json());
    //       uploadPromises.push(uploadPromise);
    //     }

    //     Promise.all(uploadPromises)
    //       .then(uploadResults => {
    //         const seller = {
    //           id: Math.floor(Math.random() * 100000000).toString(),
    //           paragraph: data.paragraph,
    //           newDate: new Date().toLocaleDateString(),
    //         };

    //         // Assign the image URLs to imgOne, imgTwo, imgThree properties
    //         for (let i = 0; i < uploadResults.length; i++) {
    //           const imgData = uploadResults[i];
    //           if (imgData.success) {
    //             seller[`img${i + 1}`] = imgData.data.url;
    //           }
    //         }

    //         // Send the seller object to the server to add the product
    //         const sellerJSON = JSON.stringify(seller); // Convert to valid JSON
    //         fetch('http://localhost:8000/addPost', {
    //           method: 'POST',
    //           headers: {
    //             'content-type': 'application/json'
    //           },
    //           body: sellerJSON // Use the JSON string
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //           if (data.acknowledged) {
    //             alert('New Product Added');
    //             // Do any further processing or navigation here
    //           }
    //         });
    //       })
    //       .catch(error => console.error(error));
    //   };

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    const handleAddProduct = async (data) => {
        setIsLoading(true);
        const files = data.img;

        if (!files || files.length === 0) {
            alert("Please select files");
            return;
        }

        try {
            // Firebase Storage setup
            const storage = getStorage();

            // Create an object to store the file links
            const fileLinks = {};

            // Counters for images and videos
            let imgCount = 0;
            let videoCount = 0;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const storageRef = ref(storage, `files/${file.name}`);

                // Create the upload task
                const uploadTask = uploadBytesResumable(storageRef, file);

                // Wait for the upload to complete and get the download URL
                const snapshot = await uploadTask;
                const downloadURL = await getDownloadURL(snapshot.ref);

                // Determine the key based on the file type (image or video)
                if (file.type.startsWith("image/")) {
                    imgCount++;
                    fileLinks[`img${imgCount}`] = downloadURL;
                } else if (file.type.startsWith("video/")) {
                    videoCount++;
                    fileLinks[`video${videoCount}`] = downloadURL;
                }
            }

            // Create the object with the paragraph and file links
            const objectWithFileLinks = {
                paragraph: data.paragraph, // Assuming the 'paragraph' field is provided in the 'data' object
                ...fileLinks,
            };

            // Show the object with paragraph and file links
            console.log(objectWithFileLinks);

            // POST the data to the server
            const response = await fetch("http://localhost:8000/addPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objectWithFileLinks),
            });

            if (!response.ok) {
                throw new Error("Failed to post data to the server");
            }

            // Optionally, reset the form if needed
            reset();
        } catch (error) {
            console.error("Error uploading file:", error);
        }
        finally {
            setIsLoading(false); // Set loading back to false after the API call is completed
        }
    };


    const [Post, setPost] = useState([]);


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

    const handleRemoveItem = (id) => {
        const proceed = window.confirm(
            'Are you sure, you want to cancel this order',
        );
        if (proceed) {
            fetch(`http://localhost:8000/addPosts/${id}`, {
                method: 'DELETE',
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        fetchPost();
                        // alert('deleted successfully');

                        // const remaining = Users.filter((odr) => odr._id !== id);
                        // setUsers(remaining);
                    }
                });
        }
    };

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="form-control w-full">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Your message
                        </label>
                        <textarea
                            id="message"
                            {...register("paragraph", {
                                required: "Name is Required"
                            })}
                            placeholder="Type here"
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        ></textarea>
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="form-control w-full print:hidden">
                        <div className="mt-5">
                            <h2 className="text-lg text-white">Upload Video</h2>
                            <input
                                type="file"
                                {...register("img", {
                                    required: "File is Required"
                                })}
                                multiple
                                accept="image/*,video/*" // Allow only image and video files
                                className="file-input file-input-bordered buttons mt-5 w-full"
                            />
                            {errors.img && <p className="text-red-500">{errors.img.message}</p>}
                        </div>
                    </div>
                    <input className="print:hidden btn buttons w-full mt-5" value={isLoading ? "Submitting..." : "Submit"} type="submit" disabled={isLoading}/>
                </form>
                {uploadProgress > 0 && (
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${uploadProgress}%` }}>
                            {uploadProgress.toFixed(2)}%
                        </div>
                    </div>
                )}
            </div>
            <div>
                <h1 className='text-3xl font-bold text-center mt-20'>Delete Post</h1>

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
                                    IMAGE
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    POST TITTLE
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    DATE
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    DELETE POST
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {Post.length === 0 ? <div><Loading /></div> : Post.filter((info) => info.paragraph.toLowerCase().includes(query)).map((PostHome, index) => (
                                <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {index + 1}
                                    </th>
                                    <td class="px-6 py-4">
                                        {PostHome.img}
                                    </td>
                                    <td class="px-6 py-4">
                                        {PostHome.paragraph}
                                    </td>
                                    <td class="px-6 py-4">
                                        {PostHome.NewDate}
                                    </td>

                                    <td class="px-6 py-4">
                                        <button onClick={() => handleRemoveItem(PostHome._id)} class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
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
        </div>

    );
};

export default AddPost;