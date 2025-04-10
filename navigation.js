// Navigation functionality

document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu functionality
  const menuBtn = document.getElementById("menu-btn")
  const closeMenuBtn = document.getElementById("close-menu-btn")
  const mobileMenu = document.getElementById("mobile-menu")

  if (menuBtn && mobileMenu && closeMenuBtn) {
    // Open mobile menu
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("active")
      document.body.style.overflow = "hidden" // Prevent scrolling when menu is open
    })

    // Close mobile menu
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      document.body.style.overflow = "" // Re-enable scrolling
    })

    // Close menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav .nav-link")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active")
        document.body.style.overflow = "" // Re-enable scrolling
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        mobileMenu.classList.contains("active") &&
        !event.target.closest(".mobile-menu-content") &&
        !event.target.closest(".menu-btn")
      ) {
        mobileMenu.classList.remove("active")
        document.body.style.overflow = "" // Re-enable scrolling
      }
    })
  }

  // Highlight current page in navigation
  const currentPage = window.location.pathname
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href")

    // Check if the current page matches the link
    if (
      currentPage === linkPath ||
      (currentPage.includes(linkPath) && linkPath !== "/" && linkPath !== "/index.html") ||
      (currentPage === "/" && linkPath === "/index.html") ||
      (currentPage === "/index.html" && linkPath === "/")
    ) {
      link.classList.add("active")
    }
  })
})

