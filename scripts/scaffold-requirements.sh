#!/usr/bin/env bash
# scaffold-requirements.sh — Create designs/ directory with template files
# Usage: ./scaffold-requirements.sh [project_dir] [--with-ul] [--with-ui]
set -euo pipefail

PROJECT_DIR="${1:-.}"
WITH_UL=false
WITH_UI=false

# Parse flags
for arg in "$@"; do
    case "$arg" in
        --with-ul) WITH_UL=true ;;
        --with-ui) WITH_UI=true; WITH_UL=true ;;
    esac
done

DESIGNS_DIR="$PROJECT_DIR/designs"

if [ -d "$DESIGNS_DIR" ]; then
    echo "designs/ already exists at: $DESIGNS_DIR"
    echo "Use existing files or delete the directory to start fresh."
    exit 0
fi

# Resolve the templates directory relative to this script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
TEMPLATES_DIR="$SCRIPT_DIR/../templates"

if [ ! -d "$TEMPLATES_DIR" ]; then
    echo "Error: Templates directory not found at $TEMPLATES_DIR"
    exit 1
fi

mkdir -p "$DESIGNS_DIR"

cp "$TEMPLATES_DIR/workflow_config.md" "$DESIGNS_DIR/workflow_config.md"
cp "$TEMPLATES_DIR/README_charter.md" "$DESIGNS_DIR/README.md"
cp "$TEMPLATES_DIR/functional_requirements.md" "$DESIGNS_DIR/functional_requirements.md"
cp "$TEMPLATES_DIR/non_functional_requirements.md" "$DESIGNS_DIR/non_functional_requirements.md"
cp "$TEMPLATES_DIR/user_stories.md" "$DESIGNS_DIR/user_stories.md"

echo "Requirements project scaffolded at: $DESIGNS_DIR"
echo ""
echo "Files created:"
echo "  designs/workflow_config.md             - Workflow Configuration"
echo "  designs/README.md                      - Project Charter"
echo "  designs/functional_requirements.md     - Functional Requirements"
echo "  designs/non_functional_requirements.md - Non-Functional Requirements"
echo "  designs/user_stories.md                - User Stories"

if [ "$WITH_UL" = true ]; then
    cp "$TEMPLATES_DIR/ubiquitous_language.md" "$DESIGNS_DIR/ubiquitous_language.md"
    echo "  designs/ubiquitous_language.md          - Ubiquitous Language"
fi

if [ "$WITH_UI" = true ]; then
    cp "$TEMPLATES_DIR/ui_design_brief.md" "$DESIGNS_DIR/ui_design_brief.md"
    echo "  designs/ui_design_brief.md             - UI Design Brief"
fi

echo ""
echo "Start by filling in designs/README.md (sections 1-5 are required)."
