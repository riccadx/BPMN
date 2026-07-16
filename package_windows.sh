#!/bin/bash
set -e

# Setup variables
WORK_DIR="/Users/macbook/Desktop/BPMN System"
WIN_ZIP="electron-v28.2.0-win32-x64.zip"
WIN_DIR="Lab305-Windows"

cd "$WORK_DIR"

echo "Downloading Electron for Windows..."
if [ ! -f "$WIN_ZIP" ]; then
    curl -L -o "$WIN_ZIP" "https://github.com/electron/electron/releases/download/v28.2.0/$WIN_ZIP"
fi

echo "Cleaning up old build..."
rm -rf "$WIN_DIR"
rm -f "Lab305-Windows.zip"

echo "Extracting Electron..."
unzip -q "$WIN_ZIP" -d "$WIN_DIR"

echo "Assembling App..."
mkdir -p "$WIN_DIR/resources/app"
cp index.html "$WIN_DIR/resources/app/"
cp package.json "$WIN_DIR/resources/app/"
cp main.js "$WIN_DIR/resources/app/"

echo "Renaming Executable..."
mv "$WIN_DIR/electron.exe" "$WIN_DIR/Lab305.exe"

echo "Zipping final package..."
cd "$WIN_DIR"
zip -rq "../Lab305-Windows.zip" *
cd ..

echo "Cleaning up temporary files..."
rm -rf "$WIN_DIR"

echo "Done! Lab305-Windows.zip has been created successfully."
