import React, { useReducer, useState, useEffect } from "react";
import './EditService.scss'
import Header from '../../components/header/Header.jsx'

import golf from '../../images/golf.svg'
import { serviceReducer, INITIAL_STATE } from "../../reducers/serviceReducer.js";
import { useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js'
import upload from "../../utils/upload.js";
import { CircleLoader} from "react-spinners";
import Resizer from 'react-image-file-resizer';
import getCurrentUser from "../../utils/getCurrentUser.js";

function EditService() {
  const location = useLocation();
  const serviceId = location.pathname.split('/').pop();
  const [previousService, setPreviousService] = useState({});
  useEffect(() => {
    document.title = 'Edit Service';
    const fetchService = async () => {
      try {
        const response = await newRequest.get(`/services/single/${serviceId}`);
        setPreviousService(response.data);  
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchService();
  }, [serviceId]);




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
    e.preventDefault();
    setUploading(true);

 
  
  
    try {
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

      if (!userId) {
        const errorMessage = 'Only authenticated Sellers can edit a service';
        setErrorMessage(
          'Error uploading images or creating service. '
        );
        console.error(errorMessage); // Log the error to the console
        // You can also display an alert message to the user
        // alert(errorMessage);
        throw new Error(errorMessage); // Throw the error to stop further execution
      }
      const images = await Promise.all(
        resizedImages.map(async (resizedImage) => {
          const url = await upload(resizedImage);
          return url;
        })
      );
  
      const serviceData = { ...state, images, userId  };
  
        
      await newRequest.put(`/services/${serviceId}`, serviceData);

      console.log(serviceId);
  
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { images } });
      setSuccessMessage(
        'Your service has been updated'
      );
      setErrorMessage(null);
    } catch (err) {
      console.log(err);
      setUploading(false);
      setErrorMessage(
        'Error uploading images or creating service. '
      );
      setSuccessMessage(null);
    }
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await newRequest.delete(`/services/${serviceId}`, { data: { userId } });
        // Assuming you want to redirect to another page after deletion
        // Replace '/myservice' with your desired route
        navigate('/myservice');
      } catch (error) {
        console.error('Error deleting service:', error);
        // Handle error as needed
      }
    }
  };

  return (

    

    <div className='create-service'>
      <Header showSearch={false}/>
      <div className="header-create">
      Edit service
      </div>
      <p className='red-notice'>You cant edit image, contact us if you want to edit your images</p>
      <button 
  onClick={handleDelete} 
  style={{
    backgroundColor: '#8B0000',
    color: '#fff',
    marginTop: '1rem',
    border: 'none',  // Remove the border
    marginLeft: '1rem',  // Add margin to the left
    marginRight: '1rem',  // Add margin to the right
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '0.5rem',
    width: '30%',
    borderRadius: '1rem',
    cursor: 'pointer'
  }}
>
  Delete Service
</button>

      <div className="section-container">
        <div className="section-1">

          <div className="create-contianer">
              <p className='create-title'>Edit Name of your Service</p>
              <input 
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder={previousService.title || 'e.g iPhone technician, makeup artist'}
                  className='create-input'/>
                
          </div>


          <p htmlFor="" className='create-title2'>Change Category</p>

          <select name="cat" id="cat" onChange={handleChange}  className="create-contianer">

          
              <option value="">Select a category</option>
              <option value="Graphic & Logo Design">Graphic & Logo Design</option>
              <option value="Driver & Transportation">Driver & Transportation</option>
              <option value="Chef">Chef</option>
              <option value="Yogurt, Cake & pastry">Yogurt, Cake & pastry</option>
              <option value="Event Decor & Planning">Event Decor & Planning</option>
              <option value="Makeup & Gele Artist">Makeup & Gele Artist</option>
              <option value="DJs & Sound Engineers">DJs & Sound Engineers</option>
              <option value="Makerting & Social Media">Makerting & Social Media</option>
              <option value="Phone, Tablet & Laptop repair">Phone, Tablet & Laptop Repair</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Photography & Videography">Photography & Videography</option>
              <option value="Instrumentalists">Instrumentalists</option>
              <option value="Cleaning Services">Cleaning Services</option>
              <option value="Fashion Design">Fashion Design</option>
              <option value="Lash & Brow Experts">Lash & Brow Experts</option>
              <option value="Real Estate Agency">Real Estate Agency</option>
              <option value="Personal Shopping & Errands">Personal Shopping & Errands</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Research Project Assistant">Research Project Assistant</option>
              <option value="Catering">Catering</option>
              <option value="Interior Decoration">Interior Decoration</option>
              <option value="Hairdresser">Hairdresser</option>
              <option value="MC">MC</option>
              <option value="Home Repair & Maintenance">Home Repair & Maintenance</option>
              <option value="Personal Care & Beauty">Personal Care & Beauty</option>
              <option value="Tshirt design">Tshirt design</option>
              <option value="Creative & Design">Creative & Design</option>
              <option value="Home Tutor & Lessons">Home Tutor & Lessons</option>
              <option value="Music Lessons">Music Lessons</option>
              <option value="Tech Lessons">Tech Lessons</option>
              <option value="Fumigation">Fumigation & Pest Control</option>
              <option value="Coding">Coding</option>
              <option value="Web Development">Web Development</option>
              <option value="Content Writing">Content Writing</option>
              <option value="Resume/Cv Writing">Resume/Cv Writing</option>
              <option value="Animation">Animation</option>

          </select>

          <div className="create-contianer">
              <p className='create-title'>Edit your Company/Brand Description</p>
              <textarea
                type="text"
                name="desc"
                style={{ height: '200px' }} 
                onChange={handleChange}
                placeholder={previousService.desc || 'Please share a detailed description with all the relevant details.'}
              className='create-input2'/>

          </div>


          
          <div className="create-contianer">
              <p className='create-title'>edit Service Location (Please make it short)</p>
              <input
                type="text"
                name="shortDesc"
                onChange={handleChange}
                placeholder={previousService.shortDesc || 'e.g Ikeja, Lagos'} className='create-input'/>

          </div>

          <div className="create-contianer">
              <p className='create-title'>Edit Minimum price (Use "Negotiable" if you dont have) </p>
              <input
                type="text"
                name="price"
                onChange={handleChange}
                placeholder={previousService.price || 'minimum fee for your service or type negotiable'} className='create-input'/>

          </div>
          
        

        
        </div>

        <div className="section-2">
{/* 
        <div className="create-contianer2">
              <p className='create-title2'>Upload Cover </p>

              <div className="create-img-container">
                <img className='create-img' src={upload}/>

              </div>
            <img/>

          </div> */}

            
          
          <div className="create-contianer">
              <p className='create-title'>Edit Number of employees (Use "Solo Entrepreneur" if solo) </p>
              <input 
              type="text"
              name="certification"
              onChange={handleChange}
              placeholder={previousService.certification || 'If 1 please use (Solo Entrepreneur)'} className='create-input'/>

          </div>

          <div className="create-contianer">
              <p className='create-title'>Edit Years of expereince </p>

              <input 
              type="text"
              name="yearsOfExperience"
              onChange={handleChange}
              placeholder={previousService.yearsOfExperience || 'e.g 5 years'}
              className='create-input'/>

          </div>






          <div className="create-contianer2">
              <label htmlFor="" className='create-title2'>Add images </label>
              

              {/* <div className="create-img-container">
                <img className='create-img' src={upload}/>
                
              </div>
            <img/> */}

              <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}  
                />

              {successMessage && <p className="success-box">{successMessage}</p>}
              {errorMessage && <p className="error-box">{errorMessage}</p>}
              {/* <button onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </button> */}

          </div>

          <button onClick={handleCreateService} className='button2'>
            {uploading ? (
              <>
                <CircleLoader size={25} color="#36D7B7" uploading={uploading} />
                <span style={{ marginLeft: "10px" }}>Editing Service...</span>
              </>
            ) : (
              <>
                Edit Service
                <img src={golf} className='golf' alt="Golf Icon" />
              </>
            )}
          </button>
          
    
     
        </div>
      </div>
    
      <div className='space'></div>
    </div>
  )
}

export default EditService