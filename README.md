# ProjectWork9
 Моя проектная работа №9 из Я.Практикум, версия 0.0.1

 Ссылка на проект: https://graev.github.io/ProjectWork9/src

Виды сборок:
1) "build": "NODE_ENV=production rimraf dist && webpack --mode production" собирает с помощью webpack итоговый проект в папку dist, пропуская его через интерпретаторы
2) "dev": "NODE_ENV=development webpack-dev-server --mode development --open --watch" запускает локальный сервер с собраным проектом
3) "deploy": "NODE_ENV=production gh-pages -d dist" публикует собранный в папке dist проект

 Для сборки проекта использовались:
 "babel-polyfill": "^6.26.0",
 "core-js": "^3.1.4",
 "webpack": "^4.41.2",
 "@babel/cli": "^7.6.4",
 "@babel/core": "^7.6.4",
 "@babel/preset-env": "^7.6.3",
 "autoprefixer": "^9.7.0",
 "babel-loader": "^8.0.6",
 "cross-env": "^6.0.3",
 "css-loader": "^3.2.0",
 "cssnano": "^4.1.10",
 "file-loader": "^4.2.0",
 "html-webpack-plugin": "^3.2.0",
 "image-webpack-loader": "^6.0.0",
 "mini-css-extract-plugin": "^0.8.0",
 "optimize-css-assets-webpack-plugin": "^5.0.3",
 "postcss-loader": "^3.0.0",
 "style-loader": "^1.0.0",
 "webpack-cli": "^3.3.9",
 "webpack-dev-server": "^3.9.0",
 "webpack-md5-hash": "0.0.6"
