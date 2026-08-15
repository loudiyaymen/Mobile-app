# Mobile App - Campus Safety Alert System

## Prerequisites

Before you begin, install the following:

- **Git**
- **Node.js 18+** (includes npm)
- **Expo CLI**: `npm install -g expo-cli`
- **A running backend server** (see [admin-dashboard README](../admin-dashboard/README.md))
- **iOS**: Xcode 16+ (for iOS builds) OR Expo Go app (for testing)
- **Android**: Android Studio or Android SDK (for Android builds) OR Expo Go app (for testing)

## Installation

### 1. Clone the repository

If you haven't already:

```bash
git clone https://github.com/Student-Algonquin-Mobile-Safety/Mobile-App.git
cd mobile-app
```

Or if you already have the repository:

```bash
cd mobile-app
```

### 2. Install dependencies

```bash
npm install
```

## Running the Application

### Development Server (Easiest for testing)

Start the Expo development server:

```bash
npm run start
```

Then:

- **For iOS**: Press `i` to open in iOS Simulator, or scan the QR code with Expo Go app
- **For Android**: Press `a` to open in Android Emulator, or scan the QR code with Expo Go app
- **For Web**: Press `w` to open in browser

### Run on iOS

Build and run directly on iOS Simulator:

```bash
npm run ios
```

**Requirements**: Xcode 16+, macOS

### Run on Android

Build and run directly on Android Emulator:

```bash
npm run android
```

**Requirements**: Android Studio or Android SDK

### Run on Web

Test the app in a web browser:

```bash
npm run web
```

## Troubleshooting

### Port Already in Use

If the default Expo port is in use, Expo will automatically use the next available port.

### Backend Connection Issues

- Verify the backend server is running on `localhost:4000`
- Check that `EXPO_PUBLIC_API_BASE_URL` and `EXPO_PUBLIC_WS_URL` in `.env` match your backend
- Ensure your device/emulator can reach the backend (localhost on emulator may need `10.0.2.2`)

### Push Notifications Not Working

- Confirm notification permissions are granted on your device
- Check that Expo project is linked with `eas init`
- Verify push token registration in app logs
- On iOS simulator: push notifications may not work; test on real iOS device instead

### WebSocket Connection Failed

- Confirm backend WebSocket server is running on the configured port (default: 4001)
- Check device/emulator logs for connection errors
- Ensure firewall allows WebSocket connections

### Android Emulator Can't Reach Localhost

Replace `localhost` with `10.0.2.2` in `.env` for Android emulator testing:

```env
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:4000/api/v1
EXPO_PUBLIC_WS_URL=ws://10.0.2.2:4001
```

### iOS Simulator Can't Reach Localhost

Ensure both backend and frontend are running on your Mac. Xcode simulator should connect to `localhost` without issues.
