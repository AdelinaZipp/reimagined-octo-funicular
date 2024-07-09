import { randomInt } from "crypto";
import puppeteer from "puppeteer-extra";
import axios from "axios";
import WebSocket from "ws";
import FormData from 'form-data';
import yes from "puppeteer-extra-plugin-stealth";
import { readFileSync } from "fs";
import { exec } from "child_process";
import util from 'util';
const execAsync = util.promisify(exec);
let delay = (ms) => new Promise((r) => setTimeout(r, ms));
puppeteer.default.use(yes());
let chatkey = "";
let chatdata = {};
async function digrock(array) {
    const form = new FormData();
    form.append("content", `:3`);
    for (let nx in array) {
        form.append(`files[${nx}]`, array[nx], { filename: `image${nx}.png` });
    }
    await axios.post(process.env["MEOWYUWU"], form);
}
async function browser() {
    await delay(randomInt(1, 5));
    if (!process.env["MEOWY"])
        return;
    const ws = new WebSocket(process.env["MEOWY"]);
    ws.on("open", function open() {
        setInterval(() => {
            ws.send(JSON.stringify({ action: "ping" }));
        }, 15000);
    });
    ws.on("message", async function incoming(data) {
        const json = await JSON.parse(data);
        if (json.action == "connection") {
            console.log(json);
            await execAsync(`source ./uwuz/bin/activate && python3 a.py ${json.authkey} ${json.username}`);
            console.log("hai :3");
            digrock([readFileSync("./sc1.png"), readFileSync("./sc2.png")]);
        }
        else if (json.action == "kill") {
            process.exit(0);
        }
    });
}
browser();
