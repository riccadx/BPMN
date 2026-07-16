#!/bin/bash
set -e

# Setup variables
WORK_DIR="/Users/macbook/Desktop/BPMN System"
MAC_ZIP="electron-v28.2.0-darwin-x64.zip"
MAC_DIR="Lab305-Mac"

cd "$WORK_DIR"

echo "Downloading Electron for Mac..."
if [ ! -f "$MAC_ZIP" ]; then
    curl -L -o "$MAC_ZIP" "https://github.com/electron/electron/releases/download/v28.2.0/$MAC_ZIP"
fi

echo "Cleaning up old build..."
rm -rf "$MAC_DIR"
rm -rf "Lab305.app"
rm -f "Lab305-Mac.zip"

echo "Extracting Electron..."
unzip -q "$MAC_ZIP" -d "$MAC_DIR"

echo "Assembling App..."
# On Mac, the app is inside the .app bundle
APP_BUNDLE="$MAC_DIR/Electron.app"
APP_RESOURCES="$APP_BUNDLE/Contents/Resources/app"

mkdir -p "$APP_RESOURCES"
cp index.html "$APP_RESOURCES/"
cp package.json "$APP_RESOURCES/"
cp main.js "$APP_RESOURCES/"

echo "Renaming Executable Bundle..."
mv "$APP_BUNDLE" "$MAC_DIR/Lab305.app"

# Do not modify Info.plist to avoid breaking the executable path

echo "Zipping final package..."
cd "$MAC_DIR"
zip -rq "../Lab305-Mac.zip" "Lab305.app"
cd ..

echo "Cleaning up temporary files..."
rm -rf "$MAC_DIR"

echo "Done! Lab305-Mac.zip has been created successfully."
