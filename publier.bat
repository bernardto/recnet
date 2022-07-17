git remote add second-heroku-app git@heroku.com:recnet1.git
@echo off
git add --all
git commit -m " Date (%date%-%time%)  Note : %1"
git push -f heroku master

