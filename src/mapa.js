  // Map and projection

  var width = window.innerWidth * 0.75;
  var height = window.innerHeight * 0.90;

  var projection = d3.geoMercator()  
  .center([-47.05, -23.35]) // GPS of location to zoom on
  .scale(100000)            // This is like the zoom
  .translate([ 0, 0 ])

// Load external data and boot
  d3.json("https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-35-mun.json", function(data){
  
  // Filter data
  data.features = data.features.filter( function(d){return d.properties.name=="São Paulo"} )
  
    // Draw the map
  svg = d3.select('#mapa')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  svg.append('g')
      .attr('width', width)
      .attr('height', height)
    .selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
        .attr("fill", "black")
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "darkred")
        .style("opacity", 1)
  });
  