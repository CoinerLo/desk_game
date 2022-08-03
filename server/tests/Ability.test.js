const Ability = require('../models/Ability');

let abil;

beforeEach(() => {
  abil = new Ability('stu', 2);
});

test('Ability create', () => {
  expect(abil).toBeInstanceOf(Ability);
  expect(abil.getType()).toBe('ability');
});

test('Ability get description', () => {
  const { name, description, countAbil } = abil.getDescription();
  expect(name).toBe('Исследование');
  expect(typeof description).toBe('string');
  expect(countAbil).toBe(2);
});
