// Toggle component for different toggle switches (e.g., dark mode, notifications)

import { React } from "react";
import { Switch } from "react-native-paper";

export function DarkModeToggle({ value, onToggle }) {
  return <Switch value={value} onValueChange={onToggle} />;
}
