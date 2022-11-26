import React, {PureComponent, useState} from 'react';

import MapView, {Marker} from 'react-native-maps';
import {Alert, Dimensions, Image, Modal, Pressable, StyleSheet, Text, TextInput, View,} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import map from "react-map-gl/src/components/map";
import Login from "./src/screens/login";
import Routers from "./src/routers/routers";



export default function App({navigation}) {

    return (
        <NavigationContainer>
            <Routers />
        </NavigationContainer>
    );
}
