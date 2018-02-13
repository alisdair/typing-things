import Controller from '@ember/controller';
import ArrayProxy from '@ember/array/proxy';
import { computed } from '@ember/object';
import { isNone } from '@ember/utils';
import { task, timeout } from 'ember-concurrency';
import Stage from 'typing-things/models/stage';

export default class Stages extends Controller {
  model: ArrayProxy<Stage>;
  currentIndex: number = 0;
  startTime?: Date;
  endTime?: Date;

  currentStage = computed('model.[]', 'currentIndex', function(this: Stages) {
    return this.model.objectAt(this.currentIndex);
  });

  timeElapsed = computed('startTime', 'endTime', function(this: Stages) {
    if (isNone(this.startTime) || isNone(this.endTime)) {
      return null;
    }

    let diff = this.endTime.valueOf() - this.startTime.valueOf();
    let seconds = Math.floor(diff / 1000).toString();
    let milliseconds = (diff % 1000).toString();

    while (milliseconds.length < 3) {
      milliseconds += '0';
    }

    return `${seconds}.${milliseconds}s`;
  });

  timer = task(function*(this: Stages) {
    while (true) {
      this.set('endTime', new Date());
      yield timeout(1);
    }
  }).drop()

  actions = {
    startClock(this: Stages) {
      if (isNone(this.startTime)) {
        this.set('startTime', new Date());
        this.get('timer').perform();
      }
    },

    nextStage(this: Stages) {
      this.incrementProperty('currentIndex');
      if (isNone(this.currentStage)) {
        this.set('endTime', new Date());
        this.timer.cancelAll();
      }
    },

    reset(this: Stages) {
      this.set('currentIndex', 0);
      this.set('startTime', null);
      this.set('endTime', null);
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your controllers.
declare module '@ember/controller' {
  interface Registry {
    'stages': Stages;
  }
}
