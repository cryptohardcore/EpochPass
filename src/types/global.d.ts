interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

interface Window {
  ethereum?: EthereumProvider;
}

declare const window: Window;


declare module '*.json' {
  const value: any;
  export default value;
}