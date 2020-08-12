export default class CircularBar {

  constructor(options = {}) {
    this.defaults = {
      num: options.num || 10,
      limit: options.limit || 10,
      circumference: options.circumference || 120,
      fontsize: options.fontsize || 40,
      circleColor: options.circleColor || '#feab18'
    }
    this.animatedNum = 0
    this.canvas = document.getElementById('canvas').getContext('2d')
    this.textWidth = 120
    this.textHeight = 70
    this.centerPos = document.getElementById('canvas').getAttribute('width') / 2
    this.options = Object.assign(this.defaults, options)
  }
  init() {
    this.createBaseCircle()
    this.createInnerCircle()
    this.createNumText()
  }
  createBaseCircle() {
    this.canvas.beginPath()
    this.canvas.arc(this.centerPos, this.centerPos, this.options.circumference, 0, Math.PI * 2, true)
    this.canvas.lineWidth = 20
    this.canvas.strokeStyle = '#ededed'
    this.canvas.stroke()
    this.canvas.closePath()
  }
  createInnerCircle() {
    this.animateCircle(this.options.num)
  }
  createNumText() {
    this.canvas.font = `${this.options.fontsize}px helvetica`
    this.canvas.textAlign = 'center'
    this.canvas.textBaseline = 'middle'
    this.animateText(this.options.num)
  }
  animateText(num) {
    let start = setInterval(() => {
      if (num !== 0 && this.animatedNum !== num) {
        this.redoText()
        this.animatedNum++
        this.canvas.fillText(this.animatedNum, this.centerPos, this.centerPos)
      } else if (this.animatedNum === num) {
        this.canvas.fillText(this.animatedNum, this.centerPos, this.centerPos)
        clearInterval(start)
      }
    }, 400)
  }
  redoText() {
    this.canvas.clearRect(this.centerPos - (this.textWidth / 2), this.centerPos - (this.textHeight / 2), this.textWidth, this.textHeight)
  }
  animateCircle(val) {
    let newVal = 1.5
    const formula = (val / this.options.limit * 2) + 1.5
    let start = setInterval(() => {
      newVal += .01
      if (newVal <= formula) {
        this.canvas.beginPath()
        this.canvas.arc(this.centerPos, this.centerPos, this.options.circumference, Math.PI * 1.5, Math.PI * newVal, false)
        this.canvas.lineWidth = 13
        this.canvas.strokeStyle = this.options.circleColor
        this.canvas.stroke()
        this.canvas.closePath()

      } else {
        clearInterval(start)
      }
    }, 20)

  }
}