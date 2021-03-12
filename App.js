import React from 'react';
import DetailsScreen from './src/screen/DetailsScreen';
import HomeScreen from './src/screen/HomeScreen';
import IntroSlider from './src/screen/IntroSlider';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          gestureEnabled: true,
          cardOverlayEnabled: true,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        })}
        mode="modal">
        <Stack.Screen name="IntroSlider" component={IntroSlider} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
