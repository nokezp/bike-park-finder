declare module 'react-map-gl-geocoder';

declare module 'worker-loader!*' {
  // Reference the Worker type from the DOM lib
  class WebpackWorker extends globalThis.Worker {
    constructor();
  }

  export default WebpackWorker;
}

declare module 'mapbox-gl' {
  export let workerClass: typeof import('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
}
