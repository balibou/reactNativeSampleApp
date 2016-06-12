import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

//declare variables just below import
const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class SampleAppMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //movies: null, //set initial state
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2, //content in row1 is != than row2
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData(); //request once component loaded
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          //movies: responseData.movies, //for 1 movie
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    //if (!this.state.movies) {for 1 movie
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    //let movie = this.state.movies[0]; //for 1 movie
    //return this.renderMovie(movie); //for 1 movie
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', //align items in row
    justifyContent: 'center', //center content vertically
    alignItems: 'center', // center content horizontally
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1, // takes remaining space in parent container
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
});

AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);
