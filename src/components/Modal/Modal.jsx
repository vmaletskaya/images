import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ image, onClose }) {
  const onBackdropClickClose = useCallback(
    e => {
      if (e.currentTarget === e.target) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    const handleClick = evt => {
      if (evt.code === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleClick);

    return () => {
      window.removeEventListener('keydown', handleClick);
    };
  }, [onClose]);

  const { url, alt } = image;
  return (
    <div className={css.overlay} onClick={onBackdropClickClose}>
      <div className={css.modal}>
        <img src={url} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  image: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
