import { PropTypes } from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {
  return (
    <li className={styles.item}>
      onClick={() => onClick(largeImageURL, tags)}
      <img src={webformatURL} alt={tags} />
    </li>
  );
};
export default ImageGalleryItem;
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  tags: PropTypes.string,
  largeImageURL: PropTypes.string,
};
