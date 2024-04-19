// test 
import { test, expect, describe } from 'vitest';
import { getLastURLSegment, getQueryParamsByKey } from './utils';

describe('getLastURLSegment', () => {
  test('should return the last segment from a given url', () => {
    const url = 'https://swapi.dev/api/people/1/';
    const expectedSegment = '1';
    const result = getLastURLSegment(url);
    expect(result).toBe(expectedSegment);
  });

  test('should return null if the url is not in the expected format', () => {
    const url = 'https://swapi.dev/api/people/';
    const result = getLastURLSegment(url);
    expect(result).toBe('people');
  });

  test('should return null if the url is undefined', () => {
    const url = undefined;
    const result = getLastURLSegment(url);
    expect(result).toBeNull();
  });
});

describe('getQueryParamsByKey', () => {
  test('should return the value of the query param with the given key', () => {
    const url = 'https://swapi.dev/api/people/1/?format=json';
    const key = 'format';
    const expectedValue = 'json';
    const result = getQueryParamsByKey(url, key);
    expect(result).toBe(expectedValue);
  });

  test('should return null if the key is not found in the query params', () => {
    const url = 'https://swapi.dev/api/people/1/?format=json';
    const key = 'page';
    const result = getQueryParamsByKey(url, key);
    expect(result).toBeNull();
  });

  test('should get multiple query params', () => {
    const url = 'https://swapi.dev/api/people/1/?format=json&page=2';
    const key = 'page';
    const expectedValue = '2';
    const result = getQueryParamsByKey(url, key);
    expect(result).toBe(expectedValue);

    const key2 = 'format'
    const expectedValue2 = 'json'
    const result2 = getQueryParamsByKey(url, key2);
    expect(result2).toBe(expectedValue2);
  });
})

