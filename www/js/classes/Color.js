/**
 * @file Color.js
 * @copyright Andreas W. Weber, 2020
 * @license MIT
 */

/**
 * @classdesc Class that implements a color object. 
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class Color {

    /** 
     * Standard constructor
     * @constructor
     */
    constructor(color, text, colorHex, textHex){

        /** @private
         *  @member {string} */
        this._color = color;

        /** @private
         *  @member {string} */
        this._text = text;

        /** @private
         *  @member {string} */
        this._colorHex = colorHex;

        /** @private
         *  @member {string} */
        this._textHex = textHex;

    }

    /** @public
     *  @function
     *  @returns {string} */
    get color () { return this._color; }

    /** @public
     *  @function
     *  @returns {string} */
    get text () { return this._text; }

    /** @public
     *  @function
     *  @returns {string} */
    get colorHex () { return this._colorHex; }

    /** @public
     *  @function
     *  @returns {string} */
    get textHex () { return this._textHex; }

}