//Initialise web page

function init(){

    //Fetch the json data and console log it
    d3.json('/api/base').then(function(data){
        console.log(data);

        // Set up the trace for bubble chart

        let asteroidDiameter = data.map(asteroid => asteroid.estimated_diameter);
        console.log(asteroidDiameter);

        let asteroidNames = data.map(asteroid => asteroid.name);
        console.log(asteroidNames);

        let asteroidSpeed = data.map(asteroid => asteroid.speed);
        console.log(asteroidSpeed);

        let asteroidDistance = data.map(asteroid => asteroid.distance);
        console.log(asteroidDistance);

        let trace = {
        x: asteroidDistance,
        y: asteroidSpeed,
        text: asteroidNames,
        mode: "markers",
        marker: {
            size: asteroidDiameter,
            color: '#191970',
            
        }
        };

        // Set up the layout for the bubble chart
        let layout = {

        hovermode: "closest",
        xaxis: {title: "Distance from Earth"},
        yaxis: {title: "Speed"},
        height: 900,
        width: 1500,
        };

        // Call Plotly to plot the bubble chart
        Plotly.newPlot("bubble", [trace], layout)
    });
}

init();
