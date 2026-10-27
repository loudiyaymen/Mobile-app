# Algonquin GO — Mobile App

Cross-platform iOS and Android app for **Algonquin GO**, a campus safety and indoor navigation platform built for Algonquin College. It connects to the [backend API](https://github.com/loudiyaymen/Admin-dashboard); campus security manages it from the [admin dashboard](https://github.com/loudiyaymen/Admin-dashboard-frontend).

Placed 2nd out of 100+ participants in an Algonquin College project competition.

## Features

- **SOS button:** press-and-hold emergency trigger that alerts campus security with your campus and estimated floor.
- **Indoor wayfinding:** turn-by-turn, multi-floor routes between rooms using Dijkstra's algorithm over per-building navigation graphs, cached offline and synced on startup.
- **Real-time alerts:** campus and building alerts over WebSockets and push notifications, with notification history.
- **Reports:** incident, assault and lost-item reports with photo attachments, validation and status tracking.
- **Events:** browse campus events, register and manage registrations.
- **Accessibility settings:** text scaling, colour-blind mode, high contrast and dark mode.
- Onboarding with campus selection, emergency contacts and push preferences.

## Tech stack

React Native 0.81 · Expo 54 · React Navigation 7 · Expo Notifications · Expo Location · Expo Secure Store

## Getting started

Prerequisites: Node.js 18+, a running [backend](https://github.com/loudiyaymen/Admin-dashboard), and either the Expo Go app or a simulator (Xcode 16+ for iOS, Android Studio for Android).

```bash
git clone https://github.com/loudiyaymen/Mobile-app.git
cd Mobile-app
npm install
npm run start
```

In the Expo terminal, press `i` for the iOS Simulator or `a` for the Android Emulator, or scan the QR code with Expo Go. `npm run ios` and `npm run android` build and run natively.

### Backend URL

By default the app calls `http://localhost:4000/api/v1`, or `http://10.0.2.2:4000/api/v1` on the Android emulator. To use another backend (for example on a physical device), create a `.env` file:

```env
EXPO_PUBLIC_BACKEND_API_URL=http://<your-computer-ip>:4000/api/v1
EXPO_PUBLIC_BACKEND_WS_URL=ws://<your-computer-ip>:4001
```

## Troubleshooting

### Backend connection issues

- Check that the backend is running and reachable from your device. A physical device needs your computer's LAN IP, not `localhost`.
- Restart Expo after editing `.env`.

### Push notifications not working

- Confirm notification permissions are granted on the device.
- Check that the Expo project is linked with `eas init`.
- The iOS Simulator may not receive push notifications; test on a real device.

### WebSocket connection failed

- Confirm the backend WebSocket server is running on port `4001`.
- Make sure your firewall allows the connection.

## Credits

UI/UX design by the Algonquin College design team (Figma).
