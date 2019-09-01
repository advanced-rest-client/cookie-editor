import { html } from 'lit-html';
import { ArcDemoPage } from '@advanced-rest-client/arc-demo-helper/ArcDemoPage.js';
import '@advanced-rest-client/arc-demo-helper/arc-interactive-demo.js';
import '@anypoint-web-components/anypoint-styles/colors.js';
import '@anypoint-web-components/anypoint-checkbox/anypoint-checkbox.js';
import { DataGenerator } from '@advanced-rest-client/arc-data-generator/arc-data-generator.js';
import '../cookie-editor.js';

class ApiDemo extends ArcDemoPage {
  constructor() {
    super();

    this.initObservableProperties([
      'demoOutlined',
      'demoCompatibility',
      'readOnly',
      'cookie'
    ]);

    this.cookie = DataGenerator.generateCookiesData({
      size: 1
    })[0];

    this.componentName = 'cookie-editor';
    this.demoStates = ['Filled', 'Outlined', 'Anypoint'];
    this._toggleMainOption = this._toggleMainOption.bind(this);
    this._mainDemoStateHandler = this._mainDemoStateHandler.bind(this);
    this._saveCookieHandler = this._saveCookieHandler.bind(this);
    this._cancelCookieHandler = this._cancelCookieHandler.bind(this);
  }

  _mainDemoStateHandler(e) {
    const state = e.detail.value;
    switch (state) {
      case 0:
        this.demoOutlined = false;
        this.demoCompatibility = false;
        break;
      case 1:
        this.demoOutlined = true;
        this.demoCompatibility = false;
        break;
      case 2:
        this.demoOutlined = false;
        this.demoCompatibility = true;
        break;
    }
  }

  _toggleMainOption(e) {
    const { name, checked } = e.target;
    this[name] = checked;
  }

  _saveCookieHandler(e) {
    this.cookie = e.detail;
    console.log(e.detail);
  }

  _cancelCookieHandler() {
    this.cookie = undefined;
  }

  _demoTemplate() {
    const {
      readOnly,
      demoStates,
      darkThemeActive,
      demoOutlined,
      demoCompatibility,
      cookie
    } = this;

    return html`<section class="documentation-section">
      <h2>Interactive demo</h2>
      <p>
        This demo lets you preview the Cookie editor element with various
        configuration options.
      </p>

      <arc-interactive-demo
        .states="${demoStates}"
        @state-chanegd="${this._mainDemoStateHandler}"
        ?dark="${darkThemeActive}"
      >
        <cookie-editor
          slot="content"
          ?readOnly="${readOnly}"
          ?outlined="${demoOutlined}"
          ?compatibility="${demoCompatibility}"
          .cookie="${cookie}"
          @save="${this._saveCookieHandler}"
          @cancel="${this._cancelCookieHandler}"></cookie-editor>

        <label slot="options" id="mainOptionsLabel">Options</label>
        <anypoint-checkbox
          aria-describedby="mainOptionsLabel"
          slot="options"
          name="readOnly"
          @change="${this._toggleMainOption}"
          >Read only</anypoint-checkbox
        >
      </arc-interactive-demo>
    </section>`;
  }

  contentTemplate() {
    return html`
      ${this._demoTemplate()}
    `;
  }
}
const instance = new ApiDemo();
instance.render();
window.demoInstance = instance;
