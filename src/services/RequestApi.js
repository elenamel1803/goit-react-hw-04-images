import axios from 'axios';

export const fetchImagesApi = async ({ searchValue, page }) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '40908072-518de7ac546d7df352eebadfa';
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchValue,
    page: page,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
  });

  const { data } = await axios.get(`${BASE_URL}?${params}`);
  // console.log(data);
  return data;
};
