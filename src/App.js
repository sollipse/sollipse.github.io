import React, { useEffect, useState, useRef } from "react";
import { styled } from "linaria/react";
import SimplexNoise from "simplex-noise";
import "./App.css";
import Bowser from "bowser";

let browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();
let ContextClass = window.webkitAudioContext || window.AudioContext;

let start = performance.now();
const Container = styled.div`
  position: absolute;
  background: black;
  font-family: Oxanium;
  color: white;
  font-size: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  audio {
  }
`;

const Button = styled.div`
  color: white;
  font-family: Open Sans;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 25px;
  padding: 20px;
  cursor: pointer;
  color: red;
  transition: all 0.3s ease;
  &:hover {
    color: white;
  }
`;

const NameTitle = styled.div`
  transition: all 3s ease;
  transition-delay: 2s;
  position: absolute;
  font-size: 70px;
`;

const Description = styled.div`
  font-family: Oxanium;
  color: white;
  font-size: 30px;
  margin-top: -24px;
  margin-left: -17px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: "row";
  justify-content: space-between;
`;

const Link = styled.a`
  cursor: pointer;
  padding-top: 15px;
  font-size: 30px;
  color: white;
  &:hover {
    transform: translateY(-3px);
  }
  transition: all 0.3s ease;
`;

