/**
 * Bottom Buttons UI Block
 */

import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import {NavigationRoute, NavigationScreenProp} from 'react-navigation';

interface BottomBtnsProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  active: string
}

export default class Search extends React.Component<BottomBtnsProps> {
  render() {
    const {active} = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => this.props.navigation.navigate('Map')}
        >
          <View style={{...styles.btnView, backgroundColor: active === 'Map' ? '#3090EE' : '#2070bb'}}>
            <Text style={styles.btnText}>{'MAP'}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() => this.props.navigation.navigate('Search')}
        >
          <View style={{...styles.btnView, backgroundColor: active === 'Search' ? '#3090EE' : '#2070bb'}}>
            <Text style={styles.btnText}>{'SEARCH'}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btnWrapper: {
    width: '50%',
  },
  btnView: {
    height: 40,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF'
  }
});
