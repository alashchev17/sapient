/** @jsxImportSource @emotion/react */
import type { Theme as SapientTheme } from '@sapiently/theme';
import type { ResponsiveValue } from '@sapiently/core';

/**
 * Generate responsive styles from a token-based prop.
 * Handles: single value, array ([base, sm, md...]), or object ({ base, sm, md }).
 */
export function responsiveTokenStyle<
  Token extends string,
  PropValue extends ResponsiveValue<Token>
>(
  cssProp: string,
  value: PropValue | undefined,
  themeScale: Record<Token, string>,
  theme: SapientTheme
): Record<string, any> {
  if (value == null) {
    return {};
  }

  const bps = theme.breakpoints; 
  const bpKeys = Object.keys(bps) as Array<keyof typeof bps>;

  // 1) Array => [base, sm, md, ...]
  if (Array.isArray(value)) {
    const out: Record<string, any> = {};
    value.forEach((val, idx) => {
      if (idx === 0) {
        out[cssProp] = themeScale[val];
      } else {
        const bp = bpKeys[idx - 1];
        if (bp && bps[bp]) {
          out[`@media screen and (min-width: ${bps[bp]})`] = {
            [cssProp]: themeScale[val]
          };
        }
      }
    });
    return out;
  }

  // 2) Object => { base, sm, md }
  if (typeof value === 'object') {
    const out: Record<string, any> = {};
    Object.entries(value).forEach(([key, val]) => {
      if (key === 'base') {
        out[cssProp] = themeScale[val as Token];
      } else if (key in bps) {
        out[`@media screen and (min-width: ${bps[key as keyof typeof bps]})`] = {
          [cssProp]: themeScale[val as Token]
        };
      }
    });
    return out;
  }

  // 3) Single value
  return { [cssProp]: themeScale[value as Token] };
}
