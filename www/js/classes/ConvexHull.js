/**
 * @file ConvexHull.js
 * @copyright Andreas W. Weber, 2020
 * @license MIT
 */

/** 
 * @classdesc Class which implements the Graham Scan and
 * the Jarvis March Algorithm. 
 * This class also generates and manages point data,
 * which is processed by the algorithm.
 * @since 0.1.0
 * @author Andreas W. Weber
 */
class ConvexHull {

    /** 
     * Standard constructor
     * @constructor 
     */
    constructor () {

        /** @private
         *  @member {!Array<Point>} */
        this._randomPoints = [];

        /** @private 
         *  @member {!Array<Point>} */
        this._sortedPoints = [];

        /** @private 
         *  @member {!Array<Point>} */
        this._resultingPoints = [];

        /** @private 
         *  @member {Object<Point>} */
        this._lowestPoint = null;

        /** @private
         *  @constant
         *  @default
         *  @member {!number} */
        this._ONE_RADIAN = 57.295779513082;

        /** @private
         *  @default 
         *  @member {!number} */
        this._pauseTime = 0;

        /** @private 
         *  @default
         *  @member {!booblean} */
        this._stopFlag = false;

        /** @private
         *  @default
         *  @member {!Object<Colors>} */
        this._colors = new Colors()

    }

    /** @public
     *  @function
     *  @returns {!Array<Point>} */
    get randomPoints () { return this._randomPoints; }

    /** @public
     *  @function
     *  @returns {!Array<Point>} */
    get sortedPoints () { return this._sortedPoints; }

    /** @public
     *  @function
     *  @returns {!Array<Point>} */
    get resultingPoints () { return this._resultingPoints; }

    /** @public
     *  @function
     *  @returns {number} */
    get pauseTime () { return this._pauseTime;}

    /** @public
     *  @function
     *  @param {number} miliseconds */
    set pauseTime (miliseconds) { 
        this._pauseTime = miliseconds; }

    /**
     * Generates a specified number of points. 
     * The number is passed as a parameter. 
     * If the parameter does not exist or is invalid,
     * 3 is set as the default value.
     * @public
     * @function
     * @default
     * @param {number=} numberOfPoints
     * @default
     * @param {number=} x
     * @default
     * @param {number=} y
     */
    generateRandomPoints (numberOfPoints = undefined, 
                            x = undefined, y = undefined) {

        this._randomPoints = [];
        this._sortedPoints = [];
        this._resultingPoints = [];
        this._lowestPoint = null;

        let n = 3;

        let canvasX = 55;
        let canvasY = 55;

        if (numberOfPoints != undefined || 
            typeof numberOfPoints == 'number') { 

                n = parseInt(numberOfPoints);

        }

        if ((x != undefined && y != undefined) ||
            (typeof x == 'number' && typeof y == 'number')) {

                canvasX = parseInt(x) / 10;
                canvasY = parseInt(y) / 10;

        }

        for (let i = 0; i < n; i++) {

            let x = Math.floor(Math.random() * canvasX) + 1;
            let y = Math.floor(Math.random() * canvasY) + 1;
            let newPoint = new Point(i+1, x, y, 0, this._colors.white)

            this._randomPoints.push(newPoint);

        }

        this._pause(true);

    }

    /**
     * Finds the lowest point in the randomly generated points list.
     * This point is marked with the color yellow and stored in a 
     * separate attribute of the object.
     * @private
     * @function
     */
    _findLowestPoint () {

        if (!(this._randomPoints.length > 0)) return;

        this._lowestPoint = this._randomPoints.slice()[0];

        this._randomPoints.forEach( (point) => {

            if (point.y < this._lowestPoint.y) {

                this._lowestPoint = point;

            }

            if (point.y == this._lowestPoint.y && 
                point.x < this._lowestPoint.x) {

                    this._lowestPoint = point;

            }

        });

        this._lowestPoint.color = this._colors.yellow;

    }

    /**
     * Finds the angle between the first and second point.
     * @private
     * @function
     * @param {Object<Point>} p1
     * @param {Object<Point>} p2
     * @returns {number}
     */
    _findAngle (p1, p2) {

        if (!p1 || !p2) return 0;

        let dX = p2.x-p1.x;
        let dY = p2.y-p1.y;

        if ( dX == 0 && dY == 0) return 0;
        
        return Math.atan2(dY, dX) * this._ONE_RADIAN; 

    }

    /**
     * Calculates the cross product of two points.
     * @private
     * @function
     * @param {Object<Point>} p1
     * @param {Object<Point>} p2
     * @returns {number}
     */
    _calculateCrossProduct (p1, p2) {

        return (p1.x * p2.y) - (p1.y * p2.x);

    }

    /**
     * Sorts the randomly generated points by their angle to the 
     * lowest point. The sorted points are marked with the color blue and
     * stored as a array in a separate attribute of the object.
     * @private
     * @function
     */
    _sortPoints () {

        if (!(this._randomPoints.length > 1)) return;
        
        this._findLowestPoint();

        this._sortedPoints = this._randomPoints.slice();

        this._sortedPoints.sort( (p1, p2) => {

            if (this._lowestPoint == p1) return -1;
            if (this._lowestPoint == p2) return 1;

            p1.angleToLP = this._findAngle(this._lowestPoint, p1);
            p2.angleToLP = this._findAngle(this._lowestPoint, p2);

            if (p1.angleToLP < p2.angleToLP) return -1;
            if (p1.angleToLP > p2.angleToLP) return 1;

            return 0; 

        });

    }

