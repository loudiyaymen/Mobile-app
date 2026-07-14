import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../themes/color';
import { typography } from '../../themes/typography';
import { styles } from "../../themes/styles";

export default function SettingsCampusScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backRow} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={24} color={colors.Primary_Charcoal} />
        <Text style={[typography.h2, { color: colors.Primary_Charcoal }]}>Campus</Text>
      </TouchableOpacity>

      <View style={styles.groupBox}>
        <TouchableOpacity style={styles.row}>
          <Text style={[styles.rowText, { color: colors.Primary_Charcoal }]}>Ottawa</Text>
          <Ionicons name="checkmark-circle" size={24} color={colors.Primary_Green} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.row, { opacity: 0.4 }]} disabled={true}>
          <Text style={[styles.rowText, { color: colors.Primary_Charcoal }]}>Pembroke</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
