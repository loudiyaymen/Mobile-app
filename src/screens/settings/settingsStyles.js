import { colors } from "../../themes/color";

export const settingsStyles = {
  screen: {
    flex: 1,
    backgroundColor: colors.primary_White,
    padding: 12,
  },
  card: {
    backgroundColor: "#EDEDED",
    borderRadius: 14,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#DFDFDF",
    marginLeft: 16,
  },
  label: {
    color: colors.Primary_Charcoal,
  },
  secondaryLabel: {
    color: colors.Dark_Grey,
  },
};
