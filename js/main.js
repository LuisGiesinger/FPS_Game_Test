// Einfaches Three.js Beispiel: Szene mit rotierendem Würfel und OrbitControls

(function () {
    const container = document.getElementById('container');

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Szene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x22252a);

    // Kamera
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(2.5, 2.0, 3.5);

    // Licht
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 10, 7.5);
    scene.add(dir);

    // Würfel
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: 0x6699ff,
        metalness: 0.3,
        roughness: 0.4,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Hilfen
    const grid = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    scene.add(grid);

    const axes = new THREE.AxesHelper(1.5);
    scene.add(axes);

    // OrbitControls (benötigt globales THREE; wird oben per <script> geladen)
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.enablePan = true;
    controls.minDistance = 1;
    controls.maxDistance = 50;

    // Resize-Handler
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Animation
    function animate() {
        requestAnimationFrame(animate);

        // Einfacher Rotationseffekt
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.013;

        controls.update();
        renderer.render(scene, camera);
    }

    // Start
    animate();
})();