/**
 * mocha 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var expect = require('chai-jasmine').expect;
var History = require('../src/index.js');

describe('blear.classes.history', function () {

    it('先 push', function () {
        var history = new History();

        expect(history.active()).toBe(null);
        expect(history.length).toBe(0);

        history.push('A');
        expect(history.active()).toBe('A');
        expect(history.length).toBe(1);

        history.replace('B');
        expect(history.active()).toBe('B');
        expect(history.length).toBe(1);
    });

    it('先 replace', function () {
        var history = new History();

        expect(history.active()).toBe(null);
        expect(history.length).toBe(0);

        history.replace('A');
        expect(history.active()).toBe('A');
        expect(history.length).toBe(1);

        history.replace('B');
        expect(history.active()).toBe('B');
        expect(history.length).toBe(1);
    });

    it('-1 前进', function () {
        var history = new History();

        expect(history.active()).toBe(null);
        expect(history.length).toBe(0);

        expect(history.forward()).toBe(null);
        expect(history.length).toBe(0);
    });

    it('末尾前进', function () {
        var history = new History();

        history.push('A');
        expect(history.forward()).toBe('A');
    });

    it('-1 后退', function () {
        var history = new History();

        expect(history.active()).toBe(null);
        expect(history.length).toBe(0);

        expect(history.back()).toBe(null);
        expect(history.length).toBe(0);
    });

    it('起点后退', function () {
        var history = new History();

        history.push('A');
        expect(history.back()).toBe('A');
    });

    it('指定移动', function () {
        var history = new History();

        history.push('A');    // -->0
        history.push('B');    // -->1
        history.push('C');    // -->2
        history.replace('D'); // ---->2
        history.replace('E'); // ------->2
        history.push('F');    // ------->3

        expect(history.length).toBe(4);
        expect(history.active()).toBe('F');

        expect(history.go(0)).toBe('A');
        expect(history.forward()).toBe('B');
        expect(history.back()).toBe('A');

        expect(history.go(2)).toBe('E');
        expect(history.forward()).toBe('F');
        expect(history.back()).toBe('E');

        expect(history.go(1)).toBe('B');
        expect(history.forward()).toBe('E');
        expect(history.back()).toBe('B');

        expect(history.go(3)).toBe('F');
        expect(history.forward()).toBe('F');
        expect(history.back()).toBe('E');
    });

    it('中途 push', function () {
        var history = new History();

        history.push('A');    // -->0
        history.push('B');    // -->1
        history.push('C');    // -->2
        history.replace('D'); // ---->2
        history.replace('E'); // ------->2
        history.push('F');    // ------->3

        history.go(1);
        // A --> B --> G
        history.push('G');
        expect(history.length).toBe(3);
        expect(history.active()).toBe('G');
    });

    it('中途 replace', function () {
        var history = new History();

        history.push('A');    // -->0
        history.push('B');    // -->1
        history.push('C');    // -->2
        history.replace('D'); // ---->2
        history.replace('E'); // ------->2
        history.push('F');    // ------->3

        history.go(1);
        // A --> B --> G --> F
        history.replace('G');
        expect(history.length).toBe(4);
        expect(history.active()).toBe('G');
    });

    it('最大长度', function () {
        var history = new History({
            maxLength: 3
        });

        history.push('A'); // >>>> drop
        history.push('B');
        history.push('C');
        history.push('D');

        expect(history.length).toBe(3);
        expect(history.go(0)).toBe('B');
        expect(history.go(1)).toBe('C');
        expect(history.go(2)).toBe('D');
    });
});

