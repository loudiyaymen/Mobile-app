import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { styles } from "../../themes/styles";
import { typography } from "../../themes/typography";
import { colors } from "../../themes/color";
import { DeviceRotateIcon } from "phosphor-react-native";

export default function NavigateScreen() {
  const [startingPoint, setStartingPoint] = React.useState("");
  const [destination, setDestination] = React.useState("");

  return (
    <View style={styles.container}>
      <View style={styles.navigationPointsContainer}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <TextInput
            style={styles.input}
            placeholder="Starting Point"
          ></TextInput>
          <TextInput style={styles.input} placeholder="Destination"></TextInput>
          <Pressable style={styles.button}>
            <Text style={typography.body}>Start Navigation</Text>
          </Pressable>
        </View>
        <Pressable style={styles.button}>
          <DeviceRotateIcon size={24} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}
