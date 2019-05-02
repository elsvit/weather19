/**
 * Search screen
 */

import * as React from 'react';
import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IAppState } from '../../../store';
import { IBooleanObj } from '../../../store/common';
import {GET_LOCATION, GET_WEATHER, getLocation} from '../../../store/location';
import { BottomBtns } from '../../ui-blocks';
import SearchInput from '../../ui-blocks/SearchInput';

interface IStateMap {
  weather: any;
  loading: IBooleanObj;
}

interface IDispatchMap {
  getLocation: typeof getLocation;
}

interface ISearchState {
  searchText: string;
}

type TSearchProps = IStateMap & IDispatchMap & NavigationScreenProps;

class Search extends React.Component<TSearchProps, ISearchState> {
  public constructor(props: TSearchProps) {
    super(props);
    this.state = {
      searchText: '',
    };
  }

  render() {
    const { weather, loading } = this.props;
    const daily = weather && weather.daily;
    return (
      <View style={styles.container}>
        <SearchInput
          placeholder={'Enter place'}
          submit={this.props.getLocation}
          disabled={loading[GET_WEATHER] || loading[GET_LOCATION]}
        />
        <View style={styles.listView}>
          {loading[GET_WEATHER] ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#00ff00" />
            </View>
          ) : (
            daily && (
              <FlatList
                style={styles.list}
                data={daily}
                renderItem={({ item }: { item: { time: string; temperature: string } }) => (
                  <View style={styles.section}>
                    <Text style={styles.sectionText}>{item.time}</Text>
                    <Text style={styles.sectionText}>{item.temperature}</Text>
                  </View>
                )}
                keyExtractor={(item, idx) => String(idx)}
              />
            )
          )}
        </View>
        <BottomBtns navigation={this.props.navigation} active={'Search'} />
      </View>
    );
  }
}

const mapStateToProps = (state: IAppState) => ({
  weather: state.location.weather,
  loading: state.common.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getLocation,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listView: {
    flex: 1,
    width: '100%',
    marginBottom: 48,
  },
  list: {
    width: '100%',
  },
  section: {
    width: '70%',
    alignSelf: 'center',
    backgroundColor: '#70A0EE',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    borderRadius: 8,
    padding: 16,
    flex: 1,
    alignItems: 'center',
  },
  sectionText: {
    color: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
