function createDeck() {
  const deck = [];
  function shuffle(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  for (let color of ['info', 'success', 'danger']) {
    for (let shade of ['bg-', 'half bg-', 'border-']) {
      for (let shape of ['square', 'circle', 'pill']) {
        for (let count of [1, 2, 3]) {
          deck.push({
            shape: shape,
            shade: shade,
            color: color,
            count: count,
          });
        }
      }
    }
  }
  shuffle(deck);

  return deck;
}

module.exports = createDeck;
