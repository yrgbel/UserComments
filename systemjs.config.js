(function (global) {
  System.config({
    paths: {
      // npm - используется как псевдоним
      'npm:': 'node_modules/'
    },
    // указывает загрузчику где искать нужные элементы
    map: {
      // место расположения приложения - папка app
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
      'linq-es2015':'npm:linq-es2015/lib',
      'moment': 'npm:moment',
      'ng2-bootstrap': 'npm:ng2-bootstrap'
    },
    // Указываем как выполнять загрузку файлов, когда отсутствует имя файла или его расширение
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      'linq-es2015': {
        main: './linq.js',
        defaultExtension: 'js'
      },
      "ng2-bootstrap": {
        main: "bundles/ngx-bootstrap.umd.js",
        defaultExtension: "js"
      },
      "moment": { main: "moment.js", defaultExtension: "js" },
    }
  });
})(this);
