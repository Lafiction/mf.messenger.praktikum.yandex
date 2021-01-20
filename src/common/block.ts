import { EventBus } from './event-bus.js';

export class Block<Props> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private blockElement!: HTMLElement;

  private meta: {
    tagName: string;
    props: Props;
  };

  protected props: Props;

  public eventBus: () => EventBus;

  constructor(tagName: string = 'div', props: Props) {
    const eventBus = new EventBus();
    this.meta = {
      tagName,
      props,
    };

    this.props = this.makePropsProxy(props);

    this.eventBus = () => { return eventBus; };

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMountInternal.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdateInternal.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.renderInternal.bind(this));
  }

  private createResources() {
    const { tagName } = this.meta;
    this.blockElement = this.createDocumentElement(tagName);
  }

  init() {
    this.createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private componentDidMountInternal() {
    this.componentDidMount(undefined);
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  componentDidMount(oldProps: any) {
    return oldProps;
  }

  private componentDidUpdateInternal(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: any, newProps: any) {
    const changedProperties = Object.keys(newProps);
    for (let i = 0; i < changedProperties.length; i++) {
      const name = changedProperties[i];
      if (oldProps[name] !== newProps[name]) {
        return true;
      }
    }

    return false;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    const oldProps = { ...this.props };

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
  };

  get element() {
    return this.blockElement;
  }

  private renderInternal() {
    const block = this.render();
    this.blockElement.innerHTML = block;
  }

  render(): string {
    return '';
  }

  getContent() {
    return this.blockElement;
  }

  private makePropsProxy(props: Props) {
    const proxy = new Proxy(props as Object, {
      get(item: any, property) {
        return item[property];
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });

    return proxy;
  }

  private createDocumentElement(tagName: string): HTMLElement {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }

  public getOuterHTML() {
    return this.blockElement.outerHTML;
  }
}
