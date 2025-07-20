import { isDevelopment, isProduction } from 'utils/environment';

describe('environment', () => {
    test('should return true for isDevelopment in development environment', () => {
        import.meta.env.DEV = true;
        import.meta.env.PROD = false;

        expect(isDevelopment()).toBe(true);
        expect(isProduction()).toBe(false);
    });

    test('should return true for isProduction in production environment', () => {
        import.meta.env.DEV = false;
        import.meta.env.PROD = true;

        expect(isDevelopment()).toBe(false);
        expect(isProduction()).toBe(true);
    });
});
