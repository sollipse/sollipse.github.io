import Bowser from "bowser";
export const DEFAULT_SONG_URL =
	"https://pk-resume.s3-us-west-2.amazonaws.com/Max+Cooper+-+Resynthesis+Original+Mix+Mesh-www.groovytunes.org.mp3";

let browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();
export const IS_SAFARI = browser === "Safari";
