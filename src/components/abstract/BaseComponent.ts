import { CSSResultGroup, LitElement, unsafeCSS } from 'lit';
import styles from '../../styles/global.css?inline';
import icons from 'siimple-icons/siimple-icons.css?inline';

export abstract class Component extends LitElement {
  private static _styles: CSSResultGroup;

  static get styles(): CSSResultGroup {
    const derivedStyles = this._styles || [];
    return [
      unsafeCSS(styles),
      unsafeCSS(icons),
      ...(Array.isArray(derivedStyles) ? derivedStyles : [derivedStyles]),
    ];
  }

  static set styles(styles: CSSResultGroup) {
    this._styles = styles;
  }
}

