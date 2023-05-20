import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import fetchImages from '../api/ApiService';
import Loader from 'components/Loader/Loader';
import Modal from './Modal/Modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export default function App() {
  const { searchValue, setSearchValue } = useState('');
  const { page, setPage } = useState(1);
   const { images, setImages } = useState([]);
  const { loading, setLoading } = useState(false);
  const { largeImage, setLargeImage} = useState({});
  const { error, setError } = useState(null);
   const { showModal, setShowModal} = useState(false);
  const { isActive, setIsActive } = useState(false);


useEffect(() => {
    const fetchImagesData = async () => {
      setLoading(true);
      try {
        const data = await fetchImages(searchValue, page);
        if (data.hits.length === 0) {
          setLoading(false);
          setIsActive(false);
          throw new Error(`Nothing found for "${searchValue}"`);
        }
        if (images.length + 12 <= data.totalHits) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
        const searchedImages = data.hits;
        setImages((prevImages) => [...prevImages, ...searchedImages]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
        toast.error(`${error.message}`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    };

    if (searchValue !== '' || page !== 1) {
      fetchImagesData();
    }
  }, [searchValue, page, images, setError, setImages, setIsActive, setLoading]);

  const handleFormSubmit = (value) => {
    setSearchValue(value);
    setPage(1);
    setImages([]);
  };

  const handleLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleOpenModal = (image) => {
    const largeImage = { url: image.largeImageURL, alt: image.tags };
    setLargeImage(largeImage);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className={css.container}>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <p className={css.error}>{error.message}</p>}
      {images.length !== 0 && (
        <ImageGallery images={images} onClick={handleOpenModal} />
      )}
      {loading && <Loader />}
      {isActive && <Button onClick={handleLoadMoreClick} />}
      {showModal && (
        <Modal image={largeImage} onClose={handleCloseModal} />
      )}
      <ToastContainer />
    </div>
  );
};