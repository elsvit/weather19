/**
 * Search UI Block
 */

import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { FormikProps, withFormik } from 'formik';
import { object as yupObject, string as yupString } from 'yup';

import SearchIcon from '../ui-kit/Icons/SearchIcon';

const MIN_SYMBOLS_FOR_SEARCH = 3;

interface IOwnProps {
  placeholder?: string;
  value?: string;
  submit: (text: string) => void;
  disabled?: boolean
}

interface ISearchState {
  searchText: string;
}

type TSearchProps = IOwnProps & FormikProps<ISearchState>;

class SearchInput extends React.Component<TSearchProps> {
  static schema = yupObject().shape({
    searchText: yupString()
      .trim()
      .required(`Field is required (minimum ${MIN_SYMBOLS_FOR_SEARCH} symbols)`)
      .min(MIN_SYMBOLS_FOR_SEARCH, `Minimum length is ${MIN_SYMBOLS_FOR_SEARCH} symbols`),
  });

  public changeSearchInput = (value: string) => {
    this.props.setFieldValue('searchText', value);
  };

  public handleSubmit = () => {
    if (!this.props.disabled) {
      this.props.handleSubmit();
    }
  };

  render() {
    const { placeholder, values, errors } = this.props;
    return (
      <View style={styles.searchViewWrapper}>
        <View style={styles.searchView}>
          <TextInput
            autoCorrect={false}
            style={styles.searchInput}
            placeholder={placeholder || ''}
            placeholderTextColor={'#777'}
            value={values.searchText}
            onChangeText={this.changeSearchInput}
          />
          <View style={styles.searchSubmitView}>
            <TouchableOpacity style={styles.searchBtn} onPress={this.handleSubmit}>
              <SearchIcon />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.searchInputError}>{errors.searchText && errors.searchText}</Text>
      </View>
    );
  }
}

export default withFormik<IOwnProps, { searchText: string }>({
  mapPropsToValues() {
    return {
      searchText: '',
    };
  },
  validationSchema: SearchInput.schema,
  validateOnChange: false,
  async handleSubmit(values: { searchText: string }, { props }) {
    props.submit(values.searchText);
  },
})(SearchInput);

const styles = StyleSheet.create({
  searchViewWrapper: {
    width: '100%',
    height: 76,
    flexDirection: 'column',
  },
  searchView: {
    width: '100%',
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#BBBBBB',
    height: 40,
  },
  searchSubmitView: {
    height: 40,
    width: 80,
    borderRadius: 20,
    borderColor: '#70A0EE',
    borderWidth: 1,
    marginLeft: 16,
  },
  searchBtn: {
    width: '100%',
    flex: 1,
  },
  searchInputError: {
    height: 18,
    width: '100%',
    color: 'red',
    fontSize: 14,
    marginLeft: 8,
  },
});
