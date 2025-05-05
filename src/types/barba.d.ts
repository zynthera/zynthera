declare module '@barba/core' {
  interface BarbaTransitionData {
    current: {
      container: HTMLElement;
      namespace: string;
    };
    next: {
      container: HTMLElement;
      namespace: string;
    };
  }

  interface BarbaTransition {
    name: string;
    leave: (data: BarbaTransitionData) => Promise<any>;
    enter: (data: BarbaTransitionData) => Promise<any>;
  }

  interface BarbaInit {
    transitions: BarbaTransition[];
  }

  const barba: {
    init: (options: BarbaInit) => void;
  };

  export default barba;
}
