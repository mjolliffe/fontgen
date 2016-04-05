# FontGen
Google Fonts Randomizer

![Alt text](/public/assets/images/fontgen_profiles.gif?raw=true "Optional Title")

#Technologies
- FontGen is a MEAN stack app running Mongo/Express/Node on the server side and Angular on the client side. Angular UI Router was used to perform frontend routing.
- APIs: Calls made to the Google Fonts API are done so through Angular via an http request. Calls made for user and stored font pair information are made through Angular via a service which performs an http request. This request is sent to the backend and information is then retrieved from the Mongo database and sent back to the frontend.
- Bootstrap and Sass were used to style the page in an unobtrusive manner so as to retain the importance of the principle functionality of the site: to pair fonts.

#Purpose & Approach
The purpose of creating this website is to help users discover font pairs through a random generation of fonts gathered via the Google Font API. In approaching the issue of font pairing, it seemed most logical to begin with the well-established Google Font API as a starting source. In future iterations of the app, I would like to inclue other curated font libraries, such as Adobe Typekit as well as lesser known libraries in order to expose the breadth of quality fonts available for free and for sale.

#Installation
Run npm install within the root folder in order to take care of all the required dependencies.

#Issues/Pending Implementations
- Small bugs: User is not logged out on front end when they are deleted - CORS issue also arises when user deletd. Minor styling issues. 
- Pending: Include alerts/messages for the user when they successfully create, update, or delete their accounts and for when font pairs are saved. Add a "popular pairs" board which users contribute to and vote on. Improve UX.
