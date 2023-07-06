function calculateSpeed(distances, greenTime, redTime, maxSpeed) {
    let speeds = [];
    let totalTime = 0;
  
    for (let distance of distances) {
      totalTime += distance / maxSpeed;
    }
  
    totalTime += (distances.length - 1) * redTime;
  
    if (totalTime <= greenTime) {
      let speed = maxSpeed;
      speeds = Array(distances.length - 1).fill(speed);
    } else {
      let remainingTime = totalTime - greenTime;
  
      for (let i = 0; i < distances.length - 1; i++) {
        let distance = distances[i];
        let timeToTravel = distance / maxSpeed;
        remainingTime -= timeToTravel;
  
        if (remainingTime <= 0) {
          break;
        }
  
        let greenCycles = Math.floor(remainingTime / (greenTime + redTime));
        let greenTimeLeft = remainingTime % (greenTime + redTime);
  
        let timeInGreen = greenTimeLeft < greenTime ? greenTimeLeft : greenTime;
  
        let speed = distance / (timeToTravel + timeInGreen);
        speeds.push(speed);
        remainingTime -= greenCycles * (greenTime + redTime);
      }
  
      let remainingDistance = distances.slice(-1)[0];
      let speed = remainingDistance / remainingTime;
      speeds.push(speed);
    }
  
    return speeds;
  }
  
  // Example usage
  let distances = [60000, 200, 150, 300];  // Distances between traffic lights in meters
  let greenTime = 60;  // Time traffic lights stay green in seconds
  let redTime = 180;  // Time traffic lights stay red in seconds
  let maxSpeed = 70;  // Maximum speed in km/h
  
  let speeds = calculateSpeed(distances, greenTime, redTime, maxSpeed);
  console.log("List of speeds between consecutive traffic lights:");
  for (let i = 0; i < speeds.length; i++) {
    let speed = speeds[i];
    console.log('Speed between traffic light' + (i + 1) + 'and' + (i + 2) + ':' +speed.toFixed(2) + 'km/h');
  }