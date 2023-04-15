import { proxy } from 'valtio';

const state = proxy({
	intro: true,
	ball: true,
	color: '#EFBD48',
	isLogoTexture: true,
	isFullTexture: false,
	logoDecal: './threejs.png',
	fullDecal: './threejs.png',
});

export default state