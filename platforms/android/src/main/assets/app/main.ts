// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";
import firebase = require("nativescript-plugin-firebase");

platformNativeScriptDynamic().bootstrapModule(AppModule);

firebase.init({
    //persist should be set to false as otherwise numbers aren't returned during livesync

    persist: false,
    storageBucket: 'gs://medicine-392e0.appspot.com',    
  }).then(
    function (instance) {
      console.log("firebase.init done");
    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);
