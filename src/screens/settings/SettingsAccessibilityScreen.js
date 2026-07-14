import { View, Text, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { colors } from '../../themes/color';
import { typography } from '../../themes/typography';
import { styles } from "../../themes/styles";


const colorOptions = [
  { id: 'none',        label: 'None',        sub: 'Default app colors',  colors: ['#4CAF50', '#2196F3'] },
  { id: 'protanopia',  label: 'Protanopia',  sub: 'Red-blind',           colors: ['#9C8FD4', '#B0A0E0'] },
  { id: 'deuteranopia',label: 'Deuteranopia',sub: 'Green-blind',         colors: ['#F5C542', '#E8A020'] },
  { id: 'tritanopia',  label: 'Tritanopia',  sub: 'Blue-blind',          colors: ['#F48FB1', '#80DEEA'] },
];

export default function SettingsAccessibilityScreen() {
  const navigation = useNavigation();
  const [isDisabled, setIsDisabled]       = useState(false);
  const [textSize, setTextSize]           = useState(16);
  const [selectedColor, setSelectedColor] = useState('none');

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={colors.Primary_Charcoal} />
        <Text style={[typography.h2, { color: colors.Primary_Charcoal }]}>Accessibility</Text>
      </TouchableOpacity>

      {/* Disability toggle */}
      <View style={styles.groupBox}>
        <View style={styles.row}>
          <Text style={styles.rowText}>Are you a person with a disability?</Text>
          <Switch
            value={isDisabled}
            onValueChange={setIsDisabled}
            trackColor={{ false: '#767577', true: colors.Primary_Green }}
            thumbColor={'#fff'}
          />
        </View>
      </View>

      {/* Text size */}
      <Text style={styles.sectionLabel}>Text Size</Text>
      <View style={styles.groupBox}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ fontSize: 12, color: colors.Primary_Charcoal }}>A</Text>
            <Slider
              style={{ flex: 1 }}
              minimumValue={12}
              maximumValue={24}
              step={1}
              value={textSize}
              onValueChange={setTextSize}
              minimumTrackTintColor={colors.Primary_Green}
              maximumTrackTintColor='#E0E0E0'
              thumbTintColor={colors.Primary_Green}
            />
            <Text style={{ fontSize: 20, color: colors.Primary_Charcoal }}>A</Text>
          </View>
          <Text style={[styles.previewText, { fontSize: textSize }]}>This is preview text</Text>
        </View>
      </View>

      {/* Colour correction */}
      <Text style={styles.sectionLabel}>Colour Correction</Text>
      {colorOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.colorRow, selectedColor === option.id && styles.colorRowSelected]}
          onPress={() => setSelectedColor(option.id)}
        >
          <View style={styles.colorSwatch}>
            <View style={{ flex: 1, backgroundColor: option.colors[0], borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }} />
            <View style={{ flex: 1, backgroundColor: option.colors[1], borderTopRightRadius: 8, borderBottomRightRadius: 8 }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.rowText}>{option.label}</Text>
            <Text style={styles.subText}>{option.sub}</Text>
          </View>
          {selectedColor === option.id
            ? <Ionicons name="checkmark-circle" size={22} color={colors.Primary_Green} />
            : <View style={styles.emptyCircle} />
          }
        </TouchableOpacity>
      ))}

    </ScrollView>
  );
}
