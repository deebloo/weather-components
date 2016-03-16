
import request from 'superagent';
import store from 'common/store';

/**
 * builds the api url
 */
const getAPi = cityState => {
    return `http://api.openweathermap.org/data/2.5/forecast/daily?appid=585e670f55ee9b114fa2f1f2731177d9&q=${cityState}&units=imperial&cnt=5`;
}

/**
 * either send an error or dispatch the search event on the store
 */
const manageResponse = (err, res) => {
    const type = 'searchWeather';

    if(err) {
        store.dispatch({
            type,
            data: {
                message: err
            }
        });

        return;
    }

    store.dispatch({
        type,
        data: res.body
    });
}

/**
 * Make Ajax request for weather
 */
export default location => {
    request
        .get(getAPi(location))
        .end(manageResponse);
}
