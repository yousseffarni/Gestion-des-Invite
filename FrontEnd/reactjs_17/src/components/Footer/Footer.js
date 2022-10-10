import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className='Footer text-center'>
      <div className='Footer-Container text-center p-3'>
       <div className='d-none'>
         <span>Déveloper par Mr.</span>
         <a id="Author-Name" href="https://www.youssef-farni.com">  Youssef Farni &nbsp;</a>
       </div>
       <span> © {new Date().getFullYear()} Tous droits réservés à &nbsp; </span> 
        <a href='http://www.universacier.com/'>
          UniversAncier.com
        </a>
      </div>
    </div>
  );
}