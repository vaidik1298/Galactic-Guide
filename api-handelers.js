// API Handlers

// NASA APOD API
async function fetchNASAAPOD() {
  const apodContainer = document.getElementById("nasa-apod")
  const loadingSpinner = document.getElementById("apod-loading-spinner")

  if (!apodContainer) return

  try {
    // Show loading spinner
    if (loadingSpinner) loadingSpinner.style.display = "block"

    // Fetch APOD data from the data folder
    const response = await fetch("./../data/apod.json")

    if (!response.ok) { 
      throw new Error(`Failed to load APOD data: ${response.status}`)
    }

    const data = await response.json()
    // Display the APOD data
    apodContainer.innerHTML = `
            <div class="apod-content">
                <div class="apod-image">
                    <img src="../website_image.jpeg" alt="${data.title}">
                </div>
                <h3>${data.title} hello</h3>
                <p class="apod-date">${new Date(data.date).toLocaleDateString()}</p>
                <p>${data.explanation.substring(0, 150)}...</p>
                <button class="btn primary-btn view-apod-btn" data-title="${data.title}" data-date="${data.date}" data-explanation="${data.explanation}" data-url="${data.url}">View Full Image</button>
            </div>
        `

    // Add event listener to the view button
    const viewBtn = apodContainer.querySelector(".view-apod-btn")
    if (viewBtn) {
      viewBtn.addEventListener("click", function () {
        openAPODModal(this.dataset)
      })
    }
  } catch (error) {
    console.error("Error fetching NASA APOD:", error)

    // Display error message and fallback content
    apodContainer.innerHTML = `
            <div class="api-error">
                <h3>Couldn't Load NASA Image of the Day</h3>
                <p>We're having trouble loading the image data. Please try again later.</p>
                <p>Error: ${error.message}</p>
                <div class="fallback-image">
                    <img src="../images/fallback-apod.jpg" alt="Space Image Placeholder">
                    <p>A beautiful view of the cosmos awaits...</p>
                </div>
            </div>
        `
  } finally {
    // Hide loading spinner
    if (loadingSpinner) loadingSpinner.style.display = "none"
  }
}

// Astronomical Events API
async function fetchAstronomicalEvents() {
  const eventsContainer = document.getElementById("astronomical-events")
  const loadingSpinner = document.getElementById("events-loading-spinner")

  if (!eventsContainer) return

  try {
    // Show loading spinner
    if (loadingSpinner) loadingSpinner.style.display = "block"

    // Fetch events from the data folder
    const response = await fetch("./../data/astronomical-events.json")

    if (!response.ok) {
      throw new Error(`Failed to load events data: ${response.status}`)
    }

    const events = await response.json()

    // Display the events
    let eventsHTML = ""

    events.forEach((event) => {
      const eventDate = new Date(event.date)
      eventsHTML += `
                <div class="event-card">
                    <p class="event-date">${eventDate.toLocaleDateString()}</p>
                    <h4>${event.title}</h4>
                    <p>${event.description}</p>
                </div>
            `
    })

    eventsContainer.innerHTML = eventsHTML
  } catch (error) {
    console.error("Error fetching astronomical events:", error)

    // Display error message
    eventsContainer.innerHTML = `
            <div class="api-error">
                <h3>Couldn't Load Astronomical Events</h3>
                <p>We're having trouble retrieving the latest astronomical events. Please try again later.</p>
                <p>Error: ${error.message}</p>
            </div>
        `
  } finally {
    // Hide loading spinner
    if (loadingSpinner) loadingSpinner.style.display = "none"
  }
}

// SpaceX Launches API
async function fetchSpaceXLaunches() {
  const launchesContainer = document.getElementById("spacex-launches")
  const loadingSpinner = document.getElementById("launches-loading-spinner")

  if (!launchesContainer) return

  try {
    // Show loading spinner
    if (loadingSpinner) loadingSpinner.style.display = "block"

    // Fetch launches from the data folder
    const response = await fetch("./../data/spacex-launches.json")

    if (!response.ok) {
      throw new Error(`Failed to load launches data: ${response.status}`)
    }

    const launches = await response.json()

    // Display the launches (limit to 3)
    let launchesHTML = ""

    launches.slice(0, 3).forEach((launch) => {
      const launchDate = new Date(launch.date)
      launchesHTML += `
                <div class="launch-card">
                    <p class="launch-date">${launchDate.toLocaleDateString()}</p>
                    <h4>${launch.name}</h4>
                    <p>${launch.details || "No details available for this mission yet."}</p>
                </div>
            `
    })

    launchesContainer.innerHTML = launchesHTML
  } catch (error) {
    console.error("Error fetching SpaceX launches:", error)

    // Display error message and fallback content
    launchesContainer.innerHTML = `
            <div class="api-error">
                <h3>Couldn't Load SpaceX Launches</h3>
                <p>We're having trouble loading the launch data. Please try again later.</p>
                <p>Error: ${error.message}</p>
                
                <!-- Fallback content -->
                <div class="launch-card">
                    <p class="launch-date">Upcoming</p>
                    <h4>Starship Test Flight</h4>
                    <p>SpaceX continues development of their next-generation spacecraft.</p>
                </div>
            </div>
        `
  } finally {
    // Hide loading spinner
    if (loadingSpinner) loadingSpinner.style.display = "none"
  }
}

// Function to open APOD modal
function openAPODModal(data) {
  const modal = document.getElementById("apod-modal")
  if (!modal) return

  const modalContent = modal.querySelector(".modal-content")
  if (!modalContent) return

  modalContent.innerHTML = `
        <span class="close-button">&times;</span>
        <h3>${data.title}</h3>
        <p class="apod-date">${new Date(data.date).toLocaleDateString()}</p>
        <div class="apod-image" style="height: auto; max-height: 500px;">
            <img src="${data.url}" alt="${data.title}" style="object-fit: contain;">
        </div>
        <p>${data.explanation}</p>
    `

  // Show the modal
  modal.style.display = "block"

  // Add event listener to close button
  const closeButton = modalContent.querySelector(".close-button")
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.style.display = "none"
    })
  }

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })
}

// Export functions
window.fetchNASAAPOD = fetchNASAAPOD
window.fetchAstronomicalEvents = fetchAstronomicalEvents
window.fetchSpaceXLaunches = fetchSpaceXLaunches

