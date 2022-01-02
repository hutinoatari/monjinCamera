"use strict";

const config = {
    width: 640,
    height: 480,
    fps: 10,
}

const video = document.createElement("video");
video.autoplay = true;
const constraints = {
    video: {
        width: config.width,
        height: config.height,
        aspectRatio: config.width / config.height,
        facingMode: {
            ideal: "environment"
        },
    },
    audio: false,
}
const media = navigator.mediaDevices.getUserMedia(constraints);
media.then((stream) => video.srcObject = stream);

const screen = document.getElementById("screen");
screen.width = config.width;
screen.height = config.height;
const context = screen.getContext("2d");
const fullscreenButton = document.getElementById("fullscreenButton");

const previewScreenUpdate = () => context.drawImage(video, 0, 0, config.width, config.height);
setInterval(previewScreenUpdate, 1000 / config.fps);

const takePhoto = () => {
    screen.toBlob((blob) => {
        const item = new ClipboardItem({[blob.type]: blob});
        navigator.clipboard.write([item]);
    })
}

navigator.permissions.query({name: "clipboard-write"});

screen.addEventListener("click", () => takePhoto());
fullscreenButton.addEventListener("click", () => screen.requestFullscreen());
