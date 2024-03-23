import React from 'react';
import Header from '../../components/header/Header';
import './AllCategories.scss';
import SubLocal from '../../components/allCategory/SubLocal';
import { useLocation } from 'react-router-dom';
import SubCatData from '../../data/subLocal.json';
import SubCatData2 from '../../data/subFreelance.json';
import SubCatData3 from '../../data/subHandmade.json';
import SubFreelance from '../../components/allCategory/SubFreelance';
import SubHandmade from '../../components/allCategory/SubHandmade';
// import Sorry from '../../components/sorry/Sorry';
import Sorry3 from '../../components/sorry/Sorry3';
import NavBar from '../../components/navBar/NavBar'



function SelectCategory() {
  const category = decodeURIComponent(useLocation().pathname.split('/')[2]);

  const filteredSubCatData = SubCatData.filter(
    (item) => item.category === category
  );

  const filteredSubCatData2 = SubCatData2.filter(
    (item) => item.category === category
  );

  const filteredSubCatData3 = SubCatData3.filter(
    (item) => item.category === category
  );

  if (filteredSubCatData.length === 0 && filteredSubCatData2.length === 0 && filteredSubCatData3.length === 0) {
    return (
      <div className='all-cat'>
        <Header showSearch={true} />
        <h3 className='sub-header'>{category}</h3>
        <Sorry3 />
      </div>
    );
  }

  return (
    <div className='all-cat'>
      <Header showSearch={true} />
      <h3 className='sub-header'>{category}</h3>
      {filteredSubCatData.length > 0 && <SubLocal subCatData={filteredSubCatData} />}
      {filteredSubCatData2.length > 0 && <SubFreelance subCatData2={filteredSubCatData2} />}
      {filteredSubCatData3.length > 0 && <SubHandmade subCatData3={filteredSubCatData3} />}
      <div style={{ marginBottom: '5rem' }}></div>
      <NavBar/>
    </div>
  );
}





export default SelectCategory;
