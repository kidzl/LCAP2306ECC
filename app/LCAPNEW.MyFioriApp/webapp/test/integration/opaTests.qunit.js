sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'LCAPNEW/MyFioriApp/test/integration/FirstJourney',
		'LCAPNEW/MyFioriApp/test/integration/pages/BooksList',
		'LCAPNEW/MyFioriApp/test/integration/pages/BooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksList, BooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('LCAPNEW/MyFioriApp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksList: BooksList,
					onTheBooksObjectPage: BooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);