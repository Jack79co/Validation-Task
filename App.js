

import { createStackNavigator, } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Register from './Register';
import Profile from './Profile';


const Screen = createStackNavigator({
  Register: {
    screen: Register
  },
  Profile: {
    screen: Profile
  }
}, {
  initialRouteName: 'Register',
  headerMode: 'none'
})

const renderScreen = createAppContainer(Screen)

export default renderScreen
