/*
 * Creates tooltip with provided id that
 * floats on top of visualization.
 * Most styling is expected to come from CSS
 * so check out bubble_chart.css for more details.
 */
function floatingLista(listaId,width) {  
  // Local variable to hold tooltip div for
  // manipulation in other functions.
  var lista = d3.select('#lista')
               .append('div')
               .attr('class', 'lista')
               .attr('id', listaId);
//               .on('click', hideLista)
  //             .style('pointer-events', 'none');

//  Set a width if it is provided.
  if (width) {
    lista.style('width', width);
  }

  // Initially it is hidden.
  hideLista();

  console.log('passou na lista.js')

  function showLista(contentLista, event) {

  //   if (d.dia_da_semana == "sáb" || d.dia_da_semana == "dom" ) {
  //     var Cor = "#DE7802";
  //  } else if (d.dia_da_semana == "sempre") {
  //     var Cor = "#BBAB8B";
  //  } else {
  //     var Cor = "#0097ad";
  //  }

  contentLista = '<h1>AQui</h1>';

    lista.style('opacity', 1)
        .style('z-index', 999)
        .style('border-color', '#000000')
        .html(contentLista);

//    updatePositionCard(event);
  }

  /*
   * Hide the tooltip div.
   */
  function hideLista() {

    console.log('passou na lista.js hideLista')

    lista.style('opacity', 0)
         .style('z-index', -999)
         .style('display', 'none');
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
    showLista: showLista,
//    updatePositionCard: updatePositionCard,
    hideLista: hideLista
  };
}
