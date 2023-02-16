var plot_options = [{"By Diameter":"estimated_diameter"},
                    {"By Distance":"distance"},
                    
                    
                    
                  ];

//populate selection box with asteroid features to plot
for (i in plot_options) {
  d3.select("#selOption").append("option").attr("value", Object.values(plot_options[i])).text(Object.keys(plot_options[i]));
 };

var plot_sorting = [{"The Top 5 Asteroids":5},
                    {"The Bottom 5 Asteroids":-5},
                  ]

//populate selection box with what to show
for (i in plot_sorting) {
  d3.select("#selSorting").append("option").attr("value", Object.values(plot_sorting[i])).text(Object.keys(plot_sorting[i]));
 };

function init() {

  d3.json(`/api/base`).then(function(data) {
  
    var total_asteroids = (Object.keys(data).length);
    var sortedDescByDiameter = data.sort((a, b) => b.estimated_diameter - a.estimated_diameter);
    var slicedTopFiveData = sortedDescByDiameter.slice(0, 5);
    var reversedTopFiveData = slicedTopFiveData.reverse();
    
    var trace1 = {
      x: reversedTopFiveData.map(asteroid => asteroid.estimated_diameter),
      y: reversedTopFiveData.map(asteroid => asteroid.name),
      text: reversedTopFiveData.map(asteroid => asteroid.name),
      type: "bar",
      orientation: "h"
    };

    var traceData = [trace1];

    var layout = {
      title: "Top 5 Asteroids by Estimated Diameter",
      height: 600,
      margin: {
        l: 100,
        r: 100,
        t: 75,
        b: 75
      }
    };

    Plotly.newPlot("hbar-plot", traceData, layout);

  });

};


d3.selectAll("#selSorting").on("change", updatePlotly);
d3.selectAll("#selOption").on("change", updatePlotly);

function updatePlotly() {

  var selSortingVal = d3.select("#selSorting").property("value");
  var selOptionVal = d3.select("#selOption").property("value");
  
  if (selSortingVal > 0) {
    var sliceBy = d3.select("#selSorting").property("value")*1;
    var descending = true;
    }
    else {
      var sliceBy = d3.select("#selSorting").property("value")*-1;
      var descending = false;
    };
  
//######edit the api for our needs######
  d3.json(`/api/base`).then(function(data) {

    if (descending === true) {
      if (selOptionVal === 'estimated_diameter') {
        var sortedasteroids = data.sort((a, b) => b.estimated_diameter - a.estimated_diameter);
        var slicedData = sortedasteroids.slice(0, sliceBy);
        var reversedData = slicedData.reverse();
        var x = reversedData.map(asteroid => asteroid.estimated_diameter);
        var y = reversedData.map(asteroid => asteroid.name);
        var text = reversedData.map(asteroid => asteroid.name);
        var text_title = `Top ${sliceBy} Asteroids By Diameter`;
      }
      else if (selOptionVal === 'distance') {
        var sortedasteroids = data.sort((a, b) => b.distance - a.distance);
        var slicedData = sortedasteroids.slice(0, sliceBy);
        var reversedData = slicedData.reverse();
        var x = reversedData.map(asteroid => asteroid.distance);
        var y = reversedData.map(asteroid => asteroid.name);
        var text = reversedData.map(asteroid => asteroid.name);
        var text_title = `Top ${sliceBy} Asteroids By Distance`;
      }
      
    }
    

    Plotly.restyle("hbar-plot", "x", [x]);
    Plotly.restyle("hbar-plot", "y", [y]);
    Plotly.restyle("hbar-plot", "text", [text]);
    Plotly.relayout("hbar-plot", "title", text_title);
  });

};



function changeSorting(){
  console.log("changeSorting()");
};

function changeOption(){
  console.log("changeOption()");
};


init();

