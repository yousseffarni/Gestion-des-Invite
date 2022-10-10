import React from 'react';
import './register.css' ;
import img1 from './Images/Univers_Acier_Image_1.jpg';
import img2 from './Images/Univers_Acier_Image_2.jpg';
import img3 from './Images/Univers_Acier_Image_3.jpg';
import img4 from './Images/Univers_Acier_Image_4.jpg';
import img5 from './Images/Univers_Acier_Image_5.jpg';

export default function Carousel() {



  return (
    <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">

    <div className="carousel-inner h-100">
      <div className="carousel-item active">
        <img src={img1} className="d-block w-100" data-bs-interval='4000' alt="Univers_Acier_Image_1"/>
      </div>
      <div className="carousel-item">
      <img src={img2} className="d-block w-100" data-bs-interval='3000' alt="Univers_Acier_Image_2"/>
      </div>
      <div className="carousel-item">
      <img src={img3} className="d-block w-100" data-bs-interval='2000' alt="Univers_Acier_Image_3"/>
      </div>
      <div className="carousel-item">
      <img src={img4} className="d-block w-100" data-bs-interval='1000' alt="Univers_Acier_Image_4"/>
      </div>
      <div className="carousel-item">
      <img src={img5} className="d-block w-100" alt="Univers_Acier_Image_5"/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  );
}