#!/bin/bash
set -euo pipefail

SITE_DIR="/var/www/sites/curatedbyac"
REPO_DIR="/var/www/curated-pure-yoga"

echo "=== Deploying curatedbyac.com ==="

cd "$REPO_DIR"

# Pull latest changes
echo "Pulling latest..."
git pull --ff-only

# Install dependencies
echo "Installing dependencies..."
npm ci --prefer-offline

# Build (includes image copy)
echo "Building..."
bash scripts/build.sh

# Atomic swap
echo "Swapping site directory..."
if [ -d "$SITE_DIR" ]; then
  mv "$SITE_DIR" "${SITE_DIR}.old"
fi
mv out "$SITE_DIR"

# Cleanup old version
if [ -d "${SITE_DIR}.old" ]; then
  rm -rf "${SITE_DIR}.old"
fi

echo "=== Deploy complete: curatedbyac.com ==="
