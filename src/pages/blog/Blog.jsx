import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header'
import './Blog.scss'
import BlogImg from '../../images/infinite.jpeg'
import BlogPost from '../../components/blogPost/BlogPost'
import { Link } from 'react-router-dom';
import NavBar from '../../components/navBar/NavBar'
import newRequest from '../../utils/newRequest'
function Blog() {

  const [blogPosts, setBlogPosts] = useState([]);



  useEffect(() => {
    newRequest.get('/blogs') // Assuming your API endpoint for fetching blog posts is '/api/blog'
      .then(response => {
        setBlogPosts(response.data.posts);
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
      });
  }, []);
console.log(blogPosts)
  return (
    <div>
        <Header/>

        <div  className='blog-con'>


        <div className='blog-section1'>
          <div className='blog-section2'>
        <h2 className='blog-header'>Root Blog: Become an infinite learner</h2>
        <h2 className='blog-subtitle'>Empower yourself and make a difference through purpose-driven work. Join us as we explore entrepreneurship, creativity, growth, and positive change. Our blog is fueled by infinite learning, dedicated to helping you grow with us</h2>

        <p className='podcast-text2'>
        <Link to='/podcast' className='podcast-link'>
            Listen to our podcast (Root talks) <span className='colored-text'>here</span>
          </Link>

            </p>

      
        </div>
        <img alt='blog' src={BlogImg} className='blog-img'/>
        </div>

     

      

        

        <h3 className='article-text' >Latest Articles</h3>

        <div className='blog-list'>
      
        {Array.isArray(blogPosts) ? (
  blogPosts.map(blog => (
    <BlogPost key={blog._id} image={blog.images[0]} title={blog.title} />
  ))
) : (
  <p>Loading...</p>
)}


        </div>

        

        </div>
        <div style={{ marginBottom: '8rem' }}></div>
      <NavBar/>
    </div>
  )
}

export default Blog