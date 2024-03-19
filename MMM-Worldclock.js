/* global Log, Module, moment, config */
/*
 * MagicMirror²
 * Module: worldlock
 *
 * By eouia
 */
Module.register("MMM-Worldclock", {
  // Module config defaults.
  defaults: {
    timeFormat: "LT", // defined in moment.js format()
    style: "left", // where the time could be located; 'top', 'left','right','bottom'
    offsetTimezone: null, // or "Europe/Berlin" to get difference from this timezone to each clock.
    clocks: [
      {
        title: "Seoul",
        timezone: "Asia/Seoul",
        flag: "kr"
      }
    ]
  },
  // Define required scripts.
  getScripts () {
    return ["moment.js", "moment-timezone.js"]
  },
  // Define styles.
  getStyles () {
    return ["MMM-Worldclock.css"]
  },

  getCommands (commander) {
    if (commander.constructor.name === "TelegramBotCommandRegister") {
      return [
        {
          command: "worldclock",
          description: "Tell the time of worldclock",
          callback: "TLGBOT_worldclock"
        }
      ]
    }
  },

  TLGBOT_worldclock (command, handler) {
    let text = ""
    const m = moment()
    for (const c in this.config.clocks) {
      const clock = this.config.clocks[c]
      const title = clock.title
        ? clock.title
        : clock.timezone
      if (clock.timezone) {
        m.tz(clock.timezone)
      } else {
        m.local()
      }

      text += `\`${m.format(this.config.timeFormat)}\``
      text += ` in *${title}*\n`
    }
    text = text
      ? text
      : "I cannot answer now, sorry."
    handler.reply("TEXT", text, {parse_mode: "Markdown"})
  },

  start () {
    this.loadCSS()
    const self = this
    setInterval(() => {
      self.updateDom()
    }, 1000)

    // Set locale.
    moment.locale(config.language)
  },

  clockFormat (c, index) {
    const worldWrapper = document.createElement("div")
    worldWrapper.className = `world world-${index}`

    const clock = moment()

    if (c.timezone == null || undefined) {
      clock.local()
    } else {
      clock.tz(c.timezone)
    }

    let timeFormat
    if (c.timeFormat == null || undefined) {
      timeFormat = this.config.timeFormat
    } else {
      timeFormat = c.timeFormat
    }

    let timeString
    timeString = clock.format(this.config.timeFormat)

    const timeWrapper = document.createElement("div")
    timeWrapper.innerHTML = timeString
    timeWrapper.className = "time"
    // timeWrapper.className = "time bright medium"

    const captionWrapper = document.createElement("div")
    captionWrapper.className = "caption"
    // captionWrapper.className = 'caption small normal'

    const zoneWrapper = document.createElement("div")
    zoneWrapper.className = "zone"

    if (c.title != null) {
      zoneWrapper.innerHTML = c.title
    } else {
      zoneWrapper.innerHTML = c.timezone
    }

    captionWrapper.appendChild(zoneWrapper)

    const gapWrapper = document.createElement("div")
    gapWrapper.className = "gap"

    let gap = ""
    if (this.config.offsetTimezone) {
      let ori = "+"
      const oclock = moment().tz(this.config.offsetTimezone)
      let os = clock.utcOffset() - oclock.utcOffset()
      if (os < 0) {
        os = oclock.utcOffset() - clock.utcOffset()
        ori = "-"
      }

      const dur = moment.duration(os, "minutes")
      gap = ori + moment.utc(dur.asMilliseconds()).format("HH:mm")
    } else {
      gap = `UTC ${clock.format("Z")}`
    }

    gapWrapper.innerHTML = gap

    captionWrapper.appendChild(gapWrapper)

    const mainWrapper = document.createElement("div")
    mainWrapper.className = "main"

    if (c.flag) {
      const flagWrapper = document.createElement("div")
      flagWrapper.className = "flag"
      const flagIconWrapper = document.createElement("span")
      flagIconWrapper.className = "flag-icon flag-icon-squared"
      flagIconWrapper.className += ` flag-icon-${c.flag}`
      flagWrapper.appendChild(flagIconWrapper)
      mainWrapper.appendChild(flagWrapper)
    }


    mainWrapper.appendChild(timeWrapper)

    worldWrapper.appendChild(mainWrapper)
    worldWrapper.appendChild(captionWrapper)

    return worldWrapper
  },

  notificationReceived (noti, payload) {

  },


  // Override dom generator.
  getDom () {
    const wrapper = document.createElement("div")
    wrapper.className =
      "worldtime" +
      ` style-${this.config.style}`
    let c
    for (c in this.config.clocks) {
      wrapper.appendChild(this.clockFormat(this.config.clocks[c], c))
    }
    return wrapper
  },

  loadCSS () {
    const css = [
      {
        id: "flag-icon-CSS",
        href: "https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/2.8.0/css/flag-icon.min.css"
      }
    ]
    css.forEach((c) => {
      if (!document.getElementById(c.id)) {
        const head = document.getElementsByTagName("head")[0]
        const link = document.createElement("link")
        link.id = c.id
        link.rel = "stylesheet"
        link.type = "text/css"
        link.href = c.href
        link.media = "all"
        head.appendChild(link)
      }
    })
  }
})
