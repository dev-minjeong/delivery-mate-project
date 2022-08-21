import { useState } from 'react';
import '../App.css';

function BackAndClose({ closeSearchModal, backSearchModal, target }) {
  return (
    <div className='back-and-close'>
      <div id='back-btn'>
        <img
          onClick={() => backSearchModal(target)}
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-undo-1.png'
          alt='back-icon'
        ></img>
      </div>
      <div id='close-btn'>
        <img
          onClick={() => closeSearchModal(target)}
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-x-mark-1.png'
          alt='close-icon'
        ></img>
      </div>
    </div>
  );
}
export default BackAndClose;
