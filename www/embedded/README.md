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
<script data-main="vutura-require" src="js/lib/require.js"></script>
  <script>
    require(['vutura-require'], function () {
      require(['app/script'], function () { })
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
    <link rel="stylesheet" href="css/style.css">
    <!-- other stuff -->
    <!--  -->
</head>
```