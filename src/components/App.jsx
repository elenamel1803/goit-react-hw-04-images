import { Component } from 'react';
import { fetchImagesApi } from 'services/RequestApi';
import { errorMessage, infoEmptyMessage } from 'services/Notiflix';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import { AppWrap } from './App.styled';

class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    images: [],
    selectedImage: null,
    showModal: false,
    isLoading: false,
    loadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;

    if (searchValue !== prevState.searchValue || page !== prevState.page) {
      this.toggleState('isLoading');

      fetchImagesApi({ searchValue, page })
        .then(({ hits, totalHits }) => {
          if (hits.length === 0) {
            errorMessage();
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...hits],
            loadMore: page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => {
          this.setState({ loadMore: false, images: [] });
          errorMessage(error);
        })
        .finally(() => this.toggleState('isLoading'));
    }
  }

  handleFormSubmit = searchValue => {
    if (!searchValue.trim()) {
      this.setState({
        images: [],
        loadMore: false,
      });
      return infoEmptyMessage();
    }
    this.setState({
      searchValue,
      page: 1,
      images: [],
    });
  };

  handleImageClick = selectedImage => {
    this.setState({ selectedImage });
    this.toggleState('showModal');
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toggleState = key => {
    this.setState(prevState => ({ [key]: !prevState[key] }));
  };

  render() {
    const { showModal, images, isLoading, selectedImage, loadMore } =
      this.state;

    return (
      <AppWrap>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery images={images} onImageClick={this.handleImageClick} />

        {(isLoading && <Loader />) ||
          (loadMore && <Button onClick={this.handleLoadMoreClick} />)}

        {showModal && (
          <Modal
            image={selectedImage}
            onClose={() => this.toggleState('showModal')}
          />
        )}
      </AppWrap>
    );
  }
}

export default App;
