import { Variant } from '@sapiently/core';

export type ButtonVariants = Exclude<Variant, 'warning'>;

export type IconPosition = 'left' | 'right';
export type ButtonShape = 'default' | 'circle';
export type ButtonKind = 'default' | 'icon-only' | 'with-icon';
