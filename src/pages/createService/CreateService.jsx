  import React, { useReducer, useState, useEffect } from "react";
  import './CreateService.scss'
  import Header from '../../components/header/Header'

  import golf from '../../images/golf.svg'
  import { serviceReducer, INITIAL_STATE } from "../../reducers/serviceReducer";

  import newRequest from '../../utils/newRequest.js'
  import upload from "../../utils/upload.js";
  import { CircleLoader} from "react-spinners";
  import Resizer from 'react-image-file-resizer';
  import getCurrentUser from "../../utils/getCurrentUser.js";
import NavBar from "../../components/navBar/NavBar.jsx";
import Select from 'react-select';

  function CreateService() {
    useEffect(() => {
      document.title = 'Create Service';
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
        // Check for title
        if (!state.title) {
          console.error('Title is required');
          throw new Error('Title is required');
        }
    
        // Check for category
        if (!state.cat) {
          console.error('Category is required');
          throw new Error('Category is required');
        }
    
        // Check for description
        if (!state.desc) {
          console.error('Description is required');
          throw new Error('Description is required');
        }

        if (!state.shortDesc) {
          console.error('Service Location is required');
          throw new Error('Service Location is required');
        }

        if (!state.certification) {
          console.error('Number of Employees is required');
          throw new Error('Number of Employees  is required');
        }

        if (!state.yearsOfExperience) {
          console.error('Experience is required');
          throw new Error('Experience is required');
        }

        if (!state.price) {
          console.error('Minimum Fee is required');
          throw new Error('Minimum Fee is required');
        }
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
    
        await newRequest.post('/services', serviceData);
    
        setUploading(false);
        dispatch({ type: 'ADD_IMAGES', payload: { images } });
        setSuccessMessage(
          'Service Created! Go back to view service'
        );
        setErrorMessage(null);
      } catch (err) {
        console.log(err);
        setUploading(false);
        setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
        setSuccessMessage(null);
      }
    };

    const categoryOptions = [
      { value: "", label: "Select a category" },
      { value: "Graphic & Logo Design", label: "Graphic & Logo Design" },
      { value: "Animation", label: "Animation" },
      { value: "Photo Editing", label: "Photo Editing" },
      { value: "Video Editing", label: "Video Editing" },
      { value: "Illustration", label: "Illustration" },
      { value: "Fashion Illustration", label: "Fashion Illustration" },
      { value: "UI UX Designn", label: "UI UX Designn" },
      { value: "Mobile App Development", label: "Mobile App Development" },
      { value: "Accountant", label: "Accountant" },
      { value: "Resume & Cv Writing", label: "Resume & Cv Writing" },
      { value: "Writing", label: "Writing" },
      { value: "Copy Writing", label: "Copy Writing" },
      { value: "Legal service", label: "Legal service" },
      { value: "Model", label: "Model" },
      { value: "Voiceover", label: "Voiceover" },
      { value: "Content creator", label: "Content creator" },
      { value: "SEO Optimization", label: "SEO Optimization" },
      { value: "Web Development", label: "Web Development" },
      { value: "Chef", label: "Chef" },
      { value: "Yogurt, Cake & pastry", label: "Yogurt, Cake & pastry" },
      { value: "Event Decor & Planning", label: "Event Decor & Planning" },
      { value: "Makeup & Gele Artist", label: "Makeup & Gele Artist" },
      { value: "DJs & Sound Engineers", label: "DJs & Sound Engineers" },
      { value: "Makerting & Social Media", label: "Makerting & Social Media" },
      { value: "Phone, Tablet & Laptop repair", label: "Phone, Tablet & Laptop Repair" },
      { value: "Social Media Management", label: "Social Media Management" },
      { value: "Game Development", label: "Game Development" },
      { value: "Logistics", label: "Logistics" },
      { value: "Plumber", label: "Plumber" },
      { value: "Electrician", label: "Electrician" },
      { value: "Photography & Videography", label: "Photography & Videography" },
      { value: "Music Producer", label: "Music Producer" },
      { value: "Mixing & Mastering Engineer", label: "Mixing & Mastering Engineer" },
      { value: "Instrumentalists", label: "Instrumentalists" },
      { value: "Cleaning Services", label: "Cleaning Services" },
      { value: "Women's tailor", label: "Women's tailor" },
      { value: "Men's tailor", label: "Men's tailor" },
      { value: "Lash & Brow Experts", label: "Lash & Brow Experts" },
      { value: "Real Estate Agency", label: "Real Estate Agency" },
      { value: "Personal Shopping & Errands", label: "Personal Shopping & Errands" },
      { value: "Business consultant", label: "Business consultant" },
      { value: "Carpentry", label: "Carpentry" },
      { value: "Project reseach assistant", label: "Project reseach assistant" },
      { value: "Catering", label: "Catering" },
      { value: "Interior Decoration", label: "Interior Decoration" },
      { value: "Hairdresser", label: "Hairdresser" },
      { value: "MC", label: "MC" },
      { value: "Home Repair & Maintenance", label: "Home Repair & Maintenance" },
      { value: "Personal Care & Beauty", label: "Personal Care & Beauty" },
      { value: "Tshirt design", label: "Tshirt design" },
      { value: "Home Tutor & Lessons", label: "Home Tutor & Lessons" },
      { value: "Music Lessons", label: "Music Lessons" },
      { value: "Tech Lessons", label: "Tech Lessons" },
      { value: "Fumigation", label: "Fumigation & Pest Control" },
      { value: "Music Band", label: "Music Band" },
      { value: "Animation", label: "Animation" },
      { value: "Driver & Transportation", label: "Driver & Transportation" },
      { value: "Music", label: "Music" },
      { value: "others", label: "others" },
    ];
    

    return (

      

      <div className='create-service'>
        <Header showSearch={false}/>
        <div className="header-create">
          Create new service (What can you do?)
        </div>
        <p className='red-notice'>Each question is a chance to connect warmly and inspire customers to consider your services</p>

        <div className="section-container">
          <div className="section-1">

            <div className="create-contianer">
                <p className='create-title'>Name of your Service</p>
                <input 
                    type="text"
                    name="title"
                    onChange={handleChange}
                    placeholder='e.g Mobile developer, chef, writer' className='create-input'/>

            </div>


            <p htmlFor="" className='create-title2'>Category</p>

            <Select
            options={categoryOptions}
            onChange={(selectedOption) => dispatch({ type: "CHANGE_INPUT", payload: { name: 'cat', value: selectedOption.value } })}
            className="create-contianer"
          />

            
                

            <div className="create-contianer">
                <p className='create-title'> About your Company/Brand (Describe your service)</p>
                <textarea
                  type="text"
                  name="desc"
                  style={{ height: '200px' }} 
                  onChange={handleChange}
                placeholder='Please share a detailed description with all the relevant details.' className='create-input2'/>

            </div>


            
            <div className="create-contianer">
                <p className='create-title'>Service Location (Please make it short)</p>
                <input
                  type="text"
                  name="shortDesc"
                  onChange={handleChange}
                placeholder='e.g Ikeja, Lagos' className='create-input'/>

            </div>

            <div className="create-contianer">
                <p className='create-title'>Minimum price (Use "Negotiable" if you dont have) </p>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                placeholder='minimum fee for your service or type negotiable' className='create-input'/>

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
                <p className='create-title'>Number of employees (Use "Solo Entrepreneur" if solo) </p>
                <input 
                type="text"
                name="certification"
                onChange={handleChange}
                placeholder='If 1 please use (Solo Entrepreneur)' className='create-input'/>

            </div>

            <div className="create-contianer">
                <p className='create-title'>Years of expereince </p>

                <input 
                type="text"
                name="yearsOfExperience"
                onChange={handleChange}
                placeholder='e.g 5 years' className='create-input'/>

            </div>

                    <div className="create-contianer">
            <p className='create-title'>
              Portfolio link. (Click <a href="https://www.google.com/intl/en_ng/drive/" target="_blank" rel="noopener noreferrer">here</a> to create with Google drive)
            </p>
            <input 
                type="text"
                name="portfolio"
                onChange={handleChange}
                placeholder='Add your portfolio link (Optional)'
                className='create-input'
            />
        </div>







            <div className="create-contianer2">
                <label htmlFor="" className='create-title2'>Upload Images (Maximum of 7 Images) </label>

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
                  <span style={{ marginLeft: "10px" }}>Creating Service...</span>
                </>
              ) : (
                <>
                  Create Service
                  <img src={golf} className='golf' alt="Golf Icon" />
                </>
              )}
            </button>
            
      
        
          </div>
        </div>
      
        <div className='space'></div>
        <div style={{ marginBottom: '5rem' }}></div>
        <NavBar/>
      </div>
    )
  }

  export default CreateService