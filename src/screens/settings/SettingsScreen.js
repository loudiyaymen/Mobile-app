import { View, Text } from "react-native";
import { styles } from "../../themes/styles";
import { useState } from "react";
import { DarkModeToggle } from "../../components/Toggle";
import { typography } from "../../themes/typography";
import { lightTheme, darkTheme } from "../../themes/color";

export default function SettingsScreen() {
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={styles.sectionTitle}>Settings</Text>

      <DarkModeToggle value={isDark} onToggle={() => setIsDark(!isDark)} />

      {isDark && <Text style={typography.body}>Dark mode is enabled!</Text>}
    </View>
  );
}
