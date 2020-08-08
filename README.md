## VuturaWidgetChat:

## Quickstart:
- Tekan Tombol widget yang berada di pojok kanan bawah
- Masukkan nama yang ingin dimasukkan.
- Tombol Next untuk lanjut chat, Cancel untuk tidak melakukan chat
- terdapat 3 tombol, bintik diatas berfungsi untuk minimize, close untuk keluar dari chat, dan tombol kirim untuk mengirim pesan
- untuk mengirim pesan pada saat sudah menekan tombol kirim atau enter. diharapkan setelah menekan tombol enter atau kirim untuk merefresh page
- untuk menerima pesan juga diperlukan untuk merefresh halaman

## General info
Embedded Widget Vutura
	
## Technologies
Project is created with:
* Jquery 3.5.1
* RequireJs 2.3.6
* MaterializeJs 1.0.0
* SocketIo 2.3.0
* Firebase 7.15.5

	
## Setup
To embedded this widget, insert this code script

```
<body>
<script data-main="http://intern.vutura.io/widget/embedded/www/vutura-require.js" src="http://intern.vutura.io/widget/embedded/www/js/lib/require.js"></script>
    <script>
        require(['vutura-require'], function () {
            require(['http://intern.vutura.io/widget/embedded/www/js/app/script.js'], function () { })
        });
    </script>
    <div id="vutura-widget"></div>
  <!-- your other code -->
  <!--  -->
  <!--  -->
</body>
```
To embedded this widget, insert this code style

```
<head>
    <link rel="stylesheet" href="http://intern.vutura.io/widget/embedded/www/css/style.css">
    <!-- other stuff -->
    <!--  -->
</head>
```