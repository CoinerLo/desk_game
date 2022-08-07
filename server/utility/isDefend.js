const isDefend = (card) => {
  const { defense } = card.getCardState();
  return defense > 0 ? true : false;
}

module.exports = isDefend;