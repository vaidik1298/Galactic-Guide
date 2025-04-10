// Outer Space functionality - Simplified
document.addEventListener("DOMContentLoaded", () => {
  const spaceObjectsContainer = document.getElementById("space-objects-container")

  if (spaceObjectsContainer) {
    loadSpaceObjects()
  }

  // Function to load space objects from data folder
  async function loadSpaceObjects() {
    try {
      // Fetch space objects data from the data folder
      const response = await fetch("../data/space-objects.json")

      if (!response.ok) {
        throw new Error(`Failed to load space objects data: ${response.status}`)
      }

      const spaceObjects = await response.json()

      // Create HTML for space objects
      let objectsHTML = `
        <div class="outer-space-intro">
          <p>Beyond our solar system lies a vast cosmos filled with fascinating objects and phenomena. From the birth of stars in nebulae to the mysterious black holes, space is an endless frontier of discovery.</p>
        </div>
        <div class="categories-filter">
         <button class="category-btn active" data-category="all" 
  style="color: white; background-color: rgba(10, 10, 60, 0.8); 
           width: 100px; border: none; font-weight: bold; font-size: 16px;
           margin: 0 60px; cursor: pointer; padding: 10px 20px;
           border-radius: 12px; transition: all 0.3s ease;">All</button>

<button class="category-btn" data-category="Galaxy" 
  style="color: white; background-color: rgba(10, 10, 60, 0.8); 
           width: 100px; border: none; font-weight: bold; font-size: 16px;
           margin: 0 60px; cursor: pointer; padding: 10px 20px;
           border-radius: 12px; transition: all 0.3s ease">Galaxies</button>

<button class="category-btn" data-category="Nebula" 
  style="color: white; background-color: rgba(10, 10, 60, 0.8); 
           width: 100px; border: none; font-weight: bold; font-size: 16px;
           margin: 0 60px; cursor: pointer; padding: 10px 20px;
           border-radius: 12px; transition: all 0.3s ease;">Nebulae</button>

<button class="category-btn" data-category="Black Hole" 
  style="color: white; background-color: rgba(10, 10, 60, 0.8); 
           width: 140px; border: none; font-weight: bold; font-size: 16px;
           margin: 0 60px; cursor: pointer; padding: 10px 20px;
           border-radius: 12px; transition: all 0.3s ease">Black Holes</button>

        </div>
        <div class="space-objects-grid">
      `

      spaceObjects.forEach((object, index) => {
        objectsHTML += `
          <div class="space-object-card" data-object-index="${index}" data-category="${object.type}">
            <div class="space-object-image">
              <img src="${object.image}" alt="${object.name}">
            </div>
            <div class="space-object-content">
              <div class="space-object-type">${object.type}</div>
              <h3>${object.name}</h3>
              <p>${object.description.substring(0, 100)}...</p>
            </div>
          </div>
        `
      })

      objectsHTML += "</div>"

      // Add space object modal
      objectsHTML += `
        <div id="space-object-modal" class="modal">
          <div class="modal-content">
            <span class="close-button">&times;</span>
            <div id="space-object-modal-content">
              <!-- Space object details will be inserted here -->
            </div>
          </div>
        </div>
      `

      // Insert HTML
      spaceObjectsContainer.innerHTML = objectsHTML

      // Add event listeners to space object cards
      const objectCards = document.querySelectorAll(".space-object-card")
      const objectModal = document.getElementById("space-object-modal")
      const objectModalContent = document.getElementById("space-object-modal-content")
      const closeButton = document.querySelector("#space-object-modal .close-button")
      const categoryButtons = document.querySelectorAll(".category-btn")

      // Filter functionality
      categoryButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons
          categoryButtons.forEach((btn) => btn.classList.remove("active"))

          // Add active class to clicked button
          this.classList.add("active")

          const category = this.dataset.category

          // Filter cards
          objectCards.forEach((card) => {
            if (category === "all" || card.dataset.category === category) {
              card.style.display = "block"
            } else {
              card.style.display = "none"
            }
          })
        })
      })

      objectCards.forEach((card) => {
        card.addEventListener("click", function () {
          const objectIndex = Number.parseInt(this.dataset.objectIndex)
          const spaceObject = spaceObjects[objectIndex]

          // Populate modal with space object details
          objectModalContent.innerHTML = `
            <div class="planet-modal-content">
              <div class="planet-modal-image">
                <img src="${spaceObject.image}" alt="${spaceObject.name}">
              </div>
              <div class="planet-modal-details">
                <div class="space-object-type">${spaceObject.type}</div>
                <h2>${spaceObject.name}</h2>
                <p>${spaceObject.description}</p>
                <div class="planet-modal-stats">
                  <div class="planet-modal-stat">
                    <h4>Distance from Earth</h4>
                    <p>${spaceObject.distance}</p>
                  </div>
                  <div class="planet-modal-stat">
                    <h4>Size</h4>
                    <p>${spaceObject.size}</p>
                  </div>
                  <div class="planet-modal-stat">
                    <h4>Interesting Fact</h4>
                    <p>${spaceObject.interesting_fact}</p>
                  </div>
                </div>
              </div>
            </div>
          `

          // Show modal
          objectModal.style.display = "block"
        })
      })

      // Close modal when clicking the close button
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          objectModal.style.display = "none"
        })
      }

      // Close modal when clicking outside
      window.addEventListener("click", (event) => {
        if (event.target === objectModal) {
          objectModal.style.display = "none"
        }
      })
    } catch (error) {
      console.error("Error loading space objects:", error)
      spaceObjectsContainer.innerHTML = `
        <div class="api-error">
          <h3>Couldn't Load Space Objects Data</h3>
          <p>We're having trouble loading the space objects information. Please try again later.</p>
          <p>Error: ${error.message}</p>
        </div>
      `
    }
  }
})

