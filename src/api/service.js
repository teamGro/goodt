/**
 * @typedef {object} PersonGroup
 * @property {string} name
 * @property {Person[]} persons
 */
/**
 * @typedef {object} Person
 * @property {number} id
 * @property {string} name
 * @property {string} avatar
 * @property {string} position
 * @property {Comment[]} comments
 */
/**
 * @typedef {object} Comment
 * @property {number} id
 * @property {number} personId
 * @property {string} text
 * @property {string} createdAt
 */
/**
 * @typedef {object} ApiServiceOptions
 * @property {string} baseUrl
 */
export default class ApiService {
    /**
     * @param {ApiServiceOptions} options
     */
    constructor({ baseUrl = 'https://61adfd3ea7c7f3001786f510.mockapi.io/' } = {}) {
        this.options = { baseUrl };
    }
    /**
     * @returns {Promise.<Person[], Error>}
     */
    async getPersons() {
        try {
            const response = await fetch(`${this.options.baseUrl}person`);
            return await response.json();
        } catch (err) {
            throw new Error(err);
        }
    }
    /**
     * @returns {Promise.<Comment[], Error>}
     */
    async getComments() {
        // @TODO implement
        try {
            const response = await fetch(`${this.options.baseUrl}comment`)
            return await response.json();
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
