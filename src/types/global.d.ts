
declare module 'animejs';
declare module '@barba/core';
declare module 'lens.js';

// Additional type augmentation for libraries with partial types
interface Window {
  lens?: {
    init: (element: HTMLElement | Element, options?: {
      radius?: number;
      intensity?: number;
      speedIn?: number;
      speedOut?: number;
    }) => void;
  };
}
