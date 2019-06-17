import Leaflet from 'leaflet'
import React, { Component } from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import Map from './containers/Map'
import StoreList from './containers/StoreList'

Leaflet.Icon.Default.imagePath =
  '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/'


class App extends Component {
  render() {
    return (
      <div>
      <Map />
      <StoreList />
      </div>
    );
  }
}

export default App;
