///<reference path="typings/globals/jquery/index.d.ts" />
import $ = require("jquery");
import * as ext from './IBarExtension'
import fs = require("fs");


// import c = require("./Extensions/Clock");
console.log("In Renderer");
fs.readdirSync("./Extensions").forEach((value, index, list) => {
    console.log(value.substr(value.lastIndexOf('.'), value.length));
    console.log("found: " + value);
    debugger;
    var l = new (require("./Extensions/" + value)).default("./Extensions/"+value) as ext.IBarExtension;
    l.BuildElements(100, 20, document.getElementById("t"));
});

