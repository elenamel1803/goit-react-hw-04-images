import { Component } from 'react';
import { Overlay, ModalWrap } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <ModalWrap>
          <img src={image.largeImageURL} alt={image.tags} />
        </ModalWrap>
      </Overlay>
    );
  }
}

export default Modal;
