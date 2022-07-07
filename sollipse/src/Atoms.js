import { atom } from "recoil";

export const CurrentSongAudioElement = atom({
	key: "CurrentSong",
	default: null,
});

export const CurrentSongAudioAnalyzer = atom({
	key: "CurrentSongAudioAnalyzer",
	default: null,
});
export const CurrentSongAudioContext = atom({
	key: "CurrentSongAudioContexto",
	default: null,
});

export const AudioFrequencyAtCurrentTimestamp = atom({
	key: "AudioFrequencyAtCurrentTimestamp",
	default: [],
});

export const IsPlaying = atom({
	key: "IsPlaying",
	default: false,
});
export const IsSongLoading = atom({
	key: "IsSongLoading",
	default: false,
});
