import Component from '@ember/component';
import { computed } from '@ember/object';
import { assert } from "@ember/debug";
import { isNone } from "@ember/utils";
import Stage from 'typing-things/models/stage';

export default class PlayStage extends Component {
  // Public API
  stage: Stage;
  onInput: (string) => void;
  onSuccess: () => void;

  // Internal state
  response: String = "";

  constructor() {
    super();
    assert("`stage` is required", !isNone(this.stage));
  }

  didReceiveAttrs(this: PlayStage) {
    this.set("response", "");
  }

  didRender() {
    this.element.querySelector("input").focus();
  }

  typedPhrase = computed("stage.phrase", "response", function(this: PlayStage) {
    let phrase = this.stage.get("phrase");
    let prefix = "";

    for (let i = 0; i < this.response.length && i < phrase.length; i++) {
      let c = this.response.charAt(i);
      if (c === phrase.charAt(i)) {
        prefix += c;
      } else {
        break;
      }
    }

    return prefix;
  })

  remainingPhrase = computed("typedPhrase", "stage.phrase", function(this: PlayStage) {
    return this.stage.get("phrase").slice(this.get("typedPhrase").length);
  })

  actions = {
    updateResponse(this: PlayStage, value: String) {
      let phrase = this.stage.get("phrase");

      this.set("response", value);
      this.onInput(value);

      if (value === phrase) {
        this.onSuccess();
      }
    }
  }
};
