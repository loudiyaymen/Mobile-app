import { Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { TEXT_SIZE_OPTIONS, useSettings } from "../../context/SettingsContext";
import { settingsStyles } from "./settingsStyles";

export default function AccessibilityScreen() {
  const { settings, setTextSizeIndex } = useSettings();

  const selectedSize =
    TEXT_SIZE_OPTIONS[settings.textSizeIndex] || TEXT_SIZE_OPTIONS[1];

  return (
    <View style={settingsStyles.screen}>
      <Text
        style={[
          typography.h3,
          { color: colors.Primary_Charcoal, marginTop: 12 },
        ]}
      >
        Text Size
      </Text>
      <View style={{ marginTop: 16, paddingHorizontal: 8 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={[typography.h3, { color: colors.Primary_Charcoal }]}>
            A
          </Text>
          <Slider
            style={{ flex: 1, marginHorizontal: 12, height: 30 }}
            minimumValue={0}
            maximumValue={TEXT_SIZE_OPTIONS.length - 1}
            step={1}
            value={settings.textSizeIndex}
            onValueChange={(value) => setTextSizeIndex(Math.round(value))}
            minimumTrackTintColor={colors.primary_AC_Green}
            maximumTrackTintColor="#C8C8C8"
            thumbTintColor={colors.primary_AC_Green}
          />
          <Text
            style={{
              color: colors.Primary_Charcoal,
              fontSize: 42,
              lineHeight: 42,
            }}
          >
            A
          </Text>
        </View>
      </View>

      <Text
        style={{
          color: colors.Primary_Charcoal,
          textAlign: "center",
          marginTop: 16,
          fontSize: selectedSize,
          lineHeight: selectedSize + 8,
          fontFamily: "Metropolis-Regular",
        }}
      >
        This is preview text
      </Text>
    </View>
  );
}
