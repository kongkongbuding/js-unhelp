/**
 * 动画
 * @author cll1
 * @since 2020-04-01
 */

import TWEEN from '@tweenjs/tween.js'

class DomAnimate {

  requestId

  tween

  constructor(actions) {

    this.initAnimate(actions)
    this.animate()

  }

  initAnimate(actions = []) {

    for (let i = 0, len = actions.length; i < len; i++) {

      let {
        from = {},
        to = {},
        unit = {},
        during = 1000,
        delay = 0,
        repeat = 0,
        repeatDelay = 0,
        easing = 'Linear.None',
        dom,
        update,
        callback
      } = actions[i]

      easing = easing.split('.')

      let easingType = TWEEN.Easing[easing[0]][easing[1]]

      let tween = new TWEEN.Tween(from)
        .to(to, during)
        .easing(easingType)
        .repeat(repeat)
        .repeatDelay(repeatDelay)
        .delay(delay)
        .onUpdate(() => {

          if (update) return update(from)

          if (!dom) return false

          for (let p in from) dom.style[p] = from[p] + (unit[p] || '')

        })
        .onComplete(() => {

          callback && callback()

        })

      actions[i].tween = tween

      if (i > 0) actions[i - 1].tween.chain(tween)

    }

    if (actions[0] && actions[0].tween) {

      this.tween = actions[0].tween

      actions[0].tween.start()

    }

  }

  animate = time => {

    this.requestId = requestAnimationFrame( this.animate )
    
    if (!TWEEN.update(time)) {

      cancelAnimationFrame(this.requestId)

    }

  }

  stop = () => {

    this.tween && this.tween.stop && this.tween.stop()
    this.requestId && cancelAnimationFrame(this.requestId)

  }

}

export default DomAnimate
