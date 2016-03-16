'use strict';

import store from 'common/store';

class WeatherHeader extends HTMLElement {
    attachedCallback() {
        this.render();
        
        store.subscribe(() => {
            const model = store.getState();
            
            if(model.cod === '200') {
                this.city = model.city.name;
                this.render();
            } 
        });
    }
    
    // set the innerHTML of the component
    render() {
        this.innerHTML = this.renderString(this.city);
    }
    
    // render the string template of the component
    renderString(city) {
        return `
            <div class="header-content">
                <h1>Weather for: ${city || '' }</h1>
                
                <search-weather></search-weather>  
            </div>  
            
            <error-message class="weather-header-error"></error-message>
        `;
    }
}

export default WeatherHeader;