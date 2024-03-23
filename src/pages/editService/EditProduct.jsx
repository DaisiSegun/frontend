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

function EditProduct() {
  const location = useLocation();
  const productId = location.pathname.split('/').pop();
  const [previousProduct, setPreviousProduct] = useState({});
  useEffect(() => {
    document.title = 'Edit Product';
    const fetchProduct= async () => {
      try {
        const response = await newRequest.get(`/products/single/${productId}`);
        setPreviousProduct({ ...response.data });   
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetchProduct();
  }, [productId]);




  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(serviceReducer, INITIAL_STATE);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name, value },
    });
    setPreviousProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const currentUser = getCurrentUser();
  const userId = currentUser?.user?._id || currentUser?.user?.id;
 

  const handleCreateProduct = async (e) => {
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
        const errorMessage = 'Only authenticated Sellers can edit a product';
        setErrorMessage(
          'Error uploading images or creating product. '
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
  
      const productData = { ...state, images, userId  };
  
        
      await newRequest.put(`/products/${productId}`, productData);

    
  
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { images } });
      setSuccessMessage(
        'Your product has been updated'
      );
      setErrorMessage(null);
    } catch (err) {
      console.log(err);
      setUploading(false);
      setErrorMessage(
        'Error uploading images or creating product. '
      );
      setSuccessMessage(null);
    }
  };
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await newRequest.delete(`/products/${productId}`, { data: { userId } });
        // Assuming you want to redirect to another page after deletion
        // Replace '/myservice' with your desired route
        navigate('/my-product');
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
      Edit poduct
      </div>
      <p className='red-notice'>You cant edit image, you can only add images, contact us if you want to edit your images</p>
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
  Delete Product
</button>

      <div className="section-container">
        <div className="section-1">

          <div className="create-contianer">
              <p className='create-title'>Edit Name of your Product</p>
              <input
                type="text"
                name="title"
                value={previousProduct.title || ''} // Set the value prop
                onChange={handleChange}
                placeholder="e.g Handbags, shoes"
                className="create-input"
              />

                  
                
          </div>


          <p htmlFor="" className='create-title2'>Change Category</p>

          <select name="cat" id="cat" onChange={handleChange}  className="create-contianer">

          
              <option value="">Select a category</option>
              < option value="Ladies' Handbag">Ladies' Handbag</option>
                <option value="Crochet & knittig">Crochet & Knitting</option>
                <option value="Artwork">Artwork</option>
                <option value="Men's clothen">Men's Clothing</option>
                <option value="Women's clothen">Women's Clothing</option>
                <option value="Women's Footwear">Women's Footwear</option>
                <option value="Men's Bags">Men's Bags</option>
                <option value="Men's Footwear">Men's Footwear</option>
              <option value="others">others</option>

          </select>

          <div className="create-contianer">
              <p className='create-title'>Edit your product Description</p>
              <textarea
                type="text"
                name="desc"
                value={previousProduct.desc || ''} // Set the value prop
                style={{ height: '200px' }}
                onChange={handleChange}
                placeholder="Please share a detailed description with all the relevant details."
                className="create-input2"
              />

          </div>


         

          <div className="create-contianer">
              <p className='create-title'>Edit price</p>
                <input
                  type="text"
                  name="price"
                  value={previousProduct.price || ''} // Set the value prop
                  onChange={handleChange}
                  placeholder="20,000"
                  className="create-input"
                />

          </div>
          
        

        
        </div>

        <div className="section-2">


            
        



          <div className="create-contianer2">
              <label htmlFor="" className='create-title2'>Add images </label>
              

            

              <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}  
                />

              {successMessage && <p className="success-box">{successMessage}</p>}
              {errorMessage && <p className="error-box">{errorMessage}</p>}
            

          </div>

          <button onClick={handleCreateProduct} className='button2'>
            {uploading ? (
              <>
                <CircleLoader size={25} color="#36D7B7" uploading={uploading} />
                <span style={{ marginLeft: "10px" }}>Editing product...</span>
              </>
            ) : (
              <>
                Edit Product
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

export default EditProduct