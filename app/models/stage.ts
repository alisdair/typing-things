import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default class Stage extends Model.extend({
  level: attr('number'),
  name: attr('string'),
  avatar: attr('string'),
  phrase: attr('string'),
}) {
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your models.
declare module 'ember-data' {
  interface ModelRegistry {
    'stage': Stage;
  }
}
