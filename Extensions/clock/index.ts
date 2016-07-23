///<reference path="../../typings/globals/rivets/index.d.ts" />
///<reference path="../../typings/globals/jquery/index.d.ts" />

import $ = require("jquery");
import * as IBarExtension from '../../IBarExtension'
import fs = require("fs");

export module clock {
    let model = { Time: Date(), Height: 8 };
    export default class ClockModule implements IBarExtension.IBarExtension {
        Settings: ClockSettings;
        public constructor(private path: string) {
            this.Settings = JSON.parse(fs.readFileSync(path + "/settings.json", "ascii"));
        }
        private StartTimer(): void {
            let tick = () => {
                model.Time = Date();
                console.log(model.Time);
            };
            tick();
            setInterval(tick, 60000);
        }
        private InitTimer(): void {
            let beginning = new Date();
            setTimeout(() => {
                console.log("init tick at " + Date());
                this.StartTimer();
            }, (1000 - beginning.getMilliseconds() + ((59 - beginning.getSeconds()) * 1000)));
        }

        private addFormatters() {
            let t = this;
            rivets.formatters.time = (value: string) => {
                var d = new Date(value);
                if (t.Settings.TwentyFourHour) {
                    return d.getHours() + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
                } else {
                    let base = (d.getHours() % 12) + ":" + (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes());
                    if (t.Settings.HideAmPm) return base;
                    d.getHours() > 12 ? base += "PM" : base += "AM";
                    return base;
                }
            }
        }
        public BuildElements(width: number, height: number, element: HTMLElement) {
            this.addFormatters();
            $.get(this.path + "/template.html", (data, status) => {
                element.innerHTML = data;
                let restDate = Date();
                model.Time = restDate;
                model.Height = height;
                var k = rivets.bind(element, model);
            });
            this.InitTimer();
        }
    }
    //export let clock: IBarExtension.IBarExtension = new ClockModule();
    interface ClockSettings {
        TwentyFourHour: boolean,
        HideAmPm: boolean
    }
}