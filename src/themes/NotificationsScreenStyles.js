import { StyleSheet } from "react-native";

//As this is just a POC and also just the notifications modal screen, there is no need to import the brand colors

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  closeButton: {
    padding: 5,
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1e293b",
    marginBottom: 16,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardIcon: {
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  cardBody: {
    fontSize: 14,
    color: "#000",
    lineHeight: 20,
    marginBottom: 8,
    paddingLeft: 34,
  },
  cardTime: {
    fontSize: 12,
    color: "#666",
    paddingLeft: 34,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});
