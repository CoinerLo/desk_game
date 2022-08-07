const isDefend = (card) => {
  const { defense } = card.getState();
  return defense > 0 ? true : false;
}

module.exports = isDefend;