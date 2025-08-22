module.exports = {
  publicPath: './',     // делает относительные ссылки — удобно для http-server и локальных файлов
  outputDir: 'dist',    // куда попадёт сборка
  assetsDir: 'assets',  // папка для сборки ресурсов (js, css, изображения)
  productionSourceMap: false // не включать карты исходников в продакшн-сборку
}