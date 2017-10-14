import React from 'react';
import PropTypes from 'prop-types';
import { getDogImages } from '../api';
import { Carousel } from 'react-responsive-carousel';

class PicturesGallery extends React.PureComponent {

  static propTypes = {
    selectedDog: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = { loading: false, images: null };
  }

  loadImages = (name) => {
    this.setState({ loading: true });
    getDogImages(name).then(data => {
      const {message} = data.response;
      this.setState({ loading: false, images: message });
    }, error => {
      console.log(error);
    });
  }

  componentWillReceiveProps(nextPros) {
    const { selectedDog } = nextPros;
    if (selectedDog)
      this.loadImages(selectedDog);
  }

  render() {
    const { selectedDog } = this.props;

    if (!selectedDog)
      return <div>Select the breed</div>;

    if (this.state.loading)
      return <div>loading...</div>;

    return (
      <div>
        loaded from: {`/breed/${selectedDog}/images`}
        <Carousel showThumbs={false} dynamicHeight={true} showIndicators={false}>
          { this.state.images.map(image => <img alt={image} key={image} src={image} />) }
        </Carousel>
      </div>
    );
  }
}

export default PicturesGallery;