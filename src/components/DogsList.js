import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Breed from './Breed';

class DogsList extends React.Component {

  static propTypes = {
    dogsData: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
    loadPictures: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { searchValue: '', selectedDog: null };
  }

  onChange = (el) => {
    this.setState({ searchValue: el.target.value });
  }

  onClick = (name) => (el) => {
    this.setState({ selectedDog: name });
    this.props.loadPictures(name);
  }

  render() {
    const { dogsData } = this.props;

    if (!dogsData)
      return (<div>Loading...</div>);

    const breeds = [];
    _.mapKeys(dogsData, (value, key) => {
      breeds.push({name: key, subBreeds: value});
    });

    return (
      <div>
        <div className='App-main__search-input'>
          <input value={this.state.searchValue}
                 placeholder='Search...'
                 className='App-main__search'
                 onChange={this.onChange}
                 type='text' />
        </div>
        <div className='App-main__breed-list'>
          <ul>
            {breeds.map(breed => <Breed selected={this.state.selectedDog}
                                        searchValue={this.state.searchValue}
                                        onClick={this.onClick}
                                        key={breed.name}
                                        breedName={breed.name}
                                        subBreeds={breed.subBreeds} />)}
          </ul>
        </div>
      </div>
    );
  }

}

export default DogsList;