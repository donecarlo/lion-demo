import { html, LitElement } from 'lit';

// As a side-effect this way of importing defines the custom elements, eg. <lion-button>, ready for use
import '@lion/ui/define/lion-icon.js';
import { icons } from '@lion/ui/icon.js';
import { icecream } from './icecream.svg.js';

function resolveLionIcon(iconset, name) {
  switch (iconset) {
    case 'demo':
      return import('./iconset.js').then(module => module[name]);
    default:
      throw new Error(`Unknown iconset ${iconset}`);
  }
}

icons.addIconResolver('lion', resolveLionIcon);

export class LionDemo extends LitElement {
  render() {
    const svg = null;
    const iconId = !svg ? 'lion:demo:burger' : null;

    return html`
      <lion-icon .iconId="${iconId}" style="width: 48px; height: 48px;"></lion-icon>
      <button @click=${this._updateIcon} variation="secondary-small"
        >Update Icon</button
      >
      <button @click=${this._reset} variation="secondary-small"
        >Reset</button
      >

      <ol>
        <li>Initial lifecycle renders the icon with "iconId"</li>
        <li>
          In the "update icon" process, the icon is replaced with "svg"
          property, and sets the "iconId" to "null" (For demo purposes, we used a button to trigger the change, but in our case, this is fetched from a config which is async, along with other logic that determines if the icon component should use icon-id or the custom svg)
        </li>
        <li>
          The icon's svg value becomes "nothing"
          <a
            href="https://github.com/ing-bank/lion/blob/57d7ec296226661178940490c7d92d79585fe4ad/packages/ui/components/icon/src/LionIcon.js#L190-L194"
            target="_blank"
            rel="noopener noreferrer"
            >through this block</a
          >
        </li>
        <li>
          Clicking the "update icon" for the second time works since the iconId
          no longer goes from "string" to "null"
        </li>
      </ol>
    `;
  }

  _updateIcon() {
    const icon = this.shadowRoot.querySelector('lion-icon');
    icon.svg = icecream;
    icon.iconId = null;
  }

  _reset() {
    const icon = this.shadowRoot.querySelector('lion-icon');
    icon.iconId = 'lion:demo:burger';
    icon.svg = null;
  }
}
customElements.define('lion-demo', LionDemo);