raptor
======

DHIS2 mobile friendly web-application for visualization 


Requirements
======

To run the server, you need to install nodeJS. After installing, do the following steps:

  1. Open a terminal.  
  2. Navigate to folder.
  3. Install dependencies by using: "npm install"
  4. Run our server by using "npm start"
  5. Enjoy.


How to query the API
======

  http://www.dhis2.org/doc/snapshot/en/user/html/ch25s21.html

JSON Story:

1. Get "api/me". 
  1a. Store the organisation unit
2. Get "api/indicators/
  2a. Show a list of possible indicators
  2b. Store the urls
  2c. User chooses a indicator 
3. Get "indicators/:id"
  3a. Store the key of every single indicator groups
4. Form "api/analytics.js" url.
  4a. Needs a organisation unit
  4b. Needs an indicator
  4c. Handle data retrieved and create seperate lists
  
  Rewrite:
  
Trends:
1. Get api/indicatorGroups/
    1a. Pick IndicatorGroup
2. For each Indicator in chosen indicatorGroup:
	2a. Get graph with arguments: dx:indicatorId and ou:organizationUnitId for LAST_12_MONTHS
		api/analytics.json?dimension=dx:%IndicatorKey%&dimension=pe:LAST_12_MONTHS&filter=ou:%OrgUnitKey%
3.
  
  