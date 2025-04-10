// Space Exploration functionality - Simplified
document.addEventListener("DOMContentLoaded", () => {
  const explorationContainer = document.getElementById("exploration-container")

  if (explorationContainer) {
    loadExplorationContent()
  }

  // Function to load space exploration content from data folder
  async function loadExplorationContent() {
    try {
      // Fetch timeline data from the data folder
      const timelineResponse = await fetch("../data/timeline-events.json")

      if (!timelineResponse.ok) {
        throw new Error(`Failed to load timeline data: ${timelineResponse.status}`)
      }

      const timelineEvents = await timelineResponse.json()

      // Fetch missions data from the data folder
      const missionsResponse = await fetch("../data/missions.json")

      if (!missionsResponse.ok) {
        throw new Error(`Failed to load missions data: ${missionsResponse.status}`)
      }

      const currentMissions = await missionsResponse.json()

      // Create HTML for timeline
      let explorationHTML = `
        <div class="exploration-intro">
          <p>Humanity's journey to the stars has been one of our greatest adventures. From the first satellite to the International Space Station, from the Moon landings to rovers on Mars, we continue to push the boundaries of what's possible.</p>
        </div>
        
        <h3>History of Space Exploration</h3>
        <div class="timeline">
      `

      timelineEvents.forEach((event) => {
        explorationHTML += `
          <div class="timeline-item">
            <div class="timeline-content">
              <div class="timeline-date">${event.date}</div>
              <h3>${event.title}</h3>
              <p>${event.description}</p>
            </div>
          </div>
        `
      })

      explorationHTML += `
        </div>
        
        <h3>Current Missions</h3>
        <div class="mission-grid">
      `

      currentMissions.forEach((mission) => {
        explorationHTML += `
          <div class="mission-card">
            <div class="mission-image">
              <img src="${mission.image}" alt="${mission.name}">
            </div>
            <div class="mission-content">
              <div class="mission-agency">${mission.agency}</div>
              <h3>${mission.name}</h3>
              <p class="mission-date">Launched: ${mission.launched}</p>
              <p>${mission.description.substring(0, 120)}...</p>
              <p><strong>Status:</strong> ${mission.status}</p>
            </div>
          </div>
        `
      })

      explorationHTML += `
        </div>
        
        <h3>Future of Space Exploration</h3>
        <div class="cosmic-scale">
          <p>The future of space exploration is incredibly exciting, with plans for human missions to Mars, establishing a permanent presence on the Moon, and sending probes to explore the outer planets and their moons in search of life.</p>
          
          <p>Private companies like SpaceX, Blue Origin, and Virgin Galactic are revolutionizing access to space, while government agencies continue to push the boundaries of what's possible.</p>
        </div>
      `

      // Insert HTML
      explorationContainer.innerHTML = explorationHTML
    } catch (error) {
      console.error("Error loading exploration content:", error)
      explorationContainer.innerHTML = `
        <div class="api-error">
          <h3>Couldn't Load Space Exploration Data</h3>
          <p>We're having trouble loading the space exploration information. Please try again later.</p>
          <p>Error: ${error.message}</p>
        </div>
      `
    }
  }
})

