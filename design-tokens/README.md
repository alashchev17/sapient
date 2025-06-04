# Design Tokens

This directory contains exported design tokens from Figma.

## Workflow

1. **Export from Figma**:
   - Open your Figma file
   - Go to Plugins → Design Tokens
   - Click "Export Design Token File"
   - Configure export settings:
     - ✅ Standard (W3C draft) format
     - ✅ Include all token types you need (Colors, Typography, Spacing, etc.)
   - Save the file as `tokens.json` in this directory

2. **Generate TypeScript files**:
   ```bash
   # From the root of the project
   yarn generate:tokens
   
   # Or generate and build everything
   yarn tokens:build
   ```

3. **Commit changes**:
   - The generated TypeScript files in `packages/sapient-design-tokens/src/`
   - Optionally commit the `tokens.json` file for reference

## Supported Token Types

The generator supports these Figma token types:

- **Colors** → `colors.ts`
- **Spacing/Dimensions** → `spacing.ts`  
- **Border Radius** → `radii.ts`
- **Shadows** → `shadows.ts`
- **Typography** (Font Family, Size, Weight, Line Height, Letter Spacing) → `typography.ts`

## File Structure

```
design-tokens/
├── README.md          # This file
├── tokens.json        # Exported from Figma (place here)
└── .gitkeep          # Keeps directory in git
```

## Notes

- The existing `breakpoints.ts` file is preserved if no breakpoint tokens are found
- Token names are automatically sanitized to valid TypeScript identifiers
- Generated files maintain the same API structure for backward compatibility
- All generated constants are typed with `as const` and include `keyof` type exports
