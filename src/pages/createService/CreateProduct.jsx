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


function CreateProduct() {
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
  
      await newRequest.post('/products', serviceData);
  
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { images } });
      setSuccessMessage(
        ' Product Created! Go back to view product'
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
        Add your product (African Made Only, Please)
      </div>
      <p className='red-notice'>Please products should be made by you (African made)</p>

      <div className="section-container">
        <div className="section-1">

          <div className="create-contianer">
              <p className='create-title'>Name of your Product</p>
              <input 
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder='e.g, Hand bag, Men Shoe' className='create-input'/>

          </div>


          <p htmlFor="" className='create-title2'>Category</p>
          <Select
            options={[
              { value: 'Women\'s Handbag', label: 'Women\'s Handbag' },
              { value: 'Crochet & knitting', label: 'Crochet & knitting' },
              { value: 'Artwork', label: 'Artwork' },
              { value: 'Men\'s Clothing', label: 'Men\'s Clothing' },
              { value: 'Women\'s Clothing', label: 'Women\'s Clothing' },
              { value: 'Women\'s bead', label: 'Women\'s bead' },
              { value: 'Women\'s Footwear', label: 'Women\'s Footwear' },
              { value: 'Men\'s Bags', label: 'Men\'s Bags' },
              { value: 'Men\'s Footwear', label: 'Men\'s Footwear' },
              { value: 'Kitchenware', label: 'Kitchenware' },
              { value: 'Building Materials', label: 'Building Materials' },
              { value: 'others', label: 'others' },
            ]}
            onChange={(selectedOption) => {
              handleChange({ target: { name: 'cat', value: selectedOption.value } });
            }}
            />

          <div className="create-contianer">
              <p className='create-title'> Product description</p>
              <textarea
                type="text"
                name="desc"
                style={{ height: '200px' }} 
                onChange={handleChange}
              placeholder='e,g Handcrafted from the finest materials, this hand bag is a unique blend of style and functionality....' className='create-input2'/>

          </div>


          
         

          <div className="create-contianer">
              <p className='create-title'>Price (Use "Negotiable" if you don't have a fixed price ) </p>
              <input
                type="text"
                name="price"
                onChange={handleChange}
              placeholder='e.g, 15,000 or Negotiable' className='create-input'/>

          </div>
          
        
        
        </div>

        <div className="section-2">


            
          
        







          <div className="create-contianer2">
              <label htmlFor="" className='create-title2'>Upload Images (Maximum of 7 Images) </label>

           

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
                <span style={{ marginLeft: "10px" }}>Creating Product...</span>
              </>
            ) : (
              <>
                Create Product
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

export default  CreateProduct;