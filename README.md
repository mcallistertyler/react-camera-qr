<!-- [![npm version](https://badge.fury.io/js/react-qr-reader2.svg)](https://badge.fury.io/js/react-qr-reader2) -->

## Introduction

This is fork from [react-qr-reader2](https://github.com/tahv0/react-qr-reader2), which in turn is a fork of another package - [react-qr-reader](https://github.com/JodusNodus/react-qr-reader).

This fork of the package will focus more on supporting modern phones using PWAs, updating the outdated code from the original fork and focus on only using the environment facing cameras to scan QR codes. This is because it is rare for camera scan usage to involve front facing cameras. For now all support is being focused on Android Chrome and Safari iOS. Support for Firefox, and desktop environments may work but is not the focus of this package for now.

PRs welcome and encouraged :)

*Original package description below*
A [React](https://facebook.github.io/react/) component for reading QR codes from the webcam. It uses the WebRTC standards for reading webcam data and [jsQR](https://github.com/cozmo/jsQR) is used for detecting QR codes in that data. To optimise the speed and experience, a web-worker is used to offload the heavy QR code algorithm on a separate process. The web worker is inlined and loaded on creation of the component.

## Known Issues

* Currently the Storybook example does not seem to work.
* Server side rendering won't work so only require the componont when rendering in a browser environment.
* Due to browser implementations the camera can only be accessed over https or localhost.
* In Firefox a prompt will be shown to the user asking which camera to use, so `facingMode` will not affect it.
* On IOS 11 it is only supported on Safari and not on Chrome or Firefox due to Apple making the API not available to 3rd party browsers.
* Camera won't open in iOS PWA Apps. <https://stackoverflow.com/questions/46228218/how-to-access-camera-on-ios11-home-screen-web-app>

## Install

`yarn install --save react-camera-qr`

## Example

```js
import React, { Component } from 'react'
import QrReader from 'react-camera-qr'

class Test extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

```

## Props

### Events

| Prop        | Argument         | Description                                                                                                     |
| ----------- | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| onScan      | `result` and `chunks`        | Scan event handler. Called every scan with the decoded value in first parameter and with chunks array in second parameter. `result` is `null` and `chunks` is empty array if no QR code was found.                 |
| onError     | `Error`          | Called when an error occurs.                                                                                    |
| onLoad      | `object`         | Called when the component is ready for use. Object properties are `mirrorVideo`: boolean, `streamTrack`: object |

### Options

| Prop           | Type                    | Default       | Description                                                                                                                                                                                                                                                                                                                                                                |
| -------------- | ----------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| delay          | number or `false`       | `500`         | The delay between scans in milliseconds. To disable the interval pass in `false`.                                                                                                                                                                                                                                                                                          |
| facingMode     | `user` or `environment` | `environment` | Specify which camera should be used (if available).                                                                                                                                                                                                                                                                                                                        |
| resolution     | number                  | `600`         | The resolution of the video. Larger resolution will increase the accuracy but it will also slow down the processing time.                                                                                                                                                                                                                         |
| style          | a valid React style     | none          | Styling for the container element. **Warning** The preview will always keep its 1:1 aspect ratio.                                                                                                                                                                                                                                                                          |
| className      | string                  | none          | ClassName for the container element.                                                                                                                                                                                                                                                                                                                                       |
| showViewFinder | boolean                 | `true`        | Show or hide the build in view finder. See demo                                                                                                                                                                                                                                                                                                                            |
| constraints    | object                  | `null`          | Use custom camera constraints that the override default behavior. [MediaTrackConstraints](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints)|
| chosenCamera | string | `''` | By using the `enumerateDevices` function you can pass a device ID directly to the camera instead of using the default. |

## Dev

### Install dependencies

`yarn install`

### Build

`yarn run build`

### Demo

`yarn run storybook`

### Linting

`yarn run lint`

## Tested platforms

* Chrome Android
* Safari iOS
