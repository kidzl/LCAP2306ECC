/* checksum : 63b67633ecbb75912eebc814f226a559 */
@cds.external : true
@m.IsDefaultEntityContainer : 'true'
@sap.supported.formats : 'atom json xlsx'
service Marketing_Contact {};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '3'
entity Marketing_Contact.MarketingPermissions {
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ContactID : String(255) not null;
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact Origin'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ContactOrigin : String(20) not null;
  /**
   * This is the ID of the contact permission.
   * 
   * The ContactPermissionID and ContactPermissionOrigin properties store marketing permissions.An example is: first.lastname@mail.de
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact: Permission ID'
  @sap.heading : 'Contact Permission ID'
  @sap.quickinfo : 'Contact Permission ID'
  key ContactPermissionID : String(255) not null;
  /**
   * This is the origin of the contact ID where marketing permissions are stored.
   * 
   * The origin indicates the source of an ID, in other words, where it originated. The ContactPermissionID and ContactPermissionOrigin properties store marketing permissions.You can maintain the origins you use in the Define Origins of Contact ID Customizing activity or in the Origins of Contact ID configuration activity.Examples of origins are EMAIL or MOBILE.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact: Permission Origin'
  @sap.heading : 'Contact Permission Origin'
  @sap.quickinfo : 'Contact Permission Origin'
  key ContactPermissionOrigin : String(20) not null;
  /**
   * This contains the ID of a marketing area.
   * 
   * The marketing area represents an authorization concept in which data access can optionally be controlled based on the responsibilities of the user. Marketing areas can be used to restrict access to instances of an object, such as campaigns, email messages, email templates, or target groups.Examples of marketing areas are organizational units, product lines, brands, geographical regions, or any other organizational entity.
   */
  @sap.unicode : 'false'
  @sap.label : 'Marketing Area'
  @sap.heading : 'Marketing Area ID'
  @sap.quickinfo : 'Marketing Area ID'
  @sap.sortable : 'false'
  key MarketingArea : String(40) not null;
  /**
   * This is a path or channel used for communication or through which an interaction happened.
   * 
   * Examples of communication media can be EMAIL, PHONE, WEB, and specific social media channels (to be changed!).You can configure communication media in the configuration activity Manage Interaction Content.
   */
  @sap.unicode : 'false'
  @sap.label : 'Communication Medium'
  key CommunicationMedium : String(20) not null;
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'Permission UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PermissionUUID : UUID;
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactUUID : UUID;
  /**
   * This is a free text description of the origin.
   * 
   * This is a read-only field.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact: Permission Origin Name'
  @sap.heading : 'Description for Origin of Contact Data'
  @sap.quickinfo : 'Description for Origin of Interaction Contact Data'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactPermissionOriginName : String(40) not null;
  /** The name of the marketing area. For example, Global Marketing Area. */
  @sap.unicode : 'false'
  @sap.label : 'Marketing Area Name'
  @sap.heading : 'Marketing Area Description'
  @sap.quickinfo : 'Description for Marketing Area'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  MarketingAreaName : String(120) not null;
  /**
   * This is a free text description of a communication medium.
   * 
   * The communication medium describes the channel that a contact used to interact with your company.You can configure communication media in the configuration activity Manage Interaction Content.Examples of communication media are email, phone, text message, or social media.
   */
  @sap.unicode : 'false'
  @sap.label : 'Communication Medium: Name'
  @sap.heading : 'Communication Medium Description'
  @sap.quickinfo : 'Description of Communication Medium'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CommunicationMediumName : String(40) not null;
  /**
   * The timestamp refers to the time the interaction took place, not to the time the record was created on the database.
   * 
   * The timestamp must always be UTC time.When you import data, the local timestamp plus the difference to UTC is also allowed. For example, for New York local time 14:00:00, which is 5 hours before UTC, you could import the timestamp as: 2017-12-18T14:00:00-05:00 or 2017-12-18T19:00:00.When data is read, the UTC timestamp is always returned.An alternative UTC OData Format would be:Number of milliseconds since midnight Jan 1, 1970: /Date(1406014140922)/
   */
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Permission: UTC Date/Time'
  @sap.heading : 'UTC Timestamp'
  @sap.quickinfo : 'UTC Timestamp for API-Services'
  PermissionUTCDateTime : Timestamp not null;
  /** This field indicates whether permission has been granted or not. The permission values can be Y (Yes) or N (No). */
  @sap.unicode : 'false'
  @sap.label : 'Permission Granted'
  @sap.heading : 'Opt-In'
  @sap.quickinfo : 'Opt-In for Marketing Permission'
  PermissionGranted : String(1) not null;
  /** The ID of the result object, for example, material number. */
  @sap.unicode : 'false'
  @sap.label : 'Permission: Source Object'
  @sap.heading : 'Generic Object ID'
  @sap.quickinfo : 'Generic Object ID'
  PermissionSourceObject : String(50);
  /**
   * A recommendation data source type that is defined to an ITEM data source class, for example, SAP Commerce Product.
   * 
   * You can use the ItemSourceType entity to enable your customer channel to choose BasketObjectType from a value help.
   */
  @sap.unicode : 'false'
  @sap.label : 'Permission: Source Object Type'
  @sap.heading : 'Generic Object Type'
  @sap.quickinfo : 'Object Type'
  PermissionSourceObjectType : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Permission: Source System'
  @sap.heading : 'Source System ID'
  @sap.quickinfo : 'Interaction Source System ID'
  PermissionSourceSystem : String(255);
  /**
   * This field contains the type of source system from which the interaction data came.
   * 
   * The source system type identifies the type of system in which the interaction occurred. Types of source system include web shops, C4C systems or clickstream monitoring tools.
   */
  @sap.unicode : 'false'
  @sap.label : 'Permission: Source System Type'
  @sap.heading : 'Source System Type'
  @sap.quickinfo : 'Interaction Source System Type'
  PermissionSourceSystemType : String(20);
  /**
   * This is a path or channel used to indicate from which communication medium a permission or subscription has been created.
   * 
   * You can configure communication media in the configuration app Manage Interaction Content or in Customizing for SAP Marketing under Interactions -> Define Communication Media. Examples of communication media can be EMAIL, PHONE, WEB.
   */
  @sap.unicode : 'false'
  @sap.label : 'Permission: Source Communication Medium'
  @sap.heading : 'Permission Source Communication Medium'
  @sap.quickinfo : 'Source Communication Medium'
  PermissionSourceCommMedium : String(20);
  /**
   * This is a free text description of a communication medium.
   * 
   * The communication medium describes the channel that a contact used to interact with your company.You can configure communication media in the configuration activity Manage Interaction Content.Examples of communication media are email, phone, text message, or social media.
   */
  @sap.unicode : 'false'
  @sap.label : 'Permission: Name of Source Communication Medium'
  @sap.heading : 'Communication Medium Description'
  @sap.quickinfo : 'Description of Communication Medium'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PermissionSourceCommMediumName : String(40) not null;
  /**
   * This indicator shows whether the permission has been granted implicitly or not.
   * 
   * If the system sets this field to TRUE then it is an implicit permission, which is determined by country-specific regulation.If the system sets this field to FALSE the contact has given this permission explicitly.
   */
  @sap.unicode : 'false'
  @sap.label : 'Permission Is Implicit'
  @sap.heading : 'Implicit'
  @sap.quickinfo : 'Permission Is Implicit (''X'' = yes)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PermissionIsImplicit : Boolean not null;
  /**
   * This is an indicator showing if a confirmation is required before storing the permission or subscription.
   * 
   * If the parameter is set to TRUE, the permission is stored using the double opt-in or opt-out process.If the property is not specified in the payload or it is set to FALSE the permission is directly stored.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Confirmation Required?'
  @sap.heading : 'Confirmation Is Required'
  @sap.quickinfo : 'Perm/Subscr. Is Confirmation Required'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  IsConfirmationRequired : Boolean not null;
  /**
   * This field contains the complete personal name. It is usually generated from the individual name components (without title).
   * 
   * There are two exceptions:The field contents were assembled by converting data from a previous release from the previous title and name fields because the title could not be assigned automatically to a title key . In this case the field CONVERTED (&quot;Status of the field NAME_TEXT&quot;) has the value 'X'.The field contents were maintained manually using a supplementary function in dialog, e.g. because the complete name cannot be split into the specified name parts. In this case the field CONVERTED (&quot;Status of the field NAME_TEXT&quot;) has the value 'M'.The field CONVERTED (&quot;Status of the field NAME_TEXT&quot;) has the value SPACE if neither of the exceptions applies.
   */
  @sap.unicode : 'false'
  @sap.label : 'Last Changed By User'
  @sap.heading : 'Full Name'
  @sap.quickinfo : 'Full Name of Person'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangedByUser : String(80);
  /**
   * The timestamp refers to the time the interaction took place, not to the time the record was created on the database.
   * 
   * The timestamp must always be UTC time.When you import data, the local timestamp plus the difference to UTC is also allowed. For example, for New York local time 14:00:00, which is 5 hours before UTC, you could import the timestamp as: 2017-12-18T14:00:00-05:00 or 2017-12-18T19:00:00.When data is read, the UTC timestamp is always returned.An alternative UTC OData Format would be:Number of milliseconds since midnight Jan 1, 1970: /Date(1406014140922)/
   */
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Last Change Date/Time'
  @sap.heading : 'UTC Timestamp'
  @sap.quickinfo : 'UTC Timestamp for API-Services'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangeDateTime : Timestamp;
  /** This is a note text. */
  @sap.unicode : 'false'
  @sap.label : 'Permission: Note Text'
  @sap.heading : 'Note'
  @sap.quickinfo : 'Marketing Permission Note'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  PermissionNoteText : String(1000) not null;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '3'
entity Marketing_Contact.MarketingAreas {
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Origin of Contact'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  key ContactOrigin : String(20) not null;
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'External Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  key ContactID : String(255) not null;
  /**
   * This field contains the ID of a marketing area.
   * 
   * The marketing area represents an authorization concept in which data access can optionally be controlled based on the responsibilities of the user. Marketing areas can be used to restrict access to instances of an object, such as campaigns, email messages, email templates, or target groups.Examples of marketing areas are organizational units, product lines, brands, geographical regions, or any other organizational entity.
   */
  @sap.unicode : 'false'
  @sap.label : 'Marketing Area ID'
  key InteractionContactMktgArea : String(40) not null;
  /** The name of the marketing area. For example, Global Marketing Area. */
  @sap.unicode : 'false'
  @sap.label : 'Marketing Area'
  @sap.heading : 'Marketing Area Description'
  @sap.quickinfo : 'Description for Marketing Area'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  InteractionContactMktgAreaName : String(120) not null;
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactUUID : UUID;
  /**
   * This is an ID that is internally assigned to an additional ID.
   * 
   * Additional IDs are IDs for a contact that are derived from various sources (origins), such as from SAP ERP, Facebook, LinkedIn, or a web shop. Each origin provides one main ID for a contact, and can also provide additional IDs.Examples of additional IDs are: a loyalty card number, an email address, or phone, mobile and fax numbers.
   */
  @sap.unicode : 'false'
  @sap.label : 'Additional ID UUID'
  @sap.quickinfo : 'Additional ID UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  InteractionContactAdditionalOriginUUID : UUID;
  @sap.unicode : 'false'
  @sap.label : 'IC Mktg Area UUID'
  @sap.heading : 'IC Marketing Area UUID'
  @sap.quickinfo : 'Interaction Contact: Marketing Area UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  InteractionContactMktgAreaUUID : UUID;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '3'
entity Marketing_Contact.MarketingLocations {
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Origin of Contact'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  key ContactOrigin : String(20) not null;
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'External Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  key ContactID : String(255) not null;
  /** This is the origin or source system where a marketing location ID originated. */
  @sap.unicode : 'false'
  @sap.label : 'Origin of Location'
  @sap.heading : 'Origin of Marketing Location'
  @sap.quickinfo : 'API: Location Origin'
  key MarketingLocationOrigin : String(30) not null;
  /**
   * This is the external ID of a marketing location.
   * 
   * A marketing location can be any physical or virtual location where a marketing event takes place.
   */
  @sap.unicode : 'false'
  @sap.label : 'Location ID'
  @sap.quickinfo : 'API: Location ID'
  key MarketingLocationExternalID : String(50) not null;
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactUUID : UUID;
  /**
   * This is the ID that is internally assigned to a marketing location ID.
   * 
   * A marketing location can be any physical or virtual location where a marketing activity can be conducted.Examples of marketing locations are the place where interaction took place, such as a mall or a web shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'IC Mktg Loc UUID'
  @sap.heading : 'IC Marketing Location UUID'
  @sap.quickinfo : 'Interaction Contact: Marketing Location UUID for API Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  InteractionContactMktgLocUUID : UUID;
  /**
   * This is an ID that is internally assigned to an additional ID.
   * 
   * Additional IDs are IDs for a contact that are derived from various sources (origins), such as from SAP ERP, Facebook, LinkedIn, or a web shop. Each origin provides one main ID for a contact, and can also provide additional IDs.Examples of additional IDs are: a loyalty card number, an email address, or phone, mobile and fax numbers.
   */
  @sap.unicode : 'false'
  @sap.label : 'Additional ID UUID'
  @sap.quickinfo : 'Additional ID UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  InteractionContactAdditionalOriginUUID : UUID;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.updatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '3'
entity Marketing_Contact.Contacts {
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key ContactUUID : UUID not null;
  /**
   * This indicator specifies that all attributes that can be used to identify an interaction contact have been removed.
   * 
   * When a contact requests that no further data should be tracked, a report removes the identifying attributes from the database (such as name, internal ID, phone number).
   */
  @sap.unicode : 'false'
  @sap.label : 'Identity Is Removed'
  @sap.quickinfo : 'Identity Is Removed for API Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IdentityIsRemoved : Boolean;
  /**
   * This field contains the contact's date of birth.
   * 
   * The date of birth must be in the following format: YYYY-MM-DDT00:00:00.For example: 2017-10-01T00:00:00
   */
  @odata.Type : 'Edm.DateTime'
  @sap.unicode : 'false'
  @sap.label : 'Date of Birth'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  BirthDate : DateTime;
  /**
   * Contact is flagged for deletion
   * 
   * Indicator that shows that a contact has been flagged for deletion. Contacts can be flagged for deletion by running the application job Flag Contacts for Deletion. Flagged contacts can be subsequently deleted by running the application job Delete Flagged Contacts.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Marked for Del.'
  @sap.heading : 'Is Marked for Deletion'
  @sap.quickinfo : 'Is Marked for Deletion for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IsMarkedForDeletion : Boolean;
  /**
   * This indicator identifies the business relationship of an interaction contact to your company. It flags the contact as a consumer (B2C).
   * 
   * A consumer is a person who has purchased something from your company as a private person.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Consumer'
  @sap.quickinfo : 'Is Consumer for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IsConsumer : Boolean;
  /**
   * This indicator identifies the business relationship of an interaction contact to your company. It flags the contact as a corporate contact (B2B).
   * 
   * A corporate contact is a representative of a corporate account who has interacted with your company.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Contact'
  @sap.quickinfo : 'Is Contact for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IsContactPerson : Boolean;
  /**
   * The latitude of where an interaction occurs.
   * 
   * Use this field to note the latitude of the geographic location where an interaction takes place.
   */
  @sap.unicode : 'false'
  @sap.label : 'Latitude'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Latitude : Decimal(20, 10);
  /**
   * This is the date on which the object data was last changed.
   * 
   * This field contains the timestamp indicating when object data was last changed.
   */
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Last Change Date Time'
  @sap.quickinfo : 'Last Change Date Time for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangeDateTime : Timestamp;
  /** This field contains the URL of an image, for example, an image of a product. */
  @sap.unicode : 'false'
  @sap.label : 'Image URL'
  @sap.quickinfo : 'Image URL for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  InteractionContactImageURL : String(1000);
  /** This is the name of the user who last changed the contact data. */
  @sap.unicode : 'false'
  @sap.label : 'Last Changed By User'
  @sap.quickinfo : 'Last Changed By User for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangedByUser : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Longitude'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Longitude : Decimal(20, 10);
  /** This is the timestamp indicating when the contact was created. */
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Creation Date Time'
  @sap.quickinfo : 'Creation Date Time for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreationDateTime : Timestamp;
  /**
   * Indicates the User ID of the API service creator.
   * 
   * To hold the value of the created by user's ID of a campaign.User ID of the user.
   */
  @sap.unicode : 'false'
  @sap.label : 'Created By User'
  @sap.quickinfo : 'Created By User for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreatedByUser : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Spatial Ref ID'
  @sap.heading : 'Spatial Reference Identifier'
  @sap.quickinfo : 'Spatial Reference Identifier'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SpatialReferenceSystem : String(10);
  /**
   * This is the corporate account UUID (universally unique identifier).
   * 
   * This field contains the UUID, which is internally assigned to a corporate account when the corporate account is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'Corporate Account'
  @sap.heading : 'Corporate Account UUID'
  @sap.quickinfo : 'Corporate Account UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CorporateAccountUUID : UUID;
  /**
   * This indicator flags a contact as the main contact.
   * 
   * This flag indicates that a contact is assigned as the main contact person for a corporate account.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Main Contact'
  @sap.quickinfo : 'Is Main Contact for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IsMainContact : Boolean;
  /** This free text field contains the contact's full name. */
  @sap.unicode : 'false'
  @sap.label : 'Name'
  @sap.quickinfo : 'Full Name of Interaction Contact'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FullName : String(80);
  /** First name of a natural person */
  @sap.unicode : 'false'
  @sap.label : 'First Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FirstName : String(40);
  /** Surname of a natural person */
  @sap.unicode : 'false'
  @sap.label : 'Last name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastName : String(40);
  /**
   * This is a key representing the business department of your interaction contact.
   * 
   * This field contains an alphanumber key of maximum 4 characters representing a department.You can define departments for your contacts in the configuration activity Define Departments for Contacts. User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples of departments are HR, Controlling, Production, or Financial Department.
   */
  @sap.unicode : 'false'
  @sap.label : 'Department'
  @sap.quickinfo : 'Contact Person Department'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Department : String(4);
  /**
   * This is a free text describing the business department of your interaction contact.
   * 
   * You can define departments for your contacts in the configuration activity Define Departments for Contacts. User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples of departments are HR, Controlling, Production, or Financial Department.
   */
  @sap.unicode : 'false'
  @sap.label : 'Department'
  @sap.quickinfo : 'Description of Person Department'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  DepartmentName : String(40);
  /**
   * This is an alphanumeric key that identifies a business function.
   * 
   * This field contains an alphanumber key of maximum 4 characters representing a function.You can define functions for your contacts in the configuration activity Define Functions for Contacts.User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples of functions are buyer, head of sales, or personnel manager.
   */
  @sap.unicode : 'false'
  @sap.label : 'Function'
  @sap.heading : 'Function of Contact'
  @sap.quickinfo : 'Function of Contact'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Function : String(4);
  /**
   * This field contains a free text describing the business function or role of an interaction contact within an organization.
   * 
   * You can define functions for your contacts in the configuration activity Define Functions for Contacts.User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples of functions are buyer, head of sales, or personnel manager.
   */
  @sap.unicode : 'false'
  @sap.label : 'Function'
  @sap.heading : 'Function of Contact'
  @sap.quickinfo : 'Function of Contact'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactFunctionName : String(40);
  /**
   * For business partners in the category 'Person', you can state the marital status. This is for information purposes only.
   * 
   * SingleMarriedDivorced
   */
  @sap.unicode : 'false'
  @sap.label : 'Marital Status'
  @sap.heading : 'Marital Stat.'
  @sap.quickinfo : 'Marital Status of Business Partner'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  MaritalStatus : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Marital Status'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  MaritalStatusName : String(20);
  /**
   * City name as part of the address.
   * 
   * The city name is saved redundantly in another database field in upper- case letters, for search help.If the Postal regional structure ('city file') is active, the city name is checked against the Cities defined in the regional structure.
   */
  @sap.unicode : 'false'
  @sap.label : 'City'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CityName : String(40);
  /**
   * Street name as part of the address.
   * 
   * The street name is saved, redundantly in upper case in another database field, for search help purposes.There are other fields for address parts which can be printed above or below the street. See Print the Street address.The house number and other supplements are usually maintained in their own fields. See Formatting the Street line.
   */
  @sap.unicode : 'false'
  @sap.label : 'Street'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  StreetName : String(60);
  /**
   * House number as part of an address.
   * 
   * It is printed in the Street line.Other supplementary street information can be entered in the House number supplement or one of the Street2, Street3, Street4 or Street5 fields. See Print the Street address.A house number (e.g. 117) or a house number with supplement (e.g. 117a), or a house number range (e.g. 16-20), can be maintained in this field.
   */
  @sap.unicode : 'false'
  @sap.label : 'House Number'
  @sap.heading : 'House No.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  AddressHouseNumber : String(10);
  /**
   * The language key indicates
   * 
   * - the language in which texts are displayed,- the language in which you enter texts,- the language in which the system prints texts.
   */
  @sap.unicode : 'false'
  @sap.label : 'Language'
  @sap.quickinfo : 'Language Key'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Name'
  @sap.heading : 'Name of Language'
  @sap.quickinfo : 'Name of Language'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LanguageName : String(16);
  @sap.unicode : 'false'
  @sap.label : 'E-Mail Address'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  EmailAddress : String(241);
  @sap.unicode : 'false'
  @sap.label : 'Phone'
  @sap.quickinfo : 'Phone for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PhoneNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Mobile'
  @sap.quickinfo : 'Mobile for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  MobileNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Fax'
  @sap.quickinfo : 'Fax for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FaxNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Postal Opt-In'
  @sap.heading : 'Opt-In for Postal Address Contact'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  HasMktgPermissionForDirectMail : String(1);
  /** The two-digit code that represents the country. For example, CA */
  @sap.unicode : 'false'
  @sap.label : 'Country'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Country : String(3);
  /**
   * This field contains the long name of a country.
   * 
   * This is free text for the country of the interaction contact.Custom entries must be mapped to SAP internal IDs in the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Country Long Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CountryName : String(50);
  /**
   * In some countries, the region forms part of the address. The meaning depends on the country.
   * 
   * The automatic address formatting function prints the region in addresses in the USA, Canada, Italy, Brazil or Australia, and the county in Great Britain.For more information, see the examples in the documentation on the Address Layout Key.Meaning of the regional code in ...Australia -> ProvinceBrazil -> StateCanada -> ProvinceGermany -> StateGreat Britain -> CountyItaly -> ProvinceJapan -> PrefectureSwitzerland -> CantonUSA -> State
   */
  @sap.unicode : 'false'
  @sap.label : 'Region'
  @sap.heading : 'Rg'
  @sap.quickinfo : 'Region (State, Province, County)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  AddressRegion : String(3);
  /**
   * Region code of the campaign performance measures.
   * 
   * The mapping of external values to internal codes is maintained with the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Region'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  RegionName : String(40);
  /**
   * This is a key that represents the gender of a contact.
   * 
   * This field contains fixed values that represent the gender of a contact. The fixed values are: 1 = Male; 2 = Female; Space = Gender not known.User-defined values can be defined in the structure CUAN_S_API_MKT_CNTCT_ORIGIN_D in SEX_FT. User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Gender'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  GenderCode : String(1);
  /**
   * A free text field that specifies the gender of a contact.
   * 
   * This field contains user-definable gender names.User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Gender'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  GenderCodeName : String(40);
  /**
   * Postal code as part of the address
   * 
   * If different postal codes are maintained for the PO Box and Street address of an address, this field contains the Street address postal code.
   */
  @sap.unicode : 'false'
  @sap.label : 'Postal Code'
  @sap.heading : 'Post. Code'
  @sap.quickinfo : 'City Postal Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactPostalCode : String(10);
  /**
   * Key for form of address text.
   * 
   * You can also define a form of address text in Customizing.The form of address text can be maintained in different languages.
   */
  @sap.unicode : 'false'
  @sap.label : 'Title'
  @sap.heading : 'Key'
  @sap.quickinfo : 'Form-of-Address Key'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FormOfAddress : String(4);
  /**
   * Possible titles are stored in a check table. They are language-dependent.
   * 
   * Choose the title from the entries in the drop down list box.The title is displayed in text form in the screen field in the logon language, and its key is stored in the database.
   */
  @sap.unicode : 'false'
  @sap.label : 'Title'
  @sap.quickinfo : 'Title text'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FormOfAddressName : String(30);
  /** This field contains the URL of a web site. */
  @sap.unicode : 'false'
  @sap.label : 'Website URL'
  @sap.quickinfo : 'Website URL for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  WebsiteURL : String(1000);
  /**
   * This is a two-digit code representing a status that indicates the level of verification for a contact’s information.
   * 
   * Predelivered validation statuses and codes are:Space - Anonymous:Information about the contact is not verified. For example, there was just a click on a web site.10 - Self-Identified:The contact has entered, for example, name and address in a web form, but the information hasn't yet been verified.20 - Qualified:The contact has registered on the web site and verified the details by clicking a link in a verification email, for example.30 - Business Partner:The contact is stored in the productive SAP CRM or SAP ERP system.You cannot change the predelivered codes but you can edit the descriptive text for a status and add new validation statuses in the configuration app Validation Statuses. Validation statuses are displayed as contact levels in the Contact Profile.
   */
  @sap.unicode : 'false'
  @sap.label : 'Validat. Status'
  @sap.heading : 'Validation Status'
  @sap.quickinfo : 'Validation Status Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ValidationStatus : String(2);
  /**
   * This is a status that indicates the level of verification for a contact’s information.
   * 
   * The more master data that is maintained for a contact, the higher the validation status.Possible validation statuses are:Anonymous:Information about the contact is not verified. For example, the contact merely clicked on a web site.Self-Identified:The contact has entered, for example, name and address in a web form, but the information is not yet verified.Qualified:The contact has registered on the web site and verified the details by clicking a confirmation link in a verification email, for example.Business Partner:The contact is stored in the productive SAP CRM or SAP ERP system.You cannot change the predelivered codes but you can edit the descriptive text for a status and add new validation statuses in the configuration app Validation Statuses. Validation statuses are displayed as contact levels in the Contact Profile.
   */
  @sap.unicode : 'false'
  @sap.label : 'Val. Stat. Dc.'
  @sap.heading : 'Validation Status Description'
  @sap.quickinfo : 'Description for Validation Status Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ValidationStatusName : String(20);
  /**
   * This is an alphanumeric key that identifies an industry.
   * 
   * This field contains an alphanumber key of maximum 4 characters representing an industry.You can create custom entries in the configuration activity Industries for Contacts. User-defined values must be mapped to SAP internal keys in the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Industry'
  @sap.heading : 'Indus.'
  @sap.quickinfo : 'Industry Key'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Industry : String(4);
  /**
   * This field contains a free text describing the industry of your interaction contact.
   * 
   * You can define industries for your contacts in the configuration activity Industries for Contacts. User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples are automotive, chemicals, energy, or construction.
   */
  @sap.unicode : 'false'
  @sap.label : 'Industry'
  @sap.quickinfo : 'Description of Industry Key'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IndustryName : String(40);
  /**
   * This is a free text defining the name of the company of your interaction contacts.
   * 
   * This free text information cannot be used to find a corporate account. If you want to associate a contact with a corporate account, you have to use the attributes CorporateAccoutOrigin and CorporateAccountID.
   */
  @sap.unicode : 'false'
  @sap.label : 'Corp Account Name'
  @sap.heading : 'Corporate Account Name'
  @sap.quickinfo : 'Corporate Account Name for API Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CorporateAccountName : String(40);
  @cds.ambiguous : 'missing on condition?'
  MarketingPermissions : Association to many Marketing_Contact.MarketingPermissions on MarketingPermissions.ContactUUID = ContactUUID;
  @cds.ambiguous : 'missing on condition?'
  MarketingSubscriptions : Association to many Marketing_Contact.MarketingSubscriptions on MarketingSubscriptions.ContactUUID = ContactUUID;
  @cds.ambiguous : 'missing on condition?'
  MarketingAreas : Association to many Marketing_Contact.MarketingAreas on MarketingAreas.ContactUUID = ContactUUID;
  @cds.ambiguous : 'missing on condition?'
  MarketingLocations : Association to many Marketing_Contact.MarketingLocations on MarketingLocations.ContactUUID = ContactUUID;
  @cds.ambiguous : 'missing on condition?'
  MarketingAttributes : Association to many Marketing_Contact.MarketingAttributes on MarketingAttributes.ContactUUID = ContactUUID;
  @cds.ambiguous : 'missing on condition?'
  AdditionalIDs : Association to many Marketing_Contact.AdditionalIDs on AdditionalIDs.ContactUUID = ContactUUID;
  @cds.ambiguous : 'missing on condition?'
  ContactOriginData : Association to many Marketing_Contact.ContactOriginData on ContactOriginData.ContactUUID = ContactUUID;
  @cds.ambiguous : 'missing on condition?'
  AccountTeamMembers : Association to many Marketing_Contact.AccountTeamMembers on AccountTeamMembers.ContactUUID = ContactUUID;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '3'
entity Marketing_Contact.ContactOriginData {
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Origin of Contact'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  key ContactOrigin : String(20) not null;
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'External Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  key ContactID : String(255) not null;
  /**
   * This is a two-digit code representing a status that indicates the level of verification for a contact’s information.
   * 
   * Predelivered validation statuses and codes are:Space - Anonymous:Information about the contact is not verified. For example, there was just a click on a web site.10 - Self-Identified:The contact has entered, for example, name and address in a web form, but the information hasn't yet been verified.20 - Qualified:The contact has registered on the web site and verified the details by clicking a link in a verification email, for example.30 - Business Partner:The contact is stored in the productive SAP CRM or SAP ERP system.You cannot change the predelivered codes but you can edit the descriptive text for a status and add new validation statuses in the configuration app Validation Statuses. Validation statuses are displayed as contact levels in the Contact Profile.
   */
  @sap.unicode : 'false'
  @sap.label : 'Validat. Status'
  @sap.heading : 'Validation Status'
  @sap.quickinfo : 'Validation Status Code'
  ValidationStatus : String(2);
  /**
   * This is a status that indicates the level of verification for a contact’s information.
   * 
   * The more master data that is maintained for a contact, the higher the validation status.Possible validation statuses are:Anonymous:Information about the contact is not verified. For example, the contact merely clicked on a web site.Self-Identified:The contact has entered, for example, name and address in a web form, but the information is not yet verified.Qualified:The contact has registered on the web site and verified the details by clicking a confirmation link in a verification email, for example.Business Partner:The contact is stored in the productive SAP CRM or SAP ERP system.You cannot change the predelivered codes but you can edit the descriptive text for a status and add new validation statuses in the configuration app Validation Statuses. Validation statuses are displayed as contact levels in the Contact Profile.
   */
  @sap.unicode : 'false'
  @sap.label : 'Val. Stat. Dc.'
  @sap.heading : 'Validation Status Description'
  @sap.quickinfo : 'Description for Validation Status Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ValidationStatusName : String(20);
  /**
   * This flag indicates that the end-of-purpose (EoP) date has been reached for contact data.
   * 
   * The EoP date is the point in time when the processing of a set of personal data is no longer required for the primary business purpose. After the EoP date has been reached, the data is blocked and can only be accessed by users with special authorizations (for example, tax auditors).
   */
  @sap.unicode : 'false'
  @sap.label : 'End of Purpose'
  @sap.heading : 'EoP'
  @sap.quickinfo : 'Object''s Purpose Has Ended (''X'' = Yes)'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  IsEndOfPurposeBlocked : Boolean;
  /**
   * This field contains the contact's date of birth.
   * 
   * The date of birth must be in the following format: YYYY-MM-DDT00:00:00.For example: 2017-10-01T00:00:00
   */
  @odata.Type : 'Edm.DateTime'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Date of Birth'
  BirthDate : Timestamp;
  /**
   * This is the date on which the data was last changed.
   * 
   * This information is derived from the origin. It specifies when data was last changed in the source system.
   */
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Origin Timestamp'
  @sap.heading : 'Origin Timestamp UTC'
  @sap.quickinfo : 'Origin Timestamp UTC'
  OriginDataLastChgUTCDateTime : Timestamp not null;
  /**
   * This indicator identifies the business relationship of an interaction contact to your company. It flags the contact as a consumer (B2C).
   * 
   * A consumer is a person who has purchased something from your company as a private person.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Consumer'
  @sap.quickinfo : 'Is Consumer for API-Service'
  IsConsumer : Boolean;
  /**
   * This indicator identifies the business relationship of an interaction contact to your company. It flags the contact as a corporate contact (B2B).
   * 
   * A corporate contact is a representative of a corporate account who has interacted with your company.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Contact'
  @sap.quickinfo : 'Is Contact for API-Service'
  IsContactPerson : Boolean;
  /**
   * The latitude of where an interaction occurs.
   * 
   * Use this field to note the latitude of the geographic location where an interaction takes place.
   */
  @sap.unicode : 'false'
  @sap.label : 'Latitude'
  Latitude : Decimal(20, 10);
  /**
   * This is the date on which the object data was last changed.
   * 
   * This field contains the timestamp indicating when object data was last changed.
   */
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Last Change Date Time'
  @sap.quickinfo : 'Last Change Date Time for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangeDateTime : Timestamp;
  /** This field contains the URL of an image, for example, an image of a product. */
  @sap.unicode : 'false'
  @sap.label : 'Image URL'
  @sap.quickinfo : 'Image URL for API-Service'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  InteractionContactImageURL : String(1000);
  /** This is the name of the user who last changed the contact data. */
  @sap.unicode : 'false'
  @sap.label : 'Last Changed By User'
  @sap.quickinfo : 'Last Changed By User for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangedByUser : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Longitude'
  Longitude : Decimal(20, 10);
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactUUID : UUID;
  /** This is the timestamp indicating when the contact was created. */
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Creation Date Time'
  @sap.quickinfo : 'Creation Date Time for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreationDateTime : Timestamp;
  /**
   * Indicates the User ID of the API service creator.
   * 
   * To hold the value of the created by user's ID of a campaign.User ID of the user.
   */
  @sap.unicode : 'false'
  @sap.label : 'Created By User'
  @sap.quickinfo : 'Created By User for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreatedByUser : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Spatial Ref ID'
  @sap.heading : 'Spatial Reference Identifier'
  @sap.quickinfo : 'Spatial Reference Identifier'
  SpatialReferenceSystem : String(10);
  /**
   * This is the corporate account UUID (universally unique identifier).
   * 
   * This field contains the UUID, which is internally assigned to a corporate account when the corporate account is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'Corporate Account'
  @sap.heading : 'Corporate Account UUID'
  @sap.quickinfo : 'Corporate Account UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CorporateAccountUUID : UUID;
  /**
   * This indicator flags a contact as the main contact.
   * 
   * This flag indicates that a contact is assigned as the main contact person for a corporate account.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Main Contact'
  @sap.quickinfo : 'Is Main Contact for API-Service'
  IsMainContact : Boolean;
  /** This free text field contains the contact's full name. */
  @sap.unicode : 'false'
  @sap.label : 'Name'
  @sap.quickinfo : 'Full Name of Interaction Contact'
  FullName : String(80);
  /** First name of a natural person */
  @sap.unicode : 'false'
  @sap.label : 'First Name'
  FirstName : String(40);
  /** Surname of a natural person */
  @sap.unicode : 'false'
  @sap.label : 'Last Name'
  LastName : String(40);
  /**
   * This is a key representing the business department of your interaction contact.
   * 
   * This field contains an alphanumber key of maximum 4 characters representing a department.You can define departments for your contacts in the configuration activity Define Departments for Contacts. User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples of departments are HR, Controlling, Production, or Financial Department.
   */
  @sap.unicode : 'false'
  @sap.label : 'Department'
  @sap.quickinfo : 'Contact Person Department'
  Department : String(4);
  /**
   * This is a free text describing the business department of your interaction contact.
   * 
   * You can define departments for your contacts in the configuration activity Define Departments for Contacts. User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples of departments are HR, Controlling, Production, or Financial Department.
   */
  @sap.unicode : 'false'
  @sap.label : 'Department'
  @sap.quickinfo : 'Description of Person Department'
  DepartmentName : String(40);
  /**
   * This is an alphanumeric key that identifies a business function.
   * 
   * This field contains an alphanumber key of maximum 4 characters representing a function.You can define functions for your contacts in the configuration activity Define Functions for Contacts.User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples of functions are buyer, head of sales, or personnel manager.
   */
  @sap.unicode : 'false'
  @sap.label : 'Function'
  @sap.heading : 'Function of Contact'
  @sap.quickinfo : 'Function of Contact'
  Function : String(4);
  /**
   * This field contains a free text describing the business function or role of an interaction contact within an organization.
   * 
   * You can define functions for your contacts in the configuration activity Define Functions for Contacts.User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples of functions are buyer, head of sales, or personnel manager.
   */
  @sap.unicode : 'false'
  @sap.label : 'Function'
  @sap.heading : 'Function of Contact'
  @sap.quickinfo : 'Function of Contact'
  ContactFunctionName : String(40);
  /**
   * For business partners in the category 'Person', you can state the marital status. This is for information purposes only.
   * 
   * SingleMarriedDivorced
   */
  @sap.unicode : 'false'
  @sap.label : 'Marital Status'
  @sap.heading : 'Marital Stat.'
  @sap.quickinfo : 'Marital Status of Business Partner'
  MaritalStatus : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Marital Status'
  MaritalStatusName : String(20);
  /**
   * City name as part of the address.
   * 
   * The city name is saved redundantly in another database field in upper- case letters, for search help.If the Postal regional structure ('city file') is active, the city name is checked against the Cities defined in the regional structure.
   */
  @sap.unicode : 'false'
  @sap.label : 'City'
  CityName : String(40);
  /**
   * Street name as part of the address.
   * 
   * The street name is saved, redundantly in upper case in another database field, for search help purposes.There are other fields for address parts which can be printed above or below the street. See Print the Street address.The house number and other supplements are usually maintained in their own fields. See Formatting the Street line.
   */
  @sap.unicode : 'false'
  @sap.label : 'Street'
  StreetName : String(60);
  /**
   * House number as part of an address.
   * 
   * It is printed in the Street line.Other supplementary street information can be entered in the House number supplement or one of the Street2, Street3, Street4 or Street5 fields. See Print the Street address.A house number (e.g. 117) or a house number with supplement (e.g. 117a), or a house number range (e.g. 16-20), can be maintained in this field.
   */
  @sap.unicode : 'false'
  @sap.label : 'House Number'
  @sap.heading : 'House No.'
  AddressHouseNumber : String(10);
  /**
   * The language key indicates
   * 
   * - the language in which texts are displayed,- the language in which you enter texts,- the language in which the system prints texts.
   */
  @sap.unicode : 'false'
  @sap.label : 'Language'
  @sap.quickinfo : 'Language Key'
  Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Name'
  @sap.heading : 'Name of Language'
  @sap.quickinfo : 'Name of Language'
  LanguageName : String(16);
  @sap.unicode : 'false'
  @sap.label : 'E-Mail Address'
  EmailAddress : String(241);
  @sap.unicode : 'false'
  @sap.label : 'Phone'
  @sap.quickinfo : 'Phone for API-Service'
  PhoneNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Mobile'
  @sap.quickinfo : 'Mobile for API-Service'
  MobileNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Fax'
  @sap.quickinfo : 'Fax for API-Service'
  FaxNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Postal Opt-In'
  @sap.heading : 'Opt-In for Postal Address Contact'
  HasMktgPermissionForDirectMail : String(1);
  /**
   * The country key contains information which the system uses to check entries such as the length of the postal code or bank account number.
   * 
   * The two-character ISO code in accordance with ISO 3166, which is delivered by SAP as a default, is usually used.It could also be the vehicle license plate country-code or a typical country key, for example, in Germany the Federal statistics office key.The country keys are determined at system installation in the global settings.The definition of the country key in the SAP system does not have to match political or government entities.Since the country key does not have to correspond to the ISO code in all installations, programs that differ according to certain values of the country key cannot query the country key T005-LAND1, but have to program based on the ISO code T005 INTCA.
   */
  @sap.unicode : 'false'
  @sap.label : 'Country'
  @sap.heading : 'Ctr'
  @sap.quickinfo : 'Country Key'
  Country : String(3);
  /**
   * This field contains the long name of a country.
   * 
   * This is free text for the country of the interaction contact.Custom entries must be mapped to SAP internal IDs in the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Country Long Name'
  CountryName : String(50);
  /**
   * In some countries, the region forms part of the address. The meaning depends on the country.
   * 
   * The automatic address formatting function prints the region in addresses in the USA, Canada, Italy, Brazil or Australia, and the county in Great Britain.For more information, see the examples in the documentation on the Address Layout Key.Meaning of the regional code in ...Australia -> ProvinceBrazil -> StateCanada -> ProvinceGermany -> StateGreat Britain -> CountyItaly -> ProvinceJapan -> PrefectureSwitzerland -> CantonUSA -> State
   */
  @sap.unicode : 'false'
  @sap.label : 'Region'
  @sap.heading : 'Rg'
  @sap.quickinfo : 'Region (State, Province, County)'
  AddressRegion : String(3);
  /**
   * Region code of the campaign performance measures.
   * 
   * The mapping of external values to internal codes is maintained with the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Region'
  RegionName : String(40);
  /**
   * This is a key that represents the gender of a contact.
   * 
   * This field contains fixed values that represent the gender of a contact. The fixed values are: 1 = Male; 2 = Female; Space = Gender not known.User-defined values can be defined in the structure CUAN_S_API_MKT_CNTCT_ORIGIN_D in SEX_FT. User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Gender'
  GenderCode : String(1);
  /**
   * A free text field that specifies the gender of a contact.
   * 
   * This field contains user-definable gender names.User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Gender'
  GenderCodeName : String(40);
  /**
   * Postal code as part of the address
   * 
   * If different postal codes are maintained for the PO Box and Street address of an address, this field contains the Street address postal code.
   */
  @sap.unicode : 'false'
  @sap.label : 'Postal Code'
  @sap.heading : 'Post. Code'
  @sap.quickinfo : 'City Postal Code'
  ContactPostalCode : String(10);
  /**
   * Key for form of address text.
   * 
   * You can also define a form of address text in Customizing.The form of address text can be maintained in different languages.
   */
  @sap.unicode : 'false'
  @sap.label : 'Title'
  @sap.heading : 'Key'
  @sap.quickinfo : 'Form-of-Address Key'
  FormOfAddress : String(4);
  /**
   * Possible titles are stored in a check table. They are language-dependent.
   * 
   * Choose the title from the entries in the drop down list box.The title is displayed in text form in the screen field in the logon language, and its key is stored in the database.
   */
  @sap.unicode : 'false'
  @sap.label : 'Title'
  @sap.quickinfo : 'Title text'
  FormOfAddressName : String(30);
  /** This field contains the URL of a web site. */
  @sap.unicode : 'false'
  @sap.label : 'Website URL'
  @sap.quickinfo : 'Website URL for API-Service'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  WebsiteURL : String(1000);
  /**
   * This is an alphanumeric key that identifies an industry.
   * 
   * This field contains an alphanumber key of maximum 4 characters representing an industry.You can create custom entries in the configuration activity Industries for Contacts. User-defined values must be mapped to SAP internal keys in the Map Free Texts app.
   */
  @sap.unicode : 'false'
  @sap.label : 'Industry'
  @sap.heading : 'Indus.'
  @sap.quickinfo : 'Industry Key'
  Industry : String(4);
  /**
   * This field contains a free text describing the industry of your interaction contact.
   * 
   * You can define industries for your contacts in the configuration activity Industries for Contacts. User-defined entries must be mapped to SAP internal keys in the Map Free Texts app.Examples are automotive, chemicals, energy, or construction.
   */
  @sap.unicode : 'false'
  @sap.label : 'Industry'
  @sap.quickinfo : 'Description of Industry Key'
  IndustryName : String(40);
  /**
   * This is a free text defining the name of the company of your interaction contacts.
   * 
   * This free text information cannot be used to find a corporate account. If you want to associate a contact with a corporate account, you have to use the attributes CorporateAccoutOrigin and CorporateAccountID.
   */
  @sap.unicode : 'false'
  @sap.label : 'Corp Account Name'
  @sap.heading : 'Corporate Account Name'
  @sap.quickinfo : 'Corporate Account Name for API Service'
  CorporateAccountName : String(40);
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Origin of Contact'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CorporateAccountOrigin : String(20);
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'External Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  CorporateAccountID : String(255);
  /**
   * This indicator specifies that an interaction contact is obsolete and no longer valid.
   * 
   * This flag is appended to a contact to indicate that the contact was deleted or is obsolete in the source system.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Obsolete'
  @sap.quickinfo : 'Is Obsolete for API-Service'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  IsObsolete : Boolean;
  /**
   * This is an outbound ID that is automatically generated for every email sent.
   * 
   * The tracking ID is used to enable tracking of email events, for example, email opened or link clicked in email.If provided, the tracking ID can be reused in this context to uniquely match and merge contacts.
   */
  @sap.unicode : 'false'
  @sap.label : 'Tracking ID'
  @sap.heading : 'SAP Tracking ID'
  @sap.quickinfo : 'SAP Tracking ID'
  TrackingID : String(255);
  @cds.ambiguous : 'missing on condition?'
  MarketingSubscriptions : Association to many Marketing_Contact.MarketingSubscriptions on MarketingSubscriptions.ContactID = ContactID and MarketingSubscriptions.ContactOrigin = ContactOrigin;
  @cds.ambiguous : 'missing on condition?'
  MarketingPermissions : Association to many Marketing_Contact.MarketingPermissions on MarketingPermissions.ContactID = ContactID and MarketingPermissions.ContactOrigin = ContactOrigin;
  @cds.ambiguous : 'missing on condition?'
  MarketingAreas : Association to many Marketing_Contact.MarketingAreas on MarketingAreas.ContactOrigin = ContactOrigin and MarketingAreas.ContactID = ContactID;
  @cds.ambiguous : 'missing on condition?'
  MarketingLocations : Association to many Marketing_Contact.MarketingLocations on MarketingLocations.ContactID = ContactID and MarketingLocations.ContactOrigin = ContactOrigin;
  @cds.ambiguous : 'missing on condition?'
  MarketingAttributes : Association to many Marketing_Contact.MarketingAttributes on MarketingAttributes.ContactID = ContactID and MarketingAttributes.ContactOrigin = ContactOrigin;
  @cds.ambiguous : 'missing on condition?'
  AdditionalIDs : Association to many Marketing_Contact.AdditionalIDs on AdditionalIDs.ContactID = ContactID and AdditionalIDs.ContactOrigin = ContactOrigin;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '3'
entity Marketing_Contact.AdditionalIDs {
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Origin of Contact'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  key ContactOrigin : String(20) not null;
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'External Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  key ContactID : String(255) not null;
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Origin of Contact'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  key InteractionContactAdditionalOrigin : String(20) not null;
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'External Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  key InteractionContactAdditionalExternalID : String(255) not null;
  /**
   * This is an ID that is internally assigned to an additional ID.
   * 
   * Additional IDs are IDs for a contact that are derived from various sources (origins), such as from SAP ERP, Facebook, LinkedIn, or a web shop. Each origin provides one main ID for a contact, and can also provide additional IDs.Examples of additional IDs are: a loyalty card number, an email address, or phone, mobile and fax numbers.
   */
  @sap.unicode : 'false'
  @sap.label : 'Additional ID UUID'
  @sap.quickinfo : 'Additional ID UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  InteractionContactAdditionalOriginUUID : UUID;
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactUUID : UUID;
  @sap.unicode : 'false'
  @sap.label : 'Invalid'
  @sap.quickinfo : 'Object is invalid (''X'' = yes)'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IntactnContactAddlIDIsInvalid : Boolean;
  @cds.ambiguous : 'missing on condition?'
  MarketingAreas : Association to many Marketing_Contact.MarketingAreas on MarketingAreas.ContactOrigin = ContactOrigin and MarketingAreas.ContactID = ContactID and MarketingAreas.ContactOrigin = InteractionContactAdditionalOrigin and MarketingAreas.ContactID = InteractionContactAdditionalExternalID;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.content.version : '3'
entity Marketing_Contact.MarketingAttributes {
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Origin of Contact'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  key ContactOrigin : String(20) not null;
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'External Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  key ContactID : String(255) not null;
  /**
   * This field contains a free text description for a classification of marketing attributes.
   * 
   * You can define marketing attribute categories that can be assigned to customers, for instance, to store information about their hobbies or education history.Examples of marketing attribute categories are Sports, Languages, Education History.
   */
  @sap.unicode : 'false'
  @sap.label : 'Mkt. Category'
  @sap.heading : 'Marketing Category'
  @sap.quickinfo : 'Category for Marketing Attributes'
  key MarketingAttributeCategory : String(75) not null;
  /**
   * This field contains a free text description for a marketing attribute.
   * 
   * You can define marketing attribute categories that can be assigned to customers, for instance, to store information in the form of attributes about their hobbies or education history.Examples of marketing attributes for the category Sports are Soccer, Baseball, or Skiing.
   */
  @sap.unicode : 'false'
  @sap.label : 'Mkt. Value'
  @sap.heading : 'Marketing Value'
  @sap.quickinfo : 'Value for Marketing Attributes'
  key MarketingAttributeValue : String(255) not null;
  /**
   * This is an ID that is internally assigned to a marketing attribute category.
   * 
   * A marketing attribute category is a free text description for a classification of marketing attributes. You can define marketing attribute categories that can be assigned to contacts, for instance, to store information about their hobbies or education history.Examples of marketing attribute categories are Sports, Languages, Education History.
   */
  @sap.unicode : 'false'
  @sap.label : 'Marketing Attr. Cat'
  @sap.heading : 'Marketing Attribute Category UUID'
  @sap.quickinfo : 'Marketing Attribute Category UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  MarketingAttributeCategoryUUID : UUID;
  /**
   * This field contains an internally assigned ID for a marketing attribute.
   * 
   * You can define marketing attribute categories that can be assigned to contacts, for instance, to store information in the form of attributes about their hobbies or education history.Examples of marketing attributes for the category Sports are Soccer, Baseball, or Skiing.
   */
  @sap.unicode : 'false'
  @sap.label : 'Marketing Attribute'
  @sap.heading : 'Marketing Attribute UUID'
  @sap.quickinfo : 'Marketing Attribute UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  MarketingAttributeUUID : UUID;
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactUUID : UUID;
  @sap.unicode : 'false'
  @sap.label : 'Mkt. Category'
  @sap.heading : 'Marketing Category Description'
  @sap.quickinfo : 'Marketing Attribute Category Description'
  @sap.updatable : 'false'
  MarketingAttributeCategoryName : String(40);
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.content.version : '3'
entity Marketing_Contact.AccountTeamMembers {
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Origin of Contact'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  key ContactOrigin : String(20) not null;
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'External Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  key ContactID : String(255) not null;
  /**
   * This is the ID of an account team member. In SAP Marketing Cloud, it refers to the employee ID. In SAP Marketing, it refers to the user ID.
   * 
   * An account team member is an internal employee who is assigned to perform a specific service for a customer as part of the account team. For example, one employee is assigned to support the customer as Account Executive, another is assigned in the role of Sales Representative.
   */
  @sap.unicode : 'false'
  @sap.label : 'Team Member ID'
  @sap.quickinfo : 'Team Member ID for API-Service'
  key TeamMemberID : String(60) not null;
  /**
   * This describes the role of an account team member.
   * 
   * An account team member is an internal employee who is assigned to perform a specific service for a customer as part of the account team.For example, one employee is assigned to support the customer as Account Executive, another is assigned in the role of Sales Representative.
   */
  @sap.unicode : 'false'
  @sap.label : 'Team Member Role'
  key Role : String(4) not null;
  /**
   * The UUID of an account team member
   * 
   * This field contains the UUID of an account team member, which is internally assigned when the account team member is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'Account Team Member'
  @sap.heading : 'Account Team Member UUID'
  @sap.quickinfo : 'Account Team Member UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TeamMemberUUID : UUID;
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactUUID : UUID;
  /**
   * This indicator specifies that a team member is assigned as the account owner.
   * 
   * The account owner is the account team member who acts as the main employee responsible for the account.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Owner'
  @sap.quickinfo : 'Is Owner for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IsOwner : Boolean;
};

@cds.external : true
@cds.persistence.skip : true
@sap.creatable : 'false'
@sap.deletable : 'false'
@sap.content.version : '3'
entity Marketing_Contact.MarketingSubscriptions {
  /**
   * This is the external ID of an interaction contact.
   * 
   * This is the main ID of a contact or corporate account in an external system or origin.Examples of external IDs are a SAP CRM ID, a Facebook ID, or the contact's ID in a Web Shop.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact ID'
  @sap.heading : 'Ext. Interaction Contact Data ID'
  @sap.quickinfo : 'External ID of Interaction Contact Data'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ContactID : String(255) not null;
  /**
   * The origin of an interaction contact ID indicates the source of an ID, in other words, where it originated.
   * 
   * The origin could be the source system from which an ID derived, such as SAP CRM, or it can indicate the type of ID in question, such as email or mobile phone.You can set up the origins you want to use in the configuration app Origin of Contact IDs or in the Customizing activity Define Origins of Contact IDs.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact Origin'
  @sap.heading : 'Origin of Interaction Contact'
  @sap.quickinfo : 'Origin of Interaction Contact Data'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key ContactOrigin : String(20) not null;
  /**
   * This is the ID of the contact permission.
   * 
   * The ContactPermissionID and ContactPermissionOrigin properties store marketing permissions.An example is: first.lastname@mail.de
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact: Subscription ID'
  @sap.heading : 'Contact Permission ID'
  @sap.quickinfo : 'Contact Permission ID'
  key ContactSubscriptionID : String(255) not null;
  /**
   * This is the origin of the contact ID where marketing permissions are stored.
   * 
   * The origin indicates the source of an ID, in other words, where it originated. The ContactPermissionID and ContactPermissionOrigin properties store marketing permissions.You can maintain the origins you use in the Define Origins of Contact ID Customizing activity or in the Origins of Contact ID configuration activity.Examples of origins are EMAIL or MOBILE.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact: Subscription Origin'
  @sap.heading : 'Contact Permission Origin'
  @sap.quickinfo : 'Contact Permission Origin'
  key ContactSubscriptionOrigin : String(20) not null;
  /**
   * This is a path or channel used for communication or through which an interaction happened.
   * 
   * Examples of communication media can be EMAIL, PHONE, WEB, and specific social media channels (to be changed!).You can configure communication media in the configuration activity Manage Interaction Content.
   */
  @sap.unicode : 'false'
  @sap.label : 'Communication Medium'
  key CommunicationMedium : String(20) not null;
  /**
   * A grouping defined to manage newsletter subscriptions and communication limits for use in marketing campaigns.
   * 
   * A communication category can be assigned to an email or text message marketing campaign. It determines, for example, if contacts can subscribe or unsubscribe to newsletters or events using a landing page.When you create a newsletter subscription, the response of this request also contains the newsletter subscription name in the property.
   */
  @sap.unicode : 'false'
  @sap.label : 'Subscription Topic'
  @sap.heading : 'Communication Category ID'
  @sap.quickinfo : 'Comminication Category ID'
  key SubscriptionTopic : String(10) not null;
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'Subscription UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SubscriptionUUID : UUID;
  /**
   * This is the UUID (universally unique identifier) of the interaction contact.
   * 
   * This field contains the UUID, which is internally assigned to a contact or corporate account when it is created.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact UUID'
  @sap.heading : 'Universally Unique Identifier'
  @sap.quickinfo : 'UUID for API-Service'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactUUID : UUID;
  /**
   * This is a free text description of the origin.
   * 
   * This is a read-only field.
   */
  @sap.unicode : 'false'
  @sap.label : 'Contact: Subscription Origin Name'
  @sap.heading : 'Description for Origin of Contact Data'
  @sap.quickinfo : 'Description for Origin of Interaction Contact Data'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ContactSubscriptionOriginName : String(40) not null;
  /**
   * This is a free text description of a communication medium.
   * 
   * The communication medium describes the channel that a contact used to interact with your company.You can configure communication media in the configuration activity Manage Interaction Content.Examples of communication media are email, phone, text message, or social media.
   */
  @sap.unicode : 'false'
  @sap.label : 'Communication Medium: Name'
  @sap.heading : 'Communication Medium Description'
  @sap.quickinfo : 'Description of Communication Medium'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CommunicationMediumName : String(20) not null;
  /**
   * The timestamp refers to the time the interaction took place, not to the time the record was created on the database.
   * 
   * The timestamp must always be UTC time.When you import data, the local timestamp plus the difference to UTC is also allowed. For example, for New York local time 14:00:00, which is 5 hours before UTC, you could import the timestamp as: 2017-12-18T14:00:00-05:00 or 2017-12-18T19:00:00.When data is read, the UTC timestamp is always returned.An alternative UTC OData Format would be:Number of milliseconds since midnight Jan 1, 1970: /Date(1406014140922)/
   */
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Subcription: UTC Date/Time'
  @sap.heading : 'UTC Timestamp'
  @sap.quickinfo : 'UTC Timestamp for API-Services'
  SubscriptionUTCDateTime : Timestamp not null;
  /** This field indicates whether permission has been granted or not. The permission values can be Y (Yes) or N (No). */
  @sap.unicode : 'false'
  @sap.label : 'Subscription: Sign Up Exists'
  @sap.heading : 'Opt-In'
  @sap.quickinfo : 'Opt-In for Marketing Permission'
  SubscriptionSignUpExists : String(1) not null;
  /** The name of a communication category. A communication category is a grouping to manage newsletter subscriptions for marketing campaigns. */
  @sap.unicode : 'false'
  @sap.label : 'Subscription: Topic Name'
  @sap.quickinfo : 'Communication Category Name'
  SubscriptionTopicName : String(40) not null;
  /** The ID of the result object, for example, material number. */
  @sap.unicode : 'false'
  @sap.label : 'Subscription: Source Object'
  @sap.heading : 'Generic Object ID'
  @sap.quickinfo : 'Generic Object ID'
  SubscriptionSourceObject : String(50);
  /**
   * A recommendation data source type that is defined to an ITEM data source class, for example, SAP Commerce Product.
   * 
   * You can use the ItemSourceType entity to enable your customer channel to choose BasketObjectType from a value help.
   */
  @sap.unicode : 'false'
  @sap.label : 'Subscription: Source Object Type'
  @sap.heading : 'Generic Object Type'
  @sap.quickinfo : 'Object Type'
  SubscriptionSourceObjectType : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Subscription: Source System'
  @sap.heading : 'Source System ID'
  @sap.quickinfo : 'Interaction Source System ID'
  SubscriptionSourceSystem : String(255);
  /**
   * This field contains the type of source system from which the interaction data came.
   * 
   * The source system type identifies the type of system in which the interaction occurred. Types of source system include web shops, C4C systems or clickstream monitoring tools.
   */
  @sap.unicode : 'false'
  @sap.label : 'Subscription: Source System Type'
  @sap.heading : 'Source System Type'
  @sap.quickinfo : 'Interaction Source System Type'
  SubscriptionSourceSystemType : String(20);
  /**
   * This is a path or channel used to indicate from which communication medium a permission or subscription has been created.
   * 
   * You can configure communication media in the configuration app Manage Interaction Content or in Customizing for SAP Marketing under Interactions -> Define Communication Media. Examples of communication media can be EMAIL, PHONE, WEB.
   */
  @sap.unicode : 'false'
  @sap.label : 'Subscription: Source Communication Medium'
  @sap.heading : 'Permission Source Communication Medium'
  @sap.quickinfo : 'Source Communication Medium'
  SubscriptionSourceCommMedium : String(20);
  /**
   * This is a free text description of a communication medium.
   * 
   * The communication medium describes the channel that a contact used to interact with your company.You can configure communication media in the configuration activity Manage Interaction Content.Examples of communication media are email, phone, text message, or social media.
   */
  @sap.unicode : 'false'
  @sap.label : 'Subscription: Name of Source Communication Medium'
  @sap.heading : 'Communication Medium Description'
  @sap.quickinfo : 'Description of Communication Medium'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SubscriptionSrceCommMediumName : String(40) not null;
  /**
   * This is an indicator showing if a confirmation is required before storing the permission or subscription.
   * 
   * If the parameter is set to TRUE, the permission is stored using the double opt-in or opt-out process.If the property is not specified in the payload or it is set to FALSE the permission is directly stored.
   */
  @sap.unicode : 'false'
  @sap.label : 'Is Confirmation Required?'
  @sap.heading : 'Confirmation Is Required'
  @sap.quickinfo : 'Perm/Subscr. Is Confirmation Required'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  IsConfirmationRequired : Boolean not null;
  /**
   * This field contains the complete personal name. It is usually generated from the individual name components (without title).
   * 
   * There are two exceptions:The field contents were assembled by converting data from a previous release from the previous title and name fields because the title could not be assigned automatically to a title key . In this case the field CONVERTED (&quot;Status of the field NAME_TEXT&quot;) has the value 'X'.The field contents were maintained manually using a supplementary function in dialog, e.g. because the complete name cannot be split into the specified name parts. In this case the field CONVERTED (&quot;Status of the field NAME_TEXT&quot;) has the value 'M'.The field CONVERTED (&quot;Status of the field NAME_TEXT&quot;) has the value SPACE if neither of the exceptions applies.
   */
  @sap.unicode : 'false'
  @sap.label : 'Last Changed By User'
  @sap.heading : 'Full Name'
  @sap.quickinfo : 'Full Name of Person'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangedByUser : String(80);
  /**
   * The timestamp refers to the time the interaction took place, not to the time the record was created on the database.
   * 
   * The timestamp must always be UTC time.When you import data, the local timestamp plus the difference to UTC is also allowed. For example, for New York local time 14:00:00, which is 5 hours before UTC, you could import the timestamp as: 2017-12-18T14:00:00-05:00 or 2017-12-18T19:00:00.When data is read, the UTC timestamp is always returned.An alternative UTC OData Format would be:Number of milliseconds since midnight Jan 1, 1970: /Date(1406014140922)/
   */
  @odata.Type : 'Edm.DateTimeOffset'
  @odata.Precision : 7
  @sap.unicode : 'false'
  @sap.label : 'Last Change Date/Time'
  @sap.heading : 'UTC Timestamp'
  @sap.quickinfo : 'UTC Timestamp for API-Services'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangeDateTime : Timestamp;
  /** This is a note text. */
  @sap.unicode : 'false'
  @sap.label : 'Subscription: Note Text'
  @sap.heading : 'Note'
  @sap.quickinfo : 'Marketing Permission Note'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  SubscriptionNoteText : String(1000) not null;
};

@cds.external : true
type Marketing_Contact.TextCT {
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Text : LargeString not null;
};

@cds.external : true
action Marketing_Contact.ContactOriginDeleteAdditionalIDs(
  ContactID : String(255),
  ContactOrigin : String(20)
) returns Marketing_Contact.ContactOriginData;

@cds.external : true
action Marketing_Contact.ContactOriginDeleteAllMktgAreas(
  ContactID : String(255),
  ContactOrigin : String(20)
) returns Marketing_Contact.ContactOriginData;

@cds.external : true
action Marketing_Contact.ContactDeleteAllAccountTeamMembers(
  ContactID : String(255),
  ContactOrigin : String(20)
) returns Marketing_Contact.Contacts;

@cds.external : true
action Marketing_Contact.ContactOriginDeleteAllMktgLocations(
  ContactID : String(255),
  ContactOrigin : String(20)
) returns Marketing_Contact.ContactOriginData;

@cds.external : true
action Marketing_Contact.ContactOriginDeleteAllMktgAttributes(
  ContactID : String(255),
  ContactOrigin : String(20)
) returns Marketing_Contact.ContactOriginData;

@cds.external : true
action Marketing_Contact.ContactDeleteMarketingArea(
  ContactID : String(255),
  ContactOrigin : String(20),
  InteractionContactMktgArea : LargeString
) returns Marketing_Contact.Contacts;

