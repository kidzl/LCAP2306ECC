(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MyApp/i18n/i18n.properties":
/*!******************************************************!*\
  !*** ./build.definitions/MyApp/i18n/i18n.properties ***!
  \******************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MyApp/Rules/AppUpdateFailure.js":
/*!***********************************************************!*\
  !*** ./build.definitions/MyApp/Rules/AppUpdateFailure.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
    let result = clientAPI.actionResults.AppUpdate.error.toString();
    var message;
    console.log(result);
    if (result.startsWith('Error: Uncaught app extraction failure:')) {
        result = 'Error: Uncaught app extraction failure:';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
        result = 'Application instance is not up or running';
    }
    if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
        result = 'Service instance not found.';
    }

    switch (result) {
        case 'Service instance not found.':
            message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
            message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
            break;
        case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
            message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
            break;
        case 'Error: Uncaught app extraction failure:':
            message = 'Error extracting metadata. Please redeploy and try again.';
            break;
        case 'Application instance is not up or running':
            message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
            break;
        default:
            message = result;
            break;
    }
    return clientAPI.getPageProxy().executeAction({
        "Name": "/MyApp/Actions/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyApp/Rules/AppUpdateSuccess.js":
/*!***********************************************************!*\
  !*** ./build.definitions/MyApp/Rules/AppUpdateSuccess.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
    return (new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve();
        }, ms);
    }));
}
function AppUpdateSuccess(clientAPI) {
    var message;
    // Force a small pause to let the progress banner show in case there is no new version available
    return sleep(500).then(function() {
        let result = clientAPI.actionResults.AppUpdate.data;
        console.log(result);

        let versionNum = result.split(': ')[1];
        if (result.startsWith('Current version is already up to date')) {
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MyApp/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/MyApp/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Duration": 5,
                    "Message": message,
                    "NumberOfLines": 2
                }
            });
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyApp/Rules/OnWillUpdate.js":
/*!*******************************************************!*\
  !*** ./build.definitions/MyApp/Rules/OnWillUpdate.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/MyApp/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/MyApp/Rules/ResetAppSettingsAndLogout.js":
/*!********************************************************************!*\
  !*** ./build.definitions/MyApp/Rules/ResetAppSettingsAndLogout.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
    let logger = context.getLogger();
    let platform = context.nativescript.platformModule;
    let appSettings = context.nativescript.appSettingsModule;
    var appId;
    if (platform && (platform.isIOS || platform.isAndroid)) {
        appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
    } else {
        appId = 'WindowsClient';
    }
    try {
        // Remove any other app specific settings
        appSettings.getAllKeys().forEach(key => {
            if (key.substring(0, appId.length) === appId) {
                appSettings.remove(key);
            }
        });
    } catch (err) {
        logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
    } finally {
        // Logout 
        return context.getPageProxy().executeAction('/MyApp/Actions/Logout.action');
    }
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let myapp_actions_appupdate_action = __webpack_require__(/*! ./MyApp/Actions/AppUpdate.action */ "./build.definitions/MyApp/Actions/AppUpdate.action")
let myapp_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MyApp/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MyApp/Actions/AppUpdateFailureMessage.action")
let myapp_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MyApp/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MyApp/Actions/AppUpdateProgressBanner.action")
let myapp_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MyApp/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MyApp/Actions/AppUpdateSuccessMessage.action")
let myapp_actions_authors_navtoauthors_detail_action = __webpack_require__(/*! ./MyApp/Actions/Authors/NavToAuthors_Detail.action */ "./build.definitions/MyApp/Actions/Authors/NavToAuthors_Detail.action")
let myapp_actions_authors_navtoauthors_list_action = __webpack_require__(/*! ./MyApp/Actions/Authors/NavToAuthors_List.action */ "./build.definitions/MyApp/Actions/Authors/NavToAuthors_List.action")
let myapp_actions_books_navtobooks_detail_action = __webpack_require__(/*! ./MyApp/Actions/Books/NavToBooks_Detail.action */ "./build.definitions/MyApp/Actions/Books/NavToBooks_Detail.action")
let myapp_actions_books_navtobooks_list_action = __webpack_require__(/*! ./MyApp/Actions/Books/NavToBooks_List.action */ "./build.definitions/MyApp/Actions/Books/NavToBooks_List.action")
let myapp_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MyApp/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MyApp/Actions/CloseModalPage_Cancel.action")
let myapp_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MyApp/Actions/CloseModalPage_Complete.action */ "./build.definitions/MyApp/Actions/CloseModalPage_Complete.action")
let myapp_actions_closepage_action = __webpack_require__(/*! ./MyApp/Actions/ClosePage.action */ "./build.definitions/MyApp/Actions/ClosePage.action")
let myapp_actions_contacts_navtocontacts_detail_action = __webpack_require__(/*! ./MyApp/Actions/Contacts/NavToContacts_Detail.action */ "./build.definitions/MyApp/Actions/Contacts/NavToContacts_Detail.action")
let myapp_actions_contacts_navtocontacts_list_action = __webpack_require__(/*! ./MyApp/Actions/Contacts/NavToContacts_List.action */ "./build.definitions/MyApp/Actions/Contacts/NavToContacts_List.action")
let myapp_actions_logout_action = __webpack_require__(/*! ./MyApp/Actions/Logout.action */ "./build.definitions/MyApp/Actions/Logout.action")
let myapp_actions_logoutmessage_action = __webpack_require__(/*! ./MyApp/Actions/LogoutMessage.action */ "./build.definitions/MyApp/Actions/LogoutMessage.action")
let myapp_actions_onwillupdate_action = __webpack_require__(/*! ./MyApp/Actions/OnWillUpdate.action */ "./build.definitions/MyApp/Actions/OnWillUpdate.action")
let myapp_actions_service_initializeonline_action = __webpack_require__(/*! ./MyApp/Actions/Service/InitializeOnline.action */ "./build.definitions/MyApp/Actions/Service/InitializeOnline.action")
let myapp_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./MyApp/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/MyApp/Actions/Service/InitializeOnlineFailureMessage.action")
let myapp_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./MyApp/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/MyApp/Actions/Service/InitializeOnlineSuccessMessage.action")
let myapp_globals_appdefinition_version_global = __webpack_require__(/*! ./MyApp/Globals/AppDefinition_Version.global */ "./build.definitions/MyApp/Globals/AppDefinition_Version.global")
let myapp_i18n_i18n_properties = __webpack_require__(/*! ./MyApp/i18n/i18n.properties */ "./build.definitions/MyApp/i18n/i18n.properties")
let myapp_jsconfig_json = __webpack_require__(/*! ./MyApp/jsconfig.json */ "./build.definitions/MyApp/jsconfig.json")
let myapp_pages_authors_authors_detail_page = __webpack_require__(/*! ./MyApp/Pages/Authors/Authors_Detail.page */ "./build.definitions/MyApp/Pages/Authors/Authors_Detail.page")
let myapp_pages_authors_authors_list_page = __webpack_require__(/*! ./MyApp/Pages/Authors/Authors_List.page */ "./build.definitions/MyApp/Pages/Authors/Authors_List.page")
let myapp_pages_books_books_detail_page = __webpack_require__(/*! ./MyApp/Pages/Books/Books_Detail.page */ "./build.definitions/MyApp/Pages/Books/Books_Detail.page")
let myapp_pages_books_books_list_page = __webpack_require__(/*! ./MyApp/Pages/Books/Books_List.page */ "./build.definitions/MyApp/Pages/Books/Books_List.page")
let myapp_pages_contacts_contacts_detail_page = __webpack_require__(/*! ./MyApp/Pages/Contacts/Contacts_Detail.page */ "./build.definitions/MyApp/Pages/Contacts/Contacts_Detail.page")
let myapp_pages_contacts_contacts_list_page = __webpack_require__(/*! ./MyApp/Pages/Contacts/Contacts_List.page */ "./build.definitions/MyApp/Pages/Contacts/Contacts_List.page")
let myapp_pages_main_page = __webpack_require__(/*! ./MyApp/Pages/Main.page */ "./build.definitions/MyApp/Pages/Main.page")
let myapp_rules_appupdatefailure_js = __webpack_require__(/*! ./MyApp/Rules/AppUpdateFailure.js */ "./build.definitions/MyApp/Rules/AppUpdateFailure.js")
let myapp_rules_appupdatesuccess_js = __webpack_require__(/*! ./MyApp/Rules/AppUpdateSuccess.js */ "./build.definitions/MyApp/Rules/AppUpdateSuccess.js")
let myapp_rules_onwillupdate_js = __webpack_require__(/*! ./MyApp/Rules/OnWillUpdate.js */ "./build.definitions/MyApp/Rules/OnWillUpdate.js")
let myapp_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MyApp/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MyApp/Rules/ResetAppSettingsAndLogout.js")
let myapp_services_service1_service = __webpack_require__(/*! ./MyApp/Services/service1.service */ "./build.definitions/MyApp/Services/service1.service")
let myapp_styles_styles_css = __webpack_require__(/*! ./MyApp/Styles/Styles.css */ "./build.definitions/MyApp/Styles/Styles.css")
let myapp_styles_styles_json = __webpack_require__(/*! ./MyApp/Styles/Styles.json */ "./build.definitions/MyApp/Styles/Styles.json")
let myapp_styles_styles_less = __webpack_require__(/*! ./MyApp/Styles/Styles.less */ "./build.definitions/MyApp/Styles/Styles.less")
let myapp_styles_styles_nss = __webpack_require__(/*! ./MyApp/Styles/Styles.nss */ "./build.definitions/MyApp/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	myapp_actions_appupdate_action : myapp_actions_appupdate_action,
	myapp_actions_appupdatefailuremessage_action : myapp_actions_appupdatefailuremessage_action,
	myapp_actions_appupdateprogressbanner_action : myapp_actions_appupdateprogressbanner_action,
	myapp_actions_appupdatesuccessmessage_action : myapp_actions_appupdatesuccessmessage_action,
	myapp_actions_authors_navtoauthors_detail_action : myapp_actions_authors_navtoauthors_detail_action,
	myapp_actions_authors_navtoauthors_list_action : myapp_actions_authors_navtoauthors_list_action,
	myapp_actions_books_navtobooks_detail_action : myapp_actions_books_navtobooks_detail_action,
	myapp_actions_books_navtobooks_list_action : myapp_actions_books_navtobooks_list_action,
	myapp_actions_closemodalpage_cancel_action : myapp_actions_closemodalpage_cancel_action,
	myapp_actions_closemodalpage_complete_action : myapp_actions_closemodalpage_complete_action,
	myapp_actions_closepage_action : myapp_actions_closepage_action,
	myapp_actions_contacts_navtocontacts_detail_action : myapp_actions_contacts_navtocontacts_detail_action,
	myapp_actions_contacts_navtocontacts_list_action : myapp_actions_contacts_navtocontacts_list_action,
	myapp_actions_logout_action : myapp_actions_logout_action,
	myapp_actions_logoutmessage_action : myapp_actions_logoutmessage_action,
	myapp_actions_onwillupdate_action : myapp_actions_onwillupdate_action,
	myapp_actions_service_initializeonline_action : myapp_actions_service_initializeonline_action,
	myapp_actions_service_initializeonlinefailuremessage_action : myapp_actions_service_initializeonlinefailuremessage_action,
	myapp_actions_service_initializeonlinesuccessmessage_action : myapp_actions_service_initializeonlinesuccessmessage_action,
	myapp_globals_appdefinition_version_global : myapp_globals_appdefinition_version_global,
	myapp_i18n_i18n_properties : myapp_i18n_i18n_properties,
	myapp_jsconfig_json : myapp_jsconfig_json,
	myapp_pages_authors_authors_detail_page : myapp_pages_authors_authors_detail_page,
	myapp_pages_authors_authors_list_page : myapp_pages_authors_authors_list_page,
	myapp_pages_books_books_detail_page : myapp_pages_books_books_detail_page,
	myapp_pages_books_books_list_page : myapp_pages_books_books_list_page,
	myapp_pages_contacts_contacts_detail_page : myapp_pages_contacts_contacts_detail_page,
	myapp_pages_contacts_contacts_list_page : myapp_pages_contacts_contacts_list_page,
	myapp_pages_main_page : myapp_pages_main_page,
	myapp_rules_appupdatefailure_js : myapp_rules_appupdatefailure_js,
	myapp_rules_appupdatesuccess_js : myapp_rules_appupdatesuccess_js,
	myapp_rules_onwillupdate_js : myapp_rules_onwillupdate_js,
	myapp_rules_resetappsettingsandlogout_js : myapp_rules_resetappsettingsandlogout_js,
	myapp_services_service1_service : myapp_services_service1_service,
	myapp_styles_styles_css : myapp_styles_styles_css,
	myapp_styles_styles_json : myapp_styles_styles_json,
	myapp_styles_styles_less : myapp_styles_styles_less,
	myapp_styles_styles_nss : myapp_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/MyApp/Styles/Styles.css":
/*!***************************************************!*\
  !*** ./build.definitions/MyApp/Styles/Styles.css ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MyApp/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MyApp/Styles/Styles.less":
/*!****************************************************!*\
  !*** ./build.definitions/MyApp/Styles/Styles.less ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MyApp/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MyApp/Styles/Styles.nss":
/*!***************************************************!*\
  !*** ./build.definitions/MyApp/Styles/Styles.nss ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../../../css-loader/dist/runtime/api.js":
/*!**************************************************!*\
  !*** ../../../../css-loader/dist/runtime/api.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../../../css-loader/dist/runtime/sourceMaps.js":
/*!*********************************************************!*\
  !*** ../../../../css-loader/dist/runtime/sourceMaps.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MyApp/Pages/Authors/Authors_Detail.page":
/*!*******************************************************************!*\
  !*** ./build.definitions/MyApp/Pages/Authors/Authors_Detail.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Authors Detail","DesignTimeTarget":{"Service":"/MyApp/Services/service1.service","EntitySet":"Authors","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ID}","Subhead":"{createdAt}","BodyText":"","Footnote":"{modifiedAt}","Description":"{createdBy}","StatusText":"{modifiedBy}","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"createdAt","Value":"{createdAt}"},{"KeyName":"createdBy","Value":"{createdBy}"},{"KeyName":"modifiedAt","Value":"{modifiedAt}"},{"KeyName":"modifiedBy","Value":"{modifiedBy}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"books"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{stock}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{title}","Footnote":"{price}","PreserveIconStackSpacing":false,"StatusText":"{currency}","Subhead":"{ID}","SubstatusText":"","OnPress":"/MyApp/Actions/Books/NavToBooks_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/books","Service":"/MyApp/Services/service1.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Books"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Authors_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApp/Pages/Authors/Authors_List.page":
/*!*****************************************************************!*\
  !*** ./build.definitions/MyApp/Pages/Authors/Authors_List.page ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Authors","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{createdBy}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MyApp/Actions/Authors/NavToAuthors_Detail.action","StatusImage":"","Title":"{ID}","Footnote":"{modifiedAt}","PreserveIconStackSpacing":false,"StatusText":"{modifiedBy}","Subhead":"{createdAt}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Authors","Service":"/MyApp/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Authors_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApp/Pages/Books/Books_Detail.page":
/*!***************************************************************!*\
  !*** ./build.definitions/MyApp/Pages/Books/Books_Detail.page ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Books Detail","DesignTimeTarget":{"Service":"/MyApp/Services/service1.service","EntitySet":"Books","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{title}","Subhead":"{ID}","BodyText":"","Footnote":"{price}","Description":"{stock}","StatusText":"{currency}","StatusImage":"","SubstatusImage":"","SubstatusText":""},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"ID","Value":"{ID}"},{"KeyName":"title","Value":"{title}"},{"KeyName":"stock","Value":"{stock}"},{"KeyName":"price","Value":"{price}"},{"KeyName":"currency","Value":"{currency}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Books_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApp/Pages/Books/Books_List.page":
/*!*************************************************************!*\
  !*** ./build.definitions/MyApp/Pages/Books/Books_List.page ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Books","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{stock}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MyApp/Actions/Books/NavToBooks_Detail.action","StatusImage":"","Title":"{title}","Footnote":"{price}","PreserveIconStackSpacing":false,"StatusText":"{currency}","Subhead":"{ID}","SubstatusText":""},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Books","Service":"/MyApp/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Books_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApp/Pages/Contacts/Contacts_Detail.page":
/*!*********************************************************************!*\
  !*** ./build.definitions/MyApp/Pages/Contacts/Contacts_Detail.page ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Contacts Detail","DesignTimeTarget":{"Service":"/MyApp/Services/service1.service","EntitySet":"Contacts","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{FullName}","Subhead":"{IdentityIsRemoved}","BodyText":"","Footnote":"{IsMarkedForDeletion}","Description":"{BirthDate}","StatusText":"{IsConsumer}","StatusImage":"","SubstatusImage":"","SubstatusText":"{IsContactPerson}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"IdentityIsRemoved","Value":"{IdentityIsRemoved}"},{"KeyName":"BirthDate","Value":"{BirthDate}"},{"KeyName":"IsMarkedForDeletion","Value":"{IsMarkedForDeletion}"},{"KeyName":"IsConsumer","Value":"{IsConsumer}"},{"KeyName":"IsContactPerson","Value":"{IsContactPerson}"},{"KeyName":"Latitude","Value":"{Latitude}"},{"KeyName":"LastChangeDateTime","Value":"{LastChangeDateTime}"},{"KeyName":"InteractionContactImageURL","Value":"{InteractionContactImageURL}"},{"KeyName":"LastChangedByUser","Value":"{LastChangedByUser}"},{"KeyName":"Longitude","Value":"{Longitude}"},{"KeyName":"CreationDateTime","Value":"{CreationDateTime}"},{"KeyName":"CreatedByUser","Value":"{CreatedByUser}"},{"KeyName":"SpatialReferenceSystem","Value":"{SpatialReferenceSystem}"},{"KeyName":"IsMainContact","Value":"{IsMainContact}"},{"KeyName":"FullName","Value":"{FullName}"},{"KeyName":"FirstName","Value":"{FirstName}"},{"KeyName":"LastName","Value":"{LastName}"},{"KeyName":"Department","Value":"{Department}"},{"KeyName":"DepartmentName","Value":"{DepartmentName}"},{"KeyName":"Function","Value":"{Function}"},{"KeyName":"ContactFunctionName","Value":"{ContactFunctionName}"},{"KeyName":"MaritalStatus","Value":"{MaritalStatus}"},{"KeyName":"MaritalStatusName","Value":"{MaritalStatusName}"},{"KeyName":"CityName","Value":"{CityName}"},{"KeyName":"StreetName","Value":"{StreetName}"},{"KeyName":"AddressHouseNumber","Value":"{AddressHouseNumber}"},{"KeyName":"Language","Value":"{Language}"},{"KeyName":"LanguageName","Value":"{LanguageName}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"MobileNumber","Value":"{MobileNumber}"},{"KeyName":"FaxNumber","Value":"{FaxNumber}"},{"KeyName":"HasMktgPermissionForDirectMail","Value":"{HasMktgPermissionForDirectMail}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"CountryName","Value":"{CountryName}"},{"KeyName":"AddressRegion","Value":"{AddressRegion}"},{"KeyName":"RegionName","Value":"{RegionName}"},{"KeyName":"GenderCode","Value":"{GenderCode}"},{"KeyName":"GenderCodeName","Value":"{GenderCodeName}"},{"KeyName":"ContactPostalCode","Value":"{ContactPostalCode}"},{"KeyName":"FormOfAddress","Value":"{FormOfAddress}"},{"KeyName":"FormOfAddressName","Value":"{FormOfAddressName}"},{"KeyName":"WebsiteURL","Value":"{WebsiteURL}"},{"KeyName":"ValidationStatus","Value":"{ValidationStatus}"},{"KeyName":"ValidationStatusName","Value":"{ValidationStatusName}"},{"KeyName":"Industry","Value":"{Industry}"},{"KeyName":"IndustryName","Value":"{IndustryName}"},{"KeyName":"CorporateAccountName","Value":"{CorporateAccountName}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Contacts_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApp/Pages/Contacts/Contacts_List.page":
/*!*******************************************************************!*\
  !*** ./build.definitions/MyApp/Pages/Contacts/Contacts_List.page ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Contacts","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{BirthDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MyApp/Actions/Contacts/NavToContacts_Detail.action","StatusImage":"","Title":"{FullName}","Footnote":"{IsMarkedForDeletion}","PreserveIconStackSpacing":false,"StatusText":"{IsConsumer}","Subhead":"{IdentityIsRemoved}","SubstatusText":"{IsContactPerson}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Contacts","Service":"/MyApp/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Contacts_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MyApp/Pages/Main.page":
/*!*************************************************!*\
  !*** ./build.definitions/MyApp/Pages/Main.page ***!
  \*************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Main","Controls":[{"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/MyApp/Actions/Authors/NavToAuthors_List.action","Alignment":"Center","Title":"Authors","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/MyApp/Actions/Books/NavToBooks_List.action","Alignment":"Center","Title":"Books","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/MyApp/Actions/Contacts/NavToContacts_List.action","Alignment":"Center","Title":"Contacts","ButtonType":"Text","Semantic":"Tint"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/MyApp/Actions/LogoutMessage.action"},{"_Name":"UpdateToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Update","Enabled":true,"Clickable":true,"OnPress":"/MyApp/Actions/AppUpdateProgressBanner.action","Visible":"$(PLT,true,true,false)"}]},"PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MyApp","Version":"/MyApp/Globals/AppDefinition_Version.global","MainPage":"/MyApp/Pages/Main.page","OnLaunch":["/MyApp/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/MyApp/Rules/OnWillUpdate.js","OnDidUpdate":"/MyApp/Actions/Service/InitializeOnline.action","Styles":"/MyApp/Styles/Styles.less","Localization":"/MyApp/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/MyApp/Styles/Styles.css","ios":"/MyApp/Styles/Styles.nss","android":"/MyApp/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/AppUpdate.action":
/*!**********************************************************!*\
  !*** ./build.definitions/MyApp/Actions/AppUpdate.action ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MyApp/Rules/AppUpdateFailure.js","OnSuccess":"/MyApp/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/AppUpdateFailureMessage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/AppUpdateFailureMessage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/AppUpdateProgressBanner.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/AppUpdateProgressBanner.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MyApp/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/AppUpdateSuccessMessage.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/AppUpdateSuccessMessage.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Authors/NavToAuthors_Detail.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Authors/NavToAuthors_Detail.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApp/Pages/Authors/Authors_Detail.page"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Authors/NavToAuthors_List.action":
/*!**************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Authors/NavToAuthors_List.action ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApp/Pages/Authors/Authors_List.page"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Books/NavToBooks_Detail.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Books/NavToBooks_Detail.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApp/Pages/Books/Books_Detail.page"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Books/NavToBooks_List.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Books/NavToBooks_List.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApp/Pages/Books/Books_List.page"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/CloseModalPage_Cancel.action":
/*!**********************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/CloseModalPage_Cancel.action ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/CloseModalPage_Complete.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/CloseModalPage_Complete.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/ClosePage.action":
/*!**********************************************************!*\
  !*** ./build.definitions/MyApp/Actions/ClosePage.action ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Contacts/NavToContacts_Detail.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Contacts/NavToContacts_Detail.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApp/Pages/Contacts/Contacts_Detail.page"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Contacts/NavToContacts_List.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Contacts/NavToContacts_List.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MyApp/Pages/Contacts/Contacts_List.page"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Logout.action":
/*!*******************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Logout.action ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/LogoutMessage.action":
/*!**************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/LogoutMessage.action ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MyApp/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/OnWillUpdate.action":
/*!*************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/OnWillUpdate.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Service/InitializeOnline.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Service/InitializeOnline.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MyApp/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/MyApp/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/MyApp/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Service/InitializeOnlineFailureMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MyApp/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MyApp/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MyApp/Globals/AppDefinition_Version.global":
/*!**********************************************************************!*\
  !*** ./build.definitions/MyApp/Globals/AppDefinition_Version.global ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MyApp/Services/service1.service":
/*!***********************************************************!*\
  !*** ./build.definitions/MyApp/Services/service1.service ***!
  \***********************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"../service/LCAPNEW/","OfflineEnabled":false,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Cloud","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/MyApp/Styles/Styles.json":
/*!****************************************************!*\
  !*** ./build.definitions/MyApp/Styles/Styles.json ***!
  \****************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MyApp/jsconfig.json":
/*!***********************************************!*\
  !*** ./build.definitions/MyApp/jsconfig.json ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map