import React, { Component } from 'react';
import { Notify } from 'notiflix';
import { fetchPhotos } from 'services/PixabayApi';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';

export class App extends Component {

  state = {
    images: null,
    isLoading: false,
    error: null,
    query: ``,
    page: 1,
    perPage: 12,
    isloadMoreShown: false,
    // isModalShown: false,
    // modalImage: null,
  }

  // Коли на бекенді закінчилися фото, приховуємо кнопку “Load more”.
// Для перевірки можна використовувати слова для пошуку “min” “max”.
// Один із варіантів реалізації приховування кнопки “Load more”
// this.steState(prev =>({
//  images: [...prev.images, ...hits],
//  loadMore: this.state.page < Math.ceil(totalHits / 12 )
// }))

  async componentDidUpdate(_, prevState) {
    if (this.state.page !== prevState.page || this.state.query !== prevState.query) {
      this.setState({ isLoading: true, error: null });
      const { query, page } = this.state;
      try {
        const data = await fetchPhotos(query, page);
        if (data.hits.length === 0) {
          return Notify.failure('Sorry, no results found. Please try again with some another keywords', { timeout: 6000, });
        }
        this.setState({ images: data.hits });
      } catch (error) {
        this.setState({ error: error.message });
      }
      finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = (evt) => { 
    evt.preventDefault();
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        {this.state.error !== null && Notify.warning(`Oops, some error occured... Please try reloading the page`, { timeout: 6000, })}
        {this.state.isLoading && <Loader />}
        {this.state.images !== null && <ImageGallery />}
        {/* {this.state.isloadMoreShown && <Button onClick={this.handleLoadMore} />}
        {this.state.error && (
          <p style={{ fontSize: "20px", color: "rgb(239 68 68)"}}>Whoops! Error! Please reload this page!</p>
        )} */}
      </div>
    )
  }
}
