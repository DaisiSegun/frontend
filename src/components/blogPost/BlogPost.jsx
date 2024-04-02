import React from 'react';
import slugify from 'slugify';
import './BlogPost.scss';

function BlogPost({ image, title }) {
  const slug = slugify(title, { lower: true });

  return (
    <a href={`/blog-page/${slug}`} target="_blank" rel="noopener noreferrer" className='blog-post-con'>
      <img src={image} alt={title} className='blog-img' />
      <p className='blog-title'>{title}</p>
    </a>
  );
}

export default BlogPost;
