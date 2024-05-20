import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import LoginScreen from "../app/LoginScreen";
import RegisterScreen from "../app/RegisterScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;