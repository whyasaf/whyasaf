

document.addEventListener("DOMContentLoaded", () => {

  const breadcrumbBtns = document.querySelectorAll(".breadcrumb-btn");
  const filtersPanel = document.getElementById("filtersPanel");
  const searchPanel = document.getElementById("searchPanel");


  const filterTags = document.querySelectorAll(".filter-tag");
  const searchInput = document.getElementById("blogSearchInput");
  const cards = document.querySelectorAll(".arch-card");
  

  let currentFilter = "all";
  let currentSearch = "";


  breadcrumbBtns.forEach(btn => {
    btn.addEventListener("click", () => {

      breadcrumbBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const view = btn.dataset.view;
      const toggle = btn.dataset.toggle;


      if (filtersPanel) filtersPanel.classList.remove("active");
      if (searchPanel) searchPanel.classList.remove("active");


      if (toggle === "filters" && filtersPanel) {
        filtersPanel.classList.add("active");
      } else if (toggle === "search" && searchPanel) {
        searchPanel.classList.add("active");
        setTimeout(() => searchInput && searchInput.focus(), 100);
      }
    });
  });


  function applyFilters() {
    const searchLower = currentSearch.toLowerCase();

    cards.forEach(card => {

      const category = card.dataset.category || "";
      const titleElem = card.querySelector(".arch-card-title");
      const locationElem = card.querySelector(".arch-card-location");
      
      const titleStr = titleElem ? titleElem.textContent.toLowerCase() : "";
      const locationStr = locationElem ? locationElem.textContent.toLowerCase() : "";


      const matchCategory = (currentFilter === "all" || category === currentFilter);
      const matchSearch = (searchLower === "" || titleStr.includes(searchLower) || locationStr.includes(searchLower));

      if (matchCategory && matchSearch) {

        if (card.style.display === "none") {
          card.style.display = "";

          void card.offsetWidth;
        }
        card.style.opacity = "1";
        card.style.transform = "translateY(0) scale(1)";
        card.style.pointerEvents = "auto";
      } else {

        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";
        card.style.pointerEvents = "none";
        

        setTimeout(() => {
          if (card.style.opacity === "0") {
            card.style.display = "none";
          }
        }, 400);
      }
    });
  }


  if (filterTags) {
    filterTags.forEach(tag => {
      tag.addEventListener("click", () => {
        filterTags.forEach(t => t.classList.remove("active"));
        tag.classList.add("active");
        currentFilter = tag.dataset.filter;
        applyFilters();
      });
    });
  }


  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim();
      applyFilters();
    });
  }


  const observerOptions = {
    threshold: 0.08,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    observer.observe(card);
  });
});
