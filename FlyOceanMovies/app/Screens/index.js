
import {Navigation, ScreenVisibilityListener} from 'react-native-navigation';
import Featured from '../Components/Featured'
import Search from '../Components/Search'
import USBox from '../Components/USBox'

import MovieList from '../Components/MovieList';
import SearchForm from '../Components/SearchForm';
import USBoxList from '../Components/USBoxList';
import MovieDetail from '../Components/MovieDetail';
import Login from '../Components/Login';

export function registerScreens() {
    Navigation.registerComponent('com.fof.FlyOceanMovies.featured',()=>Featured);
    Navigation.registerComponent('com.fof.FlyOceanMovies.search',()=>Search);
    Navigation.registerComponent('com.fof.FlyOceanMovies.usbox',()=>USBox);

    Navigation.registerComponent('com.fof.FlyOceanMovies.MovieList',()=>MovieList);
    Navigation.registerComponent('com.fof.FlyOceanMovies.SearchForm',()=>SearchForm);
    Navigation.registerComponent('com.fof.FlyOceanMovies.USBoxList',()=>USBoxList);
    Navigation.registerComponent('com.fof.FlyOceanMovies.MovieDetail',()=>MovieDetail);
    Navigation.registerComponent('com.fof.FlyOceanMovies.Login',()=>Login);
}
export function registerScreenVisibilityListener() {
    new ScreenVisibilityListener({
        willAppear: ({screen}) => console.log(`Displaying screen ${screen}`),
        didAppear: ({screen, startTime, endTime, commandType}) => console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`),
        willDisappear: ({screen}) => console.log(`Screen will disappear ${screen}`),
        didDisappear: ({screen}) => console.log(`Screen disappeared ${screen}`)
    }).register();
}