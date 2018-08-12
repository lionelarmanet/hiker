import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "@polymer/paper-card/paper-card.js";
import "@polymer/iron-icon/iron-icon.js";
import "../../my-icons.js";
import "../../shared-styles.js";

class ResultsListView extends PolymerElement {
  static get properties() {
    return {
      hikings: { type: Array }
    };
  }

  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;
          padding: 10px;
        }

        h4 {
          padding: 0;
          margin: 0;
        }

        .hiking-location {
          color: var(--light-theme-secondary-color)
        }

        .hiking-result {
          margin-bottom: 4px;
        }
      </style>
      
      <template is="dom-repeat" items="{{hikings}}">
        <paper-card image="[[item.image]]" class="hiking-result">
          <div class="card-content">
            <h4 class="hiking-title">[[item.title]]</h4>
            <div class="hiking-location">
              <iron-icon icon="my-icons:location-on"></iron-icon>
              <span>[[item.mountain]] - [[item.locationTitle]]</span>
            </div>
          </div>
          <div class="card-actions">
            <div class="horizontal justified">
              <span class="kind-of-activiy">[[item.kindOfActivity]]</span>
            </div>
          </div>
        </paper-card>
      </template>
    `;
  }

  constructor() {
    super();
  }
}

window.customElements.define("results-list-view", ResultsListView);
