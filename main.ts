///<reference path="./typings/globals/github-electron/index.d.ts" />
///<reference path="./typings/globals/jquery/index.d.ts" />
///<reference path="./typings/globals/node/index.d.ts" />

import electron = require("electron");
import $ = require("jquery");
import fs = require("fs");
declare var __dirname;

const app = electron.app;
let window: Electron.BrowserWindow;
function createWindow(): void {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;
    window = new electron.BrowserWindow(
        {
            titleBarStyle: "default",
            autoHideMenuBar: false,
            width: width, height: 30,
            frame: false, resizable: false,
            movable: false, fullscreenable: false,
            transparent:true, hasShadow:false, alwaysOnTop:true,
            x: 0, y: 0
        }
    );
    window.loadURL(`file://${__dirname}/index.html`);
    window.webContents.openDevTools({ mode: "undocked" });

}
app.on("ready", () => {
    createWindow();
});
app.on("activate", () => {
    if (window === null) {
        createWindow();
    }
});

