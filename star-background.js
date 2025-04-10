function createStarBackground() {
  const starsContainer = document.getElementById('stars-container');
  const numStars = 5; // Adjust the number of stars as needed
  
  // Clear any existing stars
  starsContainer.innerHTML = '';
  
  for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      
      // Randomize star position
      const left = Math.random() * 1000;
      const top = Math.random() * 1000;
      
      // Randomize star size (mostly small with a few larger ones)
      const size = Math.random() < 0.9 ? 
          Math.random() * 1.5 + 0.5 : // 90% small stars (0.5px to 2px)
          Math.random() * 2 + 1;      // 10% larger stars (2px to 4px)
      
      // Randomize star opacity for a more natural look
      const opacity = Math.random() * 1.9 + 1; // Between 0.3 and 1.0
      
      star.style.cssText = `
          position: absolute;
          left: ${left}%;
          top: ${top}%;
          width: ${size}px;
          height: ${size}px;
          background-color: white;
          border-radius: 50%;
          opacity: ${opacity};
          box-shadow: ${size > 0.5 ? '0 0 2px white' : 'none'};
      `;
      
      starsContainer.appendChild(star);
  }
}

// Call the function when the page loads
window.addEventListener('load', createStarBackground);

// Optional: Regenerate stars on window resize for better coverage
window.addEventListener('resize', createStarBackground);
