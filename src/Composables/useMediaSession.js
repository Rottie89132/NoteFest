export const useMediaSession = (track) => {

    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: track.title,
            artist: track.artist,
            album: track.title,
            artwork: [
                { src: track.artwork.replace("/public", ""), sizes: "96x96", type: "image/png" },
                { src: track.artwork.replace("/public", ""), sizes: "128x128", type: "image/png" },
                { src: track.artwork.replace("/public", ""), sizes: "192x192", type: "image/png" },
                { src: track.artwork.replace("/public", ""), sizes: "256x256", type: "image/png" },
                { src: track.artwork.replace("/public", ""), sizes: "384x384", type: "image/png" },
                { src: track.artwork.replace("/public", ""), sizes: "512x512", type: "image/png" },
            ],
        });

        navigator.mediaSession.setActionHandler("play", function () {
            navigator.mediaSession.playbackState = "playing";
            track.resume()
        });
        navigator.mediaSession.setActionHandler("pause", function () {
            navigator.mediaSession.playbackState = "paused";
            track.pause();
        });

        navigator.mediaSession.setActionHandler("seekbackward", function () {
            track.seekBackward();
        });

        navigator.mediaSession.setActionHandler("seekforward", function () {
            track.seekForward();
        });

        navigator.mediaSession.setActionHandler("seekto", function (details) {
            track.seekTo(details.seekTime);
        });

        navigator.mediaSession.setActionHandler("stop", function () {
            navigator.mediaSession.playbackState = "none";
            navigator.mediaSession.metadata = null;
            track.stop();
        });


    }
}