// Displays the emergency SOS FAB home screen

import React, { useRef, useState } from 'react';
import { Text, View, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, COLORS } from '../themes/styles';
import { useNavigation } from '@react-navigation/native';

export default function EmergencyHomescreen() {
  const navigation = useNavigation();
  const timerRef = useRef(null);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const [isPressing, setIsPressing] = useState(false);
  const holdTime = 3000; 
  const handlePressIn = () => {
    setIsPressing(true);
    
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();

    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: holdTime,
      useNativeDriver: false,
    }).start();
    timerRef.current = setTimeout(() => {
      navigation.navigate('EmergencyConfirm');
      resetAnimations();
    }, holdTime);
  };
  const handlePressOut = () => {
    setIsPressing(false);
    
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    resetAnimations();
  };

  const resetAnimations = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    
    progressAnim.setValue(0);
  };
  const rotateInterpolation = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressCircleAnimatedStyle = {
    transform: [{ rotate: rotateInterpolation }],
  };

  const fabAnimatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.homeTitleContainer}>
        <Text style={styles.homeTitle}>Press and hold the SOS button for 3 seconds</Text>
      </View>  
      <View style={styles.fabContainer}>        
        {isPressing && (
          <Animated.View style={styles.progressCircleContainer}>
            <Animated.View style={styles.progressCircleBase}>
              <Animated.View style={[styles.progressCircleFill, progressCircleAnimatedStyle]} />
            </Animated.View>
          </Animated.View>
        )}
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Animated.View style={[styles.fab, fabAnimatedStyle]}>
            <Text style={styles.fabIcon}>SOS</Text>
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
}