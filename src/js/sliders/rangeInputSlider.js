module.exports = function RangeInput(element, options) {
    var isAnimating = false;
    var lastXPos = 0;
    var initialXPos = 0;
    var lastThumbPos = 0;
    var thumb = element.querySelector('.thumb');
    var initialRatio = options.initialRatio;
    var width;
    var isPointerEvents = !!window.PointerEvent;
    var isToggleMouse = true;

    // todo: implement keyboard input

    /**
     * Add Event Listeners
     */
    this.init = function () {
        var eventType; //pointer or touch
        var handlerNames = '☺,Start,Move,End,End,Start'.split(',');

        thumb.style.left = (100 * initialRatio) + '%';

        (isPointerEvents ? 'pointer,down,move,up,cancel' : 'touch,start,move,end,cancel,mousedown').split(',').forEach(function (eventName, i) {
            if (!i) eventType = eventName;
            else thumb.addEventListener((i === 5 ? '' : eventType) + eventName, this['handleGesture' + handlerNames[i]], true);
        }.bind(this));

        // Add Key Listener
        // thumb.addEventListener('keydown', this.handleKeyDown, true);
    };

    /**
     * Handle Gesture Start
     * @type {()}
     */
    this.handleGestureStart = function (evt) {
        evt.preventDefault();

        // if this is a mousedown event, and it is NOT the LEFT mousebutton, ignore it.
        var button = evt.which || evt.button;
        if (button && button > 1) return;

        var point = getGesturePointFromEvent(evt);
        initialXPos = point.x;

        // cache the width when starting a gesture
        width = element.clientWidth;

        // Add the move and end listeners
        if (isPointerEvents) {
            evt.target.setPointerCapture(evt.pointerId);
        } else {
            // Add Mouse Listeners
            this.toggleMouseEventListeners();
        }
    }.bind(this);

    /**
     * Handle Gesture End
     * @type {()}
     */
    this.handleGestureEnd = function (evt) {
        evt.preventDefault();

        if (evt.targetTouches && evt.targetTouches.length > 0) {
            return;
        }

        // Remove Event Listeners
        if (isPointerEvents) {
            evt.target.releasePointerCapture(evt.pointerId);
        } else {
            // Remove Mouse Listeners
            this.toggleMouseEventListeners();
        }

        isAnimating = false;
        lastThumbPos = lastThumbPos + lastXPos - initialXPos;

        // fix for going past (end of slider or min or max) while moving slider
        var ratio = initialRatio + (lastThumbPos / width);
        if (ratio > 1) {
            lastThumbPos = width * (1 - initialRatio);
        }
        if (ratio < 0) {
            lastThumbPos = width * (-initialRatio);
        }
        if (options.maxRatio && ratio > options.maxRatio) {
            lastThumbPos = width * (options.maxRatio - initialRatio);
        }
        if (options.minRatio && ratio < options.minRatio) {
            lastThumbPos = width * (options.minRatio - initialRatio);
        }
        initialXPos = null;
    }.bind(this);

    /**
     * Handle Gesture Move
     * @type {()}
     */
    this.handleGestureMove = function (evt) {
        evt.preventDefault();

        if (evt.targetTouches && evt.targetTouches.length > 1) {
            return;
        }

        if (!initialXPos) {
            return;
        }

        var point = getGesturePointFromEvent(evt);
        lastXPos = point.x;

        if (isAnimating) {
            return;
        }

        isAnimating = true;
        window.requestAnimationFrame(onAnimFrame);
    };
    // }.bind(this);

    /**
     * Handle Keyboard Events (not yet used)
     * @param evt
     */
    // this.handleKeyDown = function (evt) {
    // keyCode : 37-40: left, up, right, down
    // if (e.keyCode > 36 && e.keyCode < 41) {
    //   this.value = value + (e.keyCode === 38 || e.keyCode === 39 ? step : -step);
    // }
    // };

    /**
     * Toggle Mouse Event Listeners
     */
    this.toggleMouseEventListeners = function (isRemove) {
        var action = (isToggleMouse && !isRemove ? 'add' : 'remove') + 'EventListener';
        document.body[action]('mousemove', this.handleGestureMove);
        document.body[action]('mouseup', this.handleGestureEnd);
        isToggleMouse = !isToggleMouse;
    }.bind(this);

    /**
     * Normalize Point object
     * @type {()}
     */
    function getGesturePointFromEvent(evt) {
        var point = {};

        if (evt.targetTouches) {
            // Prefer Touch Events
            point.x = evt.targetTouches[0].clientX;
        } else {
            // Either Mouse event or Pointer Event
            point.x = evt.clientX;
        }

        return point;
    }

    /**
     * Main Event Loop
     * @type {()}
     */
    function onAnimFrame() {
        if (!isAnimating) {
            return;
        }

        var newXTransform = lastThumbPos + lastXPos - initialXPos;
        var ratio = initialRatio + (newXTransform / width);

        if (ratio > 1) {
            ratio = 1;
        } else if (ratio < 0) {
            ratio = 0;
        }

        if (options.maxRatio && ratio > options.maxRatio) {
            ratio = options.maxRatio;
        }
        if (options.minRatio && ratio < options.minRatio) {
            ratio = options.minRatio;
        }

        thumb.style.left = (ratio * 100) + '%';

        options.onChange && options.onChange(ratio);

        isAnimating = false;
    }

    /**
     * Destroy
     * be good to the memory usage - remove event listeners and node references
     * @type {()}
     */
    this.destroy = function () {
        // Remove Mouse Listeners
        this.toggleMouseEventListeners(/* isRemove = */ true);
        // Ensure elements are not referenced so that they and any listeners are Garbage Collected
        thumb = null;
        element = null;
        options = null;
    }.bind(this);

    this.setMin = function (min) {
        options.minRatio = min;
    };

    this.setMax = function (max) {
        options.maxRatio = max;
    };

    this.init();
};