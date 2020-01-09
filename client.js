// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface } from "react-360-web";
// added for view in mobile / cardboard
import WebVRPolyfill from "webvr-polyfill";
const polyfill = new WebVRPolyfill();

function init(bundle, parent, options = {}) {
	const r360 = new ReactInstance(bundle, parent, {
		// Add custom options here
		fullScreen: true,
		...options
	});

	// creating panel for listing walls

	const stocksPanel = new Surface(600, 550, Surface.SurfaceShape.Flat);

	stocksPanel.setAngle(-1.2 /* yaw angle */, 0.1 /* pitch angle */);

	const infoPanel = new Surface(480, 450, Surface.SurfaceShape.Flat);

	infoPanel.setAngle(1, 0.1);

	const newsPanel = new Surface(600, 550, Surface.SurfaceShape.Flat);
	newsPanel.setAngle(1.8, 0.1);

	// this is the left panel

	r360.renderToSurface(
		r360.createRoot("StocksPanel", {
			/* initial props */
		}),
		stocksPanel
	);

	// this is the right panel
	r360.renderToSurface(
		r360.createRoot("InfoPanel", {
			/* initial props */
		}),
		infoPanel
	);

	// this is the news panel
	r360.renderToSurface(
		r360.createRoot("NewsPanel", {
			/* initial props */
		}),
		newsPanel
	);

	//this is the default cylindrical panel , which is always at center
	r360.renderToSurface(
		r360.createRoot("vr_trading", {
			/* initial props */
		}),
		r360.getDefaultSurface()
	);

	// Load the initial environment
	r360.compositor.setBackground(r360.getAssetURL("360_office2.jpg"));
}

window.React360 = { init };
