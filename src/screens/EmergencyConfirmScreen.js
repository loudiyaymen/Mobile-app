// Displays the emergency SOS confirmation screen

import React from 'react';
import {Text, View, Pressable} from 'react-native';
import { styles } from '../themes/styles';
import { useNavigation } from '@react-navigation/native';

export default function EmergencyConfirmScreen() {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={styles.title}>Emergency Confirm Screen</Text>
      
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </Pressable>
    </View>
  );
}