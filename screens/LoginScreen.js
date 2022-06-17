import React from 'react';
import { View, Text, TouchableOpacity, Platform, Dimensions, StyleSheet, TextInput, StatusBar, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';


function LoginScreen({ navigation }) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true
    });

    // get the email input
    const textInputChange = (val) => {
        if (val.length != 0) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }



    // Toggle function of the password
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const login = () => {

        // get the form values
        var email = this.state.email;
        var password = this.state.password;

        // check for empty values and warn
        if (email == "" && password == "") {
            Alert.alert("Error", "Login details are empty");
        } else {

            // call the login API endpoint using email and password
            var APIURL = "http://10.0.2.2:80/SignIn/login.php";

            var headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };

            var Data = {
                Email: email,
                Password: password
            };

            fetch(APIURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(Data)
            })
                .then((Response) => Response.json())
                .then((Response) => {
                    alert(Response[0].Message)
                    if (Response[0].Message == "Success") {
                        console.log("true")
                        // on success navigate to dashboard
                        this.props.navigation.navigate("HomeScreen");
                    }
                    console.log(Data);
                })
                .catch((error) => {
                    console.error("ERROR FOUND" + error);
                })

        }

    }



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Login now!</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <Text style={styles.text_footer}>Email</Text>

                <View style={styles.action}>
                    <FontAwesome
                        name='user-o'
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder='Your Email'
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        value={email}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name='check-circle'
                                color="green"
                                size={20}
                            />
                        </Animatable.View>

                        : null}
                </View>

                <Text style={[styles.text_footer,
                { marginTop: 35 }
                ]}>Password</Text>

                <View style={styles.action}>
                    <Feather
                        name='lock'
                        color="#05375a"
                        size={20}
                    />
                    <TextInput
                        placeholder='Your Password'
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                        value={password}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name='eye-off'
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name='eye'
                                color="grey"
                                size={20}
                            />

                        }
                    </TouchableOpacity>
                </View>




                <View style={styles.button}>

                    <TouchableOpacity

                        // call the login function here
                        onPress={() => ('login')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            backgroundColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#fff'
                        }]}>Sign In</Text>
                    </TouchableOpacity>

                </View>

                <View style={styles.bottomView}>
                    <Text>No account?</Text>
                    <TouchableOpacity activeOpacity={0.5}
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.linkText}>Register here</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
}

export default LoginScreen;


const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#0537a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS == 'ios' ? 0 : -12,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    edittext: {
        marginStart: 4
    },
    inputView: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        alignItems: 'center'
    },
    icon: {
        width: 18,
        height: 18
    },
    textEnd: {
        alignSelf: 'flex-end',
        fontSize: 12,
        paddingVertical: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    bottomView: {
        flexDirection: 'row',
        marginTop: 18,
        justifyContent: 'center'
    },
    linkText: {
        color: '#009387',
        fontWeight: 'bold',
        marginStart: 4,
        borderBottomColor: '#fff',
        borderBottomWidth: 1
    }
});



