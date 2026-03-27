#!/usr/bin/env bash
# scaffold-requirements.sh — Create designs/ directory with template files
# Usage: ./scaffold-requirements.sh [project_dir] [--with-ul] [--with-ui] [--light] [--enhance]
set -euo pipefail

PROJECT_DIR="${1:-.}"
WITH_UL=false
WITH_UI=false
WITH_LIGHT=false
WITH_ENHANCE=false

# Parse flags
for arg in "$@"; do
    case "$arg" in
        --with-ul) WITH_UL=true ;;
        --with-ui) WITH_UI=true; WITH_UL=true ;;
        --light) WITH_LIGHT=true ;;
        --enhance) WITH_ENHANCE=true ;;
    esac
done

# --light and --with-ui are mutually exclusive
if [ "$WITH_LIGHT" = true ] && [ "$WITH_UI" = true ]; then
    echo "Warning: --light and --with-ui are mutually exclusive. Using --light (skips Phase 5)."
    WITH_UI=false
    WITH_UL=false
fi

# --enhance and --light are mutually exclusive
if [ "$WITH_ENHANCE" = true ] && [ "$WITH_LIGHT" = true ]; then
    echo "Warning: --enhance and --light are mutually exclusive. Using --enhance."
    WITH_LIGHT=false
fi

# --enhance and --with-ui are mutually exclusive
if [ "$WITH_ENHANCE" = true ] && [ "$WITH_UI" = true ]; then
    echo "Warning: --enhance and --with-ui are mutually exclusive. Using --enhance (skips Phase 5)."
    WITH_UI=false
fi

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

# Apply light mode configuration
if [ "$WITH_LIGHT" = true ]; then
    sed -i '' 's/- \*\*Mode\*\*: Full \/ Light/- **Mode**: Light/' "$DESIGNS_DIR/workflow_config.md"
    sed -i '' 's/| Phase 3  | 非機能要件の抽出       | 実行     |/| Phase 3  | 非機能要件の抽出       | スキップ |/' "$DESIGNS_DIR/workflow_config.md"
    sed -i '' 's/| Phase 4C | ユビキタス言語定義     | 実行     |/| Phase 4C | ユビキタス言語定義     | スキップ |/' "$DESIGNS_DIR/workflow_config.md"
    sed -i '' 's/| Phase 5  | UIデザイン             | 実行     |/| Phase 5  | UIデザイン             | スキップ |/' "$DESIGNS_DIR/workflow_config.md"
    echo ""
    echo "Light mode enabled: Phase 3, 4C, 5 set to skip."
fi

# Apply enhance mode configuration
if [ "$WITH_ENHANCE" = true ]; then
    sed -i '' 's/- \*\*Mode\*\*: Full \/ Light \/ Enhance/- **Mode**: Enhance/' "$DESIGNS_DIR/workflow_config.md"
    sed -i '' 's/| Phase 5  | UIデザイン             | 実行     |/| Phase 5  | UIデザイン             | スキップ |/' "$DESIGNS_DIR/workflow_config.md"
    echo ""
    echo "Enhance mode enabled: Phase 5 set to skip."
fi

echo ""
echo "Start by filling in designs/README.md (sections 1-5 are required)."
