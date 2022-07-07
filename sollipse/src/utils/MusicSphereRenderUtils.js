import SimplexNoise from "simplex-noise";

const start = performance.now();

const THREE = window.THREE;
export const GenerateSphereRenderParams = (canvas) => {
	//here comes the webgl
	const scene = new THREE.Scene();
	const group = new THREE.Group();
	const camera = new THREE.PerspectiveCamera(
		20,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.set(0, 0, 100);
	camera.lookAt(scene.position);
	scene.add(camera);

	const renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
		canvas,
	});
	renderer.setSize(window.innerWidth, window.innerHeight);
	// appRef.current.prepend(renderer.domElement);
	// renderer.domElement.id = "fark";

	const sphere = GenerateThreeSphere();
	group.add(sphere);

	const ambientLight = new THREE.AmbientLight(0xaaaaaa);
	scene.add(ambientLight);

	const spotLight = new THREE.SpotLight(0xffffff);
	spotLight.intensity = 0.9;
	spotLight.position.set(-10, 40, 20);
	spotLight.lookAt(sphere);
	spotLight.castShadow = true;
	scene.add(spotLight);
	scene.add(group);

	return [renderer, group, scene, camera, sphere];
};

const GenerateThreeSphere = () => {
	const icosahedronGeometry = new THREE.IcosahedronGeometry(10, 5);
	const lambertMaterial = new THREE.MeshLambertMaterial({
		color: "red",
		wireframe: true,
	});
	const ball = new THREE.Mesh(icosahedronGeometry, lambertMaterial);
	ball.position.set(0, 0, 0);
	return ball;
};

const COLORS = ["darkblue", "purple", "darkgreen", "red"];

export function DistortSphere(mesh, freqs = [], time) {
	let randIndex = Math.max(0, Math.floor(-0.005 + time / 4.0)) + 2;
	var noise = new SimplexNoise(randIndex);
	mesh.geometry.vertices.forEach(function (vertex, i) {
		let rf = 0.5;
		let ttime = performance.now() % 100;
		vertex.normalize();
		var distance =
			8 +
			Math.min(performance.now() - start, 100000) / 20000 +
			4 *
				noise.noise3D(
					vertex.x + Math.floor(ttime / 1000) * rf * 7,
					vertex.y + Math.floor(ttime / 1000) * rf * 8,
					vertex.z + Math.floor(ttime / 1000) * rf * 9
				) +
			(Math.min(time / 200, 3) * (freqs[i % freqs.length] || 1)) / 128;
		vertex.multiplyScalar(distance);
	});
	mesh.geometry.verticesNeedUpdate = true;
	mesh.geometry.normalsNeedUpdate = true;
	const randColor = COLORS[randIndex % COLORS.length];
	mesh.material.color.set(randColor);
}
