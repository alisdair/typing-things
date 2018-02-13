import Route from '@ember/routing/route';
import StagesController from 'typing-things/controllers/stages';
import Stage from 'typing-things/models/stage';
import DS from 'ember-data';

export default class Stages extends Route {
  model() {
    return this.store.findAll('stage');
  }

  setupController(controller: StagesController, model: DS.RecordArray<Stage>) {
    controller.set('model', model);
    controller.send('reset');
  }
}
