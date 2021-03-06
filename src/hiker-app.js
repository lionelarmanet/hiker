/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import {
  setPassiveTouchGestures,
  setRootPath
} from "@polymer/polymer/lib/utils/settings.js";
import "@polymer/app-layout/app-header/app-header.js";
import "@polymer/app-layout/app-header-layout/app-header-layout.js";
import "@polymer/app-layout/app-scroll-effects/app-scroll-effects.js";
import "@polymer/app-layout/app-toolbar/app-toolbar.js";
import "@polymer/app-route/app-location.js";
import "@polymer/app-route/app-route.js";
import "@polymer/iron-pages/iron-pages.js";
import "@polymer/iron-selector/iron-selector.js";
import "@polymer/paper-icon-button/paper-icon-button.js";
import "./my-icons.js";
import "./services/search-service.js";
import searchService from "./services/search-service.js";

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(HikerAppGlobals.rootPath);

class HikerApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          --app-primary-color: #4285f4;
          --app-secondary-color: black;

          display: block;
        }

        app-drawer-layout:not([narrow]) [drawer-toggle] {
          display: none;
        }

        app-header {
          color: #fff;
          background-color: var(--app-primary-color);
        }

        app-header paper-icon-button {
          --paper-icon-button-ink-color: white;
        }

        .drawer-list {
          margin: 0 20px;
        }

        .drawer-list a {
          display: block;
          padding: 0 16px;
          text-decoration: none;
          color: var(--app-secondary-color);
          line-height: 40px;
        }

        .drawer-list a.iron-selected {
          color: black;
          font-weight: bold;
        }
      </style>

      <app-location route="{{route}}" url-space-regex="^[[rootPath]]">
      </app-location>

      <app-route route="{{route}}" pattern="[[rootPath]]:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>

      <app-header slot="header" condenses reveals effects="waterfall">
        <app-toolbar>
          <div main-title="">Hiker</div>
        </app-toolbar>
      </app-header>

      <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
        <results-list-view name="resultsListView" hikings={{hikings}}></results-list-view>
        <view404 name="view404"></view404>
      </iron-pages>
    `;
  }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: "_pageChanged"
      },
      routeData: Object,
      subroute: Object,
      hikings: { type: Array }
    };
  }

  static get observers() {
    return ["_routePageChanged(routeData.page)"];
  }

  _routePageChanged(page) {
    if (!page) {
      this.page = "resultsListView";
    } else if (["resultsListView"].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = "view404";
    }
  }

  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.
    switch (page) {
      case "resultsListView":
        import("./components/results/results-list-view.js");
        break;
    }
  }

  ready() {
    super.ready();
    this.hikings = searchService.findAll();
  }
}

window.customElements.define("hiker-app", HikerApp);
