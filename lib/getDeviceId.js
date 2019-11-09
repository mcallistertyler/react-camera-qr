'use strict';

var _require = require('./errors'),
    NoVideoInputDevicesError = _require.NoVideoInputDevicesError;

function defaultDeviceIdChooser(filteredDevices, videoDevices, facingMode) {
  if (filteredDevices.length > 0) {
    return filteredDevices[0].deviceId;
  }
  if (videoDevices.length === 1 || facingMode === 'user') {
    return videoDevices[0].deviceId;
  }
  return videoDevices[1].deviceId;
}

var getFacingModePattern = function getFacingModePattern(facingMode) {
  return facingMode === 'environment' ? /rear|back|bak|environment/gi : /front|foran|user|face/gi;
};

function getIdDirectly(facingMode, chosenCamera) {
  return new Promise(function (resolve, reject) {
    var enumerateDevices = void 0;
    try {
      enumerateDevices = navigator.mediaDevices.enumerateDevices();
    } catch (err) {
      reject(new NoVideoInputDevicesError());
    }
    enumerateDevices.then(function (devices) {
      var videoDevices = devices.filter(function (device) {
        return device.kind === 'videoinput';
      });
      if (videoDevices.length < 1) {
        reject(new NoVideoInputDevicesError());
        return;
      }
      var pattern = getFacingModePattern(facingMode);
      // Filter out video devices without the pattern
      var filteredDevices = videoDevices.filter(function (_ref) {
        var label = _ref.label;
        return pattern.test(label);
      });
      for (var device in videoDevices) {
        if (videoDevices[device].deviceId === chosenCamera) {
          resolve(chosenCamera);
          return;
        }
      }
      resolve(defaultDeviceIdChooser(filteredDevices, getFacingModePattern, facingMode));
    });
  });
}

function getDefaultDeviceId(facingMode) {
  // Get manual deviceId from available devices.
  return new Promise(function (resolve, reject) {
    var enumerateDevices = void 0;
    try {
      enumerateDevices = navigator.mediaDevices.enumerateDevices();
    } catch (err) {
      reject(new NoVideoInputDevicesError());
    }
    enumerateDevices.then(function (devices) {
      // Filter out non-videoinputs
      var videoDevices = devices.filter(function (device) {
        return device.kind === 'videoinput';
      });

      if (videoDevices.length < 1) {
        reject(new NoVideoInputDevicesError());
        return;
      }

      var pattern = getFacingModePattern(facingMode);
      // Filter out video devices without the pattern
      var filteredDevices = videoDevices.filter(function (_ref2) {
        var label = _ref2.label;
        return pattern.test(label);
      });
      resolve(defaultDeviceIdChooser(filteredDevices, videoDevices, facingMode));
    });
  });
}

module.exports = { getDefaultDeviceId: getDefaultDeviceId, getFacingModePattern: getFacingModePattern, getIdDirectly: getIdDirectly };