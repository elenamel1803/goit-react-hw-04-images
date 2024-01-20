import { useEffect, useState } from 'react';
import { fetchImagesApi } from 'services/RequestApi';
import { errorMessage, infoEmptyMessage } from 'services/Notiflix';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { AppWrap } from './App.styled';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!searchValue) return;
    const fetchImages = async () => {
      try {
        toggleState('isLoading');
        const { hits, totalHits } = await fetchImagesApi({ searchValue, page });
        if (!hits.length) {
          errorMessage();
        }
        setImages(prevState => [...prevState, ...hits]);
        setLoadMore(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setImages([]);
        setLoadMore(false);
        errorMessage(error);
      } finally {
        toggleState('isLoading');
      }
    };
    fetchImages();
  }, [searchValue, page]);

  const handleFormSubmit = searchValue => {
    if (!searchValue.trim()) {
      setImages([]);
      setLoadMore(false);
      return infoEmptyMessage();
    }
    setSearchValue(searchValue);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = selectedImage => {
    setSelectedImage(selectedImage);
    toggleState('showModal');
  };

  const handleLoadMoreClick = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleState = key => {
    switch (key) {
      case 'showModal':
        setShowModal(prevState => !prevState);
        break;
      case 'isLoading':
        setIsLoading(prevState => !prevState);
        break;
      default:
        break;
    }
  };

  return (
    <AppWrap>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery images={images} onImageClick={handleImageClick} />

      {(isLoading && <Loader />) ||
        (loadMore && <Button onClick={handleLoadMoreClick} />)}

      {showModal && (
        <Modal image={selectedImage} onClose={() => toggleState('showModal')} />
      )}
    </AppWrap>
  );
};

export default App;
