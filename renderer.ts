///<reference path="typings/globals/jquery/index.d.ts" />
import $ = require("jquery");
import * as ext from './IBarExtension'
import fs = require("fs");
import electron = require("electron");


let layout: Layout;
let extensions: ExtensionLoader[] = [];
let totalWidth: number;

function getLayout(): void {
    layout = JSON.parse(fs.readFileSync("layout.json", "ascii"));
    let window = electron.remote.getCurrentWindow();
    totalWidth = window.getSize()[0];
    window.setSize(totalWidth, layout.barheight);
    layout.extensions.forEach(e => {
        extensions.push({
            name: e.name,
            height: (layout.barheight / layout.rows) * e.rowSpan,
            width: ((totalWidth / layout.columns) * e.colSpan),
            x: (totalWidth / layout.columns) * e.column,
            y: (layout.barheight / layout.rows) * e.row
        });
    });
    var k = rivets.bind(document.body, { extensions: extensions });
    window.show();
}


function init() {
    getLayout();
    extensions.forEach((ext) => {
        var l = new (require("./Extensions/" + ext.name)).default("./Extensions/" + ext.name) as ext.IBarExtension;
        l.BuildElements(ext.width, ext.height, document.getElementById(ext.name));
    });
}

rivets.binders['style-*'] = function (el, value) {
    el.style.setProperty(this.args[0], value + "px");
};
rivets.formatters.log = function (model) {
    console.log(model);
};


init();