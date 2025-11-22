class TravelStyleDropdown extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="search-col">
        <label for="search-style">Travel style</label>
        <select id="search-style" name="style">
          <option value="" selected disabled>Select style</option>
          <option value="solo">Solo, independent</option>
          <option value="chill">Chill & beachy</option>
          <option value="adventure">Adventure & outdoors</option>
          <option value="luxury">Luxury & bougie</option>
          <option value="budget">Budget & backpacking</option>
          <option value="food">Food & culture focused</option>
        </select>
      </div>
    `;
  }
}

customElements.define('travel-style-dropdown', TravelStyleDropdown);
