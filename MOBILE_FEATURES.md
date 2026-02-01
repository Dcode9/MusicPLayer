# Mobile Features Guide

## Overview
SpatialPlay now includes comprehensive mobile optimization, background playback, enhanced Picture-in-Picture, and full OS-level media controls including iOS Dynamic Island support.

## Mobile Optimizations

### Responsive Layout
- **Bottom Navigation**: On mobile devices (< 768px), navigation moves to the bottom for easier thumb access
- **Compact Player**: Player controls are reorganized vertically on mobile
- **Touch-Friendly**: All buttons and controls are sized appropriately for touch input
- **Grid Adjustments**: Song grids automatically adjust to 2 columns on mobile

### Installation as PWA
1. Open SpatialPlay in Safari (iOS) or Chrome (Android)
2. Click "Share" (iOS) or menu (Android)
3. Select "Add to Home Screen"
4. The app will install and can be launched like a native app

## Background Playback

### How It Works
- **Service Worker**: Enables audio to continue playing even when the app is in the background
- **No PiP Required**: Unlike video players, audio continues automatically
- **Battery Efficient**: Uses native HTML5 audio APIs for optimal power consumption

### Using Background Playback
1. Start playing any song
2. Switch to another app or lock your device
3. Audio continues playing
4. Control playback from:
   - Lock screen
   - Notification center
   - Control Center (iOS)
   - Quick Settings (Android)
   - Dynamic Island (iPhone 14 Pro+)

## Picture-in-Picture Features

### New in PiP
- **Real-time Updates**: PiP window updates 30 times per second
- **Progress Bar**: Visual progress indicator
- **Time Display**: Shows current time / total duration
- **Album Art**: Full artwork displayed
- **Playback State**: Play/pause indicator shows current state

### How to Use PiP
1. Start playing a song
2. Click the PiP button (square icon) in the player controls
3. PiP window appears with live updates
4. You can resize and move the PiP window
5. Click the X to close PiP mode

## Media Controls

### Lock Screen Controls
Available on all platforms when audio is playing:
- **Play/Pause**: Toggle playback
- **Previous Track**: Go to previous song
- **Next Track**: Skip to next song
- **Seek Forward**: Jump ahead 10 seconds
- **Seek Backward**: Jump back 10 seconds
- **Position Scrubbing**: Drag to any position in the track

### iOS Dynamic Island (iPhone 14 Pro/Pro Max and newer)
When audio is playing, the Dynamic Island shows:
- **Album Artwork**: Current song's cover art
- **Track Information**: Song name and artist
- **Playback State**: Visual indicator of play/pause state

**Interactions:**
- **Tap**: Open expanded view with full controls
- **Long Press**: Access quick controls (play/pause, skip)
- **Drag Progress Bar**: Seek to any position in the song

### Android Media Notification
When audio is playing, the notification shows:
- **Album Artwork**: Current song's cover art
- **Track Information**: Song name and artist
- **Playback Controls**: Play/pause, previous, next
- **Seek Controls**: 10-second forward/backward buttons
- **Progress Bar**: Shows current position (on supported devices)

## Keyboard Shortcuts

- **Space**: Play/Pause
- **Arrow Right** or **D**: Skip forward 5 seconds
- **Arrow Left** or **A**: Skip backward 5 seconds
- **Arrow Up** or **W**: Increase volume
- **Arrow Down** or **S**: Decrease volume

## Troubleshooting

### Background Playback Not Working
**iOS:**
- Ensure the app is added to Home Screen (not used in Safari)
- Check that Low Power Mode is not enabled
- Verify Silent Mode is off

**Android:**
- Check battery optimization settings (allow background activity)
- Ensure notifications are enabled for the app

### PiP Not Working
- Ensure your browser supports Picture-in-Picture API
- Some browsers require user interaction before enabling PiP
- Try starting playback first, then enabling PiP

### Media Controls Not Showing
- Ensure audio is actually playing (not just loaded)
- Check that Do Not Disturb mode is not blocking notifications
- On iOS, ensure Music app is not also playing audio

## Browser Compatibility

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| Mobile Layout | ✅ | ✅ | ✅ | ✅ |
| Background Playback | ✅ | ✅ | ✅ | ✅ |
| Picture-in-Picture | ✅ | ✅ | ⚠️* | ✅ |
| Media Session API | ✅ | ✅ | ✅ | ✅ |
| Dynamic Island | N/A | ✅ | N/A | N/A |
| PWA Install | ✅ | ✅ | ⚠️** | ✅ |

*Firefox PiP support varies by platform
**Firefox Android supports PWA, desktop does not

## Tips for Best Experience

1. **Install as PWA**: For the best mobile experience, install the app to your home screen
2. **Grant Permissions**: Allow notifications for lock screen controls
3. **Use Headphones**: Bluetooth headphones often have physical media control buttons
4. **Lock Screen**: Lock screen controls work best when audio is playing before locking
5. **Battery Optimization**: Exclude the app from battery optimization for uninterrupted playback

## Privacy & Permissions

The app requires:
- **Audio Playback**: To play music
- **Notifications**: For lock screen media controls (optional)
- **Background**: To continue playback when app is not visible

The app does NOT:
- Access your camera
- Track your location
- Access your contacts or personal information
- Require login (unless you configure Supabase)

## Technical Details

### Service Worker
- Caches app resources for offline access
- Enables background audio capabilities
- Provides graceful error handling

### Media Session API
- Integrates with OS-level media controls
- Provides rich metadata (artwork, title, artist)
- Supports seek controls and position updates
- Updates playback state in real-time

### PWA Manifest
- Enables installation as standalone app
- Defines app icon and theme colors
- Configures display mode and orientation

## Support

For issues or feature requests, please visit the GitHub repository.
