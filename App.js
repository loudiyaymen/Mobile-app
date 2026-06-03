import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmergencyHomeScreen from './src/screens/EmergencyHomescreen';
import EmergencyConfirmScreen from './src/screens/EmergencyConfirmScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="EmergencyHome"
        screenOptions={{
          headerStyle: { backgroundColor: '#394A59' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="EmergencyHome"
          component={EmergencyHomeScreen}
          options={{ title: 'Emergency Home' }}
        />
        <Stack.Screen
          name="EmergencyConfirm"
          component={EmergencyConfirmScreen}
          options={{ title: 'Confirm Emergency' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}