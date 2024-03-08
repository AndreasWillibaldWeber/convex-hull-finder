/**
 * Main script that instantiates electron.
 * @file main.js
 * @copyright Andreas W. Weber, 2020
 * @license MIT
 * @since 0.1.0
 * @author Andreas W. Weber 
 */

/**
 * Electron import.
 * @global
 * @default
 * @constant
 */
const {app, BrowserWindow} = require('electron')

/**
 * Function to create the main window.
 * @class
 */
function createWindow () {

  /** 
   * Create the main window.
   * @constant @member {Object<BrowserWindow>} mainWindow
   */
  const mainWindow = new BrowserWindow({

    width: 1280,
    height: 775,
    resizable: false,
    webPreferences: {

      nodeIntegration: true

    }

  });

  // some settings for the main window
  mainWindow.loadFile('./www/index.html');
  mainWindow.setMenuBarVisibility(false)
  //mainWindow.webContents.openDevTools()

}

/**
 * Init main window.
 */
app.on('ready', createWindow);

/**
 * Quit when all windows are closed.
 * MacOS cmd+Q support.
 * @function
 */
app.on('window-all-closed', function () {

  // 
  if (process.platform !== 'darwin') app.quit();

});

/**
 * Get new window when all windows are closed.
 * MacOS dock click support.
 * @function
 */
app.on('activate', function () {

  if (BrowserWindow.getAllWindows().length === 0) createWindow();

});
