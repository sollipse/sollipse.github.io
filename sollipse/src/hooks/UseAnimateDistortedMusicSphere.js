import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import useMusicAnalysis from "./UseMusicAnalysis";
import {
	GenerateSphereRenderParams,
	DistortSphere,
} from "../utils/MusicSphereRenderUtils";
import {
	AudioFrequencyAtCurrentTimestamp,
	CurrentSongAudioElement,
	CurrentSongAudioAnalyzer,
	IsPlaying,
} from "../Atoms";
import { useRecoilValue } from "recoil";
import { IS_SAFARI } from "../constants/Constants";

export default function useAnimateDistoredMusicSphere(
	canvasRef,
	animationID,
	setAnimationID
) {
	const isPlaying = useRecoilValue(IsPlaying);
	const audioElement = useRecoilValue(CurrentSongAudioElement);
	const analyzer = useRecoilValue(CurrentSongAudioAnalyzer);
	const freqs = useRef(
		new Uint8Array((analyzer && analyzer.frequencyBinCount) ?? 1024)
	);

	const [renderer, group, scene, camera, sphere] = useMemo(
		() => GenerateSphereRenderParams(canvasRef.current),
		[(canvasRef ?? {}).current]
	);

	const animate = useCallback(() => {
		if (!audioElement) return;
		setAnimationID(requestAnimationFrame(animate));
		group.rotation.y += 0.003;
		let currentTime = audioElement.currentTime;
		if (IS_SAFARI) {
			//currentTime = ctx.currentTime;
		}
		if (analyzer != null) {
			analyzer.getByteTimeDomainData(freqs.current);
			DistortSphere(sphere, freqs.current, currentTime);
		}
		renderer.render(scene, camera);
	}, [analyzer, audioElement]);

	useEffect(() => {
		let disposer = null;
		if (window.THREE && canvasRef && canvasRef.current && audioElement) {
			disposer = scene;
			animate();
		}
		return () => {
			// cleanup. Cancel any running animations, set current animID to null, displose of the scene.
			cancelAnimationFrame(animationID);
			setAnimationID(null);
			disposer && disposer.dispose();
		};
	}, [window.THREE, isPlaying, canvasRef, audioElement, analyzer]);
}
