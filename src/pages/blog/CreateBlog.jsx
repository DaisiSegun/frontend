import React, { useReducer, useState, useEffect } from "react";
import './CreateBlog.scss'
import Header from '../../components/header/Header'

import golf from '../../images/golf.svg'
import { serviceReducer, INITIAL_STATE } from "../../reducers/serviceReducer";

import newRequest from '../../utils/newRequest.js'
import upload from "../../utils/upload.js";
import { CircleLoader} from "react-spinners";
import Resizer from 'react-image-file-resizer';
import getCurrentUser from "../../utils/getCurrentUser.js";
import NavBar from "../../components/navBar/NavBar.jsx";

function CreateBlog() {
  useEffect(() => {
    document.title = 'Create Product';
  }, []);


  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(serviceReducer, INITIAL_STATE);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const currentUser = getCurrentUser();
  const userId = currentUser?.user?._id || currentUser?.user?.id;
  
  const handleCreateService = async (e) => {
 
    
    try {
     
      if (!userId) {
        const errorMessage = 'Only authenticated Sellers can create a service';
        console.error(errorMessage); // Log the error to the console
        // You can also display an alert message to the user
        // alert(errorMessage);
        throw new Error(errorMessage); // Throw the error to stop further execution
      }
    

     
     
 



    e.preventDefault();
    setUploading(true);
  
  
      const resizedImages = await Promise.all(
        [...files].map(async (file) => {
          return new Promise((resolve, reject) => {
            Resizer.imageFileResizer(
              file,
              file.width, // Maintain original width
              file.height, // Maintain original height
              file.type === 'image/jpeg' ? 'JPEG' : 'PNG', // Use original format
              65, // Quality of the resized image (adjust as needed, 100 for no compression)
              0,
              (uri) => {
                resolve(uri);
              },
              'base64'
            );
          });
        })
      );
  
      const images = await Promise.all(
        resizedImages.map(async (resizedImage) => {
          const url = await upload(resizedImage);
          return url;
        })
      );
  
      const serviceData = { ...state, images, userId };

      console.log(serviceData);
  
      await newRequest.post('/blogs', serviceData);
  
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { images } });
      setSuccessMessage(
        ' Blog Created!'
      );
      setErrorMessage(null);
    } catch (err) {
      console.log(err);
      setUploading(false);
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
      setSuccessMessage(null);
    }
  };



  return (

    

    <div className='create-service'>
      <Header showSearch={false}/>
      <div className="header-create">
        Create a Blog post
      </div>
      <p className='red-notice'>Inspire Entrepeneurs and creatives</p>

      <div className="section-container">
        <div className="section-1">

          <div className="create-contianer">
              <p className='create-title'>Title</p>
              <input 
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder='How to improve..' className='create-input'/>

          </div>


          

          <div className="create-contianer">
              <p className='create-title'>Blog Content (Show love, deliver hapiness & earn trust)</p>
              <textarea
                type="text"
                name="content"
                style={{ height: '200px' }} 
                onChange={handleChange}
              placeholder='Write blog content' className='create-input2'/>

          </div>


          
         

          <div className="create-contianer">
              <p className='create-title'>Author </p>
              <input
                type="text"
                name="author"
                onChange={handleChange}
              placeholder='Faveur' className='create-input'/>

          </div>
          
        
        
        </div>

        <div className="section-2">


            
          
        







          <div className="create-contianer2">
              <label htmlFor="" className='create-title2'>Upload cover image </label>

           

              <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />

              {successMessage && <p className="success-box">{successMessage}</p>}
              {errorMessage && <p className="error-box">{errorMessage}</p>}
           

          </div>

          <button onClick={handleCreateService} className='button2'>
            {uploading ? (
              <>
                <CircleLoader size={25} color="#36D7B7" uploading={uploading} />
                <span style={{ marginLeft: "10px" }}>Posting Blog...</span>
              </>
            ) : (
              <>
                Post Blog
                <img src={golf} className='golf' alt="Golf Icon" />
              </>
            )}
          </button>
          
    
      
        </div>
      </div>
    
      <div className='space'></div>
      <div style={{ marginBottom: '4rem' }}></div>
      <NavBar/>
    </div>
  )
}

export default  CreateBlog;