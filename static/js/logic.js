//Initialise web page

function init(){
    // Use D3 to select the dropdown menu
  let selector = d3.select("#selDataset");

    //Fetch the json data and console log it
    d3.json('/api/base').then(function(data){
        console.log(data);

    // Adding asteroid names to the drop down maneu
    let asteroidNames = data.map(asteroid => asteroid.name);
    console.log(asteroidNames);
  
    for (let i = 0; i < asteroidNames.length; i++) {
        const element = asteroidNames[i];
  
        selector
            .append("option")
            .property("value", asteroidNames[i])
            .text(asteroidNames[i]) 
    }; 
  
    //select first asteroid
  
    let asteroidOne =asteroidNames[0];
  
    //Create initial plots
    plots(asteroidOne);
    Metadata(asteroidOne);
  
  
  });

}
  
  //Function to create plots
  function plots(asteroid) {

    //Fetch the json data and console log it
    d3.json('/api/all').then(function(info){
      console.log(info);

      // filter based on asteroid name
    let value = info.filter(result => result.name == asteroid);
    console.log(value);
  
    let distance1=[]
    let speed=[]
    let dates=[]
  
    for (let i = 0; i < value.length; i++) {
      let asteroidInfo = value[i];
  
      distance1.push(asteroidInfo.distance);
      speed.push(asteroidInfo.speed);
      let x = asteroidInfo.date;
      let y = new Date(x);
      dates.push(y);  
    }
  
    console.log(distance1)
    console.log(speed)
    console.log(dates)
    
  
    var trace3 = {
      x:  dates,
      y: distance1,
      type: "scatter",
      mode: "markers",
      marker:{
        size: 15,
        color: "#CA3433",
        line:{
          color: "black",
          width: 2
        }
      }
      
    }
  
    var trace4 = {
      x: dates,
      y: speed,
      type: "scatter",
      mode: "lines+markers",
      marker:{
        color: "#003151",
      },
        line:{
          color: "#003151",
          width: 2
        }
      
      
      }  
       
    
  // Setup the layout
    let layout = {
      title: "Distance from earth (lunar)",
      xaxis:{
        range: dates,
        title: "date",  
      },
      yaxis: {
        title: 'Distance'
      }

    };
  
    let layout2 = {
      title: "Speed of approach (mph)",
      xaxis:{
        range: dates,
        title: "date"
      },
      yaxis: {
        title: 'Speed'
      }
    };
  
  // Call Plotly to plot the bar chart
    Plotly.newPlot("line", [trace3], layout)
    Plotly.newPlot("line2", [trace4], layout2)
  
    });
  
  };

    

  // Function that populates metadata info
  function Metadata(asteroid) {
    // Use D3 to select the dropdown menu
    let selector = d3.select("#selDataset");

    //Fetch the json data and console log it
    d3.json('/api/base').then(function(data){
      console.log(data);

    // Filter based on the value of the sample
    let value = data.filter(result => result.name == asteroid);
  
    // Log the array of metadata objects after the have been filtered
    console.log(value);

    // Get the first index from the array
    let valueData = value[0];

    // Clear out metadata
    d3.select("#sample-metadata").html("");

    // Use Object.entries to add each key/value pair to the panel
    Object.entries(valueData).forEach(([key,value]) => {

      // Log the individual key/value pairs as they are being appended to the metadata panel
      console.log(key,value);

      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);

  });
  
  });

  };
  

  
  // Function that updates dashboard when sample is changed
  function optionChanged(value) { 
  
    // Log the new value
    console.log(value); 
  
    // Call all functions 
    plots(value);
    Metadata(value);
  };
  
  init();