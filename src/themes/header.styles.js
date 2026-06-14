import { colors } from "./color";

export const headerStyle = {
    backgroundColor: colors.primary_White,
    borderBottomWidth: 1,
    borderBottomColor: colors.Light_Grey,
    height: 80, //ignored on iOS
};

export const headerOptions = {
    headerTintColor: colors.Primary_Charcoal,
    headerTitleAlign: "left",
    headerBackTitle: "Back",
    headerBackTitleVisible: true,
    headerTitleContainerStyle: {
        paddingBottom: 10,
    },
    headerTitleStyle: {
        fontWeight: "bold",
        color: colors.Primary_Charcoal
    },
    headerBackTitleStyle: {
        fontSize: 24,
    },
};