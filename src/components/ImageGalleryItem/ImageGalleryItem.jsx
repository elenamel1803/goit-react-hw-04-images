import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onClick }) => {
  return (
    <GalleryItem onClick={onClick}>
      <GalleryImg src={image.webformatURL} alt={image.tags} />
    </GalleryItem>
  );
};

export default ImageGalleryItem;
