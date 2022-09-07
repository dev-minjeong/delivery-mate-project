import '../css/main.css';

function BackAndClose(props) {
  const controller = (target, type) => {
    if (target === 'id') {
      props.resetIdResult();
    } else if (target === 'pw') {
      props.resetPwResult();
    }
    if (type === 'back') {
      props.backSearchModal(target);
    } else if (type === 'close') {
      props.closeSearchModal(target);
    }
  };
  return (
    <div className='back-and-close'>
      <div id='back-btn'>
        <img
          onClick={() => controller(props.target, 'back')}
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-undo-1.png'
          alt='back-icon'
        ></img>
      </div>
      <div id='close-btn'>
        <img
          onClick={() => controller(props.target, 'close')}
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-x-mark-1.png'
          alt='close-icon'
        ></img>
      </div>
    </div>
  );
}
export default BackAndClose;
