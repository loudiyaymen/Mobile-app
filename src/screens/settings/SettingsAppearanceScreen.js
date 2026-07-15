import { View, Text, Switch, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { typography } from '../../themes/typography';
import { styles } from "../../themes/styles";
import { useTheme } from '../../context/ThemeContext';
import { useScaledTypography } from '../../themes/ScaledTypo';


export default function SettingsAppearanceScreen() {
  const navigation = useNavigation();
  const {theme, isDarkMode, toggleDarkMode,} = useTheme();
  const typography = useScaledTypography();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
        <Text style={[styles.rowText, { color: theme.colors.text, fontSize: typography.h2.fontSize }]}>
        Appearance</Text>
      </TouchableOpacity>

      <View style={[styles.groupBox, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.row}>
        <Text style={[{ color: theme.colors.text, fontSize: typography.body.fontSize }]}>
        Dark Theme</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor='#fff'
          />
        </View>
      </View>
    </View>
  );
}
