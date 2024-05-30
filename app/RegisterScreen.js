import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity, AppState, Alert } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useFonts } from "expo-font";
import { Link, router } from "expo-router";
import { supabase } from "../lib/supabase";

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  }
  else {
    supabase.auth.stopAutoRefresh()
  }
})

const RegisterScreen = () => {
  // let [fontsLoaded] = useFonts({
  //   'Kanit-SemiBold': require('../assets/Kanit-SemiBold.ttf'),
  // });

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false)

  function validatePassword(p) {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(p);
  }

  async function signUpWithEmail() {
    setLoading(true);
    try {
      // const {data : {user}} = await supabase.auth.checkEmail(email);
      // if (user) {
      //   Alert.alert('Email already in use!');
      //   setLoading(false);
      //   return;
      // }

      if (password !== confirmPassword) {
        Alert.alert('Passwords do not match!');
        return;
      }

      if (!validatePassword(password)) {
        Alert.alert('Password must be at least 8 characters with an uppercase letter and a number!')
        return;
      }

      const response = await supabase.auth.signUp({
        email: email,
        password: password,
      });
  
      if (response.error) {
        if (response.error.message.includes('rate limit exceeded')) {
          Alert.alert('Email already in use!');
          setLoading(false);
          return;
        }
        else {
          Alert.alert(response.error.message);
        }
      } else if (!response.data?.session) {
          Alert.alert('Please check your inbox for email verification!');
          router.replace('/LoginScreen');
      } else {
        router.replace('/LoginScreen');
      }
    } catch (error) {
        console.error('Unexpected error during signup:', error);
    } finally {
        setLoading(false);
    }
  }

  return (
    <SafeAreaView style={{flex:1, justifyContent:'center', backgroundColor:'#f9f7f1'}}>
      <View style={{alignItems:'center', paddingHorizontal:25}}>
        {/* Teks Register (FontFamily perlu dibenerin) */}
        <Text style={{ fontSize:48, fontWeight:'bold', color:'black', marginBottom:10}}>Register </Text>
        
        {/* Gambar PregnaGuide */}
        <View>
          <Image source={require('../assets/pregnaGuideIcon.png')} style={{width:300, height:300}} />
        </View>

        {/* Email Input Area */}
        <View
          style={{
            flexDirection:'row',
            borderColor:'#ccc',
            borderWidth:1,
            borderRadius:4,
            paddingBottom:8,
            paddingTop:8,
            paddingLeft:5,
            marginBottom:25,
            alignItems:'center'
          }}>
            <MaterialIcons
              name='email'
              size={20}
              color='#666'
              style={{marginRight:15}}
            />
            <TextInput
              placeholder='Email'
              style={{flex:1, paddingVertical:0}}
              keyboardType='email-address'
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
        </View>

        {/* Password Input Area */}
        <View
          style={{
            flexDirection:'row',
            borderColor:'#ccc',
            borderWidth:1,
            borderRadius:4,
            paddingBottom:8,
            paddingTop:8,
            paddingLeft:5,
            // marginBottom:25,
            alignItems:'center'
          }}>
            <MaterialIcons
              name='lock'
              size={20}
              color='#666'
              style={{marginRight:15}}
            />
            <TextInput
              placeholder='Password'
              style={{flex:1, paddingVertical:0}}
              secureTextEntry={true}
              onChangeText={(text) => {setPassword(text); setIsPasswordValid(validatePassword(text))}}
              value={password}
            />
        </View>

        <View style={{marginBottom:25}}>
          {isPasswordValid ? (
            <Text style={{color:'green'}}>Password meets requirements</Text>
          ) : (
            <Text style={{color:'red'}}>Password must be at least 8 characters with an uppercase letter and a number!</Text>
          )}
        </View>

        {/* Confirm Password Input Area */}
        <View
          style={{
            flexDirection:'row',
            borderColor:'#ccc',
            borderWidth:1,
            borderRadius:4,
            paddingBottom:8,
            paddingTop:8,
            paddingLeft:5,
            // marginBottom:25,
            alignItems:'center'
          }}>
            <MaterialIcons
              name='key'
              size={20}
              color='#666'
              style={{marginRight:15}}
            />
            <TextInput
              placeholder='Confirm Password'
              style={{flex:1, paddingVertical:0}}
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
        </View>

        <View style={{marginBottom:25}}>
          {password !== confirmPassword && (
            <Text style={{color:'red'}}>Password do not match!</Text>
          )}
        </View>

        {/* Register Button */}
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            onPress={() => signUpWithEmail()}
            style={{
              backgroundColor:'#f8c9e2',
              padding:20,
              borderRadius:4,
              marginBottom:30,
              flex:1
            }}>
              <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#ffffff'}}>Register</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button Redirect */}
        <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
            <Text>Already have an account? Click here to</Text>
            <Link href='/LoginScreen' style={{color:'#f8c9e2', fontWeight:'700'}}> Login</Link>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;