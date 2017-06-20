# Module: worldclock
This module is derived from default MagicMirror module 'clock' and modified. Thanks to michaelteeuw.
This module displays the current times of several locations.

## Installation

1\. Execute the following commands to install the module:

```bash
cd ~/MagicMirror/modules # navigate to module folder
git clone https://github.com/eouia/worldclock # clone this repository
```

2\. Then, add the following into the `modules` section of your `config/config.js` file:

````javascript
{
  module: 'worldclock',
  position: 'top_left', // This can be any of the regions, best results in top_left or top_right regions
  config: {
    // See 'Configuration options' for more information.

    timeFormat: 'HH:mm A', //defined in moment.js format()
    style: 'top', //predefined 4 styles; 'top', 'left','right','bottom'
    clocks: [
      {
        title: "Home",
      },
      {
        title: "HOLLYWOOD", // Too long title could cause ugly text align.
        timezone: "America/Los_Angeles", //When omitted, Localtime will be displayed. It might be not your purporse, I bet.
        timegap: true, // options: 'true' shows timezone gap by UTC
      },
      {
        timezone: "Asia/Seoul",
      },
    ]
  }
},
````
Of course, you should change the configuration values for your purpose.



## Configuration options

The following properties can be configured:

| Option            | Description
| ----------------- | -----------
| `timeFormat`      | How to format the time of worldclocks <br><br> **Possible example values:** any formatter available in moment.js (eg. `HH:mm A`, `hmmss`) <br> **Default value:** `LT` (It could be displayed like '12:34 AM')
| `style`           | How to display with defined style. <br><br>**Possible values:** `top`, `bottom`, `left`, `right` <br> If you select top, the time will be displayed over the timezone title or UTC gap comment.<br>You can customize this style by modifying CSS with style selector (style-top, style-bottom, style-left, style-right). See the clock_style.css <br> **Default value:** `top`
| `clocks`          | Array of clocks



### clocks configuration options:
| Option            | Description
| ----------------- | -----------
| `title`           | The clock title of each timezone. if it is omitted or null, the `timezone` value will be displayed instead. <br><br> **Example:** `My Home`, `The Golden Gate`, `Hong Kong Office` or `null`  
| `timezone`        | Specify a timezone to show current local time. <br><br> **Possible examples values:** `America/New_York`, `Europe/Berlin`, `Etc/GMT+10` <br>See more informations about configuration value [here](https://momentjs.com/timezone/docs/#/data-formats/packed-format/)<br> **Default value:** `null`<br> If this value is null or omitted, current local timezone value (defined in config.js) will be used. I don't recommend it because the purpose of this module is showing another local time.
| `timegap`         | omittable. It just shows the differential gap with UTC <br><br> **Possible values:** `true` (any other values will be assumed `null` or `false`)


## Style Customizing
I Prefer modifying looks by CSS.<br>
Here is the HTML structure example. You can modify CSS easily with this classname selectors.
```html
<div class="worldtime style-top">
  <div class="world world-0">
    <div class="time bright normal medium">3:38 PM</div>
    <div class="caption">
      <div class="zone">Home</div>
    </div>
    <div class="clearfix"></div>
  </div>
  <div class="world world-1">
    <div class="time bright normal medium">6:38 AM</div>
    <div class="caption">
      <div class="zone">HOLLYWOOD</div>
      <div class="gap">UTC -07:00</div>
    </div>
    <div class="clearfix"></div>
  </div>
</div>
````
Every clock has 'world-[seq.]' as it's classname. So you can modify color of specific clock(eg. 'world-1' means second clock)

And if you set the `style` value in configuration, the classname 'style-[style config value]' will be assigned to top level container block. (eg. `style-top`)

Thanks for everyone.

@eouia
