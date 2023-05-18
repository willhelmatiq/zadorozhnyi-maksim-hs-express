const {describe, it} = require('node:test');
const assert = require('node:assert');
const User = require('../entity/user');

describe('User', () => {
    describe('new()', () => {
        it('should create instance of User', () => {
            const user = new User();
            assert(user instanceof User);
        });

        it('can be created with name and login ', () => {
            const user = new User('userName', 'testUserLogin');
            assert(user instanceof User);
        });
    });

    describe('get name()', () => {
        it('returns value passed to constructor', () => {
            const expected = 'userName'
            const user = new User(expected)
            assert.strictEqual(user.name, expected);
        })
    })
})