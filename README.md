# VECFootpedal [![npm](https://img.shields.io/npm/v/vec-footpedal.svg)](https://www.npmjs.com/package/vec-footpedal) [![Licence MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](http://opensource.org/licenses/MIT)

A Library to use VEC Footpedal in Node.js projects without a driver. This device was originally manufactured by PI Engineering.

_This library supports multiple devices connected at one time via simply including a hash of the device id for each event as the final parameter in the callback._

## Installation
```sh
npm install vec-footpedal
```

## Usage
```javascript
const pedal = require('vec-footpedal');

pedal.on('connected', (deviceInfo) => {
  console.log('Connected to ' + deviceInfo.name);
});

// Start after 'connect' event listener has been set up
pedal.start();
```

## API

### Methods
`start(watchUsb)`

- `watchUsb` Boolean - whether to monitor for USB devices (true by default)

Starts the service and optionally monitors USB device connections for VEC Footpedals. If watchUsb is true, it will find all connected devices.

This should be called after the 'connect' event listener has been declared, otherwise already-connected devices will not be detected.


`connect(path)`

- `path` String - the device path

If you're not automatically monitoring for USB devices, use this to connect to a specific device by path.


`stop()`

Stops the service and monitoring. This must be called before your script ends.


`getDeviceList()`

Use to retrieve all the devices that are connected.

Returns:
- `Object[]` - contains the following information:
  - `id` String - either the serial number (if it exists) or the device path, turned into an MD5 hash, used to distinguish between multiple devices that may be connected at once.
  - `path` String - the USB device path
  - `name` String - name of the device ('Footpedal')
  - `numButtons` Integer


`getDeviceById(id)`

- `id` String - the device id

Returns `Object | null`:
  - `id` String - either the serial number (if it exists) or the device path, turned into an MD5 hash, used to distinguish between multiple devices that may be connected at once.
  - `path` String - the USB device path
  - `name` String - name of the device ('Footpedal')
  - `numButtons` Integer


`getDeviceByPath(path)`

- `path` String - the device path

Returns `Object | null`:
  - `id` String - either the serial number (if it exists) or the device path, turned into an MD5 hash, used to distinguish between multiple devices that may be connected at once.
  - `name` String - name of the device ('Footpedal')
  - `numButtons` Integer


`getRawHidDevice(id)`

- `id` String - the device id

Returns `Object | null` - the raw HID device object


### Events
`shuttle.on('...', () => {})`

#### Event: `connected`
Emitted when a device has been plugged into a USB port.

Returns `Object`:
  - `id` String - either the serial number (if it exists) or the device path, turned into an MD5 hash, used to distinguish between multiple devices that may be connected at once.
  - `name` String - name of the device ('Footpedal')
  - `numButtons` Integer

#### Event: `disconnected`
Emitted when the device has been unplugged or has failed.

Returns `id` String - either the serial number (if it exists) or the device path, turned into an MD5 hash.

#### Event: `buttondown`
Emitted when a button is pressed on the device.

Returns:
- `button` Integer - the button number
- `id` String - either the serial number (if it exists) or the device path, turned into an MD5 hash.

#### Event: `buttonup`
Emitted when a button is released on the device.

Returns:
- `button` Integer - the button number
- `id` String - either the serial number (if it exists) or the device path, turned into an MD5 hash.


### Enumerations

`pedal.vids`

An enumeration of vendor ids for Footpedal devices, namely for VEC:
- `VEC`


`pedal.pids`

An enumeration of product ids for Footpedal devices:
- `FOOTPEDAL`

## Linux Note
By default, the udev system adds VEC Footpedal as root only access. To fix this, you need to copy 99-VECFootpedal.rules to:
```
/etc/udev/rules.d
```
Then reboot your computer.


## Licence
MIT

