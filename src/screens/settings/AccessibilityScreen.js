import { Pressable, Switch, Text, View } from "react-native";
import { colors } from "../../themes/color";
import { typography } from "../../themes/typography";
import { TEXT_SIZE_OPTIONS, useSettings } from "../../context/SettingsContext";

const colorModes = [
  { id: "none", title: "None", subtitle: "Default app colors" },
  { id: "protanopia", title: "Protanopia", subtitle: "Red-blind" },
  { id: "deuteranopia", title: "Deuteranopia", subtitle: "Green-blind" },
  { id: "tritanopia", title: "Tritanopia", subtitle: "Blue-blind" },
];

function ColorModeCard({ title, subtitle }) {
  return (
    <View
      style={{
        borderRadius: 14,
        backgroundColor: "#E5E5E5",
        marginTop: 14,
        paddingHorizontal: 14,
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: 0.55,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            backgroundColor: "#CFCFCF",
          }}
        />
        <View>
          <Text style={[typography.h4, { color: colors.Dark_Grey }]}>
            {title}
          </Text>
          <Text style={[typography.h5, { color: colors.Dark_Grey }]}>
            {subtitle}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 17,
          borderWidth: 1,
          borderColor: "#9A9A9A",
        }}
      />
    </View>
  );
}

export default function AccessibilityScreen() {
  const { settings, setAccessibilityEnabled, setTextSizeIndex } = useSettings();

  const selectedSize =
    TEXT_SIZE_OPTIONS[settings.textSizeIndex] || TEXT_SIZE_OPTIONS[1];

  return (
    <View style={{ flex: 1, backgroundColor: colors.Light_Grey, padding: 12 }}>
      <View
        style={{
          marginTop: 12,
          backgroundColor: "#EDEDED",
          borderRadius: 16,
          paddingHorizontal: 14,
          paddingVertical: 14,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={[typography.h3, { color: colors.Primary_Charcoal, flex: 1 }]}
        >
          Are you a person with a disability?
        </Text>
        <Switch
          value={settings.accessibilityEnabled}
          onValueChange={setAccessibilityEnabled}
          trackColor={{ false: "#D3D3D3", true: colors.primary_AC_Green }}
          thumbColor={colors.primary_White}
        />
      </View>

      <Text
        style={[
          typography.h3,
          { color: colors.Primary_Charcoal, marginTop: 22 },
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
          <View style={{ flex: 1, marginHorizontal: 12 }}>
            <View
              style={{
                height: 10,
                borderRadius: 8,
                backgroundColor: "#B0C0AF",
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              {TEXT_SIZE_OPTIONS.map((size, index) => (
                <Pressable
                  key={size}
                  onPress={() => setTextSizeIndex(index)}
                  style={{
                    width: index === settings.textSizeIndex ? 18 : 9,
                    height: index === settings.textSizeIndex ? 18 : 9,
                    borderRadius: index === settings.textSizeIndex ? 9 : 4.5,
                    marginTop: index === settings.textSizeIndex ? -4 : 1,
                    backgroundColor:
                      index === settings.textSizeIndex
                        ? colors.primary_AC_Green
                        : "#C8C8C8",
                  }}
                />
              ))}
            </View>
          </View>
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

      <Text
        style={[
          typography.h3,
          {
            color: colors.Dark_Grey,
            marginTop: 24,
            opacity: 0.7,
          },
        ]}
      >
        Colour Correction
      </Text>
      {colorModes.map((mode, index) => (
        <ColorModeCard
          key={mode.id}
          title={mode.title}
          subtitle={mode.subtitle}
          selected={index === 0}
        />
      ))}
    </View>
  );
}
