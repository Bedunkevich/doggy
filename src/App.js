// eslint-disable-next-line
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import React, { Component } from 'react';
import './App.css';
import { getAllDogs } from './api';
import DogsList from './components/DogsList';
import PicturesGallery from './components/PicturesGallery';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { dogsData: null, selectedDog: null };

    getAllDogs().then(data => {
      const {message} = data.response;
      this.setState({ dogsData: message });
    }, error => {
      console.log(error);
    });
  }

  loadPictures = (dog) => {
    this.setState({ selectedDog: dog });
  }

  render() {
    return (
      <div className="App-main">
        <div className='App-main__leftbar'>
          <DogsList loadPictures={this.loadPictures} dogsData={this.state.dogsData} />
        </div>
        <div className="App-main__image-galery">
          <PicturesGallery selectedDog={this.state.selectedDog} />
        </div>
      </div>
    );
  }
}

export default App;
