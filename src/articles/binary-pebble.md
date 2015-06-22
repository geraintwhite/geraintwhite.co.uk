<div class="img-container">![Screenshot of Pebble Binary](images/binary-pebble.png)</div>

## [Pebble Binary](https://github.com/grit96/pebble-binary)<span class="lang">C</span>

After building Pebble Info I wanted to get into the Pebble C SDK. I decided to follow the Pebble SDK [Getting Started](http://developer.getpebble.com/getting-started/watchface-tutorial/part1/) guide to help me learn to build a watchface.

I took the Pebble SDK example [Just A Bit](https://github.com/pebble/pebble-sdk-examples/tree/master/watchfaces/just_a_bit) as a starting point and modified how the bits are displayed. I currently have the following features in the watchface:

*   Two rows of bits ([big-endian](https://en.wikipedia.org/wiki/Endianness)) - hours and minutes
*   Number of hours bits is 4 for 12 hour mode and 5 for 24 hour mode
*   Date displayed below binary time
*   Weather displayed for current location
*   Pebble battery percentage
*   Vibration when watch connects/disconnects from Blutooth

I wrote this app in the [CloudPebble IDE](https://cloudpebble.net/ide/) because of the ease of installing the app on my watch. However I have also run apps from the SDK installed on my dev machine.

Pebble Binary is available to download on the [Pebble Appstore](https://apps.getpebble.com/applications/557dc881a404af9b65000051).
