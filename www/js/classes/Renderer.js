/**
 * @file Renderer.js
 * @copyright Andreas W. Weber, 2020
 * @license MIT
 */

/**
 * @classdesc Class that implements a renderer for the
 * convex hull algorithms.
 * @since 0.1.0
 * @author Andreas W. Weber 
 */
class Renderer {

    /** 
     * Standard constructor
     * @constructor 
     * @param {string} canvasId
     * @param {string} pointsId
     * @param {string} sortedId
     * @param {string} resultingId
     */
    constructor(canvasId, pointsId, sortedId, resultingId){

        /** @private
         *  @member {Object<Canvas>} */
        this._canvas = $(canvasId).get(0);

        /** @private
         *  @member {Object<Context>} */
        this._context = this._canvas.getContext("2d");

        /** @private
         *  @member {string} */
        this._pointsId = pointsId;

        /** @private
         *  @member {string} */
        this._sortedId = sortedId;

        /** @private
         *  @member {string} */
        this._resultingId = resultingId;

        /** @private
         *  @member {string} */
        this._colors = new Colors();

    }

    /**
     * Render points to the point list in the UI.
     * @private
     * @function
     * @param {Array<Point>} points
     */
    _renderPointsToList (points) { 

        $(this._pointsId).html('');

        points.forEach( (p) => {

            let point = `P${p.id} (${p.x}, ${p.y})`;
            let item = `<li class="collection-item">${point}</li>`;

            $(this._pointsId).append(item);

        });

    }

    /**
     * Render points to the sorted point list in the UI.
     * @private
     * @function
     * @param {Array<Point>} points
     */
    _renderSortedToList (points) {

        $(this._sortedId).html('');

        points.forEach( (p) => {

            let itemColors = `${p.color.color} ${p.color.text}`;
            let point = `P${p.id} (${p.angleToLP.toFixed(1)})`;
            let item = `<li class="collection-item ${itemColors}">${point}</li>`;

            $(this._sortedId).append(item);

        });

    }

    /**
     * Render points to the resulting point list in the UI.
     * @private
     * @function
     * @param {Array<Point>} points
     */
    _renderResultingToList (points) { 

        $(this._resultingId).html('');

        points.forEach( (p) => {

            let itemColors = `${p.color.color} ${p.color.text}`;
            let point = `P${p.id}`;
            let item = `<li class="collection-item center ${itemColors}">${point}</li>`;

            $(this._resultingId).append(item);

        });

    }

    /**
     * Render points to the canvas in the UI.
     * @private
     * @function
     * @param {Array<Point>} points
     */
    _renderPointsToCanvas (points) {

        points.forEach( (p) => {

            this._drawCircle(p, 10);

        });

    }

    /**
     * Render points as poly lines to the canvas in the UI.
     * The boolean parameter decides if the poly line is closed.
     * @private
     * @function
     * @param {Array<Point>} points
     * @param {boolean} last
     */
    _renderPolyToCanvas (points, last) {

        this._drawPoly(points, last);

    }

    /**
     * Draw a point as circle to the canvas in the UI.
     * @private
     * @function
     * @param {Object<Point>} point
     * @param {number} radius
     */
    _drawCircle (point, radius) {

        try {

            this._context.beginPath();

            this._context.arc(  point.x*10, 
                                this._canvas.height-(point.y*10), 
                                radius, 
                                0,
                                2*Math.PI
                            );

            this._context.lineWidth = 1;
            this._context.strokeStyle = point.color.colorHex;
            this._context.fillStyle = point.color.colorHex;

            this._context.fill();
            this._context.stroke();

            this._context.font = "15px Comic Sans MS";
            this._context.fillStyle = point.color.textHex;
            this._context.textAlign = "center";

            this._context.fillText( `${point.id}`, 
                                    (point.x*10), 
                                    this._canvas.height-(point.y*10)+parseInt(radius/2)
                                );

        } catch (e) { console.log(e); }

    }

    /**
     * Draw points as a poly line to the canvas in the UI.
     * The boolean parameter decides if the poly line is closed.
     * @private
     * @function
     * @param {Array<Point>} points
     * @param {boolean} last
     */
    _drawPoly (points, last) {

        if (!(points.length > 0)) return;

        try {

            this._context.beginPath();

            this._context.moveTo(   (points[0].x*10), 
                                    this._canvas.height-(points[0].y*10)
                                );

            points.forEach( (point) => {

                this._context.lineTo(   (point.x*10),
                                        this._canvas.height-(point.y*10)
                                    );

            });

            if (last && !(last == undefined)) {

                this._context.lineTo(   (points[0].x*10), 
                                        this._canvas.height-(points[0].y*10)
                                    );

            }

            this._context.closePath;
            this._context.lineWidth = 2;
            this._context.strokeStyle = this._colors.blue.colorHex;
            this._context.fillStyle = this._colors.white.colorHex;

            this._context.stroke();

        } catch (e) { console.log(e); }

    }

    /**
     * Clear the canvas in the UI.
     * @private
     * @function
     */
    _clearCanvas () {

        this._context.clearRect(    0,
                                    0, 
                                    this._canvas.width,
                                    this._canvas.height
                                );

    }

    /**
     * Render points to the UI.
     * @public
     * @function
     * @param {Array<Point>} points
     * @param {Array<Point>} sorted
     * @param {Array<Point>} resulting
     * @param {boolean} last
     */
    render (points, sorted, resulting, last) {

        this._clearCanvas();
        this._renderPointsToList(points);
        this._renderPointsToCanvas(points);
        this._renderSortedToList(sorted);
        this._renderPointsToCanvas(sorted);
        this._renderResultingToList(resulting);
        this._renderPolyToCanvas(resulting, last);
        this._renderPointsToCanvas(resulting);

    }
    
}
