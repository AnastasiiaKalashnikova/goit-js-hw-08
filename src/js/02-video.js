
import Player from '@vimeo/player';
import throttle from "lodash.throttle";
const iframe = document.querySelector('iframe');
console.log(iframe)

const player = new Player(iframe);

//збереження часу
player.on('timeupdate', throttle(handler, 1000));
function handler(timeupdate) {
    console.log(timeupdate.seconds)
    return localStorage.setItem("videoplayer-current-time", JSON.stringify(timeupdate.seconds))
}

player.setCurrentTime(JSON.parse(localStorage.getItem("videoplayer-current-time")))
