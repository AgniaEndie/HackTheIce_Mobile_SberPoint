import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {LinearGradient} from "react-native-linear-gradient";
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {user_login} from '../../api/user_api';
import {Eye, EyeActive} from "../../assets";
import linearGradientNativeComponent from "react-native-svg/src/fabric/LinearGradientNativeComponent";
import {ViewWindows} from "react-native-windows";

export default function Login({navigation}) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [seePassword, setSeePassword] = useState(true);

    const handleCheckName = text => {

        setName(text);
    };

    const checkPasswordValidity = value => {

        const isValidLength = /^.{0,16}$/;
        if (!isValidLength.test(value)) {
            return 'Password must be 8-16 Characters Long.';
        }

        // const isContainsSymbol =
        //   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        // if (!isContainsSymbol.test(value)) {
        //   return 'Password must contain at least one Special Symbol.';
        // }

        return null;
    };

    const handleLogin = () => {
        const checkPassowrd = checkPasswordValidity(password);
        if (!checkPassowrd) {
            user_login({
                name: name.toLocaleLowerCase(),
                password: password,
            })
                .then(result => {
                    if (result.status == 200) {
                        AsyncStorage.setItem('AccessToken', result.data.token);
                        navigation.replace('Home');
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            alert(checkPassowrd);
        }
    };

    return (

        <View style={styles.container}>
            <Text style={{
                justifyContent: 'center',
                flex: 0,
                fontSize: 30,
                fontWeight: 'bold',
                color: '#117123',
                textAlign: 'center'
            }}>SBERPOINT</Text>
            <View style={{backgroundColor: 'white', shadowColor: '#C4C4C4', paddingLeft: 20, paddingRight: 20}}>
                <Text style={{fontSize: 20, textAlign: 'center', marginTop: 20,}}>Войти в аккаунт</Text>
                <View style={styles.wrapperInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Имя"
                        value={name}
                        onChangeText={text => handleCheckName(text)}
                    />
                </View>
                <View style={styles.wrapperInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Пароль"
                        value={password}
                        secureTextEntry={seePassword}
                        onChangeText={text => setPassword(text)}
                    />
                    <TouchableOpacity
                        style={styles.wrapperIcon}
                        onPress={() => setSeePassword(!seePassword)}>
                        <Image source={seePassword ? Eye : EyeActive} style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
            {name == '' || password == '' ? (
                <TouchableOpacity
                    disabled
                    style={styles.buttonDisable}
                    onPress={handleLogin}>
                    <Text style={styles.text}>Логин</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            )}
        </View>

    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    wrapperInput: {
        marginBottom: 30,
        borderBottomWidth: 4,
        borderBottomColor: '#3DA938',
        borderColor: 'grey',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        width: '100%',
        color: 'black',
    },
    wrapperIcon: {
        position: 'absolute',
        right: 0,
        padding: 10,
    },
    icon: {
        width: 30,
        height: 24,
    },
    button: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#117123',
        borderRadius: 5,
        marginTop: 25,
    },
    buttonDisable: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C4C4C4',
        borderRadius: 5,
        marginTop: 25,
    },
    text: {
        color: 'white',
        fontWeight: '700',
    },
    textFailed: {
        alignSelf: 'flex-end',
        color: 'red',
    },
});