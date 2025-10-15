/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"ZGBC_FLEET_RETURN/ZGBC_FLEET_RETURN/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});