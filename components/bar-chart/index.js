'use strict';

import store from 'common/store';

class BarChart extends HTMLElement {
    attachedCallback() {
        store.subscribe(() => {
            const model = store.getState();
            
            if(model.cod === '200') {
                this.data = model.list.reduce((list, item, idx) => {
                    list.push({
                        label: idx,
                        high: item.temp.max
                    });
                    
                    return list;
                }, []);
                
                this.render();
            }
        });
    }
    
    render() {
        var svg = dimple.newSvg(this, 320, 400);
        var chart = new dimple.chart(svg, this.data);
        
        chart.addCategoryAxis('x', 'label');
        chart.addMeasureAxis('y', 'high');
        chart.addSeries(null, dimple.plot.bar);
        chart.draw();
    }
}

export default BarChart;