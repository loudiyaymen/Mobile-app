import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import { DeviceRotateIcon } from "phosphor-react-native";
import { NavigationArrowIcon } from "phosphor-react-native";

export default function NavigateScreen() {
  const [startingPoint, setStartingPoint] = React.useState("");
  const [destination, setDestination] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.navigationCard}>
        <View style={styles.fieldsRow}>
          {/* Dots and line */}
          <View style={styles.timeline}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineLine} />
            <View style={styles.timelineDot} />
          </View>

          {/* Inputs */}
          <View style={styles.inputsColumn}>
            <TextInput
              style={styles.input}
              placeholder="Starting Point"
              placeholderTextColor={colors.Primary_Charcoal}
              value={startingPoint}
              onChangeText={setStartingPoint}
            />
            <TextInput
              style={[styles.input, { marginBottom: 0 }]} 
              placeholder="Destination"
              placeholderTextColor={colors.Primary_Charcoal}
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          {/* Swap Icon */}
          <Pressable>
            <DeviceRotateIcon
              size={28}
              color={colors.primary_AC_Green}
              weight="bold"
            />
          </Pressable>
        </View>

        {/* Button */}
        <Pressable
          style={[styles.buttonContainer, { backgroundColor: colors.primary_AC_Green, justifyContent: 'center'}]}
        >
          <NavigationArrowIcon
            size={26}
            color={colors.primary_White}
            weight="bold"
          />
          <Text style={[typography.secondaryBody, { color: colors.primary_White }]}>
            Start navigation
          </Text>
        </Pressable>
      </View>
    </View>
  );
}