
declare module 'animejs';
declare module '@barba/core';

// Lens.js type definition
interface LensOptions {
  radius?: number;
  intensity?: number;
  speedIn?: number;
  speedOut?: number;
}

interface Lens {
  init: (element: HTMLElement | Element, options?: LensOptions) => void;
}

// Additional type augmentation for libraries with partial types
interface Window {
  lens?: Lens;
}
