/**
 * Collection of useful utility functions.
 * @file utils.js
 * @copyright Andreas W. Weber, 2020
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber 
 */

/**
 * Simple sleep function.
 * @param @default {number=} miliseconds
 * @returns {Promise}
 */
async function sleep (miliseconds = 0) {

    return new Promise(r => setTimeout(r, miliseconds));

}