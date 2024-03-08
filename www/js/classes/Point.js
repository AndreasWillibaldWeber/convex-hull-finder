/**
 * @file Point.js
 * @copyright Andreas W. Weber, 2020
 * @license MIT
 */

/**
 * @classdesc Class that implements the point structure and its functionality.
 * @since 0.1.0
 * @author Andreas W. Weber 
 */
class Point {

    /** 
     * Standard constructor
     * @constructor 
     * @default
     * @param {number=} id
     * @default
     * @param {number=} x
     * @default
     * @param {number=} y
     * @default
     * @param {number=} angleToLP
     * @default
     * @param {Object<Color>=} color
     */
    constructor(id = -1, x = 0, y = 0, 
                angleToLP = 0, color = new Colors().white){

        /** @private
         *  @member {number} */
        this._id = id; 

        /** @private
         *  @member {number} */
        this._x = x; 

        /** @private
         *  @member {number} */
        this._y = y;

        /** @private
         *  @member {number} */
        this._angleToLP = angleToLP;

        /** @private
         *  @member {Object<Color>} */
        this._color = color;

    }

    /** @public
     *  @function
     *  @returns {number} */
    get id () { return this._id; }

    /** @public
     *  @function
     *  @param {number} id */
    set id (id) { this._id = id; }

    /** @public
     *  @function
     *  @returns {number} */
    get x () { return this._x; }

    /** @public
     *  @function
     *  @param {number} x */
    set x (x) { this._x = x; }

    /** @public
     *  @function
     *  @returns {number} */
    get y () { return this._y; }

    /** @public
     *  @function
     *  @param {number} y */
    set y (y) { this._y = y; }

    /** @public
     *  @function
     *  @returns {number} */
    get angleToLP () { return this._angleToLP; }

    /** @public
     *  @function
     *  @param {number} y */
    set angleToLP (angleToLP) { this._angleToLP = angleToLP; }

    /** @public
     *  @function
     *  @returns {Object<Color>} */
    get color () { return this._color; }

    /** @public
     *  @function
     *  @param {Object<Color>} color */
    set color (color) { this._color = color; }

    /**
     * Adds the passed point to the current one and 
     * returns the result as a new point.
     * @public
     * @function
     * @param {Point} point
     * @returns {Point}
     */
    add (point) { 
        
        return new Point(-1, this.x + point.x, this.y + point.y);
    
    }

    /**
     * Subtracts the passed point to the current one and 
     * returns the result as a new point.
     * @public
     * @function
     * @param {Point} point
     * @returns {Point}
     */
    sub (point) { 
        
        return new Point(-1, this.x - point.x, this.y - point.y);
    
    }

}