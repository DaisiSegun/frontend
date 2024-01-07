import React, { useEffect, useState } from 'react';
import './SearchResult.scss';
import SpCard from '../../components/spCard/SpCard';
import Footer from '../../components/footer/Footer';
import newRequest from '../../utils/newRequest';
import Header from '../../components/header/Header';
import { useLocation } from 'react-router-dom';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import Sorry from '../../components/sorry/Sorry';

const override = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Use 100vh to make it full height */
`;

function SearchResult() {
  useEffect(() => {
    document.title = 'Search Result';
  }, []);
  const location = useLocation();
  const search = new URLSearchParams(location.search).get('search');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/services/all?search=${search}`);
        setData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  if (isLoading) {
    return <ClipLoader color={"#36D7B7"} css={override} size={150} />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className='sps'>
      <Header showSearch={true} />
      <h1 className='header-24px'>Search Result</h1>
      <p className='subtitle-text'>Find your service</p>

      {data.length === 0 &&  <Sorry />} 

      {data.map((service) => (
        <SpCard key={service._id} item={service} />
      ))}

      <div className='space25'></div>
      <Footer />
    </div>
  );
}

export default SearchResult;
