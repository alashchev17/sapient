/** @jsxImportSource @emotion/react */
import { useState, useRef } from 'react';
import { Flex, Box } from '@sapiently/primitives';
import { css } from '@emotion/react';
import { useTheme } from '@sapiently/theme';

import { TabsProps } from './types';

export const Tabs = ({
  items,
  activeTab,
  onTabChange,
  variant = 'pill',
  fullWidth = false,
  orientation = 'horizontal',
}: TabsProps) => {
  const theme = useTheme();

  const [internalActiveTab, setInternalActiveTab] = useState(
    activeTab || (items.length > 0 ? items[0].id : '')
  );
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const currentActiveTab = activeTab || internalActiveTab;

  const handleTabChange = (tabId: string) => {
    const tab = items.find((item) => item.id === tabId);
    if (tab && !tab.disabled) {
      setInternalActiveTab(tabId);
      onTabChange?.(tabId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, tabId: string) => {
    const currentIndex = items.findIndex((item) => item.id === tabId);
    let nextIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % items.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        nextIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        event.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        nextIndex = items.length - 1;
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        handleTabChange(tabId);
        return;
      default:
        return;
    }

    // Find next non-disabled tab
    while (items[nextIndex]?.disabled && nextIndex !== currentIndex) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        nextIndex = (nextIndex + 1) % items.length;
      } else {
        nextIndex = nextIndex === 0 ? items.length - 1 : nextIndex - 1;
      }
    }

    const nextTab = items[nextIndex];
    if (nextTab && !nextTab.disabled) {
      tabRefs.current[nextTab.id]?.focus();
    }
  };

  // Create tab button styles
  const getTabStyles = (item: (typeof items)[0]) => {
    const isActive = item.id === currentActiveTab;

    if (variant === 'pill') {
      return css({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: theme.spacing.spacer10,
        padding: `${theme.spacing.spacer20} ${theme.spacing.spacer30}`,
        borderRadius: theme.radii.border4,
        backgroundColor: isActive ? theme.colors.background.Surface : 'transparent',
        color: isActive ? theme.colors.text.Default : theme.colors.text.Muted,
        border: 'none',
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        opacity: item.disabled ? 0.5 : 1,
        fontFamily: theme.typography.p2.fontFamily,
        fontSize: theme.typography.p2.fontSize,
        fontWeight: theme.typography.p2.fontWeight,
        transition: 'all 0.2s ease',
        flex: fullWidth ? 1 : 'none',
        whiteSpace: 'nowrap' as const,

        '&:hover': item.disabled
          ? {}
          : {
              backgroundColor: isActive
                ? theme.colors.background.Surface
                : theme.colors.background.Canvas,
            },

        '&:focus': {
          outline: `2px solid ${theme.colors.border.FocusDefault}`,
          outlineOffset: '2px',
        },

        '&:focus-visible': {
          outline: `2px solid ${theme.colors.border.FocusDefault}`,
          outlineOffset: '2px',
        },

        '&:focus:not(:focus-visible)': {
          outline: 'none',
        },
      });
    }

    // Underline variant
    return css({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: theme.spacing.spacer10,
      padding: `${theme.spacing.spacer30} ${theme.spacing.spacer40}`,
      backgroundColor: 'transparent',
      color: isActive ? theme.colors.text.Default : theme.colors.text.Muted,
      border: 'none',
      borderBottom:
        orientation === 'horizontal'
          ? `2px solid ${isActive ? theme.colors.border.FocusDefault : 'transparent'}`
          : 'none',
      borderRight:
        orientation === 'vertical'
          ? `2px solid ${isActive ? theme.colors.border.FocusDefault : 'transparent'}`
          : 'none',
      cursor: item.disabled ? 'not-allowed' : 'pointer',
      opacity: item.disabled ? 0.5 : 1,
      fontFamily: theme.typography.p2.fontFamily,
      fontSize: theme.typography.p2.fontSize,
      fontWeight: isActive ? 500 : theme.typography.p2.fontWeight,
      transition: 'all 0.2s ease',
      flex: fullWidth ? 1 : 'none',
      whiteSpace: 'nowrap' as const,

      '&:hover': item.disabled
        ? {}
        : {
            color: theme.colors.text.Default,
            backgroundColor: theme.colors.background.Subtle,
          },

      '&:focus': {
        outline: `2px solid ${theme.colors.border.FocusDefault}`,
        outlineOffset: '2px',
      },

      '&:focus-visible': {
        outline: `2px solid ${theme.colors.border.FocusDefault}`,
        outlineOffset: '2px',
      },

      '&:focus:not(:focus-visible)': {
        outline: 'none',
      },
    });
  };

  const activeTabContent = items.find((item) => item.id === currentActiveTab)?.content;

  return (
    <Flex direction={orientation === 'horizontal' ? 'column' : 'row'} width="100%">
      <Flex
        direction={orientation === 'horizontal' ? 'row' : 'column'}
        gap={variant === 'pill' ? 'spacer20' : 'spacer0'}
        p={variant === 'pill' ? 'spacer10' : 'spacer0'}
        bg={variant === 'pill' ? 'Subtle' : undefined}
        borderRadius={variant === 'pill' ? 'border8' : undefined}
        style={{
          borderBottom:
            variant === 'underline' && orientation === 'horizontal'
              ? `1px solid ${theme.colors.border.Subtle}`
              : 'none',
          borderRight:
            variant === 'underline' && orientation === 'vertical'
              ? `1px solid ${theme.colors.border.Subtle}`
              : 'none',
          width: fullWidth ? '100%' : 'auto',
        }}
        role="tablist"
        aria-orientation={orientation}
      >
        {items.map((item) => (
          <button
            key={item.id}
            ref={(ref) => {
              tabRefs.current[item.id] = ref;
            }}
            css={getTabStyles(item)}
            role="tab"
            aria-selected={item.id === currentActiveTab}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            tabIndex={item.id === currentActiveTab ? 0 : -1}
            disabled={item.disabled}
            onClick={() => handleTabChange(item.id)}
            onKeyDown={(e) => handleKeyDown(e, item.id)}
          >
            {item.icon && <span>{item.icon}</span>}
            <span style={{ color: 'inherit' }}>{item.label}</span>
          </button>
        ))}
      </Flex>

      <Box
        p="spacer40"
        bg="Surface"
        borderRadius={variant === 'pill' ? 'border8' : undefined}
        mt={orientation === 'horizontal' && variant === 'pill' ? 'spacer10' : undefined}
        ml={orientation === 'vertical' && variant === 'pill' ? 'spacer10' : undefined}
        role="tabpanel"
        id={`panel-${currentActiveTab}`}
        aria-labelledby={`tab-${currentActiveTab}`}
        tabIndex={0}
      >
        {activeTabContent}
      </Box>
    </Flex>
  );
};

Tabs.displayName = 'Tabs';
