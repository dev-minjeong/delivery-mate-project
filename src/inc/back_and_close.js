import '../App.css';

function BackAndClose({
  closeSearchModal,
  backSearchModal,
  resetIdResult,
  target,
}) {
  const controller = (target, type) => {
    if (target === 'id') {
      resetIdResult();
    }
    if (type === 'back') {
      backSearchModal(target);
    } else if (type === 'close') {
      closeSearchModal(target);
    }
  };
  return (
    <div className='back-and-close'>
      <div id='back-btn'>
        <img
          onClick={() => controller(target, 'back')}
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-undo-1.png'
          alt='back-icon'
        ></img>
      </div>
      <div id='close-btn'>
        <img
          onClick={() => controller(target, 'close')}
          src='https://cdns.iconmonstr.com/wp-content/releases/preview/2012/240/iconmonstr-x-mark-1.png'
          alt='close-icon'
        ></img>
      </div>
    </div>
  );
}
export default BackAndClose;
