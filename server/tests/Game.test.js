const Game = require('../models/Game');

let game;

beforeEach(() => [
  game = new Game(3, [{ uid: 1 }, { uid: 2 }, { uid: 3 }])
]);

test('Game create', () => {
  expect(game).toBeInstanceOf(Game);
  expect(typeof game.getCurrentPlayer()).toBe('number');
});

test('Game get state',() => {
  const state = game.getStateGame(1);
  expect(state).toHaveProperty('currentPlayer');
  expect(state).toHaveProperty('table');
  expect(state).toHaveProperty('playersState');

  const { table, playersState } = state;

  expect(playersState).toHaveLength(3);
  expect(table.reserve).toHaveLength(4);
});