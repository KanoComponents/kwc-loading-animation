import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { LoadingAnimation } from '@kano/loading-animation/index.js';

class KWCAnimationLoader extends PolymerElement {
    static get is() { return 'kwc-loading-animation'; }
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
            </style>
        `;
    }
    static get properties() {
        return {
            pipSize: {
                type: Number,
                value: 9,
                observer: '_inject',
            },
            noAutoStart: {
                type: Boolean,
                value: false,
            },
        };
    }
    connectedCallback() {
        super.connectedCallback();

        /* Re-inject animation when re-connecting to DOM. */
        if (!this._loader) {
            this._inject();
        }
    }
    _inject() {
        if (this._loader) {
            this._loader.stop();
            this._loader.delete();
        }
        this._loader = new LoadingAnimation(this.shadowRoot, { pipSize: this.pipSize });
        if (!this.noAutoStart) {
            this._loader.start();
        }
    }
    start() {
        if (!this._loader) {
            return;
        }
        this._loader.start();
    }
    stop() {
        if (!this._loader) {
            return;
        }
        this._loader.stop();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (!this._loader) {
            return;
        }
        this._loader.stop();
        this._loader.delete();
        this._loader = null;
    }
}

customElements.define(KWCAnimationLoader.is, KWCAnimationLoader);
