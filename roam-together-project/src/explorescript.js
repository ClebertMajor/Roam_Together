// ---------- helpers to reliably show/hide even if CSS fights hidden ----------
function show(el) {
  if (!el) return;
  el.hidden = false;           // for semantics
  el.style.display = '';       // let CSS decide (or default)
}
function hide(el) {
  if (!el) return;
  el.hidden = true;            // for semantics
  el.style.display = 'none';   // hard‐hide, overrides CSS display
}

// ---------- search ----------
const searchInput = document.querySelector('.search-input');   // the text box
const cards = document.querySelectorAll('.content-card');      // all cards on the page

searchInput?.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();               // what the user typed
  cards.forEach(card => {
    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
    const destination = card.querySelector('.destination-info')?.textContent.toLowerCase() || '';

    // check if query appears in either field
    if (title.includes(query) || destination.includes(query)) {
      card.style.display = 'block';    // show card
    } else {
      card.style.display = 'none';     // hide card
    }
  });
});


// ---------- filter logic for explore page ----------
const filterBtn  = document.querySelector('.filter-button');
const filterMenu = document.querySelector('.filter-menu');

// toggle the dropdown when the Filter button is clicked
filterBtn?.addEventListener('click', (e) => {
  e.stopPropagation(); // don't trigger document click
  if (filterMenu.hidden || filterMenu.style.display === 'none') {
    show(filterMenu);
  } else {
    hide(filterMenu);
  }
});

// close the dropdown when clicking outside it
document.addEventListener('click', (e) => {
  const inside = e.target.closest('.filter-menu') || e.target.closest('.filter-button');
  if (!inside) hide(filterMenu);
});

// update filters when checkboxes change
filterMenu?.addEventListener('change', applyFilters);

// update filters as you type in search bar (optional)
searchInput?.addEventListener('input', applyFilters);

// the main filter function
function applyFilters() {
  if (!filterMenu) return;

  // which boxes are checked
  const active = [...filterMenu.querySelectorAll('input[type="checkbox"]:checked')]
    .map(cb => cb.value.toLowerCase());

  const allBoxes = filterMenu.querySelectorAll('input[type="checkbox"]').length;
  const q = (searchInput?.value || '').trim().toLowerCase();

  // loop through all cards and decide which to show
  cards.forEach(card => {
    const tags = (card.dataset.tags || '')
      .toLowerCase()
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // category check: show all if all boxes checked, otherwise only matching tags
    const byCategory = (active.length === allBoxes) || tags.some(t => active.includes(t));

    // optional search check (name or destination)
    let bySearch = true;
    if (q) {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const dest  = card.querySelector('.destination-info')?.textContent.toLowerCase() || '';
      bySearch = title.includes(q) || dest.includes(q);
    }

    // show or hide card
    card.style.display = (byCategory && bySearch) ? 'block' : 'none';
  });
}

// run once when the page first loads
applyFilters();


// ---------- 3-line menu dropdown (works + goes back/home.html) ----------
const menuBtn = document.querySelector('.menu-button');
const menuDropdown = document.querySelector('.menu-dropdown');

// toggle the dropdown when the menu button is clicked
menuBtn?.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent closing immediately
  if (menuDropdown.hidden || menuDropdown.style.display === 'none') {
    show(menuDropdown);
  } else {
    hide(menuDropdown);
  }
});

// handle clicks inside the dropdown menu
menuDropdown?.addEventListener('click', (e) => {
  const target = e.target;

  // if the user clicks a "Back" option in the dropdown
  if (target.matches('[data-action="back"]')) {
    e.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "home.html"; // 👈 your homepage
    }
  }

  // after any click inside, close the dropdown
  hide(menuDropdown);
});

// close dropdown when clicking outside
document.addEventListener('click', (e) => {
  const insideMenu = e.target.closest('.menu-button') || e.target.closest('.menu-dropdown');
  if (!insideMenu) hide(menuDropdown);

  const insideFilter = e.target.closest('.filter-button') || e.target.closest('.filter-menu');
  if (!insideFilter) hide(filterMenu);
});

// close both dropdowns on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hide(menuDropdown);
    hide(filterMenu);
  }
});

// close both dropdowns when clicking outside
document.addEventListener('click', (e) => {
  const insideMenu = e.target.closest('.menu-button') || e.target.closest('.menu-dropdown');
  if (!insideMenu) hide(menuDropdown);

  const insideFilter = e.target.closest('.filter-button') || e.target.closest('.filter-menu');
  if (!insideFilter) hide(filterMenu);
});

// optional: close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hide(menuDropdown);
    hide(filterMenu);
  }
});
