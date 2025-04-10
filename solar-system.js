// Solar System functionality - Simplified
document.addEventListener("DOMContentLoaded", () => {
    const planetsContainer = document.getElementById("planets-container")
  
    if (planetsContainer) {
      loadPlanets()
    }
  
    // Function to load planets from data folder
    async function loadPlanets() {
      try {
        // Fetch planet data from the data folder
        const response = await fetch("../data/planets.json")
  
        if (!response.ok) {
          throw new Error(`Failed to load planet data: ${response.status}`)
        }
  
        const planets = await response.json()
  
        // Create HTML for planets
        let planetsHTML = '<div class="planets-grid">'
  
        planets.forEach((planet, index) => {
          planetsHTML += `
            <div class="planet-card" data-planet-index="${index}">
              <div class="planet-image">
                <img src="${planet.image}" alt="${planet.name}">
              </div>
              <div class="planet-content">
                <h3>${planet.name}</h3>
                <p>${planet.description.substring(0, 100)}...</p>
                <div class="planet-stats">
                  <div class="planet-stat">
                    <span>Type:</span> ${planet.type}
                  </div>
                  <div class="planet-stat">
                    <span>Moons:</span> ${planet.moons}
                  </div>
                </div>
              </div>
            </div>
          `
        })
  
        planetsHTML += "</div>"
  
        // Add planet modal
        planetsHTML += `
          <div id="planet-modal" class="modal">
            <div class="modal-content">
              <span class="close-button">&times;</span>
              <div id="planet-modal-content">
                <!-- Planet details will be inserted here -->
              </div>
            </div>
          </div>
        `
  
        // Insert HTML
        planetsContainer.innerHTML = planetsHTML
  
        // Add event listeners to planet cards
        const planetCards = document.querySelectorAll(".planet-card")
        const planetModal = document.getElementById("planet-modal")
        const planetModalContent = document.getElementById("planet-modal-content")
        const closeButton = document.querySelector("#planet-modal .close-button")
  
        planetCards.forEach((card) => {
          card.addEventListener("click", function () {
            const planetIndex = Number.parseInt(this.dataset.planetIndex)
            const planet = planets[planetIndex]
  
            // Populate modal with planet details
            planetModalContent.innerHTML = `
              <div class="planet-modal-content">
                <div class="planet-modal-image">
                  <img src="${planet.image}" alt="${planet.name}">
                </div>
                <div class="planet-modal-details">
                  <h2>${planet.name}</h2>
                  <p>${planet.description}</p>
                  <div class="planet-modal-stats">
                    <div class="planet-modal-stat">
                      <h4>Type</h4>
                      <p>${planet.type}</p>
                    </div>
                    <div class="planet-modal-stat">
                      <h4>Diameter</h4>
                      <p>${planet.diameter}</p>
                    </div>
                    <div class="planet-modal-stat">
                      <h4>Distance from Sun</h4>
                      <p>${planet.distance}</p>
                    </div>
                    <div class="planet-modal-stat">
                      <h4>Orbital Period</h4>
                      <p>${planet.orbitalPeriod}</p>
                    </div>
                    <div class="planet-modal-stat">
                      <h4>Rotation Period</h4>
                      <p>${planet.rotationPeriod}</p>
                    </div>
                    <div class="planet-modal-stat">
                      <h4>Moons</h4>
                      <p>${planet.moons}</p>
                    </div>
                    <div class="planet-modal-stat">
                      <h4>Temperature</h4>
                      <p>${planet.temperature}</p>
                    </div>
                  </div>
                </div>
              </div>
            `
  
            // Show modal
            planetModal.style.display = "block"
          })
        })
  
        // Close modal when clicking the close button
        if (closeButton) {
          closeButton.addEventListener("click", () => {
            planetModal.style.display = "none"
          })
        }
  
        // Close modal when clicking outside
        window.addEventListener("click", (event) => {
          if (event.target === planetModal) {
            planetModal.style.display = "none"
          }
        })
      } catch (error) {
        console.error("Error loading planets:", error)
        planetsContainer.innerHTML = `
          <div class="api-error">
            <h3>Couldn't Load Planet Data</h3>
            <p>We're having trouble loading the planet information. Please try again later.</p>
            <p>Error: ${error.message}</p>
          </div>
        `
      }
    }
  })
  
  