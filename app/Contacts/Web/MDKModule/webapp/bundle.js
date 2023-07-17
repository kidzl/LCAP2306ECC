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

/***/ "./build.definitions/Contacts/i18n/i18n.properties":
/*!*********************************************************!*\
  !*** ./build.definitions/Contacts/i18n/i18n.properties ***!
  \*********************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/Contacts/Rules/AppUpdateFailure.js":
/*!**************************************************************!*\
  !*** ./build.definitions/Contacts/Rules/AppUpdateFailure.js ***!
  \**************************************************************/
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
        "Name": "/Contacts/Actions/AppUpdateFailureMessage.action",
        "Properties": {
            "Duration": 0,
            "Message": message
        }
    });
}

/***/ }),

/***/ "./build.definitions/Contacts/Rules/AppUpdateSuccess.js":
/*!**************************************************************!*\
  !*** ./build.definitions/Contacts/Rules/AppUpdateSuccess.js ***!
  \**************************************************************/
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
                "Name": "/Contacts/Actions/AppUpdateSuccessMessage.action",
                "Properties": {
                    "Message": `You are already using the latest version: ${versionNum}`,
                    "NumberOfLines": 2
                }
            });
        } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
            message = 'No Application metadata found. Please deploy your application and try again.';
            return clientAPI.getPageProxy().executeAction({
                "Name": "/Contacts/Actions/AppUpdateSuccessMessage.action",
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

/***/ "./build.definitions/Contacts/Rules/OnWillUpdate.js":
/*!**********************************************************!*\
  !*** ./build.definitions/Contacts/Rules/OnWillUpdate.js ***!
  \**********************************************************/
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
    return clientAPI.executeAction('/Contacts/Actions/OnWillUpdate.action').then((result) => {
        if (result.data) {
            return Promise.resolve();
        } else {
            return Promise.reject('User Deferred');
        }
    });
}

/***/ }),

