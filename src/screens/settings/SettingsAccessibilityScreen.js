import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { typography } from '../../themes/typography';
import { styles } from "../../themes/styles";

const COLOR_OPTIONS = [
  { id: 'none',         label: 'None',         sub: 'Default app colors', swatchColors: ['#4CAF50', '#2196F3'] },
  { id: 'protanopia',   label: 'Protanopia',   sub: 'Red-blind',          swatchColors: ['#9C8FD4', '#B0A0E0'] },
  { id: 'deuteranopia', label: 'Deuteranopia', sub: 'Green-blind',        swatchColors: ['#F5C542', '#E8A020'] },
  { id: 'tritanopia',   label: 'Tritanopia',   sub: 'Blue-blind',         swatchColors: ['#F48FB1', '#80DEEA'] },
];

export default function SettingsAccessibilityScreen() {
  const navigation = useNavigation();
  const {
    theme,
    fontScale,
    updateFontScale,
    isAccessible,
    toggleAccessibility,
    colorCorrection,      
    updateColorCorrection, 
  } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>

      <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
        <Text style={[typography.h2, { color: theme.colors.text }]}>Accessibility</Text>
      </TouchableOpacity>

      {/* Disability toggle */}
      <View style={[styles.groupBox, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.row}>
          <Text style={[styles.rowText, { 
            color: theme.colors.text, 
            fontSize: 16 * fontScale,
            flex: 1,
            flexWrap: 'wrap',
            marginRight: 12,
          }]}>
            Are you a person with a disability?
          </Text>
          <Switch
            value={isAccessible}
            onValueChange={toggleAccessibility}
            trackColor={{ false: '#767577', true: theme.colors.primary }}
            thumbColor='#fff'
          />
        </View>
      </View>

      {/* Text size */}
      <Text style={[styles.sectionLabel, { color: theme.colors.subtext }]}>Text Size</Text>
      <View style={[styles.groupBox, { backgroundColor: theme.colors.surface }]}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ fontSize: 12 * fontScale, color: theme.colors.text }}>A</Text>
            <Slider
              style={{ flex: 1 }}
              minimumValue={0.8}
              maximumValue={1.4}
              step={0.1}
              value={fontScale}
              onSlidingComplete={updateFontScale}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.border}
              thumbTintColor={theme.colors.primary}
            />
            <Text style={{ fontSize: 24 * fontScale, color: theme.colors.text }}>A</Text>
          </View>
          <Text style={[styles.previewText, { 
            color: theme.colors.subtext, 
            fontSize: 16 * fontScale 
          }]}>
            This is preview text
          </Text>
        </View>
      </View>

      {/* Colour correction */}
      <Text style={[styles.sectionLabel, { color: theme.colors.subtext }]}>Colour Correction</Text>
      {COLOR_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.colorRow,
            { backgroundColor: theme.colors.surface },
            colorCorrection === option.id && { 
              borderWidth: 1.5, 
              borderColor: theme.colors.primary 
            },
          ]}
          onPress={() => updateColorCorrection(option.id)}
        >
          <View style={styles.colorSwatch}>
            <View style={{ flex: 1, backgroundColor: option.swatchColors[0], borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
            <View style={{ flex: 1, backgroundColor: option.swatchColors[1], borderTopRightRadius: 8, borderBottomRightRadius: 8 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[styles.rowText, { color: theme.colors.text, fontSize: 16 * fontScale }]}>
              {option.label}
            </Text>
            <Text style={[styles.subText, { color: theme.colors.subtext, fontSize: 13 * fontScale }]}>
              {option.sub}
            </Text>
          </View>
          {colorCorrection === option.id
            ? <Ionicons name="checkmark-circle" size={22} color={theme.colors.primary} />
            : <View style={styles.emptyCircle} />
          }
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}