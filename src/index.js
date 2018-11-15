/**
 * blear.classes.history
 * @author ydr.me
 * @create 2018年11月15日19:07:02
 */


'use strict';

var Events = require('blear.classes.events');
var object = require('blear.utils.object');

var defaults = {
    maxLength: 100
};
var History = Events.extend({
    className: 'History',
    constructor: function (options) {
        var the = this;

        the[_options] = object.assign({}, defaults, options);
        History.parent(the);
        the[_histories] = [];
        the.length = 0;
        the[_current] = -1;
    },

    /**
     * 新增历史
     * @param record
     * @returns {History}
     */
    push: function (record) {
        var the = this;

        // 不在记录末尾
        if (the[_current] !== the.length - 1) {
            the[_histories].splice(
                the[_current] + 1,
                the.length - the[_current] - 1
            );
            the.length = the[_current] + 1;
        }

        if (the.length === the[_options].maxLength) {
            the[_histories].shift();
            the.length--;
            the[_current]--;
        }

        the[_histories].push(record);
        the.length++;
        the[_current]++;
        the.emit('push', record);
        return the;
    },

    /**
     * 替换历史
     * @param record
     * @returns {History}
     */
    replace: function (record) {
        var the = this;

        if (the[_current] === -1) {
            the[_histories].push(record);
            the.length++;
            the[_current]++;
        } else {
            the[_histories][the[_current]] = record;
        }

        the.emit('replace', record);
        return the;
    },

    /**
     * 获取当前激活的记录
     * @returns {*}
     */
    active: function () {
        var the = this;

        if (the[_current] === -1) {
            return null;
        }

        return the[_histories][the[_current]];
    },

    /**
     * 前进
     * @returns {*}
     */
    forward: function () {
        var the = this;

        switch (the[_current]) {
            case -1:
                return null;

            case the.length - 1:
                return the.active();

            default:
                the[_current]++;
                the.emit('forward');
                return the.active();
        }
    },

    /**
     * 后退
     * @returns {*}
     */
    back: function () {
        var the = this;

        switch (the[_current]) {
            case -1:
                return null;

            case 0:
                return the.active();

            default:
                the[_current]--;
                the.emit('back');
                return the.active();
        }
    },

    /**
     * 跳转到指定点
     * @param index
     * @returns {*}
     */
    go: function (index) {
        var the = this;

        if (the[_current] !== index) {
            the.emit('go', index);
        }

        the[_current] = index;
        return the.active();
    },

    /**
     * 销毁实例
     */
    destroy: function () {
        var the = this;

        the[_histories] = null;
        History.invoke('destroy', the);
    }
});
var proto = History.prototype;
var sole = History.sole;
var _options = sole();
var _histories = sole();
var _current = sole();

History.defaults = defaults;
module.exports = History;



