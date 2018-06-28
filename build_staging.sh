#!/bin/sh
echo "-- BEGINNING STAGING CUSTOM BUILD SCRIPT EXECUTION FOR DEVOIRSFAITS --"
echo "--> npm i npm@latest -g"
npm i npm@latest -g
echo "--> ng build --configuration=staging"
ng build --configuration=staging
echo "-- END STAGING CUSTOM BUILD SCRIPT EXECUTION FOR DEVOIRSFAITS --"

