  import React, { useReducer, useState, useEffect } from "react";
  import './CreateService.scss'
  import Header from '../../components/header/Header'

  import golf from '../../images/golf.svg'
  import { serviceReducer, INITIAL_STATE } from "../../reducers/serviceReducer";

  import newRequest from '../../utils/newRequest.js'
  import upload from "../../utils/upload.js";
  import { CircleLoader} from "react-spinners";
  import Resizer from 'react-image-file-resizer';

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
    
        const serviceData = { ...state, images };
    
        await newRequest.post('/services', serviceData);
    
        setUploading(false);
        dispatch({ type: 'ADD_IMAGES', payload: { images } });
        setSuccessMessage(
          'Service Created! Please click on the Logo to go home'
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
                    placeholder='e.g iphone technicain, make up artist' className='create-input'/>

            </div>


            <p htmlFor="" className='create-title2'>Category</p>

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
            
      
        {errorMessage && <p className="error-box">{errorMessage}</p>}
          </div>
        </div>
      
        <div className='space'></div>
      </div>
    )
  }

  export default CreateService