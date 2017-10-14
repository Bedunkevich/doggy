import React from 'react';
import PropTypes from 'prop-types';

class Breed extends React.Component {
  static propTypes = {
    breedName: PropTypes.string.isRequired,
    searchValue: PropTypes.string,
    subBreeds: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func.isRequired
  };

  capitalizeFirstLetter = (string) => (string.charAt(0).toUpperCase() + string.slice(1));

  render() {
    const { breedName, subBreeds, searchValue, onClick, selected } = this.props;
    const regex = new RegExp(searchValue, 'i');
    const result = breedName.match(regex);

    if (!result)
      return null;

    return(
      <li>
        <div onClick = {onClick(`${breedName}`)} style = {{cursor: 'pointer', color: selected === breedName ? 'red' : 'black'}}>
          {this.capitalizeFirstLetter(breedName)}
        </div>
        <ul>
          {subBreeds && subBreeds.map(subName => <li onClick = {onClick(`${breedName}/${subName}`)}
                                        style = {{cursor: 'pointer', color: selected ===`${breedName}/${subName}` ? 'red' : 'black' }}
                                        key = {subName}>
                                      {subName}
                                    </li>)}
        </ul>
      </li>


    );
  }
}

export default Breed;