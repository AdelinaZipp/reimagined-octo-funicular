import { randomInt } from "crypto";
import puppeteer from "puppeteer";
import axios from "axios";
import WebSocket from "ws";
import FormData from "form-data";
import { secure } from "secure-puppeteer";
import { readFileSync } from "fs";
let delay = (ms) => new Promise((r) => setTimeout(r, ms));
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
    await delay(randomInt(1000, 2000));
    const browser = await puppeteer.launch({
        headless: false,
        targetFilter: (target => !!target),
        args: ['--disable-features=IsolateOrigins,site-per-process', '--disable-blink-features=AutomationControlled'],
        ignoreDefaultArgs: ["--enable-automation"],
        "devtools": false,
    });
    let page = await secure(await browser.newPage());
    await delay(2000);
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36");
    await page.setViewport({ isLandscape: true, height: 1080, width: 1920 });
    await page.goto("https://twitch.tv/");
    await delay(5000);
    await delay(1000);
    if (await page.$("#root > div > div.Layout-sc-1xcs6mc-0.lcpZLv > div.Layout-sc-1xcs6mc-0.gUvyVO > div > div > div > div.Layout-sc-1xcs6mc-0.joANJJ > button"))
        await (await page.$("#root > div > div.Layout-sc-1xcs6mc-0.lcpZLv > div.Layout-sc-1xcs6mc-0.gUvyVO > div > div > div > div.Layout-sc-1xcs6mc-0.joANJJ > button")).click();
    console.log("meow!!!");
    await delay(5000);
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
            console.log(json.username);
            console.log(":3");
            const user = json.channel;
            await page.setCookie({ name: "auth-token", value: json.authkey });
            await page.goto("https://twitch.tv/");
            await delay(2000);
            const vv = await page.$("body > div.ReactModalPortal > div > div > div > div > div > div > div.Layout-sc-1xcs6mc-0.dLaYOL > button > div > div");
            if (vv) {
                await page.reload();
            }
            await delay(10000);
            return;
            console.log(await page.$$(".consent-banner"));
            if ((await page.$$(".consent-banner")).length != 0) {
                await (await page.$$(".consent-banner"))[0].click();
                await page.keyboard.press("Tab");
                await page.keyboard.press("Tab");
                await delay(1000);
                await page.keyboard.press("Enter");
                await delay(1000);
                await page.keyboard.press("Enter");
            }
            await delay(10000);
            await page.screenshot({ path: "./uwu.png" });
            await digrock([readFileSync("uwu.png")]);
            try {
                await (await page.$("#root > div > div.Layout-sc-1xcs6mc-0.lcpZLv > div.Layout-sc-1xcs6mc-0.gUvyVO > div > div > div > div.Layout-sc-1xcs6mc-0.fJANQ > div:nth-child(1) > button"))
                    .click()
                    .catch((err) => err);
            }
            catch (err) { }
            await delay(500);
            let xvv = true;
            let found = false;
            let number = 1;
            while (xvv) {
                try {
                    const elementy = await page.$(`#side-nav > div > div.Layout-sc-1xcs6mc-0.capulb > div:nth-child(1) > div.InjectLayout-sc-1i43xsx-0.hWukFy.tw-transition-group > div:nth-child(${number})`);
                    if (elementy) {
                        number++;
                        const innerText = await page.evaluate((el) => el.innerText, elementy);
                        if (innerText.toLocaleLowerCase().includes(user)) {
                            xvv = false;
                            found = true;
                            await elementy.click();
                        }
                    }
                    else {
                        xvv = false;
                    }
                }
                catch (err) {
                    xvv = false;
                }
            }
            await delay(2000);
            if (!found) {
                await (await page.$("#root > div > div.Layout-sc-1xcs6mc-0.lcpZLv > nav > div > div.Layout-sc-1xcs6mc-0.kuGBVB > div > div > div > div > div.Layout-sc-1xcs6mc-0.jNIlkd > div > div.ScInputWrapper-sc-1fxjr4l-0.drBdyB.tw-combo-input__input > div > div > input")).type(user);
                await delay(2500);
                const elements = await page.$$(`[id^="search-result-row"]`);
                await elements[elements.length - 1].click();
            }
            await page.setRequestInterception(true);
            page.on("request", (interceptedRequest) => {
                if (interceptedRequest.url().includes("https://gql.twitch.tv/gql")) {
                    try {
                        const jsun = JSON.parse(interceptedRequest.postData());
                        if (jsun?.operationName == "sendChatMessage") {
                            chatkey = interceptedRequest.headers()["authorization"];
                            chatdata = jsun;
                            interceptedRequest.respond({ status: 200, body: ":3" });
                            return;
                        }
                    }
                    catch (err) { }
                }
                interceptedRequest.continue();
            });
            console.log(await page.url());
            await delay(10000);
            try {
                await (await page.$(`#WYSIWGChatInputEditor_SkipChat > div > div.chat-wysiwyg-input__editor`)).click();
            }
            catch (err) { }
            try {
                await (await page.$(`body > div.ScReactModalBase-sc-26ijes-0.fPaaXr.tw-dialog-layer > div > div > div > div > div > div > div.Layout-sc-1xcs6mc-0.bPLnIW > button`)).click();
            }
            catch (err) { }
            try {
                await (await page.$(`#WYSIWGChatInputEditor_SkipChat > div > div.chat-wysiwyg-input__editor`)).click();
            }
            catch (err) { }
            try {
                await page.keyboard.type("hellow");
            }
            catch (err) { }
            try {
                await page.keyboard.press("Enter");
            }
            catch (err) { }
            console.log(await page.url());
            await delay(10000);
            try {
                await (await page.$(`#channel-player-gate > div > div > div.Layout-sc-1xcs6mc-0.hczUTW > div > button`)).click();
            }
            catch (err) { }
            await delay(15000);
            try {
                await (await page.$(`#root > div > div.Layout-sc-1xcs6mc-0.lcpZLv > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-1i43xsx-0.persistent-player`)).click();
            }
            catch (err) {
                console.log("3");
            }
            setInterval(async () => {
                console.log(":3");
                try {
                    await (await page.$(`#root > div > div.Layout-sc-1xcs6mc-0.lcpZLv > div > main > div.root-scrollable.scrollable-area.scrollable-area--suppress-scroll-x > div.simplebar-scroll-content > div > div > div.InjectLayout-sc-1i43xsx-0.persistent-player`)).click();
                }
                catch (err) { }
            }, 120000);
            await delay(randomInt(100000, 300000));
            console.log(":3");
            await delay(randomInt(100000, 300000));
            await page.screenshot({ path: "./uwu.png" });
            await digrock([readFileSync("uwu.png")]);
            const nz = await page.$("#live-channel-stream-information > div > div > div.Layout-sc-1xcs6mc-0.dRGOOY > div > div.Layout-sc-1xcs6mc-0.evfzyg > div.Layout-sc-1xcs6mc-0.denZNh.metadata-layout__support > div.Layout-sc-1xcs6mc-0.ccVkYh > div > div.Layout-sc-1xcs6mc-0.cwtKyw > div > div:nth-child(2) > div > div.Layout-sc-1xcs6mc-0.bzcGMK > div > div > div > div > button");
            console.log(":3");
            try {
                const innertest = await page.evaluate((el) => el.ariaLabel, nz);
                if (innertest == "Follow") {
                    await nz.click();
                }
            }
            catch (err) { }
        }
        else if (json.action == "sendMessage") {
            try {
                console.log(chatdata);
                chatdata.variables.input.message = json.message;
                console.log(`sending message: ${chatdata.variables.input.message}`);
                await axios.post("https://gql.twitch.tv/gql", chatdata, {
                    headers: {
                        Authorization: chatkey,
                    },
                });
            }
            catch (err) {
                console.log("error :c");
                console.error(err);
                process.exit(1);
            }
        }
        else if (json.action == "kill") {
            browser.close();
            process.exit(0);
        }
    });
}
browser();
