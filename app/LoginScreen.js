import React from "react";
import { SafeAreaView, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useFonts } from "expo-font";

const LoginScreen = ({navigation}) => {
  let [fontsLoaded] = useFonts({
    'Kanit-SemiBold': require('../assets/Kanit-SemiBold.ttf'),
  });

  return (
    <SafeAreaView style={{flex:1, justifyContent:'center', backgroundColor:'#f9f7f1'}}>
      <View style={{alignItems:'center', paddingHorizontal:25}}>
        {/* Teks Register (FontFamily perlu dibenerin) */}
        <Text style={{fontFamily:'Kanit-SemiBold', fontSize:48, fontWeight:'300', color:'black', marginBottom:10}}>Login </Text>
        
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
            marginBottom:25,
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
            />
        </View>

        {/* Login Button */}
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor:'#f8c9e2',
              padding:20,
              borderRadius:4,
              marginBottom:30,
              flex:1
            }}>
              <Text style={{textAlign:'center', fontWeight:'700', fontSize:16, color:'#ffffff'}}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Register Button Redirect */}
        <View style={{flexDirection:'row', justifyContent:'center', marginBottom:30}}>
            <Text>Don't have an account? Click here to</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={{color:'#f8c9e2', fontWeight:'700'}}> Register</Text>
            </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;