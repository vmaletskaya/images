import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

export default function ImageGallery({ images, onClick }) {
  const onItemClick = image => {
    onClick(image);
  };

  return (
    <ul className={css.gallery}>
      {images.map(image => (
        <ImageGalleryItem
          onClick={() => onItemClick(image)}
          key={image.id}
          image={image.webformatURL}
          tags={image.tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
