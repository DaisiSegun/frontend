import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const metaDecorator = require("../data/metaDecorator.json");



const MetaDecorator = ({ title, description, imageUrl, imageAlt }) => (
  <Helmet>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={metaDecorator.hostname + imageUrl} />
    <meta
      property="og:url"
      content={metaDecorator.hostname + window.location.pathname + window.location.search}
    />
     <meta name="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={metaDecorator.hostname} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content="https://res.cloudinary.com/dsddxqtss/image/upload/v1708709911/xvk4zbxxwtqwcek5frqd.png"/>
    <meta name="twitter:image:alt" content={imageAlt} />
    <meta name="twitter:site" content={metaDecorator.twitterUsername} />
    <meta property="twitter:domain" content={metaDecorator.hostname} />
  </Helmet>
);

MetaDecorator.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
};

export default MetaDecorator;







