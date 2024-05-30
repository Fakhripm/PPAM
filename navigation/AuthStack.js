import React from "react";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import LoginScreen from "../app/LoginScreen";
import RegisterScreen from "../app/RegisterScreen";
import ProfileScreen from "../app/ProfileScreen";
import EditProfileScreen from "../app/EditProfileScreen";
import EmergencyRegistrationScreen from "../app/EmergencyRegistrationScreen";
import SOSScreen from "../app/SOSScreen";
import TrackLocationScreen from "../app/TrackLocationScreen";
import BelanjaBumilScreen from "../app/BelanjaBumilScreen";
import ProductDetailsScreen from "../app/ProductDetailsScreen";
import AddAddressScreen from "../app/AddAddressScreen";
import BelanjaBumilScreen from "../app/BelanjaBumilScreen";
import CartScreen from "../app/CartScreen";
import PaymentScreen from "../app/PaymentScreen";
import HomeConsultationScreen from "../app/HomeConsultationScreen";
import ConsultationScreen from "../app/ConsultationScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="EmergencyRegistration" component={EmergencyRegistrationScreen} />
            <Stack.Screen name="SOS" component={SOSScreen} />
            <Stack.Screen name="TrackLocation" component={TrackLocationScreen} />
            <Stack.Screen name="BelanjaBumil" component={BelanjaBumilScreen} />
            <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
            <Stack.Screen name="AddAddress" component={AddAddressScreen} />
            <Stack.Screen name="BelanjaBumil" component={BelanjaBumilScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
            <Stack.Screen name="HomeConsultation" component={HomeConsultationScreen} />
            <Stack.Screen name="Consultation" component={ConsultationScreen} />
            <Stack.Screen name="History" component={HistoryScreen} />
        </Stack.Navigator>
    );
};

 export default AuthStack;