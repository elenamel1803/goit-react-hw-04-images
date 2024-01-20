import { useEffect } from 'react';
import { Overlay, ModalWrap } from './Modal.styled';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalWrap>
        <img src={image.largeImageURL} alt={image.tags} />
      </ModalWrap>
    </Overlay>
  );
};

export default Modal;
