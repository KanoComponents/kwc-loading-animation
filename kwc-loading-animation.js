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
                    padding: 16px;
                    background: #FFF;
                    border-radius: 6px;
                    box-shadow: 0px 4px 4px 0px rgba(0,0,0,0.15);
                }
            </style>
        `;
    }
    static get properties() {
        return {
            pipSize: {
                type: Number,
                value: 6.4,
                observer: '_inject'
            },
            noAutoStart: {
                type: Boolean,
                value: false,
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
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
    start () {
        if (!this._loader) {
            return;
        }
        this._loader.start();
    }
    stop () {
        if (!this._loader) {
            return;
        }
        this._loader.stop();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        if (!this._loader) {
            return
        }
        this._loader.stop();
        this._loader.delete();
        this._loader = null;
    }
}

customElements.define(KWCAnimationLoader.is, KWCAnimationLoader);
