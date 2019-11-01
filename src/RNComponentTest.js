import React, { Component } from 'react';
import { View } from 'react-native';

class RNComponentTest extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View
        styles={{ width: 100, height: 100, backgroundColor: 'yellow' }}
      />
    );
  }
}

export default RNComponentTest;
