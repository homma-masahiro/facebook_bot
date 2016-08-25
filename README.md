# Facebookの投稿をSlackに通知するBOT

Facebookの投稿を確認してSlackに通知してくれます。  

# 使い方
```
$ cd facebook_bot
$ npm install
$ ./node_modules/.bin/selenium-standalone install
$ npm start
```

定期的に実行するためにcrontabに設定してください。  
設定例：1時間毎に1時間前までの投稿を通知  

```
PATH="$PATH:{nodePath}"
0 * * * * cd {downloadPath}; ./node_modules/.bin/babel-node facebook_bot.js
```
※ nodenvを使っている場合whichコマンドででてくるnodeのパスはスクリプトのパスなので注意！  
※ PATH="$PATH:~/.nodenv/versions/x.x.x/bin"  

config.json.templateをconfig.jsonにリネームして各種設定をしてください。  
