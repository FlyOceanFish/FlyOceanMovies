/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import MovieList from './app/Components/MovieList';

import React, {Component} from 'react';

import {
    AppRegistry
} from 'react-native'

export default class FlyOceanMovies extends Component {
    render() {
        return <MovieList/>
    }
}

AppRegistry.registerComponent('FlyOceanMovies', () => FlyOceanMovies);
