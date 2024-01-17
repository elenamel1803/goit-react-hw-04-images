import Notiflix from 'notiflix';

const notiflixParams = {
  position: 'center-center',
  timeout: 3000,
  width: '400px',
  fontSize: '20px',
};

export function infoEmptyMessage() {
  Notiflix.Notify.info('Enter your request, please!', notiflixParams);
}

export function errorMessage() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
    notiflixParams
  );
}
