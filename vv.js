import {exec} from 'child_process'
import util from 'util'
const execAsync = util.promisify(exec)



async function uwu(){
    let arr = []
    for(let n=0;n>5;n++){
        arr.push(execAsync(`xvfb-run -n ${n+20} https://www.twitch.tv/foxyman361`))
    }
    console.log(":3")
    await Promise.all(arr)
}

uwu()
