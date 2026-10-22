/**
 * Empty stand-in for the "server-only" package in tests (see vitest.config.ts).
 * The real package throws when imported outside a React Server Components
 * bundle; unit tests only exercise pure logic, so the guard is irrelevant.
 */
export {};
