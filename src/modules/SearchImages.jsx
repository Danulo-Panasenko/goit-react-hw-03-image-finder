import { Component } from 'react';
import styles from './SearchImages.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchImages } from 'shared/services/posts-api';
import Button from 'shared/components/Button/Button';
import Loader from 'shared/components/Loader/Loader';
import { toast } from 'react-toastify';

class SearchImages extends Component {
  state = {
    search: '',
    items: [],
    loading: false,
    error: null,
    page: 1,
    showModal: false,
    total: 0,
    imgDetails: null,
  };
  componentDidUpdate(prevProps, prevState) {
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ loading: true });
      this.fetchImages();
    }
  }

  async fetchImages() {
    try {
      const { search, page } = this.state;
      const { hits, totalHits } = await fetchImages(search, page);
      if (hits.length === 0) {
        toast.error('No result found!');
      }
      this.setState(({ items }) => ({
        items: [...items, ...hits],
        total: totalHits,
      }));
    } catch (err) {
      this.setState({ err: err.message });
    } finally {
      this.setState({ loading: false });
    }
  }
  searchImages = ({ search }) => {
    this.setState({ search });
  };
  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };
  render() {
    const { items, loading, err, total, page } = this.state;
    const { searchImages, loadMore } = this;
    const isImages = Boolean(items.length);
    const totalPage = Math.ceil(total / 12);
    return (
      <div>
        <Searchbar onSubmit={searchImages} />
        <ImageGallery items={items} />
        {loading && <Loader />}

        {err && <p className={styles.error}>{err}</p>}
        {isImages && page < totalPage && (
          <Button onLoadMore={loadMore} text={'Load more'} />
        )}
      </div>
    );
  }
}
export default SearchImages;
