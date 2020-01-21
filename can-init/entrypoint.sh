#!/bin/sh

###################################################################
#Script Name:	entrypoint.sh
#Description:	Configures the can0 interface with the correct bitrate from
#               the environment variable CAN0_BITRATE.
#Author:       	Rich Bayliss <rich@balena.io>
###################################################################

CAN0_BITRATE=${CAN0_BITRATE:-10000}    # Pull the rate from the environment. (default) 10Kbps
echo "Setting can0 bitrate: ${CAN0_BITRATE}bps"

# Drop the interface first, ignore any errors...
/sbin/ip link set can0 down || true

# Set the rate, again ignoring errors...
/sbin/ip link set can0 up type can bitrate ${CAN0_BITRATE} || true

echo "Starting..."
exec $@     # Run the arguments passed to this script;
            #   from docker CMD value, or commandline
