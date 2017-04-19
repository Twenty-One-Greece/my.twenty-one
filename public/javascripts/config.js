// Change PROD_ENV to true before uploading the app
const PROD_ENV = true

// Variables according to environment
export var URL

// Set variables
if (PROD_ENV) {
    URL = 'http://my.twenty-one.co/'
    console.log('PRODUCTION ENVIRONMENT ----- ' + URL)
} else {
    URL = 'http://localhost:3000/'
    console.log('DEVELOPMENT ENVIRONMENT ----- ' + URL)
}

export const URL_FOR_USERS = URL + 'users'
export const URL_FOR_HOME = URL + 'home'
export const URL_FOR_DESTINATIONS = URL + 'destinations'
export const URL_FOR_SERVICES = URL + 'services'
export const URL_FOR_HOTELS = URL + 'hotels'ß