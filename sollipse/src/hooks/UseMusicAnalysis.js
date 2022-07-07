import React, { useState, useEffect, useCallback } from "react";
import { useRecoilValue, useSetRecoilState, useRecoilCallback } from "recoil";
import {
	AudioFrequencyAtCurrentTimestamp,
	CurrentSongAudioAnalyzer,
	CurrentSongAudioElement,
} from "../Atoms";
import { IS_SAFARI, DEFAULT_SONG_URL } from "../constants/Constants";
let WebkitAudioContextClass = window.webkitAudioContext || window.AudioContext;
const context = new WebkitAudioContextClass();

export default function useMusicAnalysis() {
	const audioElement = useRecoilValue(CurrentSongAudioElement);

	return useRecoilCallback(({ set, snapshot }) => async () => {
		const analyzer = snapshot.getPromise(CurrentSongAudioAnalyzer);
		if (audioElement) {
			const source = context.createMediaElementSource(audioElement);
			const analyzer = context.createAnalyser();
			set(CurrentSongAudioAnalyzer, analyzer);
			source.connect(analyzer);
			analyzer.connect(context.destination);
		}
	});
}

const generateSafariAnalyzer = (context) => {
	// fetch(DEFAULT_SONG_URL)
	// 	.then((resp) => resp.arrayBuffer())
	// 	.then(
	// 		(buf) =>
	// 			new Promise((res, rej) => {
	// 				context.decodeAudioData(buf, res, rej);
	// 			})
	// 	)
	// 	.then((buffer) => {
	// 		let src = context.createBufferSource();
	// 		src.buffer = buffer;
	// 		src.connect(anal);
	// 		anal.connect(context.destination);
	// 		setAnalyzer(anal);
	// 		setFreqs(new Uint8Array(anal.frequencyBinCount));
	// 		setSource(src);
	// 		setLoading(false);
	// 	})
	// 	.catch((e) => console.log(e));
};
