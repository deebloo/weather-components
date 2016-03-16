'use strict';

import moment from 'moment';
import { formatDOW } from 'common/util';

class WeatherCard extends HTMLElement {
    // render the componenet when attached
    attachedCallback() {
        this.render();
    }
    
    // grab all attributes and use them to render the string template
    render() {
        var attrs = Array.prototype.slice.call(this.attributes);
		
		attrs = attrs.reduce((obj, attr) => {
        	obj[attr.name] = attr.value;
        	
        	return obj;
        }, {});

        this.innerHTML = this.renderString(attrs);
    }
    
    // determine the template for the day
    day(dow) {
        const today = formatDOW(moment());
        let display = dow;
        
        if(today === dow) {
            display = 'Today - ' + dow;
        } 
        
        return display;
    }
    
    // render the template to a string
    renderString(attrs) {
        const iconUrl = `http://openweathermap.org/img/w/${attrs.icon}.png`;
        const weatherType = attrs['weather-type'];
        
        return `
            <div class="animated zoomIn weather-card ${weatherType}">
                <div class="header">
                    <h2>${this.day(attrs['day-of-week'])}</h2>
                    
                    <img src="${iconUrl}" alt="weather icon ${weatherType}">
                    
                    <div style="clear:both"></div>
                </div>
                
                <div class="content">
                    <h3 class="cfx">${weatherType}</h3>
                    
                    <p class="temp-high">High: ${attrs['temp-high']}&deg;</p>
                    <p class="temp-low">Low: ${attrs['temp-low']}&deg;</p>
                    <p class="humidity">Humidity: ${attrs['humidity']}&#37;</p>
                    
                    <hr>
                    
                    <p class="description">${attrs.description}</p>
                </div>
            </div>
        `;
    }
}

export default WeatherCard;
