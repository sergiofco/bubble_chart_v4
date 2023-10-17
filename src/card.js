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
//               .on('click', hideCard);
//               .style('pointer-events', 'none');

//  Set a width if it is provided.
  if (width) {
    card.style('width', width);
  }

  // Initially it is hidden.
  hideCard();

  function showCard(d,contentCard, event) {

    if (d.dia_da_semana == "sáb" || d.dia_da_semana == "dom" ) {
      var Cor = "#DE7802";
   } else if (d.dia_da_semana == "sempre") {
      var Cor = "#BBAB8B";
   } else {
      var Cor = "#0097ad";
   }

    card.style('opacity', 1)
        .style('z-index', 999)
        .style('border-color', Cor)
        .html(contentCard);

//    updatePositionCard(event);
  }

  /*
   * Hide the tooltip div.
   */
  function hideCard() {
    card.style('opacity', 0.0)
        .style('z-index', -999);
  }

  /*
   * Figure out where to place the tooltip
   * based on d3 mouse event.
   */
  // function updatePositionCard(event) {
  //   var xOffset = 20;
  //   var yOffset = 10;

  //   var ttw = card.style('width');
  //   var tth = card.style('height');

  //   var wscrY = window.scrollY;
  //   var wscrX = window.scrollX;

  //   var curX = (document.all) ? event.clientX + wscrX : event.pageX;
  //   var curY = (document.all) ? event.clientY + wscrY : event.pageY;
  //   var ttleft = ((curX - wscrX + xOffset * 2 + ttw) > window.innerWidth) ?
  //                curX - ttw - xOffset * 2 : curX + xOffset;

  //   if (ttleft < wscrX + xOffset) {
  //     ttleft = wscrX + xOffset;
  //   }

  //   var tttop = ((curY - wscrY + yOffset * 2 + tth) > window.innerHeight) ?
  //               curY - tth - yOffset * 2 : curY + yOffset;

  //   if (tttop < wscrY + yOffset) {
  //       tttop = curY + yOffset;
  //   }

  //   card
  //     .style('top', 70 + '%')
  //     .style('left', 25 + '%');
  // }

  return {
    showCard: showCard,
//    updatePositionCard: updatePositionCard,
    hideCard: hideCard
  };
}
