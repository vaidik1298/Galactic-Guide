// Cosmic Scale functionality

document.addEventListener("DOMContentLoaded", () => {
  const cosmicScaleSlider = document.getElementById("cosmic-scale-slider")
  const scaleDescription = document.getElementById("scale-description")

  // Cosmic scale descriptions
  const scaleDescriptions = [
    "At the planetary scale, we observe worlds ranging from small rocky bodies like Mercury to gas giants like Jupiter. Earth, our home, is just one of billions of planets in our galaxy alone.",
    "Stars are massive balls of plasma held together by gravity. Our Sun is a medium-sized star that provides energy for life on Earth. The largest stars can be over 1,700 times the size of our Sun.",
    "Nebulae are vast clouds of gas and dust in space, often spanning hundreds of light-years. They are the birthplaces of stars and planetary systems.",
    "Galaxies are massive collections of stars, gas, dust, and dark matter. Our Milky Way contains hundreds of billions of stars and is just one of trillions of galaxies in the observable universe.",
    "The observable universe extends about 93 billion light-years in diameter and contains all matter and energy we can theoretically observe. Beyond this cosmic horizon lies the unknown.",
  ]

  // Function to update the description based on slider value
  function updateDescription() {
    if (!cosmicScaleSlider || !scaleDescription) return

    const value = Number.parseInt(cosmicScaleSlider.value)
    if (value >= 1 && value <= 5) {
      scaleDescription.textContent = scaleDescriptions[value - 1]
    }
  }

  // Initialize with first description
  if (cosmicScaleSlider && scaleDescription) {
    // Set initial value
    cosmicScaleSlider.value = 1 // Ensure it starts at 1
    updateDescription()

    // Add all possible event listeners for maximum compatibility
    cosmicScaleSlider.addEventListener("input", updateDescription)
    cosmicScaleSlider.addEventListener("change", updateDescription)
    cosmicScaleSlider.addEventListener("click", updateDescription)

    // Mobile touch events
    cosmicScaleSlider.addEventListener("touchstart", function () {
      // Add visual feedback
      this.classList.add("active-touch")
    })

    cosmicScaleSlider.addEventListener("touchmove", () => {
      updateDescription()
    })

    cosmicScaleSlider.addEventListener("touchend", function () {
      updateDescription()
      // Remove visual feedback
      this.classList.remove("active-touch")
    })

    // Ensure the slider works with mouse clicks anywhere on the track
    const scaleSliderContainer = document.querySelector(".scale-slider-container")
    if (scaleSliderContainer) {
      scaleSliderContainer.addEventListener("click", function (e) {
        // Only handle clicks on the container, not the slider itself
        if (e.target !== cosmicScaleSlider) {
          const containerWidth = this.offsetWidth
          const clickPosition = e.offsetX
          const newValue = Math.round((clickPosition / containerWidth) * 4) + 1 // 1-5 range
          cosmicScaleSlider.value = Math.max(1, Math.min(5, newValue))
          updateDescription()
        }
      })
    }
  }
})

