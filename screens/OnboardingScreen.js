import React from 'react';

import { Image, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';


const OnboardingScreen = ({ navigation }) => {
    return (

        <Onboarding
            onSkip={(navigation.replace('Register'))}
            onDone={(navigation.navigate('Register'))}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/phone_logo.png')} />,
                    title: 'VasTel Health',
                    subtitle: 'Get doctor\'s advice at your convience',
                },

                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/phone_logo.png')} />,
                    title: 'VasTel Health',
                    subtitle: 'Safe, secure & 24/7 availability',
                },

            ]}
        />
    );
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

