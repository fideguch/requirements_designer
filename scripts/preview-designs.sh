#!/usr/bin/env bash
# preview-designs.sh — Preview designs/ markdown files in browser
#
# Usage:
#   ./scripts/preview-designs.sh [designs_dir]
#
# Generates static HTML from Markdown and opens in browser.
# No external dependencies. Close the browser tab to finish.
set -euo pipefail

DESIGNS_DIR="${1:-designs}"

if [ ! -d "$DESIGNS_DIR" ]; then
    echo "Error: $DESIGNS_DIR not found"
    echo ""
    echo "Run requirements definition first:"
    echo "  /requirements_designer"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
node "${SCRIPT_DIR}/generate-preview.js" "$DESIGNS_DIR"
