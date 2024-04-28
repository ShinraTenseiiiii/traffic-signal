// Motorcycle object with initial state
const motorcycle = {
    speed: 0,
    direction: "stopped" 
  };
  
  // Function to change traffic light color randomly
  function changeTrafficLight() {
    const colors = ["red", "yellow", "green"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.getElementById("trafficLight").style.backgroundColor = randomColor;
    setTimeout(changeTrafficLight, Math.random() * 2000 + 5000); // 5 to 7 seconds
  }
  
  // Function to control speed based on traffic light color
  function controlSpeed() {
    const currentColor = document.getElementById("trafficLight").style.backgroundColor;
    switch (currentColor) {
      case "green":
        motorcycle.speed = motorcycle.direction === "forward" ? 10 : -5; 
        break;
      case "yellow":
        motorcycle.speed = motorcycle.direction === "forward" ? 5 : -2;
        break;
      case "red":
        motorcycle.speed = 0;
        break;
      default:
        console.error("Invalid traffic light color:", currentColor);
    }
    const speedDisplay = document.getElementById("speedDisplay");
    speedDisplay.textContent = "Speed: " + motorcycle.speed;
    console.log("Motorcycle speed:", motorcycle.speed, "Direction:", motorcycle.direction);
    updateMotorcyclePosition(); // Update position based on speed
  }
  
  // Function to update motorcycle position
  function updateMotorcyclePosition() {
    const motorcycleEl = document.getElementById("motorcycle");
    const currentLeft = parseInt(motorcycleEl.style.left);
    const adjustedSpeed = motorcycle.direction === "backward" ? -motorcycle.speed : motorcycle.speed;
  let newLeft = currentLeft + adjustedSpeed;
    
    // Handle boundaries (adjust these values based on your game container size)
    if (newLeft < 0) {
      newLeft = 0;
      motorcycle.direction = "stopped"; // Stop at left edge
    } else if (newLeft > 700) { // Assuming container width is 800px and motorcycle width is 100px
      newLeft = 700;
      motorcycle.direction = "stopped"; // Stop at right edge
    }
    
    motorcycleEl.style.left = newLeft + "px";
    motorcycleEl.dataset.direction = motorcycle.direction; 
  }
  
  // Function to animate background (example using JavaScript)
  function animateBackground() {
    const backgroundEl = document.getElementById("background");
    let currentPosition = parseInt(backgroundEl.style.backgroundPositionX) || 0;
    currentPosition -= 1; // Adjust speed as needed
    backgroundEl.style.backgroundPositionX = currentPosition + "px"; 
    requestAnimationFrame(animateBackground); // Loop the animation
  }
  
  // Event listeners for movement buttons (assuming you have buttons with IDs "forwardBtn" and "backwardBtn")
  document.getElementById("forwardBtn").addEventListener("click", () => {
    motorcycle.direction = "forward";
    controlSpeed(); // Update speed based on current light and new direction
  });
  
  document.getElementById("backwardBtn").addEventListener("click", () => {
    motorcycle.direction = "backward";
    controlSpeed(); // Update speed based on current light and new direction
  });
  
  // Start traffic light changes, speed control checks, and background animation
  changeTrafficLight();
  setInterval(controlSpeed, 1000); 
  animateBackground();
  