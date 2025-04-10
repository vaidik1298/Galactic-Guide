// Main JavaScript file

document.addEventListener("DOMContentLoaded", () => {
  // Initialize API calls on home page
  const isHomePage = document.querySelector(".home-page")
  if (isHomePage) {
    // Load NASA APOD
    if (typeof window.fetchNASAAPOD === "function") {
      window.fetchNASAAPOD()
    }

    // Load astronomical events
    if (typeof window.fetchAstronomicalEvents === "function") {
      window.fetchAstronomicalEvents()
    }

    // Load SpaceX launches
    if (typeof window.fetchSpaceXLaunches === "function") {
      window.fetchSpaceXLaunches()
    }
  }

  // Initialize modals
  initModals()
})

// Initialize modal functionality
function initModals() {
  // Get all modals
  const modals = document.querySelectorAll(".modal")

  // Add event listeners to close modals when clicking outside
  modals.forEach((modal) => {
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none"
      }
    })

    // Add event listeners to close buttons
    const closeButton = modal.querySelector(".close-button")
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        modal.style.display = "none"
      })
    }
  })
}

// Function to check if an element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      })
    }
  })
})
async function sendMessage() {
  const input = document.getElementById('userInput').value;
  const responseDiv = document.getElementById('response');
  if (!input) {
    responseDiv.innerHTML = 'Please enter a message.';
    return;
  }

  responseDiv.innerHTML = 'Loading...';

  try {
    const response = await fetch('http://localhost:3000/askai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    const data = await response.json();
    console.log(data);
    responseDiv.innerHTML = marked.parse(data.message);
  } catch (error) {
    responseDiv.innerHTML = 'Error: ' + error.message;
  }
}
