/**
 * blear.classes.history
 * @author ydr.me
 * @create 2016年06月04日14:09:36
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
     * @param item
     * @returns {History}
     */
    push: function (item) {
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

        the[_histories].push(item);
        the.length++;
        the[_current]++;
        return the;
    },

    /**
     * 替换历史
     * @param item
     * @returns {History}
     */
    replace: function (item) {
        var the = this;

        if (the[_current] === -1) {
            the[_histories].push(item);
            the.length++;
            the[_current]++;
        } else {
            the[_histories][the[_current]] = item;
        }

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
        the[_current] = index;
        return the.active();
    }
});
var proto = History.prototype;
var sole = History.sole;
var _options = sole();
var _histories = sole();
var _current = sole();

History.defaults = defaults;
module.exports = History;



