//dont worry about exposing your API key, it is bad practice and generally not advised, but for now it really doesn't matter, Google ensures only the authorized users can access api keys
import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAfd1oBBjsbFvm_ZeLflvyp59bQIx_L_lI",
    authDomain: "rpham-portfolio.firebaseapp.com",
    databaseURL: "https://rpham-portfolio.firebaseio.com",
  };
 firebase.initializeApp(config)
export default config;

