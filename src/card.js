/*
 * Creates tooltip with provided id that
 * floats on top of visualization.
 * Most styling is expected to come from CSS
 * so check out bubble_chart.css for more details.
 */
function floatingCard(cardId,width) {  
  // Local variable to hold tooltip div for
  // manipulation in other functions.
  var card = d3.select('#card')
               .append('div')
               .attr('class', 'clicada')
               .attr('id', cardId);
//               .style('pointer-events', 'none');

//  Set a width if it is provided.
  if (width) {
    card.style('width', width);
  }

  // Initially it is hidden.
  hideCard();

  function showCard(contentCard, event) {
    card.style('opacity', 0.75)
        .html(contentCard);

    updatePositionCard(event);
  }

  /*
   * Hide the tooltip div.
   */
  function hideCard() {
    card.style('opacity', 0.0);
  }

  /*
   * Figure out where to place the tooltip
   * based on d3 mouse event.
   */
  function updatePositionCard(event) {
    var xOffset = 20;
    var yOffset = 10;

    var ttw = card.style('width');
    var tth = card.style('height');

    var wscrY = window.scrollY;
    var wscrX = window.scrollX;

    var curX = (document.all) ? event.clientX + wscrX : event.pageX;
    var curY = (document.all) ? event.clientY + wscrY : event.pageY;
    var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
                 curX - ttw - xOffset * 2 : curX + xOffset;

    if (ttleft < wscrX + xOffset) {
      ttleft = wscrX + xOffset;
    }

    var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
                curY - tth - yOffset * 2 : curY + yOffset;

    if (tttop < wscrY + yOffset) {
        tttop = curY + yOffset;
    }

    card
      .style('top', 70 + '%')
      .style('left', 25 + '%');
  }

  return {
    showCard: showCard,
    hideCard: hideCard,
    updatePositionCard: updatePositionCard
  };
}
