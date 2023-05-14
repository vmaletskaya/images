const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '34916687-f70029b8c404a02004930ea3b';


async function fetchImages(value, page) {
  return await fetch(
    `${BASE_URL}/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (!response.ok) {
      return Promise.reject(new Error('Oops...something going wrong. Try again later.'));
    }
    return response.json();
  });
}

export default fetchImages;