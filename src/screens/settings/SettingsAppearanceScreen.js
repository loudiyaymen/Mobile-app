import { View, Text, Switch, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { colors } from '../../themes/color';
import { typography } from '../../themes/typography';
import { styles } from "../../themes/styles";


export default function SettingsAppearanceScreen() {
  const navigation = useNavigation();
  const [isDark, setIsDark] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={colors.Primary_Charcoal} />
        <Text style={[typography.h2, { color: colors.Primary_Charcoal }]}>Appearance</Text>
      </TouchableOpacity>

      <View style={styles.groupBox}>
        <View style={styles.row}>
          <Text style={styles.rowText}>Dark Theme</Text>
          <Switch
            value={isDark}
            onValueChange={(val) => setIsDark(val)}
            trackColor={{ false: '#767577', true: colors.Primary_Green }}
            thumbColor={'#fff'}
          />
        </View>
      </View>
    </View>
  );
}
