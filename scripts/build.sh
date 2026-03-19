#!/bin/bash
set -euo pipefail

IMAGES_SRC="/var/www/sites/pure-yoga-facial/images"
IMAGES_DEST="public/images"

echo "=== Building curated-pure-yoga ==="

# Copy images from premium-web site
if [ -d "$IMAGES_SRC" ]; then
  echo "Copying images from $IMAGES_SRC..."
  mkdir -p "$IMAGES_DEST"
  cp -r "$IMAGES_SRC"/* "$IMAGES_DEST"/
  echo "Images copied."
else
  echo "WARNING: $IMAGES_SRC not found. Using existing images."
fi

# Build
echo "Running next build..."
npm run build

echo "=== Build complete. Output in ./out/ ==="
