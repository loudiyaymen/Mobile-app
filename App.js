import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EmergencyHomeScreen from './src/screens/EmergencyHomescreen';
import EmergencyConfirmScreen from './src/screens/EmergencyConfirmScreen';
import EmergencyHelpScreen from './src/screens/EmergencyHelpScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="EmergencyHome"
        screenOptions={{
          headerStyle: { backgroundColor: '#006341' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitle: 'Back',
          headerBackTitleVisible: true,
          headerBackTitleStyle: {
            fontSize: 14,
          },
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
        <Stack.Screen
          name="EmergencyHelp"
          component={EmergencyHelpScreen}
          options={{ title: 'Calling Security' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}