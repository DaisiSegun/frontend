import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './BlogPage.scss';
import Header from '../../components/header/Header';
import NavBar from '../../components/navBar/NavBar';
import newRequest from '../../utils/newRequest';

function BlogPage() {
  const { title } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    newRequest.get(`/blogs/${title}`)
      .then(response => {
        setPost(response.data.post);
      })
      .catch(error => {
        console.error('Error fetching blog post:', error);
      });
  }, [title]);

  if (!post) {
    return (
      <div>
        <Header />
        <div className='loading-blog'>
          <p className='loading-text'>Loading.. please kindly wait</p>
        </div>
        <NavBar />
      </div>
    );
  }

  const renderContent = () => {
    return post.content.split('\n').map((paragraph, index) => {
      if (paragraph.trim().startsWith('- ')) {
        return <li key={index}>{paragraph.trim().slice(2)}</li>;
      } else {
        return <p className="paragraph" key={index}>{paragraph}</p>;
      }
    });
  };

  return (
    <div className='blog-page'>
      <Helmet>
        <title>{post.title}</title>
      </Helmet>
      <Header />
      <div className='blog-page-con'>
        <h2 className='blog-page-header'>{post.title}</h2>
        <p className='author'>By {post.author}</p>
        <p className='blog-date'>{new Date(post.date).toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })}</p>
        <img alt='title' className='blog-page-img' src={post.images[0]} />
        <div className='content'>
          {renderContent()}
        </div>
        <p className='podcast-text1'>
          <a href="https://roothq.africa" className='podcast-link1'>
            Looking for where to offer your services or authentic African-made goods? Click <span className='colored-text'>here</span> to join our marketplace.
          </a>
        </p>
        <div style={{ marginBottom: '8rem' }}></div>
      </div>
      <NavBar />
    </div>
  );
}

export default BlogPage;
