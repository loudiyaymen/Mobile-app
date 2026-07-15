import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../themes/color';
import { typography } from '../../themes/typography';
import { styles } from "../../themes/styles";
import { useTheme } from '../../context/ThemeContext';
import { useScaledTypography } from '../../themes/ScaledTypo';

export default function SettingsCampusScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const typography = useScaledTypography();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
        <Text style={[styles.rowText, { color: theme.colors.text, fontSize: typography.h2.fontSize }]}>
        Campus</Text>
      </TouchableOpacity>

      <View style={styles.groupBox}>
        <TouchableOpacity style={styles.row}>
        <Text style={[styles.rowText, { color: theme.colors.text, fontSize: typography.body.fontSize }]}>
        Ottawa</Text>
          <Ionicons name="checkmark-circle" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.row, { opacity: 0.4 }]} disabled={true}>
        <Text style={[styles.rowText, { color: theme.colors.text, fontSize: typography.body.fontSize }]}>
        Pembroke</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
