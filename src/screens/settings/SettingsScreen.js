import { ScrollView, View, Text,TouchableOpacity } from "react-native";
import { styles } from "../../themes/styles";
import { useState } from "react";
import { DarkModeToggle } from "../../components/Toggle";
import { typography } from "../../themes/typography";
import { lightTheme, darkTheme } from "../../themes/color";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes/color";
import SettingsCampusScreen from "./SettingsCampusScreen";

export default function SettingsScreen() {
  const [isDark, setIsDark] = useState(false);
  const navigation = useNavigation();

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ScrollView style={[styles.bodyContainer, { backgroundColor: theme.colors.background }]}>

      {/* Preferences & Personalization group */}
        <Text style={[typography.body, { color: theme.colors.text }]}>Preferences & Personalization</Text>
        <View style={styles.groupBox}>
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('SettingsCampusScreen')}>
            <View style={styles.rowLeft}>
          <Ionicons name="map-outline" size={20} color={theme.colors.icon} />
          <Text style={[styles.rowText, { color: theme.colors.text }]}>Campus</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('SettingsAppearanceScreen')}>
            <View style={styles.rowLeft}>
          <Ionicons name="moon-outline" size={20} color={theme.colors.icon} />
          <Text style={[styles.rowText, { color: theme.colors.text }]}>Appearance</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('SettingsAccessibilityScreen')}>
            <View style={styles.rowLeft}>
          <Ionicons name="accessibility-outline" size={20} color={theme.colors.icon} />
          <Text style={[styles.rowText, { color: theme.colors.text }]}>Accessibility</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.colors.icon} />
          </TouchableOpacity>
        </View>


        {/* Safety & Emergency group */}
      <Text style={[typography.body, { color: theme.colors.text }]}>Safety & Emergency</Text>
      <View style={styles.groupBox}>
        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <View style={styles.rowLeft}>
            <Ionicons name="person-outline" size={20} color={theme.colors.icon} />
            <Text style={[styles.rowText, { color: theme.colors.text }]}>Emergerncy Contacts</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.icon} />
        </TouchableOpacity>
      </View>



      {/* Notifications group */}      
      <Text style={[typography.body, { color: theme.colors.text }]}>Notifications</Text>
      <View style={styles.groupBox}>
        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <View style={styles.rowLeft}>
            <Ionicons name="megaphone-outline" size={20} color={theme.colors.icon} />
            <Text style={[styles.rowText, { color: theme.colors.text }]}>Alert Types</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <View style={styles.rowLeft}>
            <Ionicons name="notifications-outline" size={20} color={theme.colors.icon} />
            
            <Text style={[styles.rowText, { color: theme.colors.text }]}>Push Preferences</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.icon} />
        </TouchableOpacity>
      </View>


        {/* Privacy & Legal group */}
    <Text style={[typography.body, { color: theme.colors.text }]}>Privacy & Legal</Text>
      <View style={styles.groupBox}>
        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <View style={styles.rowLeft}>
            <Ionicons name="shield-outline" size={20} color={theme.colors.icon} />
            <Text style={[styles.rowText, { color: theme.colors.text }]}>Permissions</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => {}}>
          <View style={styles.rowLeft}>
            <Ionicons name="document-text-outline" size={20} color={theme.colors.icon} />
            <Text style={[styles.rowText, { color: theme.colors.text }]}>Appearance</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.colors.icon} />
        </TouchableOpacity>
      </View>
    

    </ScrollView>
  );
}
