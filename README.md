# Vehicle Control Demo

## What is this?

This is the code for the Vehicle Control demo of developing products with Balena.

## Requirements

- Set `RESIN_HOST_CONFIG_dtoverlay` to `"mcp2515-can0,oscillator=16000000,interrupt=25","spi-bcm2835-overlay"` for the fleet.
- Connect CAN module to Raspberry Pi 3 GPIO header.

## What is working

- Initialisation of the `can0` interface with configurable bitrate.
- `candump` logging all frames to the `stdout` and onward to balenaCloud.

## Questions?

- [Forums](https://forums.balena.io).
