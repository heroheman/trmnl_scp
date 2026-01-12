# SCP Foundation Plugin for TRMNL

Display random SCP Foundation items on your TRMNL display with customizable filters and layout options.

## Features

- **Random SCP Selection**: Fetches a random SCP item from the SCP Foundation database
- **Configurable Range**: Filter by minimum and maximum SCP numbers
- **Image Filtering**: Choose to display only SCPs with images, without images, or all
- **Object Class Detection**: Automatically extracts object class (Safe, Euclid, Keter, etc.) from tags
- **Multiple Layout Options**: Full, Half Horizontal, Half Vertical, and Quadrant views
- **Smart Image Display**: Optional cover image display with 50/50 split layout
- **Optimized for E-Ink**: Uses TRMNL Design System with proper dithering and clamping

## Settings

### Minimum SCP Number
Filter random selection by minimum SCP number (e.g., 313 for SCP-313)
- Optional
- Default: 1

### Maximum SCP Number
Filter random selection by maximum SCP number (e.g., 3245 for SCP-3245)
- Optional
- Default: 8999

### Filter by Images
Choose whether to include SCPs based on image availability
- **All SCPs**: No filtering
- **Only with Images**: Shows only SCPs that have cover images
- **Only without Images**: Shows only SCPs without images

### Show Cover Image
Display the cover image in full view when available
- **Yes**: Shows image with 50/50 split layout
- **No**: Shows only text content
- Note: Only applies to Full and Half Horizontal views

## Views

### Full View
- Displays SCP number, object class, and title/description
- When image is enabled and available: 50/50 split layout with image
- Text clamp: 8-12 lines depending on image presence

### Half Horizontal View
- Similar to Full view but with shorter text
- Text clamp: 4-6 lines depending on image presence
- Optimized for horizontal half-screen display

### Half Vertical View
- Vertical layout without image display
- Text clamp: 8 lines
- Optimized for vertical half-screen display

### Quadrant View
- Compact layout for quarter-screen display
- No image display
- Text clamp: 3 lines
- Smaller title and label sizes

## API

This plugin uses the [SCP Foundation API](https://v0-scp-api.vercel.app/)
- Endpoint: `/api/scp/items/random`
- Data source: [SCP Wiki](http://www.scpwiki.com/)
- License: [Creative Commons Attribution-ShareAlike 3.0](https://creativecommons.org/licenses/by-sa/3.0/)

## Object Class Detection

The plugin automatically detects the object class from SCP tags:
- Standard Classes: Safe, Euclid, Keter, Thaumiel, Apollyon
- Special Classes: Neutralized, Decommissioned, Pending, Explained
- Esoteric Classes: Detected via "esoteric-class" tag

## Technical Details

- **Strategy**: Polling
- **Refresh Interval**: 1440 minutes (24 hours)
- **Framework**: TRMNL Design System v2
- **Image Processing**: Automatic dithering for 1-bit display
- **Text Handling**: Dynamic clamping based on view size

## Version

v1.0.0

## Author

Created by florenz
- GitHub: https://github.com/heroheman/trmnl_scp
- Email: moin@flore.nz
