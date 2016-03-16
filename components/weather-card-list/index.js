'use strict';

import searchWeather from 'common/search-weather';
import store from 'common/store';
import moment from 'moment';
import { formatDOW } from 'common/util';

class WeatherCard extends HTMLElement {
    attachedCallback() {
        this.city = '';
        this.cardList = [];
        
        // subscribe to the store for search results
        store.subscribe(() => {
            this.resetDays();
            
            const model = store.getState();
            
            if(model.cod === '200') {
                this.city = model.city.name;
                this.cardList = model.list.reduce((list, item) => this.reduceCard(list, item), []);
            } else {
                this.cardList = [];
            }
            
            this.render();
        });
        
        searchWeather('Arlington, VA');
    }
    
    // set the days back to a day before today
    resetDays() {
        this.today = moment().subtract(1, 'day'); 
    }
    
    // take results and build a new weather card
    reduceCard(list, item) {
        let weather = item.weather[0];
        this.today = this.today.add(1, 'day');
        
        list.push(`
            <weather-card 
                weather-type="${weather.main}" 
                description="${weather.description}" 
                icon="${weather.icon}"
                temp-high="${item.temp.max}"
                temp-low="${item.temp.min}"
                humidity="${item.humidity}"
                day-of-week="${formatDOW(this.today)}">
            </weather-card>
        `);
        
        return list;
    }
    
    // set the innerHTML of the component
    render() {
        this.innerHTML = this.renderString();
    }
    
    // render the string template of the component
    renderString() {
        return `
            <div class="list">
                ${this.cardList.join('')}
            </div>
        `;
    }
}

export default WeatherCard;
