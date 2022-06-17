import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screens/OnboardingScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';



const Stack = createNativeStackNavigator()

export default function App() {
  // check whether this is the first app launch
  const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch == null) {
    return null;
  } else if (isFirstLaunch == true) {
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, }} />
        </Stack.Navigator>
      </NavigationContainer>

    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false, }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false, }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false, }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}