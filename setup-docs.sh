#!/bin/bash

# Setup script for AudioUI documentation site
echo "Setting up AudioUI documentation site..."

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Start development server
echo "Starting development server..."
pnpm run dev
