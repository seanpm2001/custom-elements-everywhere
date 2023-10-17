/**
 * @license
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import "./components.js";
import { expect } from "chai";

// Setup the test harness. This will get cleaned out with every test.
let app = document.createElement("div");
app.id = "app";
document.body.appendChild(app);
let scratch; // This will hold the actual element under test.

beforeEach(function() {
  scratch = document.createElement("div");
  scratch.id = "scratch";
  app.appendChild(scratch);
});

afterEach(function() {
  app.innerHTML = "";
  scratch = null;
});

describe("advanced support", function() {
  describe("attributes and properties", function() {
    let root;
    let wc;


    it("will pass array data as a property", async function() {
      this.weight = 2;
      root = document.createElement("component-with-properties");
      scratch.appendChild(root);
      await root.updateComplete;
      wc = root.shadowRoot.querySelector("#wc");
      let data = wc.arr;
      expect(data).to.eql(["L", "i", "t"]);
    });

    it("will pass object data as a property", async function() {
      this.weight = 2;
      root = document.createElement("component-with-properties");
      scratch.appendChild(root);
      await root.updateComplete;
      wc = root.shadowRoot.querySelector("#wc");
      let data = wc.obj;
      expect(data).to.eql({ org: "lit", repo: "lit" });
    });

    it("will pass object data to a camelCase-named property", async function() {
      this.weight = 2;
      root = document.createElement("component-with-properties");
      scratch.appendChild(root);
      await root.updateComplete;
      wc = root.shadowRoot.querySelector("#wc");
      let data = wc.camelCaseObj;
      expect(data).to.eql({ label: "passed" });
    });

    it("will pass object data to inherited properties", async function() {
      this.weight = 2;
      root = document.createElement("component-with-inheritance");
      scratch.appendChild(root);
      await root.updateComplete;
      wc = root.shadowRoot.querySelector("#wc");
      expect(wc.arr).to.eql(["L", "i", "t"]);
      expect(wc.obj).to.eql({ org: "lit", repo: "lit" });
      expect(wc.camelCaseObj).to.eql({ label: "passed" });
    });

  });

  describe("events", function() {
    let root;
    let wc;

    beforeEach(async function() {
      root = document.createElement("component-with-declarative-event");
      scratch.appendChild(root);
      await root.updateComplete;
      wc = root.shadowRoot.querySelector("#wc");
    });

    it("can declaratively listen to a lowercase DOM event dispatched by a Custom Element", async function() {
      this.weight = 2;
      let handled = root.shadowRoot.querySelector("#lowercase");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await Promise.resolve();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a kebab-case DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      let handled = root.shadowRoot.querySelector("#kebab");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await Promise.resolve();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a camelCase DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      let handled = root.shadowRoot.querySelector("#camel");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await Promise.resolve();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a CAPScase DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      let handled = root.shadowRoot.querySelector("#caps");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await Promise.resolve();
      expect(handled.textContent).to.eql("true");
    });

    it("can declaratively listen to a PascalCase DOM event dispatched by a Custom Element", async function() {
      this.weight = 1;
      let handled = root.shadowRoot.querySelector("#pascal");
      expect(handled.textContent).to.eql("false");
      wc.click();
      await Promise.resolve();
      expect(handled.textContent).to.eql("true");
    });
  });
});
