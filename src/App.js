import React, { useEffect, useState, useRef } from "react";
import { styled } from "linaria/react";
import SimplexNoise from "simplex-noise";
import "./App.css";
import Bowser from "bowser";

let browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();

let start = performance.now();
let RandomValue = Math.random();
let randIndex;
const Container = styled.div`
  position: absolute;
  background: black;
  font-family: Orbitron;
  color: white;
  font-size: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Button = styled.div`
  color: white;
  font-family: Raleway;
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
  transition-delay: 8s;
  position: absolute;
`;

const Description = styled.div`
  font-family: Raleway;
  color: white;
  font-size: 39px;
  padding-top: 6px;
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

const Canvas = styled.canvas`
  width: 100%;
`;

function makeRoughBall(mesh, freqs = [], time) {
  let randIndex = Math.floor((-0.3 + time) / 3.96);
  if (time < 8.25) {
    randIndex = RandomValue;
  }
  var noise = new SimplexNoise(randIndex);
  mesh.geometry.vertices.forEach(function (vertex, i) {
    let rf = 0.02;
    let time = performance.now() % 100;
    vertex.normalize();
    var distance =
      6 +
      (performance.now() - start) / 15000 +
      4 *
        noise.noise3D(
          vertex.x + Math.floor(time / 1000) * rf * 7,
          vertex.y + Math.floor(time / 1000) * rf * 8,
          vertex.z + Math.floor(time / 1000) * rf * 9
        ) +
      (0.2 * (freqs[i % freqs.length] || 0)) / 128;
    vertex.multiplyScalar(distance);
  });
  mesh.geometry.verticesNeedUpdate = true;
  mesh.geometry.normalsNeedUpdate = true;
}
function App() {
  let [analyzer, setAnalyzer] = useState();
  let [freqs, setFreqs] = useState([]);
  let [animationId, setAnimationId] = useState();
  let [actx, setActx] = useState();
  let [isPlaying, setPlaying] = useState(false);
  useEffect(() => {
    let t = document.getElementById("foo");
    let backup = new Audio(URL);
    if (t && !analyzer) {
      let ContextClass = window.webkitAudioContext || window.AudioContext;
      let context = new ContextClass();
      setActx(context);
      if (browser === "Safari") {
        setAnalyzer(1);
      } else {
        let source = context.createMediaElementSource(t);
        let anal = context.createAnalyser();
        source.connect(anal);
        anal.connect(context.destination);
        var gainNode = context.createGain();
        gainNode.gain.value = 100;
        setAnalyzer(anal);
        setFreqs(new Uint8Array(anal.frequencyBinCount));
        setTimeout(() => {
          console.log(browser);

          if (browser !== "Safari") {
            document.getElementById("fee").click();
          }
        }, 100);
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (window.THREE && isPlaying) {
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

      var icosahedronGeometry = new THREE.IcosahedronGeometry(4, 3);
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
      renderer.render(scene, camera);

      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        group.rotation.y += 0.003;
        if (analyzer && freqs.length) {
          analyzer.getByteTimeDomainData(freqs);
          makeRoughBall(ball, freqs, actx.currentTime);
        } else if (browser === "Safari" && isPlaying) {
          makeRoughBall(ball, [], performance.now() / 1000);
        }
      };

      animate();
    }
  }, [window.THREE, analyzer, freqs, isPlaying]);

  return (
    <Container className="App" id="App">
      <Button
        id="fee"
        onClick={() => {
          if (isPlaying) {
            document.getElementById("foo").pause();
            setPlaying(false);
          } else {
            document.getElementById("foo").play();
            setPlaying(true);
          }
        }}
      >
        {isPlaying ? "pause" : "play"}
      </Button>
      <NameTitle
        style={{
          opacity: analyzer ? 1 : 0,
          transform: `translatey(${analyzer ? 0 : -10}px)`,
        }}
      >
        Paul kanG
        <Description>software engineer</Description>
        <Row>
          <Link href="#/work">work</Link>
          <Link href="#/about">about</Link>
        </Row>
      </NameTitle>
      <div style={{ height: 30 }} />
      <audio
        crossOrigin="anonymous"
        loop
        onPause={() => cancelAnimationFrame(animationId)}
        id="foo"
      >
        <source src="https://pk-resume.s3-us-west-2.amazonaws.com/04+-+Supine.mp3"></source>
      </audio>
    </Container>
  );
}

export default App;
