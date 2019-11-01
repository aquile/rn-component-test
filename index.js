import React, { Component } from 'react';
import { Animated, Dimensions, Easing, View } from 'react-native';
import PropTypes from 'prop-types';
import i18n from 'i18next';

import s from '../../styles';
import { STATUS_BAR_HEIGHT } from '../../styles/platform';
import { isIPhone55sSE, isTablet } from '../../utils/device-info';
import AutoBackupTipsModal from './autobackup-tips.modal';
import { DEFAULT_DEVICE_NAME } from '../../constants';
import { IS_WD, PROJECT_TYPE } from '../../feature-flags.config';

const containerStyles = [s.flx1, s.abs, s.right0, s.top0, s.bottom0, s.flxRow, s.itemsCenter,
  s.bgOpBlack];
const imgSize1 = isIPhone55sSE ? { height: 98, width: 98 } : { height: 128, width: 128 };
const imgSize2 = isIPhone55sSE ? { height: 96, width: 96 } : { height: 123, width: 123 };
const imgSize3 = isIPhone55sSE ? { height: 98, width: 98 } : { height: 128, width: 128 };
const imgSize4 = isIPhone55sSE ? { height: 98, width: 98 } : { height: 128, width: 128 };


class AutoBackupTips extends Component {
  constructor(props) {
    super(props);

    const { width } = Dimensions.get('window');
    this.state = {
      step: 0,
      width,
    };
    this.animatedLeft = new Animated.Value(0);
    this.onAutoBackupTipsHide = props.onAutoBackupTipsHide;
  }

  _showNextStep = () => {
    this.setState({ step: ++this.state.step });

    Animated.timing(this.animatedLeft, {
      toValue: -this.state.width * this.state.step,
      duration: 300,
      easing: Easing.linear,
    }).start();
  };

  _onLayout = () => {
    if (isTablet) {
      const { width: deviceWidth } = Dimensions.get('window');
      const { width } = this.state;

      if (width !== deviceWidth) {
        this.setState({
          width: deviceWidth,
        });
        this.animatedLeft = new Animated.Value(-deviceWidth * this.state.step);
      }
    }
  };

  render() {
    const { step, width } = this.state;

    return (
      <Animated.View
    style={[
      ...containerStyles,
    {
      left: this.animatedLeft,
        width: (width * 4),
      paddingTop: STATUS_BAR_HEIGHT,
    },
  ]}
    onLayout={this._onLayout}
  >
  <View
    style={{ width }}
  >
  <AutoBackupTipsModal
    nextStep={this._showNextStep}
    step={step}
    tipImage={require('../../assets/ibi/autobackup/tips.png')}
    tipImageSize={imgSize1}
    tipText={i18n.t('auto-backup-tips-text-1')}
    />
    </View>
    <View
    style={{ width }}
  >
  <AutoBackupTipsModal
    nextStep={this._showNextStep}
    step={step}
    tipImage={require('../../assets/ibi/autobackup/overnight.png')}
    tipImageSize={imgSize2}
    tipText={i18n.t('auto-backup-tips-text-2')}
    />
    </View>
    <View
    style={{ width }}
  >
  <AutoBackupTipsModal
    nextStep={this._showNextStep}
    step={step}
    tipImage={require('../../assets/ibi/autobackup/at-home.png')}
    tipImageSize={imgSize3}
    tipText={i18n.t(`auto-backup-tips-text-3.${PROJECT_TYPE}`, { productName: DEFAULT_DEVICE_NAME })}
    />
    </View>
    <View
    style={{ width }}
  >
  <AutoBackupTipsModal
    nextStep={this.onAutoBackupTipsHide}
    step={step}
    tipImage={IS_WD ?
        require('../../assets/autobackup/app-open-mch.png') :
        require('../../assets/ibi/autobackup/app-open.png')
    }
    tipImageSize={imgSize4}
    tipText={i18n.t('auto-backup-tips-text-4', { productName: DEFAULT_DEVICE_NAME })}
    />
    </View>
    </Animated.View>
  );
  }
}

AutoBackupTips.propTypes = {
  onAutoBackupTipsHide: PropTypes.func.isRequired,
};

export default AutoBackupTips;
