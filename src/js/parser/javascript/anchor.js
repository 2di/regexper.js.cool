export default {
  _render() {
    return this.renderLabel(this.label).then(label => label.addClass('anchor'));
  },

  setup() {
    if (this.textValue === '^') {
      this.label = '行开始';
    } else {
      this.label = '行结束';
    }
  }
};
