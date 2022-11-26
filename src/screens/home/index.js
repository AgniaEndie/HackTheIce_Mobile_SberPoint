import React, {PureComponent, useState} from 'react';

import MapView, {Marker} from 'react-native-maps';
import {
    Alert,
    Dimensions,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import map from "react-map-gl/src/components/map";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Home({navigation}) {

    async function sendOrderToServer(orderTitle, orderDescription, region) {
        const token = await AsyncStorage.getItem("AccessToken");
        fetch("http://hakatonspring.ml/api/order/create", {
            method: 'POST',
            headers: {
                /*Bearer 1|QIkpDZIZihub2BQSjnSRSjDrFbrDTBek7klI5dbm */
                'Authorization': 'Bearer ' + token,


                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: orderTitle,
                description: orderDescription,
                adress: 'sad',
                longtitude: region.longitude,
                latitude: region.latitude
            })
        })

    }


    const Tab = createBottomTabNavigator();

    function MapScreen() {
        const [region, setRegion] = useState({
            latitude: 37.88,
            longitude: -122.4324,
            latitudeDelta: 0.0993,
            longitudeDelta: 0.0421
        });
        let Coordinates = [];
        Coordinates[0] = 37.78825;
        Coordinates[1] = -122.4324;
        Coordinates[2] = 0.0922;
        Coordinates[3] = 0.0421;

        const [modalVisible, setModalVisible] = useState(false);

        const [orderTitle, onChangeOrderTitle] = useState("");
        const [orderDescription, onChangeOrderDescription] = useState('');

        return (

            <View style={styles.container}>

                <Text style={styles.mapText}> {region.latitude} + {region.longitude}</Text>
                {/*Map*/}
                <MapView
                    style={styles.map}

                    initialRegion={{
                        latitude: Coordinates[0],
                        longitude: Coordinates[1],
                        latitudeDelta: Coordinates[2],
                        longitudeDelta: Coordinates[3]
                    }}
                    zoomControlEnabled={true}
                    rotateEnabled={true}
                    scrollEnabled={true}
                    toolbarEnabled={true}
                    onRegionChangeComplete={(region) => setRegion(region)}
                    onMarkerPress={() => setModalVisible(true)}
                    //onPress={setMarker()}
                >
                    <Marker style={{height: 10, width: 10}}
                            coordinate={{latitude: region.latitude, longitude: region.longitude}}
                            image={require('../../../assets/marker.png')}>
                    </Marker>


                </MapView>

                <Modal animationType="slide" style={styles.modal} transparent={true} visible={modalVisible}
                       onRequestClose={() => {
                           const modalClose = () => {
                               Alert.alert("Modal has been closed!", 'ALERT');
                               setModalVisible(!modalVisible)
                           }
                       }}>
                    <Text style={styles.modalText}>Modal</Text>
                    <TextInput style={styles.modalText} onChangeText={onChangeOrderTitle}
                               value={orderTitle}></TextInput>
                    <TextInput style={styles.modalText} onChangeText={onChangeOrderDescription}
                               value={orderDescription}></TextInput>
                    <Pressable onPress={() => sendOrderToServer(orderTitle, orderDescription, region)}
                               onPressOut={() => setModalVisible(!modalVisible)}>
                        <Text>Отправить завку</Text>
                    </Pressable>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        <Text onLoad={() => Alert.alert("Modal has been closed!", 'ALERT')}>Скрыть модалку</Text>
                    </Pressable>
                </Modal>
            </View>
        );
    }

    function AddPhoto() {
        return (
            <View>

            </View>
        );
    }

    function TakeBonus() {
        return (
            <View style={{margin: 20, height: 100, borderWidth: 0.5, borderRadius: 5, backgroundColor: '#EFFDED'}}>
                <Text style={{fontSize: 30, margin: 7, color: 'black'}}>Заголовок</Text>
                <Text style={{fontSize: 16, margin: 7,}}>Описание</Text>
            </View>
        )
        ;
    }

    function ProfileScreen() {
        const handleLogout = () => {
            AsyncStorage.clear();
            navigation.navigate('Login');
        };

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Home</Text>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                    <Text style={styles.textButton}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator screenOptions={{
                tabBarActiveBackgroundColor: '#EFFDED',
                tabBarInactiveBackgroundColor: '#F0F3F6'
            }}>
                <Tab.Screen
                    name='Карта'
                    component={MapScreen}
                    options={{
                        tabBarIcon: () => {
                            return <Image style={styles.icon}
                                          source={require('../../../assets/map.png')}/>
                        }
                    }}
                ></Tab.Screen>
                <Tab.Screen
                    name='Добавить фото'
                    component={AddPhoto}
                    options={{
                        tabBarIcon: () => {
                            return <Image style={styles.icon}
                                          source={require('../../../assets/addPhoto.png')}/>
                        }

                    }}
                >

                </Tab.Screen>
                <Tab.Screen
                    name='Система поощрений'
                    component={TakeBonus}
                    options={{
                        tabBarIcon: () => {
                            return <Image style={styles.icon}
                                          source={require('../../../assets/bonus.png')}/>
                        }
                    }}
                >

                </Tab.Screen>
                <Tab.Screen
                    name='Профиль'
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: () => {
                            return <Image style={styles.icon}
                                          source={require('../../../assets/profile.png')}/>
                        }
                    }}
                ></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>










        // function MapScreen() {
        //
        //
        //     );
        //
        //     function AddPhoto() {
        //         return (
        //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //
        //                 <Text>Сделать Фото</Text>
        //             </View>
        //         );
        //     }
        //
        //     function TakeBonus() {
        //         return (
        //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //                 <Text>Система поощрений</Text>
        //             </View>
        //         );
        //     }
        //
        //     function ProfileScreen() {
        //         return (
        //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //                 <Text>Профиль</Text>
        //             </View>
        //         );
        //     }
        //
        //     //
        //     // const handleLogout = () => {
        //     //     AsyncStorage.clear();
        //     //     navigation.navigate('Login');
        //     // };
        //     const Tab = createBottomTabNavigator();
        //
        //     return (
        //         <View style={styles.container}>
        //             <Text style={styles.text}>Home</Text>
        //             <NavigationContainer>
        //                 <Tab.Navigator screenOptions={{
        //                     headerShown: false,
        //                     tabBarActiveBackgroundColor: '#EFFDED',
        //                     tabBarInactiveBackgroundColor: '#F0F3F6'
        //                 }}>
        //
        //                 </Tab.Navigator>
        //             </NavigationContainer>
        //         </View>
        //     )
        // }
    )
}

const styles = StyleSheet.create({
    bottom: {
        height: '10%',
    },
    icon: {},
    root: {
        flex: 1,
        backgroundColor: '#F9FBFC',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height - 75,
    },
    modal: {
        marginTop: '50%',
        marginVertical: '50%'
    },
    searchContainer: {
        position: "absolute",
        width: "90%",
        backgroundColor: "white",
        shadowColor: "black",
        shadowOffset: {width: 2, height: 2,},
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
        padding: 8,
        borderRadius: 8,
        top: '1%',
    },
    input: {
        borderColor: "#888",
        borderWidth: 1,
    },
    mapText: {
        marginTop: 10,
        backgroundColor: "red",
    },
    modalText: {
        backgroundColor: 'red',
        marginTop: 10,
    }


});