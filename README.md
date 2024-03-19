# Module: MMM-Worldclock

**MMM-Worldclock** is a module for the [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) project.

It displays current times of several locations.

This module is derived from the default MagicMirror module "clock" and modified.

## Screenshot

![Screenshot](screenshot.png)

## Installation

Execute the following commands to install the module:

```bash
cd ~/MagicMirror/modules # navigate to module folder
git clone https://github.com/ulrichwisser/MMM-Worldclock # clone this repository
npm ci # install the dependencies
```

## Configuration

Add the following into the `modules` section of your `config/config.js` file:

```javascript
{
  module: "MMM-Worldclock",
  position: "top_left", // This can be any of the regions, best results in top_left or top_right regions.
  config: {
    // See "Configuration options" for more information.

    timeFormat: "hh:mm A", // defined in moment.js format()
    style: "top", // predefined 4 styles; "top", "left","right","bottom"
    offsetTimezone: null, // Or you can set `Europe/Berlin` to get timegap difference from this timezone. `null` will be UTC timegap.
    clocks: [
      {
        title: "Home",
      },
      {
        title: "HOLLYWOOD", // Too long title could cause ugly text align.
        timezone: "America/Los_Angeles", // When omitted, Localtime will be displayed. It might be not your purporse, I bet.
        flag: "us",
      },
      {
        timezone: "Asia/Seoul",
      },
    ]
  }
},
```

Of course, you should change the configuration values for your purpose.

### Configuration options

The following properties can be configured:

| Option            | Description
| ----------------- | -----------
| `timeFormat`      | How to format the time of worldclocks <br><br> **Possible example values:** any formatter available in moment.js (eg. `HH:mm A`, `hmmss`) <br> **Default value:** `LT` (It could be displayed like "12:34 AM")
| `style`           | How to display with defined style. <br><br>**Possible values:** `top`, `bottom`, `left`, `right` <br> If you select top, the time will be displayed over the timezone title or UTC gap comment.<br>You can customize this style by modifying CSS with style selector (style-top, style-bottom, style-left, style-right). See the clock_style.css <br> **Default value:** `top`
| `offsetTimezone` | `null` or `Europe/Berlin`<br/> If you set `null`, timegap from UTC will be shown. <br> If you set `TIMEZONE` like `Europe/Berlin`, it will show timegap from that timezone.  
| `clocks`          | Array of clocks

#### clocks configuration options

| Option            | Description
| ----------------- | -----------
| `title`           | The clock title of each timezone. if it is omitted or null, the `timezone` value will be displayed instead. <br><br> **Example:** `My Home`, `The Golden Gate`, `Hong Kong Office` or `null`  
| `timezone`        | Specify a timezone to show current local time. <br><br> **Possible examples values:** `America/New_York`, `Europe/Berlin`, `Etc/GMT+10` <br>See more informations about configuration value [here](https://momentjs.com/timezone/docs/#/data-formats/packed-format/)<br> **Default value:** `null`<br> If this value is null or omitted, current local timezone value (defined in config.js) will be used. I don't recommend it because the purpose of this module is showing another local time.<br>All available timzone codes are [here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)
|`flag`  |  [ISO 3166-1-alpha-2 code](https://www.iso.org/obp/ui/#search/code/) for country.
|`timeFormat`|Override module  timeFormat configuration for this clock. For possible values see timeFormat above.

## Update

Go to the module’s folder inside MagicMirror modules folder and pull the latest version from GitHub and install:

```bash
cd ~/MagicMirror/modules/MMM-Worldclock
git pull
npm ci
```

## Style Customizing

Every clock has "world-[seq.]" as it's classname. So you can modify color of specific clock (eg. "world-1" means second clock).

And if you set the `style` value in configuration, the classname "style-[style config value]" will be assigned to top level container block (eg. `style-top`).

## Changelog

* 2024-03-18/2024-03-19
  * Renaming the module from worldclock to MMM-Worldclock.
  * Several cosmetic optimizations with no functional effect.
* 2019-02-24
  * `offsetTimezone` is added.
* 2017-08-25
  * supports `MMM-TelegramBot` (<https://github.com/eouia/MMM-TelegramBot>)
  * command `/worldclock` is added
* 2017-08-10
  * Country flags are supported.
  * HTML/CSS Structures are refined.

Thanks for everyone.
