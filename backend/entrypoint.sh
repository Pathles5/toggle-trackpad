#!/bin/bash
set -e

echo "[Toggle-Trackpad] Starting backend..."

# Navigate to the backend source directory
cd /backend/src

# Launch the plugin backend
python3 main.py
