using { LCAPNEW as my } from '../db/schema';

using LCAPNEW from '../db/schema';

@path : '/service/LCAPNEW'
service LCAPNEWService
{
    entity Books as
        projection on my.Books;

    entity Authors as
        projection on my.Authors;
}

annotate LCAPNEWService with @requires :
[
    'authenticated-user'
];