    /**
     * Implementation of the Jarvis March Algorithm to find the 
     * minimum points of the convex hull. The resulting points
     * are stored as a array in a seperate attribute of the object.
     * @private
     * @async
     * @function
     */
    async _jarvisMarch () {

        let n = this._sortedPoints.length;

        if (n < 3) return;

        this._findLowestPoint();

        await this._pause(false);

        let lpi = this._sortedPoints.indexOf(this._lowestPoint);

        let ps = lpi;
        let pe = 0;

        do {

            if (this._sortedPoints[ps].color != this._colors.yellow) {

                this._sortedPoints[ps].color = this._colors.green;

            }

            await this._pause(false);
            
            this._resultingPoints.push(this._sortedPoints[ps]);

            pe = (ps+1)%n;
            
            for (let i = 0; i < n; i++) {

                if (i == ps || i == pe) continue;

                let ci = this._sortedPoints[i].color;
                let ce = this._sortedPoints[pe].color;

                this._sortedPoints[i].color = this._colors.red;
                this._sortedPoints[pe].color = this._colors.blue;

                await this._pause(false);

                this._sortedPoints[i].color = ci;
                this._sortedPoints[pe].color = ce;

                let v = this._sortedPoints[pe].sub(this._sortedPoints[i]);
                let w = this._sortedPoints[ps].sub(this._sortedPoints[i]);

                if (this._calculateCrossProduct(v, w) < 0) {

                    if (this._sortedPoints[pe].color == this._colors.white) {

                        this._sortedPoints[pe].color = this._colors.black;
        
                    }

                    pe = i;

                }

                await this._pause(false);

            }

            await this._pause(false);

            ps = pe;

        } while (ps != lpi);

    }

    /**
     * Starts the Jarvis March Algorithm.
     * @public
     * @async
     * @function
     */
    async startJarvisMarch () {

        this._reset();

        if (this._randomPoints.length == 0) this.generateRandomPoints();

        this._sortedPoints = this._randomPoints.slice();

        try {
        
            await this._jarvisMarch();

        } catch (e) { console.log(e); return; }

        await this._pause(true);

    }

    /**
     * Implementation of the Graham Scan Algorithm to find the 
     * minimum points of the convex hull. The resulting points 
     * are stored as a array in a seperate attribute of the object.
     * @private
     * @async
     * @function
     */
    async _grahamScan () {

        if (!(this._sortedPoints.length > 2)) return;

        let p1 = this._sortedPoints[0];
        p1.color = this._colors.yellow;

        let p2 = this._sortedPoints[1];
        p2.color = this._colors.green;

        await this._pause(false);

        this._resultingPoints.push(p1);
        this._resultingPoints.push(p2);

        await this._pause(false);

        let i = 2;
        let n = this._sortedPoints.length;

        while (i < n) {

            let m = this._resultingPoints.length
            let pt1 = this._resultingPoints[m-1];
            let pt2 = this._resultingPoints[m-2];

            let pti = this._sortedPoints[i];
            pti._color = this._colors.red;

            await this._pause(false);

            let v = pt2.sub(pt1);
            let w = pt1.sub(pti);

            if (this._resultingPoints.length <= 2 || 
                this._calculateCrossProduct(v, w) > 0) {

                pti.color = this._colors.green;
                this._resultingPoints.push(pti);
                i++;

            } else {

                pti = this._resultingPoints.pop();
                pti.color = this._colors.black;

            }

            await this._pause(false);

        }

    }

    /**
     * Starts the Graham Scan Algorithm.
     * @public
     * @async
     * @function
     */
    async startGrahamScan () {

        this._reset();

        if (this._randomPoints.length == 0) this.generateRandomPoints();

        this._sortPoints();

        try {
        
            await this._grahamScan();

        } catch (e) { console.log(e); return; }

        await this._pause(true);

    }

    /**
     * Pauses the program flow for the given amount of time.
     * The parameter determines whether the polyline is closed or not.
     * @private
     * @async
     * @function
     * @default
     * @param {boolean=} last
     */
    async _pause(last = false) {

        if (this._renderer != undefined &&
            (this.pauseTime > 0 || last)) {

            this._renderer.render(this._randomPoints, this._sortedPoints, 
                                this.resultingPoints, last);

            await sleep(this._pauseTime);

        }

        this._isStopped();

    }

    /**
     * Checks if the Graham Scan has been stopped.
     * If so, the Graham scan will be reset.
     * @private
     * @function 
     */
    _isStopped () {

        if (this._stopFlag) {

            this._reset();

        }

    }

    /**
     * Stops the Graham Scan Algorithm.
     * @public
     * @function
     */
    stop () {
        this._stopFlag = true;
    }

    /**
     * Reset all point operations.
     * @private
     * @async
     * @function
     */
    async _reset () {

        this._sortedPoints = [];
        this._resultingPoints = [];

        this._randomPoints.forEach( (p) => {

            p.color = this._colors.white;

        });

        await this._pause(true);

        this._stopFlag = false;

    }

    /**
     * Registers a renderer.
     * @public
     * @function
     * @callback renderer
     */
    registerRender (renderer) {

        this._renderer = renderer;

    }
    
}