function makeRoughBall(mesh, freqs = [], time) {
  let randIndex = Math.max(0, Math.floor(-0.005 + time / 4.0)) + 2;
  var noise = new SimplexNoise(randIndex);
  mesh.geometry.vertices.forEach(function (vertex, i) {
    let rf = 0.02;
    let ttime = performance.now() % 100;
    vertex.normalize();
    var distance =
      8 +
      (performance.now() - start) / 20000 +
      4 *
        noise.noise3D(
          vertex.x + Math.floor(ttime / 1000) * rf * 7,
          vertex.y + Math.floor(ttime / 1000) * rf * 8,
          vertex.z + Math.floor(ttime / 1000) * rf * 9
        ) +
      (Math.min(time / 200, .8) * (freqs[i % freqs.length] || 0)) / 128;
    vertex.multiplyScalar(distance);
  });
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
}
function App() {
  let [animationId, setAnimationId] = useState();
  let [analyzer, setAnalyzer] = useState();
  let [ctx, setCtx] = useState();
  let [freqs, setFreqs] = useState(new Uint8Array(1024));
  let [loading, setLoading] = useState(browser !== "Firefox");
  let [isPlaying, setPlaying] = useState(false);
  let [source, setSource] = useState();
  useEffect(() => {
    let t = document.getElementById("foo");
    if (t && !analyzer && (isPlaying || browser === "Safari")) {
      let context = new ContextClass();
      setCtx(context);
      let anal = context.createAnalyser();
      if (browser === "Safari") {
        fetch(
          "https://pk-resume.s3-us-west-2.amazonaws.com/Max+Cooper+-+Resynthesis+Original+Mix+Mesh-www.groovytunes.org.mp3"
        )
          .then((resp) => resp.arrayBuffer())
          .then(
            (buf) =>
              new Promise((res, rej) => {
                context.decodeAudioData(buf, res, rej);
              })
          )
          .then((buffer) => {
            let src = context.createBufferSource();
            src.buffer = buffer;
            src.connect(anal);
            anal.connect(context.destination);
            setAnalyzer(anal);
            setFreqs(new Uint8Array(anal.frequencyBinCount));
            setSource(src);
            setLoading(false);
          })
          .catch((e) => console.log(e));
      } else {
        let source = context.createMediaElementSource(t);
        let anal = context.createAnalyser();
        source.connect(anal);
        anal.connect(context.destination);
        setAnalyzer(anal);
        setFreqs(new Uint8Array(anal.frequencyBinCount));
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (window.THREE && !document.getElementById("fark")) {
      if (isPlaying && !analyzer) {
        return;
      } else {
      }
      const THREE = window.THREE;

      //here comes the webgl
      var scene = new THREE.Scene();
      var group = new THREE.Group();
      var camera = new THREE.PerspectiveCamera(
        20,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 100);
      camera.lookAt(scene.position);
      scene.add(camera);

      var renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById("App").prepend(renderer.domElement);
      renderer.domElement.id = "fark";

      var icosahedronGeometry = new THREE.IcosahedronGeometry(
        analyzer ? 3 : 9,
        5
      );
      var lambertMaterial = new THREE.MeshLambertMaterial({
        color: "red",
        wireframe: true,
      });

      var ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
      ball.position.set(0, 0, 0);
      group.add(ball);

      var ambientLight = new THREE.AmbientLight(0xaaaaaa);
      scene.add(ambientLight);

      var spotLight = new THREE.SpotLight(0xffffff);
      spotLight.intensity = 0.9;
      spotLight.position.set(-10, 40, 20);
      spotLight.lookAt(ball);
      spotLight.castShadow = true;
      scene.add(spotLight);

      scene.add(group);
      const animate = () => {
        setAnimationId(requestAnimationFrame(animate));
        group.rotation.y += 0.003;
        if (analyzer) {
          let currentTime = 0;
          if (browser === "Safari") {
            currentTime = ctx.currentTime;
          } else {
            if (document.getElementById("foo"))
              currentTime = document.getElementById("foo").currentTime;
          }
          analyzer.minDecibels = -100;
          analyzer.maxDecibels = 0;
          analyzer.getByteTimeDomainData(freqs);
          makeRoughBall(ball, freqs, currentTime);
        }
        renderer.render(scene, camera);
      };

      animate();
    }
  }, [window.THREE, freqs, isPlaying, ctx, analyzer]);

  return (
    <Container className="App" id="App">
      <Button
        id="fee"
        onClick={() => {
          if (isPlaying) {
            if (browser === "Safari") {
              if (source.playbackState !== 3) {
                source.stop(0);
              }
            } else {
              document.getElementById("foo").pause();
            }
            setPlaying(false);
          } else {
            if (browser === "Safari") {
              if (source.playbackState !== 3) {
                source.start(0);
              } else {
                window.location.reload();
              }
            } else {
              document.getElementById("foo").play();
            }
            document.getElementById("fark").remove();
            cancelAnimationFrame(animationId);
            setPlaying(true);
          }
        }}
      >
        <Row style={{ color: "white", alignItems: "center", fontSize: 32 }}>
          <img
            style={{
              marginRight: 10,
              marginTop: 6,
              width: 45,
              height: 45,
              objectFit: "cover",
              objectPosition: isPlaying ? "left" : "center",
            }}
            src={
              loading
                ? "https://media1.giphy.com/media/LsLK01Ko9Kf6M/source.gif"
                : isPlaying
                ? "https://pk-resume.s3-us-west-2.amazonaws.com/play-pause-button-transparent-13.png"
                : "https://pk-resume.s3-us-west-2.amazonaws.com/play-pause-button-transparent-13.png"
            }
          />
          <div style={{ opacity: loading ? 0 : 1, transition: "all 1s ease" }}>
            {loading ? "" : isPlaying ? "pause" : "play"}
          </div>
        </Row>
      </Button>
      <NameTitle
        style={{
          opacity: !loading ? 1 : 0,
          transform: `translatey(${!loading ? 0 : -10}px)`,
        }}
      >
        paul kang
        <Description>software engineer</Description>
        <Row>
          <Link href="#/work">work</Link>
          <Link href="#/about">about</Link>
        </Row>
        <div style={{ height: 23 }} />
        <audio
          onPlay={() => {
            if (window.woopra) {
              window.woopra.track("play");
            }
            if (isPlaying === false) {
              document.getElementById("fark").remove();
              cancelAnimationFrame(animationId);
              setPlaying(true);
            }
          }}
          onPause={() => setPlaying(false)}
          onCanPlayThrough={() => {
            if (browser !== "Safari") {
              setLoading(false);
            }
          }}
          crossOrigin="anonymous"
          loop
          id="foo"
          controls={browser !== "Safari"}
        >
          <source
            src={
              browser === "Safari"
                ? ""
                : "https://pk-resume.s3-us-west-2.amazonaws.com/Max+Cooper+-+Resynthesis+Original+Mix+Mesh-www.groovytunes.org.mp3"
            }
          ></source>
        </audio>
      </NameTitle>
    </Container>
  );
}

//
export default App;
