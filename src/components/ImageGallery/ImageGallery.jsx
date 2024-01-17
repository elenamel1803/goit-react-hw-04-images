import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <GalleryList>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          image={image}
          onClick={() => onImageClick(image)}
        />
      ))}
    </GalleryList>
  );
};

export default ImageGallery;
