'use strict';

import store from 'common/store';

class ErrorMessage extends HTMLElement {
    attachedCallback() {
        this.message = '';
        
        store.subscribe(() => {
            const model = store.getState();
            
            if(model.cod !== '200') {
                this.message = model.message;
                this.render();
            } else {
                this.cleanUp();
            }
        });
    }
    
    render() {
        this.innerHTML = this.renderString(this.message);
    }
    
    cleanUp() {
        this.innerHtml = '';
    }
    
    renderString(msg) {
        return `
            <div class="error-message animated bounceInDown">${msg} - please try again</div>
        `;
    }
}

export default ErrorMessage;
