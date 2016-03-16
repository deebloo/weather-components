'use strict';

import searchWeather from 'common/search-weather';

class SearchWeather extends HTMLElement {
    attachedCallback() {
        this.render();
        this.searchBox = document.querySelector('input[name=search-weather]');
        
        this.addEventListener('submit', e => this.search(e));
    }
    
    search(e) {
         e.preventDefault();
            
         const value = this.searchBox.value;
            
         searchWeather(value);
    }
    
    render() {
        this.innerHTML = this.renderString();
    }
    
    renderString(dflt) {
        return `
            <form class="search-weather">
                <input type="text" name="search-weather" placeholder="City, State" value="${dflt || ''}">
            </form>
        `;
    }
}

export default SearchWeather;
