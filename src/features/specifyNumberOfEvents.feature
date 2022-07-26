Feature: Specify Number of Events
    Scenario:  When the user hasn’t specified a number, 32 is the default number.

        Given the user at the home page

        When the user chooses no specific amount of search results

        Then the default amount of visible search results per city will be 32

    Scenario: The user can change the number of events they want to see.

        Given the user opened the search results query

        When the user changes the default number

        Then the default number of results will be changed to what the users select
