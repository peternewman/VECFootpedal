'use strict'

const { vids, pids } = require('./FootpedalPIDs')

module.exports = [
  {
    name: 'VEC Footpedal',
    vendor: 'PI Engineering, Inc.',
    vid: vids.VEC,
    pid: pids.FOOTPEDAL,
    packetSize: 2,
    rules: {
      buttons: {
        offset: 0,
        type: "uint16le"
      }
    },
    buttonMasks: [0x0001, 0x0002, 0x0004]
  },
]
