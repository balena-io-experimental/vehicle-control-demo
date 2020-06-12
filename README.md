# Vehicle Control Demo

## What is this?

This is the code for the Vehicle Control demo of developing products with Balena.

## Requirements

- Set `RESIN_HOST_CONFIG_dtoverlay` to `"mcp2515-can0,oscillator=16000000,interrupt=25","spi-bcm2835-overlay"` for the fleet.
- Connect CAN module to Raspberry Pi 3 GPIO header.
- Copy `support-files/giffgaff` to `/mnt/boot/system-connections/giffgaff`<sup>[*](https://www.balena.io/docs/reference/OS/network/2.x/#cellular-modem-setup)</sup>.

## Configuring a balenaOS image

- Use the [Balena-CLI tools](https://www.balena.io/docs/reference/cli/)
- The command `balena os configure ...` has all the options we need here:
  - Wifi Settings
  - Additional `system-connection` files, for cellular etc
  - Application pinning
- The command `balena preload ...` allows us to pre-populate the balenaOS image with the services, to reduce initial download bandwidth on first boot. **NOTE** this only works on linux today<sup>[**](https://github.com/balena-io/balena-cli/issues/1099)</sup>

## What is working

- Initialisation of the `can0` interface with configurable bitrate.
- `candump` logging all frames to the `stdout` and onward to balenaCloud.
- `web-ui` service to control the state of the vehicle.
- Connection to balenaCloud over a cellular network.

## Questions?

- [Forums](https://forums.balena.io).
