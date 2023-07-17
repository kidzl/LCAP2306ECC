using { Marketing_Contact } from './external/Marketing_Contact.cds';

using { LCAPNEW as my } from '../db/schema';

using LCAPNEW from '../db/schema';

@path : '/service/LCAPNEW'
service LCAPNEWService
{
    entity Books as
        projection on my.Books;

    entity Authors as
        projection on my.Authors;

    entity Contacts as
        projection on Marketing_Contact.Contacts;
}

annotate LCAPNEWService with @requires :
[
    'authenticated-user'
];
