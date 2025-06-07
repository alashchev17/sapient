#!/bin/bash

# Build script for Sapiently Design System
# Builds all packages in the correct dependency order with proper output formatting

set -e  # Exit on any error

echo "🏗️  Building Sapiently Design System..."
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to build a package with formatted output
build_package() {
    local package_name=$1
    local display_name=$2
    
    echo -e "${BLUE}📦 Building ${display_name}...${NC}"
    
    if yarn workspace "$package_name" build; then
        echo -e "${GREEN}✅ ${display_name} built successfully${NC}"
    else
        echo -e "${RED}❌ Failed to build ${display_name}${NC}"
        exit 1
    fi
    echo ""
}

# Build packages in dependency order
build_package "@sapiently/core" "Core"
build_package "@sapiently/design-tokens" "Design Tokens"
build_package "@sapiently/theme" "Theme"
build_package "@sapiently/icons" "Icons"
build_package "@sapiently/primitives" "Primitives"
build_package "@sapiently/heading" "Heading"
build_package "@sapiently/paragraph" "Paragraph"
build_package "@sapiently/skeleton" "Skeleton"
build_package "@sapiently/list" "List"
build_package "@sapiently/stack" "Stack"
build_package "@sapiently/button" "Button"
build_package "@sapiently/callout" "Callout"

# Build new components (dependencies first)
build_package "@sapiently/help-text" "Help Text"
build_package "@sapiently/text-input" "Text Input"
build_package "@sapiently/radio-group" "Radio Group"
build_package "@sapiently/combobox" "Combobox"
build_package "@sapiently/anchor" "Anchor"
build_package "@sapiently/tabs" "Tabs"
build_package "@sapiently/pagination" "Pagination"

echo -e "${GREEN}🎉 All packages built successfully!${NC}"
echo "=================================="

# Build storybook last
echo -e "${BLUE}📚 Building Storybook...${NC}"
if yarn workspace @sapiently/storybook build; then
    echo -e "${GREEN}✅ Storybook built successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Storybook build failed (non-critical)${NC}"
fi

echo -e "${GREEN}🚀 Build complete!${NC}"
