/**
 * Main script that instantiates the objects, 
 * assigns the renderer and defines the functions 
 * for the interface.
 * @file main.js
 * @copyright Andreas W. Weber, 2020
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber 
 */

/**
 * Instance of the Convex Hull class.
 * @global
 * @constant
 */
const convexHull = new ConvexHull();

/**
 * Instance of the Renderer class.
 * @global
 * @constant
 */
const renderer = new Renderer('#output', '#points', '#sorted', '#resulting');

/**
 * Entry point.
 */
$(document).ready(init);

/**
 * Initialization function.
 * @function
 */
function init () {
    
    $("#btn_reset").click(reset);
    $("#btn_start").click(start);
    $("#btn_stop").click(stop);

    convexHull.registerRender(renderer);

    reset();

}

/**
 * Reset function.
 * @function
 */
function reset () {

    let n = parseInt($("#ranged_points").val());
        
    convexHull.generateRandomPoints(n);

}

/**
 * Start function.
 * @async
 * @function
 */
async function start () {

    disableControlButtons(true);

    convexHull.pauseTime = getPauseTime();
    
    let selection = $('#selected_algorithm').val();

    if(convexHull.randomPoints.length == 0) reset();

    if (selection == 'GS') {

        await convexHull.startGrahamScan();

    } else if (selection == 'JM') {

        await convexHull.startJarvisMarch();

    }

    disableControlButtons(false);

}

/**
 * Stop function.
 * @function
 */
function stop () {

    convexHull.stop();

    disableControlButtons(false);

}

/**
 * Function to disable the control buttons.
 * @function
 * @param {boolean} turnOff
 */
function disableControlButtons (turnOff) {

    if (turnOff) {

        $("#btn_stop").removeClass('disabled');
        $("#btn_start").addClass('disabled');
        $("#btn_reset").addClass('disabled');
        $("#btn_configuration").addClass('disabled');

    } else {

        $("#btn_stop").addClass('disabled');
        $("#btn_start").removeClass('disabled');
        $("#btn_reset").removeClass('disabled');
        $("#btn_configuration").removeClass('disabled');

    }

}

/**
 * Function to get UI settings and calculate pause time.
 * @function
 * @return {number}
 */
function getPauseTime () {

    let n = 10;
    let pauseTime = 0;

    if ($('#switch_algorithm').is(':checked')) {

        let selected_algorithm = $("#selected_algorithm").val();
        let selected_speed = $("#selected_speed").val();

        switch(selected_speed) {
            case 'HI':
                pauseTime = 125;
                break;
            case 'HM':
                pauseTime = 250;
                break;
            case 'ME':
                pauseTime = 500;
                break;
            case 'LM':
                pauseTime = 750;
                break;
            case 'LO':
                pauseTime = 1000;
                break;
            default:
                pauseTime = 0;
          }

          switch(selected_algorithm) {
            case 'GS':
                n = 10;
                break;
            case 'JM':
                n = 15;
                break;
            default:
                n = 10;
          }
    
    }

    return parseInt(pauseTime * n / 10);

}

