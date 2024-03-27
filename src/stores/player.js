import { defineStore } from "pinia";
import { ref, reactive, watch, watchEffect } from "vue";
import { useMediaSession } from "../Composables/useMediaSession";

const PLAYING = "playing";
const PAUSED = "paused";
const STOPPED = "stopped";
const REFRESH = "refresh";

export const usePlayerStore = defineStore("player", () => {
	const isState = ref("start");
	const currentTrack = ref(null);
	const audio = ref(null);

	const progres = reactive({
		currentTime: 0,
		duration: 0,
	});

	const updateTime = (audio) => {
		progres.currentTime = audio.value.currentTime;
		progres.duration = audio.value.duration;
	};

	const seekTo = (time) => { if (audio.value) audio.value.currentTime = time };
	const seekBackward = () => { if (audio.value) audio.value.currentTime -= 10 };
	const seekForward = () => { if (audio.value) audio.value.currentTime += 10 };

	const resume = () => {
		if (audio.value) {
			audio.value.currentTime = progres.currentTime;
			audio.value.play();
			isState.value = PLAYING;
			audio.value.addEventListener("timeupdate", () => updateTime(audio));
			navigator.mediaSession.playbackState = PLAYING;
		}
	};

	const play = (track) => {
		currentTrack.value = track;
		isState.value = PLAYING;

		if (audio.value) {
			audio.value.pause();
			audio.value.removeEventListener("timeupdate", () => updateTime(audio));
			audio.value.removeEventListener("ended", () => stop(audio));
			audio.value = null;
		}

		useMediaSession({
			title: currentTrack.value.title,
			artist: currentTrack.value.artist,
			album: currentTrack.value.album,
			artwork: currentTrack.value.artwork,
			play: play,
			pause: pause,
			resume: resume,
			seekBackward: seekBackward,
			seekForward: seekForward,
			seekTo: seekTo,
		});

		audio.value = new Audio(currentTrack.value.mp3);
		navigator.mediaSession.playbackState = PLAYING;
		audio.value.addEventListener("timeupdate", () => updateTime(audio));
		audio.value.addEventListener("ended", () => stop(audio));
		audio.value.play();
	};

	const pause = () => {
		if (audio.value) {
			progres.currentTime = audio.value.currentTime;
			audio.value.pause();
		}

		navigator.mediaSession.playbackState = PAUSED;
		isState.value = PAUSED;
	};

	const stop = (audio) => {
		if (audio.value) {
			audio.value.pause();
			audio.value.removeEventListener("timeupdate", () => updateTime(audio));
			audio.value.removeEventListener("ended", () => stop(audio));
			audio.value.currentTime = 0;
			audio.value = null;
		}

		isState.value = STOPPED;
		currentTrack.value = null;
		navigator.mediaSession.playbackState = "none";
	};

	const savedState = localStorage.getItem("playerState");
	if (savedState) {
		const parsedState = JSON.parse(savedState);
		isState.value = parsedState.isState;
		currentTrack.value = parsedState.currentTrack;
		progres.currentTime = parsedState.progres.currentTime;
		progres.duration = parsedState.progres.duration;
		audio.value = new Audio(parsedState.audioSrc);
		audio.value.currentTime = progres.currentTime;

		if (isState.value === PLAYING) {
			isState.value = REFRESH;
		}

		audio.value.addEventListener("timeupdate", () => updateTime(audio));
		audio.value.addEventListener("ended", () => stop(audio));
	}

	watch([isState, currentTrack, progres, audio], () => {
		localStorage.setItem(
			"playerState",
			JSON.stringify({
				isState: isState.value,
				currentTrack: currentTrack.value,
				progres: {
					currentTime: progres.currentTime,
					duration: progres.duration,
				},
				audioSrc: audio.value ? audio.value.src : null,
				audioTime: audio.value ? audio.value.currentTime : 0,
			})
		);
	});

	return {
		isState,
		currentTrack,
		progres,
		play,
		pause,
		stop,
		resume,
		seekBackward,
		seekForward,
		seekTo,
	};
});
