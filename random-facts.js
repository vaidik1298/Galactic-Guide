// Random Space Facts Functionality - Simplified
document.addEventListener("DOMContentLoaded", () => {
  // Load random fact on home page
  const randomFactContainer = document.getElementById("random-fact")
  if (randomFactContainer) {
    loadRandomFact()
  }
})

// Function to load a random space fact from data folder
async function loadRandomFact() {
  const factContainer = document.getElementById("random-fact")
  if (!factContainer) return

  try {
    // Fetch facts from the data folder
    const response = await fetch("data/space-facts.json")

    if (!response.ok) {
      throw new Error(`Failed to load facts data: ${response.status}`)
    }

    const facts = await response.json()

    // Get a random fact
    const randomIndex = Math.floor(Math.random() * facts.length)
    const fact = facts[randomIndex]

    // Display the fact
    factContainer.innerHTML = `
      <h3>Did You Know?</h3>
      <div class="fact-content">
        <p>${fact}</p>
        <button id="new-fact-btn" class="btn secondary-btn">Another Fact</button>
      </div>
    `

    // Add event listener to the button
    const newFactBtn = document.getElementById("new-fact-btn")
    if (newFactBtn) {
      newFactBtn.addEventListener("click", loadRandomFact)
    }
  } catch (error) {
    console.error("Error loading facts:", error)
    factContainer.innerHTML = `
      <h3>Did You Know?</h3>
      <div class="fact-content">
        <p>There are more stars in the universe than grains of sand on all the beaches on Earth.</p>
        <p class="error-message">Could not load more facts: ${error.message}</p>
      </div>
    `
  }
}

// Make function available globally
window.loadRandomFact = loadRandomFact

