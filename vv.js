import { exec } from 'child_process';
import util from 'util';
const execAsync = util.promisify(exec);
let delay = (ms) => new Promise((r) => setTimeout(r, ms));
async function uwu() {
    let arr = [];
    for (let n = 0; n < 2; n++) {
        arr.push(execAsync(`xvfb-run -n ${n + 20} chromium https://www.twitch.tv/foxyman361`));
        await delay(25000);
    }
    console.log(":3");
    await Promise.all(arr);
}
uwu();
