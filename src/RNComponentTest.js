import React, { Component } from 'react';
import { View } from 'react-native';

class RNComponentTest extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View
        style={{ flex: 1, width: 100, height: 100, backgroundColor: 'green', borderWidth: 2, }}
      />
    );
  }
}

export default RNComponentTest;
