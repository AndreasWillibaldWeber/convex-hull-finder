/**
 * @file Colors.js
 * @copyright Andreas W. Weber, 2020
 * @license MIT
 */

/**
 * @classdesc Class that defines and handles all colors.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class Colors {

    /** 
     * Standard constructor
     * @constructor 
     */
    constructor () {

        /** @private
         *  @member {!Object<Map>} */
        this._colors = new Map();

        this._init();

    }

    /** 
     * Initiate colors
     * @private
     * @function
     */
    _init () {

        this._colors.set('red', new Color('red darken-4', 
                                        'black-text', 
                                        '#b71c1c', 
                                        '#000000'));

        this._colors.set('green', new Color('green darken-4',
                                            'white-text',
                                            '#1b5e20',
                                            '#ffffff'));

        this._colors.set('blue', new Color( 'blue darken-4',
                                            'white-text',
                                            '#0d47a1',
                                            '#ffffff'));

        this._colors.set('yellow', new Color('yellow darken-4',
                                            'black-text',
                                            '#f57f17',
                                            '#000000'));

        this._colors.set('black', new Color('black',
                                            'white-text',
                                            '#000000',
                                            '#ffffff'));

        this._colors.set('white', new Color('white',
                                            'black-text',
                                            '#ffffff',
                                            '#000000'));
        
    }

    /** @public
     *  @function
     *  @returns {!Object<Color>} */
    get orange () { return this._colors.get('orange'); }

    /** @public
     *  @function
     *  @returns {!Object<Color>} */
    get red () { return this._colors.get('red'); }
    
    /** @public
     *  @function
     *  @returns {!Object<Color>} */
    get green () { return this._colors.get('green'); }
    
    /** @public
     *  @function
     *  @returns {!Object<Color>} */
    get blue () { return this._colors.get('blue'); }
    
    /** @public
     *  @function
     *  @returns {!Object<Color>} */
    get yellow () { return this._colors.get('yellow'); }
    
    /** @public
     *  @function
     *  @returns {!Object<Color>} */
    get black () { return this._colors.get('black'); }
    
    /** @public
     *  @function
     *  @returns {!Object<Color>} */
    get white () { return this._colors.get('white'); }

}