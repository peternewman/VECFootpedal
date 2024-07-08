const test = require('tape')
const pedal = require('../lib/Footpedal')

pedal.on('connected', (deviceInfo) => {
  console.log('Starting tests')
  console.log('Connected', deviceInfo.id, deviceInfo.path, deviceInfo.name)
  test('pedal test', (t) => {
    t.plan(8)

    if (deviceInfo.name === 'Footpedal') {
      t.equal(deviceInfo.numButtons, 3)
    }
    t.deepEqual(pedal.getDeviceById(deviceInfo.id), deviceInfo)
    t.equal(pedal.getDeviceById("foo"), null)
    t.deepEqual(pedal.getDeviceByPath(deviceInfo.path), deviceInfo)
    t.equal(pedal.getDeviceByPath("/foo/bar"), null)
    t.notLooseEqual(pedal.getRawHidDevice(deviceInfo.id), null)
    // Validate we've got the right raw HID device
    t.match(pedal.getRawHidDevice(deviceInfo.id).getDeviceInfo().manufacturer, /VEC/i)
    t.match(pedal.getRawHidDevice(deviceInfo.id).getDeviceInfo().product, /Footpedal/i)
    t.equal(pedal.getRawHidDevice("foo"), null)
    console.log('Unplug device')
  })
})

pedal.on('disconnected', (id) => {
  console.log('Disconnected', id)
  if (pedal.getDeviceList().length === 0) {
    console.log('Testing complete')
    pedal.stop()
  }
})

pedal.on('buttonup', (button, id) => {
  console.log('Pedal button up', button, id)
})

pedal.on('buttondown', (button, id) => {
  console.log('Pedal button down', button, id)
})

pedal.start()

if (pedal.getDeviceList().length === 0) {
  console.log('Plug device in')
}
