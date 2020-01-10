import React from 'react';
import { createStaturn, createSphere, createRing } from './utils/utils';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ADD: 0.1,
      renderer: null,
      scene: null,
      camera: null,
      sphere: null,
      rings: []
    };
  }

  componentDidMount = () => {
    const planet = createSphere();
    const ringOne = createRing(5.1, 0.7, 2, 50, 0xffe39f);
    const ringTwo = createRing(6.9, 0.7, 2, 50, 0xffad60);
    const ringThree = createRing(8.5, 0.7, 2, 50, 0xeac086);
    const start = createStaturn(planet, [ringOne, ringTwo, ringThree]);
    const { viewer } = this.refs;
    viewer.appendChild(start.renderer.domElement);
    const { renderer, scene, camera } = start;
    this.setState({
      renderer,
      scene,
      camera,
      sphere: planet,
      rings: [ringOne, ringTwo, ringThree]
    });
    this.mainLoop();
  };

  mainLoop = () => {
    const { ADD, sphere, scene, camera, renderer, rings } = this.state;
    if (
      scene !== null &&
      sphere !== null &&
      camera !== null &&
      renderer !== null &&
      rings.length > 0
    ) {
      rings.map((ring) => {
        ring.rotation.z += ADD;
      });
      renderer.render(scene, camera);
    }
    requestAnimationFrame(this.mainLoop);
  };

  body = () => <div id="viewer"></div>;

  render() {
    return this.body();
  }
}

export default App;
