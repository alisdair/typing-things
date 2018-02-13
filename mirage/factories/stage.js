import { Factory, faker } from "ember-cli-mirage";

const { noun, adjective, verb, phrase } = faker.hacker;

export default Factory.extend({
  level: i => i + 1,
  name: () => faker.internet.userName(),
  avatar: () => faker.internet.avatar(),
  phrase: i => {
    if (i < 1) {
      return noun();
    }
    if (i < 3) {
      return [adjective(), noun()].join(" ");
    }
    if (i < 6) {
      return [verb(), "the", adjective(), noun() + "!"].join(" ");
    }
    return new Array(i - 5).fill().map(() => phrase()).join(" ");
  }
});
