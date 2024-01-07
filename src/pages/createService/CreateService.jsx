import React, { useReducer, useState, useEffect } from "react";
import './CreateService.scss'
import Header from '../../components/header/Header'

import golf from '../../images/golf.svg'
import { serviceReducer, INITIAL_STATE } from "../../reducers/serviceReducer";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from '../../utils/newRequest.js'
import upload from "../../utils/upload.js";
import { CircleLoader} from "react-spinners";

function CreateService() {
  useEffect(() => {
    document.title = 'Create Service';
  }, []);

  const [singleFile, setSingleFile] = useState(undefined);
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
    e.preventDefault();
    setUploading(true);

    try {
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );

      const serviceData = { ...state, images }; // Combine service data with uploaded images

      const response = await newRequest.post("/services", serviceData);

      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { images } });
      setSuccessMessage("Service Created! Please click on the Logo to go home");
      setErrorMessage(null);
    } catch (err) {
      console.log(err);
      setUploading(false);
      setErrorMessage("Error uploading images or creating service. Please try again.");
      setSuccessMessage(null);
    }
  };

  return (

    

    <div className='create-service'>
      <Header showSearch={false}/>
      <div className="header-create">
        Creat new service (What can you do)
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
              <option value="Driver & transportation">Driver & Transportation</option>
              <option value="Chef">Chef</option>
              <option value="Event Decor & Planning">Event Decor & Planning</option>
              <option value="Makeup & Gele Artist">Makeup & Gele Artist</option>
              <option value="DJs & Sound Engineers">DJs & Sound Engineers</option>
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
              <p className='create-title'>Starting Price </p>
              <input
                type="number"
                name="price"
                onChange={handleChange}
              placeholder='The minimum fee for your service' className='create-input'/>

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
              <p className='create-title'>Certifications (Mininum certification required- WAEC) </p>
              <input 
              type="text"
              name="certification"
              onChange={handleChange}
              placeholder='A certification related to your field will be more encouraged.' className='create-input'/>

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
              <label htmlFor="" className='create-title2'>Upload Images (please upload multiple images) </label>

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
                <img src={golf} className='golf' />
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