import React, { useRef } from "react";
import { IsPlaying, IsSongLoading, CurrentSongAudioElement } from "../Atoms";
import { useSetRecoilState } from "recoil";
import Bowser from "bowser";
import { DEFAULT_SONG_URL } from "../constants/Constants";
import { IS_SAFARI } from "../constants/Constants";
import useMusicAnalysis from "../hooks/UseMusicAnalysis";

export default function MusicPlayer() {
	const setIsPlaying = useSetRecoilState(IsPlaying);
	const setIsSongLoading = useSetRecoilState(IsSongLoading);
	const setCurrentSongAudioElement = useSetRecoilState(
		CurrentSongAudioElement
	);
	const setMusicAnalyzer = useMusicAnalysis();
	const audioRef = useRef();

	const onLoad = () => {
		if (!IS_SAFARI) {
			setIsSongLoading(false);
		}
		setCurrentSongAudioElement(audioRef.current);
	};
	return (
		<>
			<audio
				ref={audioRef}
				onPlay={() => {
					if (window.woopra) {
						window.woopra.track("play");
					}
					setIsPlaying(true);
				}}
				onPause={() => {
					if (window.woopra) {
						window.woopra.track("pause");
					}
					setIsPlaying(false);
				}}
				onCanPlayThrough={onLoad}
				onCanPlay={onLoad}
				crossOrigin="anonymous"
				loop
			>
				<source src={DEFAULT_SONG_URL} />
			</audio>
		</>
	);
}
