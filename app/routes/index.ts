import Route from '@ember/routing/route';

export default class Index extends Route {
  redirect() {
    return this.transitionTo('stages');
  }
}
