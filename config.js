// Change PROD_ENV to true before uploading the app
const PROD_ENV = false

// Variables according to environment
var URL                  = null
var Destinations_Img_Dir = null
var Service_Img_Dir      = null
var Hotels_Img_Dir       = null

// Set variables
if (PROD_ENV) {
    console.log          (' --- PRODUCTION ENVIRONMENT ---')
    URL                  = 'http://my.twenty-one.co/'
    Destinations_Img_Dir = '/home/roomier/twenty-one-cms/public/uploads/destinations/'
    Service_Img_Dir      = '/home/roomier/twenty-one-cms/public/uploads/services/'
    Hotels_Img_Dir       = '/home/roomier/twenty-one-cms/public/uploads/hotels/'
}

else {
    console.log          (' --- DEVELOPMENT ENVIRONMENT ---')
    URL                  = 'http://localhost:3000/'
    Destinations_Img_Dir = 'public/uploads/destinations/'
    Service_Img_Dir      = 'public/uploads/services/'
    Hotels_Img_Dir       = 'public/uploads/hotels/'
}

// Export Variables
module.exports = {
    URL                  : URL,
    URL_FOR_USERS        : URL + 'users',
    URL_FOR_DESTINATIONS : URL + 'destinations',
    URL_FOR_SERVICES     : URL + 'services',
    URL_FOR_HOTELS       : URL + 'hotels',
    DESTINATIONS_IMG_DIR : Destinations_Img_Dir,
    SERVICE_IMG_DIR      : Service_Img_Dir,
    HOTELS_IMG_DIR       : Hotels_Img_Dir
}
