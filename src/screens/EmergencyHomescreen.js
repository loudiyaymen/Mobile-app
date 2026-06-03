// Displays the emergency SOS FAB home screen

import React from 'react';
import {Text, View, Pressable} from 'react-native';
import { styles } from '../themes/styles';
import { useNavigation } from '@react-navigation/native';

export default function EmergencyHomescreen() {
    const navigation = useNavigation();

    return(
       <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={styles.title}>EmergencyHomescreen</Text>
      
      <Pressable onPress={() => navigation.navigate('EmergencyConfirm')}>
        <Text>Go to Confirm Screen</Text>
      </Pressable>
    </View>
    );
}