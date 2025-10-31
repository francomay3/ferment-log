# Ferment Log 🍷

A React Native app for tracking fermentation batches, built with Expo and featuring a modern UI system powered by GluestackUI and NativeWind.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Tech Stack

- **Expo** - React Native development platform
- **GluestackUI** - Modern UI component library
- **NativeWind** - Tailwind CSS for React Native
- **TypeScript** - Type-safe development
- **File-based routing** - Expo Router for navigation

## Features

- Modern, accessible UI components
- Tailwind CSS styling system
- Cross-platform compatibility (iOS, Android, Web)
- Type-safe development with TypeScript

## Database

This project uses Drizzle ORM with Expo SQLite.

- Generate migrations from the current schema:

  ```bash
  npm run db:generate
  ```

- Migrations are applied at runtime automatically when the app starts (via Drizzle migrator). See `db/README.md` for details and schema examples.

