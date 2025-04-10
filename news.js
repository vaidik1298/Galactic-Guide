// Space News functionality - Simplified
document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("space-news-container")
  const loadingSpinner = document.getElementById("news-loading-spinner")

  // Load news if on the news page
  if (newsContainer) {
    loadSpaceNews()

    // Set up filter buttons
    const filterButtons = document.querySelectorAll(".news-filter-btn")
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))

        // Add active class to clicked button
        this.classList.add("active")

        // Filter news
        const category = this.dataset.category
        filterNews(category)
      })
    })
  }

  // Function to load space news from data folder
  async function loadSpaceNews() {
    if (!newsContainer || !loadingSpinner) return

    try {
      // Show loading spinner
      loadingSpinner.style.display = "block"

      // Fetch news from the data folder
      const response = await fetch("../data/news-articles.json")

      if (!response.ok) {
        throw new Error(`Failed to load news data: ${response.status}`)
      }

      const newsArticles = await response.json()

      // Display the news
      renderNewsArticles(newsArticles)
    } catch (error) {
      console.error("Error loading space news:", error)

      // Display error message
      newsContainer.innerHTML = `
        <div class="api-error">
          <h3>Couldn't Load Space News</h3>
          <p>We're having trouble retrieving the latest space news. Please try again later.</p>
          <p>Error: ${error.message}</p>
        </div>
      `
    } finally {
      // Hide loading spinner
      loadingSpinner.style.display = "none"
    }
  }

  // Function to render news articles
  function renderNewsArticles(articles) {
    if (!newsContainer) return

    let newsHTML = ""

    articles.forEach((article) => {
      newsHTML += `
        <div class="news-card" data-category="${article.category}">
          <div class="news-image">
            <img src="${article.image}" alt="${article.title}">
          </div>
          <div class="news-content">
            <p class="news-date">${new Date(article.date).toLocaleDateString()}</p>
            <h4>${article.title}</h4>
            <p>${article.summary}</p>
            <a href="${article.url}" class="read-more-btn">Read More</a>
          </div>
        </div>
      `
    })

    newsContainer.innerHTML = newsHTML
  }

  // Function to filter news by category
  function filterNews(category) {
    if (!newsContainer) return

    const newsCards = newsContainer.querySelectorAll(".news-card")

    newsCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  }
})

