import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import EmergencyHomeScreen from './src/screens/EmergencyHomescreen';
import EmergencyConfirmScreen from './src/screens/EmergencyConfirmScreen';
import EmergencyConnectedScreen from './src/screens/EmergencyConnectedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
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
          name="EmergencyConnected"
          component={EmergencyConnectedScreen}
          options={{ title: 'Security Information' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}