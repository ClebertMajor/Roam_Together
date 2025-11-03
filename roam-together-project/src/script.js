const searchInput = document.querySelector('.search-input');   // the text box
const cards = document.querySelectorAll('.content-card');      // all cards on the page

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();               // what the user typed
  cards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const destination = card.querySelector('.destination-info').textContent.toLowerCase();

    // check if query appears in either field
    if (title.includes(query) || destination.includes(query)) {
      card.style.display = 'block';    // show card
    } else {
      card.style.display = 'none';     // hide card
    }
  });
});


// --- filter logic for explore page ---

// find elements on the page
const filterBtn  = document.querySelector('.filter-button');
const filterMenu = document.querySelector('.filter-menu');


// toggle the dropdown when the Filter button is clicked
filterBtn.addEventListener('click', () => {
  filterMenu.hidden = !filterMenu.hidden;
});

// close the dropdown when clicking outside it
document.addEventListener('click', (e) => {
  const inside = e.target.closest('.filter-menu') || e.target.closest('.filter-button');
  if (!inside) filterMenu.hidden = true;
});

// update filters when checkboxes change
filterMenu.addEventListener('change', applyFilters);

// update filters as you type in search bar (optional)
searchInput?.addEventListener('input', applyFilters);

// the main filter function
function applyFilters() {
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