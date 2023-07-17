{
	"_Name": "Contacts",
	"Version": "/Contacts/Globals/AppDefinition_Version.global",
	"MainPage": "/Contacts/Pages/Contacts/Contacts_List.page",
	"OnLaunch": [
		"/Contacts/Actions/Service/InitializeOnline.action"
	],
	"OnWillUpdate": "/Contacts/Rules/OnWillUpdate.js",
	"OnDidUpdate": "/Contacts/Actions/Service/InitializeOnline.action",
	"Styles": "/Contacts/Styles/Styles.less",
	"Localization": "/Contacts/i18n/i18n.properties",
	"_SchemaVersion": "23.4"
}