import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 120,
  },
  actionRow: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    alignItems: "flex-end",
  },
  clearAllButton: {
    backgroundColor: "#D92D20",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  clearAllText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    gap: 10,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1C2525",
    flexShrink: 1,
  },
  cardBody: {
    fontSize: 17,
    lineHeight: 28,
    color: "#161616",
    paddingLeft: 46,
    paddingRight: 8,
  },
  cardTime: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666",
    marginLeft: 12,
  },
  emptyText: {
    marginTop: 20,
    fontSize: 20,
    color: "#101010",
    fontWeight: "500",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -90,
  },
  deleteAction: {
    marginBottom: 14,
    marginLeft: 8,
    borderRadius: 14,
    minWidth: 92,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D92D20",
  },
  deleteActionText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
