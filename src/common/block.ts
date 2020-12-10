import { EventBus } from './event-bus.js';

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render'
  };

  private _element: HTMLElement;
  private _meta: {
    tagName: string;
    props: object;
  };
  protected props: any;
  public eventBus: () => EventBus;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName: string = 'div', props: any = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidMount() {
    this.componentDidMount(undefined);
    // здесь запускается рендер компонента 
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

	// Может переопределять пользователь, необязательно трогать
  componentDidMount(oldProps: any) {
    return oldProps;
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) {
      // здесь запускаем рендер компонента 
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

	// Может переопределять пользователь, необязательно трогать
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

    const oldProps = Object.assign({}, this.props);

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    // Этот небезопасный метод для упрощения логики
    // Используйте шаблонизатор из npm или напишите свой безопасный
    // Нужно не в строку компилировать (или делать это правильно),
    // либо сразу в DOM-элементы возвращать из compile DOM-ноду
    this._element.innerHTML = block;
  }

	// Может переопределять пользователь, необязательно трогать
  render(): string {
    return ''; 
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: any) {
    // Можно и так передать this
    // Такой способ больше не применяется с приходом ES6+
    // const self = this;
    
    const proxy = new Proxy(props, {
      get: function(item, property){
        return item[property];
      },
      deleteProperty: function() { 
        throw new Error('Нет доступа');
      },
    });
    
    return proxy; 
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}