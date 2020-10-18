# Reactchat

Chat app using React, Mercure and Symfony 5.

Before start you have to install:
1. mercure from https://github.com/dunglas/mercure/releases
2. composer
3. yarn

Setup
1. Copy file from `.env.local` to `.env` and set correct variables to DATABASE_URL
2. Run command 
`.\mercure.exe --jwt-key='!ChangeMe!' --addr='localhost:3000' --allow-anonymous --cors-allowed-origins='*'`
3. In symfony project run `composer install`
4. Run `yarn` to download all js packages
5. Run `yarn build` to build and merge js files 
6. Run `php bin/console doctrine:fixtures:load --no-interaction` to load example data
7. Make an entry point from web serwer to symfony folder, for example in apache:
```
<VirtualHost 127.0.0.1:80>
 ServerName rchat.local
 DocumentRoot C:\xampp73\htdocs\github\reactchat\public
</VirtualHost>
```
8. Go to rchat.local, log in with example data: login user0, pass: qwe123 
9. In other browser or incognito tab go to rchat.local and log in as user1, pass: qwe123