/***/ "./build.definitions/Contacts/Rules/ResetAppSettingsAndLogout.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/Contacts/Rules/ResetAppSettingsAndLogout.js ***!
  \***********************************************************************/
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
        return context.getPageProxy().executeAction('/Contacts/Actions/Logout.action');
    }
}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let contacts_actions_appupdate_action = __webpack_require__(/*! ./Contacts/Actions/AppUpdate.action */ "./build.definitions/Contacts/Actions/AppUpdate.action")
let contacts_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./Contacts/Actions/AppUpdateFailureMessage.action */ "./build.definitions/Contacts/Actions/AppUpdateFailureMessage.action")
let contacts_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./Contacts/Actions/AppUpdateProgressBanner.action */ "./build.definitions/Contacts/Actions/AppUpdateProgressBanner.action")
let contacts_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./Contacts/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/Contacts/Actions/AppUpdateSuccessMessage.action")
let contacts_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./Contacts/Actions/CloseModalPage_Cancel.action */ "./build.definitions/Contacts/Actions/CloseModalPage_Cancel.action")
let contacts_actions_closemodalpage_complete_action = __webpack_require__(/*! ./Contacts/Actions/CloseModalPage_Complete.action */ "./build.definitions/Contacts/Actions/CloseModalPage_Complete.action")
let contacts_actions_closepage_action = __webpack_require__(/*! ./Contacts/Actions/ClosePage.action */ "./build.definitions/Contacts/Actions/ClosePage.action")
let contacts_actions_contacts_navtocontacts_detail_action = __webpack_require__(/*! ./Contacts/Actions/Contacts/NavToContacts_Detail.action */ "./build.definitions/Contacts/Actions/Contacts/NavToContacts_Detail.action")
let contacts_actions_contacts_navtocontacts_list_action = __webpack_require__(/*! ./Contacts/Actions/Contacts/NavToContacts_List.action */ "./build.definitions/Contacts/Actions/Contacts/NavToContacts_List.action")
let contacts_actions_logout_action = __webpack_require__(/*! ./Contacts/Actions/Logout.action */ "./build.definitions/Contacts/Actions/Logout.action")
let contacts_actions_logoutmessage_action = __webpack_require__(/*! ./Contacts/Actions/LogoutMessage.action */ "./build.definitions/Contacts/Actions/LogoutMessage.action")
let contacts_actions_onwillupdate_action = __webpack_require__(/*! ./Contacts/Actions/OnWillUpdate.action */ "./build.definitions/Contacts/Actions/OnWillUpdate.action")
let contacts_actions_service_initializeonline_action = __webpack_require__(/*! ./Contacts/Actions/Service/InitializeOnline.action */ "./build.definitions/Contacts/Actions/Service/InitializeOnline.action")
let contacts_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./Contacts/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/Contacts/Actions/Service/InitializeOnlineFailureMessage.action")
let contacts_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./Contacts/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/Contacts/Actions/Service/InitializeOnlineSuccessMessage.action")
let contacts_globals_appdefinition_version_global = __webpack_require__(/*! ./Contacts/Globals/AppDefinition_Version.global */ "./build.definitions/Contacts/Globals/AppDefinition_Version.global")
let contacts_i18n_i18n_properties = __webpack_require__(/*! ./Contacts/i18n/i18n.properties */ "./build.definitions/Contacts/i18n/i18n.properties")
let contacts_jsconfig_json = __webpack_require__(/*! ./Contacts/jsconfig.json */ "./build.definitions/Contacts/jsconfig.json")
let contacts_pages_contacts_contacts_detail_page = __webpack_require__(/*! ./Contacts/Pages/Contacts/Contacts_Detail.page */ "./build.definitions/Contacts/Pages/Contacts/Contacts_Detail.page")
let contacts_pages_contacts_contacts_list_page = __webpack_require__(/*! ./Contacts/Pages/Contacts/Contacts_List.page */ "./build.definitions/Contacts/Pages/Contacts/Contacts_List.page")
let contacts_rules_appupdatefailure_js = __webpack_require__(/*! ./Contacts/Rules/AppUpdateFailure.js */ "./build.definitions/Contacts/Rules/AppUpdateFailure.js")
let contacts_rules_appupdatesuccess_js = __webpack_require__(/*! ./Contacts/Rules/AppUpdateSuccess.js */ "./build.definitions/Contacts/Rules/AppUpdateSuccess.js")
let contacts_rules_onwillupdate_js = __webpack_require__(/*! ./Contacts/Rules/OnWillUpdate.js */ "./build.definitions/Contacts/Rules/OnWillUpdate.js")
let contacts_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./Contacts/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/Contacts/Rules/ResetAppSettingsAndLogout.js")
let contacts_services_service1_service = __webpack_require__(/*! ./Contacts/Services/service1.service */ "./build.definitions/Contacts/Services/service1.service")
let contacts_styles_styles_css = __webpack_require__(/*! ./Contacts/Styles/Styles.css */ "./build.definitions/Contacts/Styles/Styles.css")
let contacts_styles_styles_json = __webpack_require__(/*! ./Contacts/Styles/Styles.json */ "./build.definitions/Contacts/Styles/Styles.json")
let contacts_styles_styles_less = __webpack_require__(/*! ./Contacts/Styles/Styles.less */ "./build.definitions/Contacts/Styles/Styles.less")
let contacts_styles_styles_nss = __webpack_require__(/*! ./Contacts/Styles/Styles.nss */ "./build.definitions/Contacts/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	contacts_actions_appupdate_action : contacts_actions_appupdate_action,
	contacts_actions_appupdatefailuremessage_action : contacts_actions_appupdatefailuremessage_action,
	contacts_actions_appupdateprogressbanner_action : contacts_actions_appupdateprogressbanner_action,
	contacts_actions_appupdatesuccessmessage_action : contacts_actions_appupdatesuccessmessage_action,
	contacts_actions_closemodalpage_cancel_action : contacts_actions_closemodalpage_cancel_action,
	contacts_actions_closemodalpage_complete_action : contacts_actions_closemodalpage_complete_action,
	contacts_actions_closepage_action : contacts_actions_closepage_action,
	contacts_actions_contacts_navtocontacts_detail_action : contacts_actions_contacts_navtocontacts_detail_action,
	contacts_actions_contacts_navtocontacts_list_action : contacts_actions_contacts_navtocontacts_list_action,
	contacts_actions_logout_action : contacts_actions_logout_action,
	contacts_actions_logoutmessage_action : contacts_actions_logoutmessage_action,
	contacts_actions_onwillupdate_action : contacts_actions_onwillupdate_action,
	contacts_actions_service_initializeonline_action : contacts_actions_service_initializeonline_action,
	contacts_actions_service_initializeonlinefailuremessage_action : contacts_actions_service_initializeonlinefailuremessage_action,
	contacts_actions_service_initializeonlinesuccessmessage_action : contacts_actions_service_initializeonlinesuccessmessage_action,
	contacts_globals_appdefinition_version_global : contacts_globals_appdefinition_version_global,
	contacts_i18n_i18n_properties : contacts_i18n_i18n_properties,
	contacts_jsconfig_json : contacts_jsconfig_json,
	contacts_pages_contacts_contacts_detail_page : contacts_pages_contacts_contacts_detail_page,
	contacts_pages_contacts_contacts_list_page : contacts_pages_contacts_contacts_list_page,
	contacts_rules_appupdatefailure_js : contacts_rules_appupdatefailure_js,
	contacts_rules_appupdatesuccess_js : contacts_rules_appupdatesuccess_js,
	contacts_rules_onwillupdate_js : contacts_rules_onwillupdate_js,
	contacts_rules_resetappsettingsandlogout_js : contacts_rules_resetappsettingsandlogout_js,
	contacts_services_service1_service : contacts_services_service1_service,
	contacts_styles_styles_css : contacts_styles_styles_css,
	contacts_styles_styles_json : contacts_styles_styles_json,
	contacts_styles_styles_less : contacts_styles_styles_less,
	contacts_styles_styles_nss : contacts_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/Contacts/Styles/Styles.css":
/*!******************************************************!*\
  !*** ./build.definitions/Contacts/Styles/Styles.css ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/Contacts/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\ndiv.MDKPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Contacts/Styles/Styles.less":
/*!*******************************************************!*\
  !*** ./build.definitions/Contacts/Styles/Styles.less ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/sourceMaps.js */ "../../../../css-loader/dist/runtime/sourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../../../css-loader/dist/runtime/api.js */ "../../../../css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/Contacts/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/Contacts/Styles/Styles.nss":
/*!******************************************************!*\
  !*** ./build.definitions/Contacts/Styles/Styles.nss ***!
  \******************************************************/
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

/***/ "./build.definitions/Contacts/Pages/Contacts/Contacts_Detail.page":
/*!************************************************************************!*\
  !*** ./build.definitions/Contacts/Pages/Contacts/Contacts_Detail.page ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Contacts Detail","DesignTimeTarget":{"Service":"/Contacts/Services/service1.service","EntitySet":"Contacts","QueryOptions":""},"ActionBar":{"Items":[]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{FullName}","Subhead":"{IdentityIsRemoved}","BodyText":"","Footnote":"{IsMarkedForDeletion}","Description":"{BirthDate}","StatusText":"{IsConsumer}","StatusImage":"","SubstatusImage":"","SubstatusText":"{IsContactPerson}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"IdentityIsRemoved","Value":"{IdentityIsRemoved}"},{"KeyName":"BirthDate","Value":"{BirthDate}"},{"KeyName":"IsMarkedForDeletion","Value":"{IsMarkedForDeletion}"},{"KeyName":"IsConsumer","Value":"{IsConsumer}"},{"KeyName":"IsContactPerson","Value":"{IsContactPerson}"},{"KeyName":"Latitude","Value":"{Latitude}"},{"KeyName":"LastChangeDateTime","Value":"{LastChangeDateTime}"},{"KeyName":"InteractionContactImageURL","Value":"{InteractionContactImageURL}"},{"KeyName":"LastChangedByUser","Value":"{LastChangedByUser}"},{"KeyName":"Longitude","Value":"{Longitude}"},{"KeyName":"CreationDateTime","Value":"{CreationDateTime}"},{"KeyName":"CreatedByUser","Value":"{CreatedByUser}"},{"KeyName":"SpatialReferenceSystem","Value":"{SpatialReferenceSystem}"},{"KeyName":"IsMainContact","Value":"{IsMainContact}"},{"KeyName":"FullName","Value":"{FullName}"},{"KeyName":"FirstName","Value":"{FirstName}"},{"KeyName":"LastName","Value":"{LastName}"},{"KeyName":"Department","Value":"{Department}"},{"KeyName":"DepartmentName","Value":"{DepartmentName}"},{"KeyName":"Function","Value":"{Function}"},{"KeyName":"ContactFunctionName","Value":"{ContactFunctionName}"},{"KeyName":"MaritalStatus","Value":"{MaritalStatus}"},{"KeyName":"MaritalStatusName","Value":"{MaritalStatusName}"},{"KeyName":"CityName","Value":"{CityName}"},{"KeyName":"StreetName","Value":"{StreetName}"},{"KeyName":"AddressHouseNumber","Value":"{AddressHouseNumber}"},{"KeyName":"Language","Value":"{Language}"},{"KeyName":"LanguageName","Value":"{LanguageName}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"MobileNumber","Value":"{MobileNumber}"},{"KeyName":"FaxNumber","Value":"{FaxNumber}"},{"KeyName":"HasMktgPermissionForDirectMail","Value":"{HasMktgPermissionForDirectMail}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"CountryName","Value":"{CountryName}"},{"KeyName":"AddressRegion","Value":"{AddressRegion}"},{"KeyName":"RegionName","Value":"{RegionName}"},{"KeyName":"GenderCode","Value":"{GenderCode}"},{"KeyName":"GenderCodeName","Value":"{GenderCodeName}"},{"KeyName":"ContactPostalCode","Value":"{ContactPostalCode}"},{"KeyName":"FormOfAddress","Value":"{FormOfAddress}"},{"KeyName":"FormOfAddressName","Value":"{FormOfAddressName}"},{"KeyName":"WebsiteURL","Value":"{WebsiteURL}"},{"KeyName":"ValidationStatus","Value":"{ValidationStatus}"},{"KeyName":"ValidationStatusName","Value":"{ValidationStatusName}"},{"KeyName":"Industry","Value":"{Industry}"},{"KeyName":"IndustryName","Value":"{IndustryName}"},{"KeyName":"CorporateAccountName","Value":"{CorporateAccountName}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Contacts_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Contacts/Pages/Contacts/Contacts_List.page":
/*!**********************************************************************!*\
  !*** ./build.definitions/Contacts/Pages/Contacts/Contacts_List.page ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Contacts","ActionBar":{"Items":[]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{BirthDate}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/Contacts/Actions/Contacts/NavToContacts_Detail.action","StatusImage":"","Title":"{FullName}","Footnote":"{IsMarkedForDeletion}","PreserveIconStackSpacing":false,"StatusText":"{IsConsumer}","Subhead":"{IdentityIsRemoved}","SubstatusText":"{IsContactPerson}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Contacts","Service":"/Contacts/Services/service1.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/Contacts/Actions/Logout.action"}]},"_Name":"Contacts_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"Contacts","Version":"/Contacts/Globals/AppDefinition_Version.global","MainPage":"/Contacts/Pages/Contacts/Contacts_List.page","OnLaunch":["/Contacts/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/Contacts/Rules/OnWillUpdate.js","OnDidUpdate":"/Contacts/Actions/Service/InitializeOnline.action","Styles":"/Contacts/Styles/Styles.less","Localization":"/Contacts/i18n/i18n.properties","_SchemaVersion":"23.4","StyleSheets":{"Styles":{"css":"/Contacts/Styles/Styles.css","ios":"/Contacts/Styles/Styles.nss","android":"/Contacts/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/AppUpdate.action":
/*!*************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/AppUpdate.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/Contacts/Rules/AppUpdateFailure.js","OnSuccess":"/Contacts/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/AppUpdateFailureMessage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/AppUpdateFailureMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/AppUpdateProgressBanner.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/AppUpdateProgressBanner.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/Contacts/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/AppUpdateSuccessMessage.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/AppUpdateSuccessMessage.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/CloseModalPage_Cancel.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/CloseModalPage_Cancel.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/CloseModalPage_Complete.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/CloseModalPage_Complete.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/ClosePage.action":
/*!*************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/ClosePage.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/Contacts/NavToContacts_Detail.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/Contacts/NavToContacts_Detail.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Contacts/Pages/Contacts/Contacts_Detail.page"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/Contacts/NavToContacts_List.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/Contacts/NavToContacts_List.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/Contacts/Pages/Contacts/Contacts_List.page"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/Logout.action":
/*!**********************************************************!*\
  !*** ./build.definitions/Contacts/Actions/Logout.action ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/LogoutMessage.action":
/*!*****************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/LogoutMessage.action ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/Contacts/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/OnWillUpdate.action":
/*!****************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/OnWillUpdate.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/Service/InitializeOnline.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/Service/InitializeOnline.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/Contacts/Services/service1.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/Contacts/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/Contacts/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/Service/InitializeOnlineFailureMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/Contacts/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/Contacts/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/Contacts/Globals/AppDefinition_Version.global":
/*!*************************************************************************!*\
  !*** ./build.definitions/Contacts/Globals/AppDefinition_Version.global ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/Contacts/Services/service1.service":
/*!**************************************************************!*\
  !*** ./build.definitions/Contacts/Services/service1.service ***!
  \**************************************************************/
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

/***/ "./build.definitions/Contacts/Styles/Styles.json":
/*!*******************************************************!*\
  !*** ./build.definitions/Contacts/Styles/Styles.json ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/Contacts/jsconfig.json":
/*!**************************************************!*\
  !*** ./build.definitions/Contacts/jsconfig.json ***!
  \**************************************************/
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