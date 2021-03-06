

// carousel

const carousel = [...document.querySelectorAll(".carousel img")];
let carouselImageIndex = 0;

const changeCarousel = () => { //change albume pictures
    carousel[carouselImageIndex].classList.toggle("active");
    
    if(carouselImageIndex >= carousel.length - 1) {
        carouselImageIndex = 0;
    } else {
        carouselImageIndex ++;
    }
    
    carousel[carouselImageIndex].classList.toggle("active");
}

setInterval( () => {
    changeCarousel();
}, 4000);
 
// navigations ----> toggling music player

const musicPlayerSection = document.querySelector(".music-player-section");
let clickCount = 1;

musicPlayerSection.addEventListener('click', ( ) => {
    if (clickCount >= 2) {
        musicPlayerSection.classList.add("active");
        clickCount = 1;
        return;
    }
    clickCount ++;
    setTimeout(() => {
        clickCount = 1;
    }, 250);
});

// Set the Home button

const homeButton = document.querySelector(".music-player-section #icon-back");

homeButton.addEventListener("click", setBack);
function setBack () {
    musicPlayerSection.classList.remove("active");
}

// Access playlists

const playLists = document.querySelector(".playlist");
const navBtn = document.querySelector(".music-player-section #icon-menu")

navBtn.addEventListener("click", openMenu); // open playlist on click
function openMenu () {
    playLists.classList.add("active");

    document.querySelector(".playlist #back").addEventListener("click", backToplayer); // back to musicplayer on click
    function backToplayer () {
        playLists.classList.remove("active");
    }
}

// music player

let currentMusic = 0;
const music = document.querySelector("#audio-source");
const seekBar = document.querySelector(".music-seek-bar");
const songName = document.querySelector(".current-song-name");
const artistName = document.querySelector(".artist-name");
const coverImage = document.querySelector(".cover");
const currentMusicTime = document.querySelector(".current-time");
const musicDuration = document.querySelector(".duration");

// select all buttons

const forwardBtn = document.querySelector("i.fa-forward");
const backwardBtn = document.querySelector("i.fa-backward");
const playBtn = document.querySelector("i.fa-play");
const pauseBtn = document.querySelector("i.fa-pause");
const repeatBtn = document.querySelector("span.fa-redo");
const volumeBtn = document.querySelector("span.fa-volume-up");
const volumeSlider = document.querySelector(".volume-slider");

// click event on "playBtn" and "pauseBtn"

playBtn.addEventListener("click", () => {
    music.play();
    playBtn.classList.remove("active");
    pauseBtn.classList.add("active");
});

pauseBtn.addEventListener("click", () => {
    music.pause();
    pauseBtn.classList.remove("active");
    playBtn.classList.add("active");
});

// setting up music

const setMusic = (i) => {
    seekBar.value = 0;
    let song = songs[i];
    currentMusic = i;

    music.src = song.path; // add music details
    songName.innerHTML = song.name;
    artistName.innerHTML = song.artist;
    coverImage.src = song.cover;

    setTimeout( () => { // set seek bar value
        seekBar.max = music.duration;
        musicDuration.innerText = formatTime(seekBar.max);
    }, 300);
    currentMusicTime.innerText = "00 : 00";
}
setMusic(0);

// format duration

const formatTime = (time) => {
    let min = Math.floor(time / 60);
    if (min < 10) {
        min = '0' + min;
    }
    let second = Math.floor(time % 60);
    if (second < 10) {
        second = '0' + second;
    }

    return `${min} : ${second}`;
}  

            // seekBar events //

// set interval to update seekbar

setInterval(() => {
    seekBar.value = music.currentTime;
    currentMusicTime.innerText = formatTime(music.currentTime);

    if (Math.floor(music.currentTime) == Math.floor(seekBar.max)) { // for repeat button

    }
}, 500)

//add input event(Change runtime)

seekBar.addEventListener("change", inputEvent);
function inputEvent () {
    music.currentTime = seekBar.value;
}

// "forward" and "backward" button

forwardBtn.addEventListener("click", () => {
    if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
    } else {
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
});

backwardBtn.addEventListener("click", () => {
    if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
    } else {
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
});

// repeat button

repeatBtn.addEventListener("click", () => {
    repeatBtn.classList.toggle("active");

});