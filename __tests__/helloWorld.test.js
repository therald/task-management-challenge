import { HELLO_WORLD } from '@/lib/utils';

describe('helloWorld function', () => {
    test('returns "Hello, World!"', () => {
        expect(HELLO_WORLD).toBe('Hello, World!');
    });
});
