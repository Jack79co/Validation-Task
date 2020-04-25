
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Hoshi } from 'react-native-textinput-effects';
import { validateAll } from 'indicative/validator'
import axios from 'axios';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Header, Button } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';





class Register extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    error: {},
    userAllData: '',
    userData: '',

    borderColor: '#C30C1E',

  }

  registerUser = async (data) => {
    const rules = {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string|min:6|confirmed'
    }

    const messages = {
      required: (field) => `${field} is required`,
      'email.email': ' The email is required ',
      'password.confirmed': 'The password confimration failed',
      'password.min': 'Password is too short',
    }

    try {

      await validateAll(data, rules, messages)

      const response = await axios.post('https://react-blog-api.bahdcasts.com/api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password
      })

      this.setState({
        userData: response.data.data.user,
        userAllData: response.data.data
      })

      this.props.navigation.navigate('Profile', { ...this.state.userData, ...this.state.userAllData })


    } catch (errors) {
      const formattedErrors = {}
      console.log('=====', errors.response)

      if (errors.response && errors.response.status === 422) {
        formattedErrors['email'] = errors.response.data['email'][0]
        this.setState({
          error: formattedErrors,
        })



      } else {
        errors.forEach(error => formattedErrors[error.field] = error.message)

        this.setState({
          error: formattedErrors
        })


      }


    }



  }



  render() {
    return (

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Header translucent={true} iosBarStyle='dark-content'
          androidStatusBarColor="transparent"
          style={styles.headerWrapper} />
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <View style={{ width: 100, height: 110, }}>
            <Image style={{ width: null, height: null, flex: 1 }} source={require('./assets/login.png')} />
          </View>
          <View style={{marginLeft:35 }}>
            <Text style={{fontSize:25 , fontFamily:'arial',color:'#2F4F62'}}>SignUp Now !</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Icon name={'md-person'} size={22} color={"#138FD7"} />
            <Hoshi
              label={'Name'}
              style={styles.hoshiStyle}
              borderColor={this.state.borderColor}
              borderHeight={2}
              inputPadding={16}
              backgroundColor={'#fff'}
              value={this.state.name}
              onChangeText={(name => this.setState({ name, }))}
            />
          </View>




          {
            this.state.error['name'] && <Text style={styles.errorMsg} >{this.state.error['name']}</Text>
          }

          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Icon name={'md-mail'} size={22} color={"#138FD7"} />
            <Hoshi
              label={'Email'}
              style={styles.hoshiStyle}
              borderColor={this.state.borderColor}
              borderHeight={2}
              inputPadding={16}
              backgroundColor={'#fff'}
              value={this.state.email}
              onChangeText={(email => this.setState({ email }))}
            />
          </View>

          {
            this.state.error['email'] && <Text style={styles.errorMsg} >{this.state.error['email']}</Text>
          }

          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Icon name={'md-lock'} size={22} color={"#138FD7"} />
            <Hoshi
              label={'Password'}
              secureTextEntry
              style={styles.hoshiStyle}
              borderColor={this.state.borderColor}
              borderHeight={2}
              inputPadding={16}
              backgroundColor={'#fff'}
              value={this.state.password}
              onChangeText={(password => this.setState({ password }))}
            />
          </View>
          {
            this.state.error['password'] && <Text style={styles.errorMsg} >{this.state.error['password']}</Text>
          }
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Icon name={'md-lock'} size={22} color={"#138FD7"} />
            <Hoshi
              label={'confirm password'}
              secureTextEntry
              style={styles.hoshiStyle}
              borderColor={this.state.borderColor}
              borderHeight={2}
              inputPadding={16}
              backgroundColor={'#fff'}
              value={this.state.password_confirmation}
              onChangeText={(password_confirmation => this.setState({ password_confirmation }))}
            />
          </View>
          {
            this.state.error['password_confirmation'] && <Text style={styles.errorMsg}>{this.state.error['password_confirmation']}</Text>
          }


          <View>

            <Button
              onPress={() => this.registerUser(this.state)}
              style={styles.LoginButton} >
              <Text style={styles.ButtonText}>Register</Text>
            </Button>
          </View>
        </View>


      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
  },
  headerWrapper:
  {
    marginTop: -20,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
    borderBottomColor: "transparent",
    alignItems: 'center',
    elevation: 0
  },
  errorMsg: {
    fontSize: 15,
    color: 'red',
    marginBottom: 10,
    paddingLeft: 40
  },
  hoshiStyle: {
    marginBottom: 15,
    flex: 1,
    marginLeft: 20
  },
  LoginButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#007aff',
    height: 50,
    borderRadius: 30,
    marginVertical: 40
  },
  ButtonText: {
    fontFamily: 'Opensans',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
});


export default Register;
