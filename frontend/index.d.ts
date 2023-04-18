declare interface IScriptProps {
  attributes?: object;
  onCreate?: () => void;
  onError?: () => void;
  onLoad: () => void;
  url: string;
}
declare class Script {
  props: IScriptProps;
  state: any;
  context: any;
  refs: any;
  forceUpdate(callback: any): void;
  render(): any;
  setState(partialState: any, callback: any): void;
}

declare module 'react-load-script' {
  export = Script;
}


interface Window {
  OmiseCard: any;
}

