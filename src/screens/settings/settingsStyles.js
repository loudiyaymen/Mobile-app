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
  rowMeta: {
    flexDirection: "column",
    gap: 4,
    flex: 1,
  },
  rowActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 12,
  },
  iconButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  plusButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary_AC_Green,
  },
  formWrap: {
    paddingHorizontal: 16,
    paddingBottom: 14,
    gap: 8,
  },
  formInput: {
    height: 42,
    borderWidth: 1,
    borderColor: colors.Secondary_New_Growth_Green,
    borderRadius: 10,
    backgroundColor: colors.primary_White,
    paddingHorizontal: 12,
  },
  formActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    paddingTop: 4,
  },
  actionPill: {
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.Secondary_New_Growth_Green,
    backgroundColor: colors.primary_White,
  },
  actionPillPrimary: {
    backgroundColor: colors.primary_AC_Green,
    borderColor: colors.primary_AC_Green,
  },
  formError: {
    color: colors.SOS_Red,
  },
};
