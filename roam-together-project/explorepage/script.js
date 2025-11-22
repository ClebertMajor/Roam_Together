function debugMethod(){
    console.log("test method called");
}
//francis - create html element class wrapper to make code cleaner and keep important data private
class HTMLElement {
  #element;
  #className;
  #id;
  #selector;
  static createElement(type, classname, selector = "", id = "", htmlsrc = ""){
    let domElement;
    try{
      domElement = document.createElement(type);
      domElement.className = classname;
      if(htmlsrc !==""){
        domElement.innerHTML=htmlsrc;
      }
      if(id !==""){
        domElement.id = id;
      }
    }catch(error){
      console.log(error);
    }
    if(domElement){
      return new HTMLElement(domElement, selector);
    }
  }
  static queryElement(selector){
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element "${selector}" not found`);
    return new HTMLElement(element, selector);
  }
  constructor(element, selector = ""){
    this.#element = element;
    if(!this.#element){
      throw new Error(`Element cannot be found in document.`);
    }
    this.#className = this.#element.className;
    //get the first class for the selector
    if(selector == ""){
      this.#selector = this.#className ? `.${this.#className.split(' ')[0]}` : '';
    }else{
      const testDomElement = document.querySelector(selector);
      if (!testDomElement) { this.#selector = this.#className ? `.${this.#className.split(' ')[0]}` : ''; }//if the selector doesnt select anything ignore stupid programmer
      else{ this.#selector = selector };
    }
    if(this.#element.id){
      this.#id = this.#element.id;
    }
  }
  isHidden(){
    return this.#element.style.display === 'none' || this.#element.hidden === true;
  }
  hide(){
    this.#element.style.display = 'none';
    this.#element.hidden = true;
  }
  show(){
    this.#element.style.display = '';
    this.#element.hidden = false;
  }
  getSelector(){
    return this.#selector;
  }
  setSelector(newSelector){
    this.#selector = newSelector;
  }
  getClassName(){
    return this.#className;
  }
  getID(){
    return this.#id;
  }
  setHTMLSrc(content) {
    this.#element.innerHTML = content;
  }
  setHTMLAttribute(attribute, data){
    this.#element.setAttribute(attribute, data);
  }
  setStyle(property, value) {
    this.#element.style[property] = value;
  }
  setClass(className) {
    this.#element.className = className;
  }
  listen(eventType, callback) {
    this.#element.addEventListener(eventType, callback);
  }
  ignore(eventType, callback) {
    this.#element.removeEventListener(eventType, callback);
  }
  getDOMElement(){
    return this.#element;
  }
}
//francis - create a card manager class that automatically imports and creates cards in the html
class CardManager{
    constructor(containerSelector = '.content-grid'){
        this.cards = [];   
        this.container = document.querySelector(containerSelector);
        this.#importJSON("users.json");
    }
    addCard(card){
        this.cards.push(card);
        if (this.container && card.element) {
            this.container.appendChild(card.element.getDOMElement());
        }
    }
    removeCard(index){
        if(index >= 0 && index < this.cards.length){
            this.cards.splice(index,1);
        }
    }
    getCard(index) {
        return this.cards[index];
    }
    async #importJSON(path){
        try {
            const response = await fetch(path);
            if(!response.ok){
                throw new Error(`Error while importing json file: ${response.status}`);
            }
            const carddata = await response.json();
            carddata.forEach(newCard => {
                this.addCard(new Card(newCard.cardname, newCard.destination, newCard.tags, newCard.hobbies, newCard.picture));
            })
        }catch(error){
            console.error("error whie importing user data from json file: ", error);
        }
    }
    //filter out cards based on filter preferences in search input box and filter menu
    filter(searchInputSelector, filterMenuSelector){
        const docSearchContainer = document.querySelector(searchInputSelector);
        const docFilterMenuContainer = document.querySelector(filterMenuSelector);
        // get which boxes are checked
        const activeBoxes = [...docFilterMenuContainer.querySelectorAll('input[type="checkbox"]:checked')]
        .map(cb => cb.value.toLowerCase());
        const allBoxes = docFilterMenuContainer.querySelectorAll('input[type="checkbox"]').length;
        const query = (docSearchContainer?.value || '').trim().toLowerCase();
        this.cards.forEach(card => {
            const cardTags = card.tags.toLowerCase().split(',').map(tag => tag.trim());
            //check if boxes have same categories as card tags
            const hasCategory = (activeBoxes.length === allBoxes) || cardTags.some(t => activeBoxes.includes(t));
            let hasQuery = true;
            if(query){
                const title = card.cardname.toLowerCase();
                const dest  = card.destination.toLowerCase();
                hasQuery = title.includes(query) || dest.includes(query);
            }
            const shouldHide = !(hasCategory && hasQuery);
            if(shouldHide){
              card.element.hide();
            }else{
              card.element.show();
            }
        });
    }
}
//francis - create card data structure to automate creation of card html source code
class Card {
    constructor(cardname = "", destination = "", tags = "", hobbies = "", picture = "Picture"){
        this.cardname = cardname;
        this.destination = destination; 
        this.tags = tags;
        this.hobbies = hobbies;
        this.picture = picture;
        this.element = HTMLElement.createElement("div", "content-card", "", "", this.HTMLSrc());
        this.element.setHTMLAttribute('data-tags', this.tags);
    }
    refreshElement(){
        if(!this.element){
            this.element = HTMLElement.createElement("div", "content-card", "", "", this.HTMLSrc());
            return;
        }
        this.element.setHTMLSrc(this.HTMLSrc());
    }
    HTMLSrc() {
        const htmlsrc = `
        <div class="picture-placeholder">${this.picture}</div>
        <div class="card-info">
            <h3>${this.cardname}</h3>
            <p class="destination-info">${this.destination}</p>
            <p class="short-info">${this.hobbies}</p>
        </div>
        `;
        return htmlsrc;
    }
}
//if these dont exist the program needs to crash its fatal and no recovery code can help
const cardManager = new CardManager();
const searchInput = HTMLElement.queryElement('.search-input');
const filterBtn = HTMLElement.queryElement('.filter-button');
const filterMenu = HTMLElement.queryElement('.filter-menu'); filterMenu.hide();
const menuBtn = HTMLElement.queryElement('.menu-button');
const menuDropdown = HTMLElement.queryElement('.menu-dropdown'); menuDropdown.hide();
//filter cards on search input
searchInput.listen('input', () => {
    cardManager.filter(searchInput.getSelector(), filterMenu.getSelector());
  });
//when the filter menu data changes, refilter cards
filterMenu.listen('change', () => {
  cardManager.filter(searchInput.getSelector(), filterMenu.getSelector());
});
//change directory of website depending on option;
menuDropdown.listen('click', (e) => {
  const target = e.target;
  switch(target.getAttribute('href')){
    case 'index.html':
      e.preventDefault();
      window.location.href = 'index.html';
      break;
    case 'about.html':
      e.preventDefault();
      window.location.href = 'about.html';
      break;
    case 'profile.html':
      e.preventDefault();
      window.location.href = 'profile.html';
      break;
    default:
      break;
  }
  menuDropdown.hide();
})
//close dropdowns and menus when clicking outside
document.addEventListener('click', (e) => {
  const target = e.target;
  const hideMenu = !(target.closest(menuBtn.getSelector()) || target.closest(menuDropdown.getSelector()));
  const hideFilter = !(target.closest(filterBtn.getSelector()) || target.closest(filterMenu.getSelector()));
  //cant have individual listeners for each button on click because of edge cases when pressing one button and the others menu is open
  if(!hideMenu){
    menuDropdown.show();
  }else{
    menuDropdown.hide();
  }
  if(!hideFilter){
    filterMenu.show();
  }else{
    filterMenu.hide();
  }
})
document.addEventListener('keydown', (e) => {
  menuDropdown.hide();
  filterMenu.hide();
});