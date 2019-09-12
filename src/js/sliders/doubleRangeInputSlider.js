var RangeInput = require('./rangeInputSlider');

module.exports = function DoubleRangeInput(element, options) {
    var minPossibleValue = options.min || 0;
    var maxPossibleValue = options.max || 100;
    var possibleRange = maxPossibleValue - minPossibleValue;
    var valueLow = options.valueLow || minPossibleValue;
    var valueHigh = options.valueHigh || maxPossibleValue;
    var initialLowRatio = (valueLow - minPossibleValue) / possibleRange;
    var initialHighRatio = (valueHigh - minPossibleValue) / possibleRange;
    var step = options.step || 1;
    var lowRangeInput;
    var highRangeInput;
    var rangeNode = element.querySelector('.range');

    function getValueFromRatio(ratio) {
        return (Math.round((minPossibleValue + ratio * (possibleRange)) / step) * step).toFixed(0);
    }

    function onLowChange(ratio) {
        highRangeInput.setMin(ratio);
        valueLow = getValueFromRatio(ratio);
        rangeNode.style.left = (100 * ratio) + '%';
        options.onChange && options.onChange(valueLow, valueHigh);
    }

    function onHighChange(ratio) {
        lowRangeInput.setMax(ratio);
        valueHigh = getValueFromRatio(ratio);
        rangeNode.style.right = (100 * (1 - ratio)) + '%';
        options.onChange && options.onChange(valueLow, valueHigh);
    }

    this.init = function () {
        lowRangeInput = new RangeInput(element.querySelector('.min'), {
            onChange: onLowChange,
            initialRatio: initialLowRatio
        });
        highRangeInput = new RangeInput(element.querySelector('.max'), {
            onChange: onHighChange,
            initialRatio: initialHighRatio
        });
        onLowChange(initialLowRatio);
        onHighChange(initialHighRatio);
    };

    this.destroy = function () {
        // Ensure elements are not referenced so that they and any listeners are Garbage Collected
        lowRangeInput.destroy();
        highRangeInput.destroy();
        element = null;
        options = null;
    };

    this.init();
};
