define(
  [
    'jquery',
    'socketIo',
    'MaterializeJs',
    '@firebase/app',
    '@firebase/storage'
  ],
  function ($, io, M, firebase) {
    $(document).ready(function () {

      /* eksport the html */
      $("#vutura-widget").append(`
      <div class="badges-nontification"></div>
      <div id="myBtn">
        <img src="https://i.ibb.co/9H0xs0T/m-vutura-logo.png" alt="m-vutura-logo" id="widget">
      </div>
      <div id="myModal">
        <div id="modalimage">
          <div class="contentimage">
            <div class="header-image">
              <div class="row">
                <div class="col s10 title" style="margin-top: 5px;">Preview</div>
                <div class="col s2">
                  <span class="close-image tooltipped" data-position="bottom" data-tooltip="Tutup?">&times;</span>
                </div>
              </div>
            </div>
            <div class="preview">
              <div id="box">
                <img src="" alt="image preview" class="image-preview__image">
              </div>
            </div>
            <div class="progress loadingImage">
              <div class="determinate ImageDeterminate"></div>
            </div>
            <div id="caption">
              <input type="text" name="text-caption" id="text-caption" placeholder="Add Caption">
            </div>
            <div class="send">
              <span class="material-icons tooltipped" id="sendimage" data-position="top" data-tooltip="Kirim?">send</span>
            </div>
          </div>
    
    
        </div>
        <div class="header">
          <div class="row">
            <img src="https://i.ibb.co/JzW7xxC/bintik.png" alt="bintik" id="bintik">
            <span  class="tooltipped">Minimize</span>
          </div>
          <div class="row baris2">
            <div class="col">
              <span class="title">
                <img src="https://i.ibb.co/SJjtVM1/vutura-logo.png" alt="vutura-logo" id="ava">
              </span>
            </div>
          </div>
        </div>
        <div class="progress loadingFile">
          <div class="determinate fileDeterminate"></div>
        </div>
        <div class="modal-content-login">
          <div class="content-login">
            <div class="header-login">
              <div class="myLogin">
                <div class="row">
                  <div class="col s12 center-align" style="font-family: poppins; font-size: 15px; padding-top: 10px;">
                    Selamat Datang!
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 center-align" style="font-family: poppins; font-size: 13px; padding-top: 10px;">
                    Nama Kamu Siapa?
                  </div>
                </div>
                <div class="row content-isi">
                  <div class="col s12">
                    <input type="text" class="validate" name="nama" id="nama" style="text-align:center;" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12">
                    <small id="warn1"></small>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12 center-align" style="font-family: poppins; font-size: 13px; padding-top: 10px;">
                    Email kamu apa?
                  </div>
                </div>
                <div class="row content-isi">
                  <div class="col s12">
                    <input type="email" class="validate" name="email" id="email" style="text-align:center;" required>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12">
                    <small id="warn2"></small>
                  </div>
                </div>
                <div class="row">
                  <div class="col s12">
                    <a class="waves-effect waves-light btn orange" id="submitlogin">Mulai</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-content">
          
          <div class="container-fluid">
            <div id="firsttgl"></div>
            <div id="console-admin">
    
            </div>
            <div id="console">
            </div>
          </div>
        </div>
        <div class="message">
          <div id="abs">
            <div class="row valign-wrapper messagebox ">
              <div class="col s1 fl1">
                <label class="mdl-button mdl-js-button mdl-button--icon mdl-button--file">
                  <i class="material-icons" id="in_image">image</i><input type="file" name="file" id="file" accept="image/*"
                    placeholder="test" >
                </label>
              </div>
              <div class="col s1 fl2">
                <label class="mdl-button mdl-js-button mdl-button--icon mdl-button--file">
                  <i class="material-icons" id="in_image_file">attach_file</i><input type="file" name="fileDoc" id="fileDoc" accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, application/pdf"
                    placeholder="test" >
                </label>
              </div>
              <div class="col s8 fl3">
                <textarea name="pesan" id="textarea1" class="materialize-textarea"
                  placeholder="Masukkan Pesan..."></textarea>
              </div>
              <div class="col s2 fl4" id="iconsend">
                <span class="material-icons " id="sendmes">send</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      `);


      /* Upload Image Area here ---------------------------------------------------------------------------------------------- */
      // url
      const urllink = "http://intern.vutura.io:3000";
      localStorage.setItem("loadmodal", 0)
      const login = JSON.parse(localStorage.getItem("login"));
      const socket = io(urllink);
      if (localStorage.getItem("number") == 1) {
        socket.emit("register-as-customer", login.id);
        localStorage.setItem("regist", true)
        socket.emit("open-cust", login.id);
        localStorage.setItem("opencust", true)
        localStorage.setItem("nontification", 0)
      }

      /* Upload Image Area here ---------------------------------------------------------------------------------------------- */

      /* Upload Image and File Area here ---------------------------------------------------------------------------------------------- */


      /* Your web app's Firebase configuration */
      var firebaseConfig = {
        apiKey: "AIzaSyBwMaMrR6Of3YMupLKg1mbki5mBA_IIQhg",
        authDomain: "test-7da67.firebaseapp.com",
        databaseURL: "https://test-7da67.firebaseio.com",
        projectId: "test-7da67",
        storageBucket: "test-7da67.appspot.com",
        messagingSenderId: "1017444381148",
        appId: "1:1017444381148:web:2dd5f8e99e908363521f19",
      };

      /*  Initialize Firebase */
      firebase.initializeApp(firebaseConfig);

      /* Upload File */
      $("#fileDoc").change(function () {
        $(".loadingFile").hide();
        var dt = new Date();
        var hour = dt.getHours();
        var minutes = parseMinutes(dt.getMinutes());
        var time = [hour, minutes].join(":");
        const login = JSON.parse(localStorage.getItem("login"));
        var iconnama = localStorage.getItem("namaicon");
        var allowedFileExt = /(\.docs|\.docm|\.docx|\.pdf|\.xls|\.xlsx)$/i;
        if (this.files && this.files[0]) {
          var dataDoc = document.querySelector("#fileDoc").files[0]
          var inpFileExt = $("#fileDoc").val();
          if (!allowedFileExt.exec(inpFileExt)) {
            alert("not a Document format please insert another file with extension .doc, .pdf, or .xls");
          } else {
            if (dataDoc.size < 1000000) {
              const refFile = firebase.storage().ref()
              const name = login.id + "-" + dataDoc.name;
              const metadata = {
                contentType: dataDoc.type,
              };
              $(".loadingFile").show();
              var uploadTask = refFile.child('document/' + name).put(dataDoc, metadata);
              uploadTask.on('state_changed', function (snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                $(".fileDeterminate").css("width", progress + "%");
                // console.log(progress)
                switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED: // or 'paused'
                    // console.log('Upload is paused');
                    break;
                  case firebase.storage.TaskState.RUNNING: // or 'running'
                    // console.log('Upload is running');
                    break;
                }
              }, function (error) {
                // Handle unsuccessful uploads
              }, function () {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                  var url = downloadURL;
                  console.log(url)
                  var data = {};
                  data.msg = dataDoc.name;
                  data.idcust = login.id;
                  data.img = "";
                  data.file = url;
                  socket.emit("customerChat", data, (callback) => {
                    if (!callback) {
                      $(".uploadedListener").attr("onclick", "M.toast({html: 'Uploaded', classes: 'toast-success', inDuration: '100'})")
                      $(".uploadedListener").click();

                      $("#console").append(
                        ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id="kirim-warna-file">
                                  <a href="`+ url + `" target="_blank">
                                    <div class="row captionFile">
                                      <i class="material-icons sizeIconFile" id="iconImages">insert_drive_file</i>
                                      <p>` + dataDoc.name + `</p>
                                    </div>
                                    <div class="overlay">
                                    <i class="material-icons sizeIconFile" id="iconDownloads">file_download</i>
                                    <p>` + dataDoc.name + `</p>
                                  </div>
                                  </a>
                                </div>
                                <small id='jamterima'>` + time + `</small>
                                <small id="kirim" class="material-icons centang" >done_all</small>
                              </div>
                              <div class='col'><div class="circle avatar-user">
                                <span class="avatar-user-text">` + iconnama + `</span>
                              </div>
                            </div>
                          </div>`
                      );
                      $(".modal-content")
                        .stop()
                        .animate({
                          scrollTop: $(".modal-content")[0].scrollHeight,
                        });
                      $("#text-caption").val("");
                    } else {
                      $(".uploadedListener").attr("onclick", "M.toast({html: 'Uploaded', classes: 'toast-success', inDuration: '100'})")
                      $(".uploadedListener").click();
                      $("#console").append(
                        ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id="kirim-warna-file">
                                    <a href="`+ url + `" target="_blank">
                                      <div class="row captionFile">
                                        <i class="material-icons sizeIconFile" id="iconImages">insert_drive_file</i>
                                        <p>` + dataDoc.name + `</p>
                                      </div>
                                      <div class="overlay">
                                      <i class="material-icons sizeIconFile" id="iconDownloads">file_download</i>
                                      <p>` + dataDoc.name + `</p>
                                    </div>
                                    </a>
                                  </div>
                                  <small id='jamterima'>` + time + `</small>
                                  <small id="kirim" class="material-icons centang_done" >done_all</small>
                                </div>
                                <div class='col'><div class="circle avatar-user">
                                  <span class="avatar-user-text">` + iconnama + `</span>
                                </div>
                              </div>
                            </div>`
                      );
                    }
                    $(".modal-content")
                      .stop()
                      .animate({
                        scrollTop: $(".modal-content")[0].scrollHeight,
                      });
                    $("#text-caption").val("");
                  });
                  $(".loadingFile").hide();
                  // add some append file and emit that
                });
              });
            } else {
              alert("Document size must be under 1 Mb")
            }
          }
        }
      });

      /* Upload Image */
      $("#file").change(function () {
        $(".loadingImage").hide();
        const previewImage = document.getElementById("box");
        const previewImageItem = previewImage.querySelector(".image-preview__image");
        var allowedExt = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (this.files && this.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var dataFile = document.querySelector("#file").files[0];
            var inpext = $("#file").val();
            if (!allowedExt.exec(inpext)) {
              alert("not a picture format please insert another file")
            } else {
              if (dataFile.size < 1000000) {
                // console.log(dataFile.type)
                $(".contentimage").show();
                $(".container-fluid").hide();
                $("#modalimage").css("animation", "fadein 0.5s");
                $("#modalimage").show();
                previewImageItem.style.display = "block";
                previewImageItem.setAttribute("src", e.target.result);
                var i = 0;
                $("#sendimage").click(function () {
                  $(".loadingImage").show();
                  var dt = new Date();
                  var hour = dt.getHours();
                  var minutes = parseMinutes(dt.getMinutes());
                  var time = [hour, minutes].join(":");
                  const login = JSON.parse(localStorage.getItem("login"));
                  const ref = firebase.storage().ref();
                  const filePath = document.querySelector("#file").files[0];
                  var text = $("#text-caption").val();
                  // console.log(text)
                  if (i == 0) {
                    const name = login.id + "-" + filePath.name;
                    const metadata = {
                      contentType: filePath.type,
                    };
                    var iconnama = localStorage.getItem("namaicon");
                    var uploadTask = ref.child("images/" + name).put(filePath, metadata);
                    uploadTask.on('state_changed', function (snapshot) {
                      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      $(".ImageDeterminate").css("width", progress + "%");
                      // console.log('Upload is ' + progress + '% done');
                      switch (snapshot.state) {
                        case firebase.storage.TaskState.PAUSED: // or 'paused'
                          // console.log('Upload is paused');
                          break;
                        case firebase.storage.TaskState.RUNNING: // or 'running'
                          // console.log('Upload is running');
                          break;
                      }
                    }, function (error) {
                      // Handle unsuccessful uploads
                    }, function () {
                      // Handle successful uploads on complete
                      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                        var url = downloadURL;
                        $(".contentimage").hide();
                        $(".container-fluid").show();
                        $("#modalimage").css("animation", "fadeout 0.5s");
                        $("#modalimage").hide();
                        var data = {};
                        data.msg = text;
                        data.idcust = login.id;
                        data.img = url;
                        data.file = ""
                        socket.emit("customerChat", data, (callback) => {
                          if (!callback) {
                            $(".uploadedListener").attr("onclick", "M.toast({html: 'Uploaded', classes: 'toast-success', inDuration: '100'})")
                            $(".uploadedListener").click();
                            if (data.msg != "") {
                              $("#console").append(
                                ` <div class='kirim'>
                                    <div class='row'>
                                      <div class='col'>
                                        <div id='kirim-warna'>
                                          <a href="`+ url + `" target="_blank">
                                            <img src="` + url + `" class="sendingimage"> </img>
                                          </a>
                                          <p>` + text + `</p>
                                        </div>
                                        <small id='jamterima'>` + time + `</small>
                                        <small id="kirim" class="material-icons centang" >done_all</small>
                                      </div>
                                      <div class='col'><div class="circle avatar-user">
                                        <span class="avatar-user-text">` + iconnama + `</span>
                                      </div>
                                    </div>
                                  </div>`
                              );
                            } else {
                              $("#console").append(
                                ` <div class='kirim'>
                                    <div class='row'>
                                      <div class='col'>
                                        <div id='kirim-warna'>
                                          <a href="`+ url + `" target="_blank">
                                            <img src="` + url + `" class="sendingimage"> </img>
                                          </a>
                                        </div>
                                        <small id='jamterima'>` + time + `</small>
                                        <small id="kirim" class="material-icons centang" >done_all</small>
                                      </div>
                                      <div class='col'><div class="circle avatar-user">
                                        <span class="avatar-user-text">` + iconnama + `</span>
                                      </div>
                                    </div>
                                  </div>`
                              );
                            }
                            $(".modal-content")
                              .stop()
                              .animate({
                                scrollTop: $(".modal-content")[0].scrollHeight,
                              });
                            $("#text-caption").val("");
                          } else {
                            alert("image Upload Success");
                            if (data.msg != "") {
                              $("#console").append(
                                ` <div class='kirim'>
                                    <div class='row'>
                                      <div class='col'>
                                        <div id='kirim-warna'>
                                          <a href="`+ url + `" target="_blank">
                                            <img src="` + url + `" class="sendingimage"> </img>
                                          </a>
                                          <p>` + text + `</p>
                                        </div>
                                        <small id='jamterima'>` + time + `</small>
                                        <small id="kirim" class="material-icons centang_done" >done_all</small>
                                      </div>
                                      <div class='col'>
                                        <div class="circle avatar-user">
                                          <span class="avatar-user-text">` + iconnama + `</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`
                              );
                            } else {
                              $("#console").append(
                                ` <div class='kirim'>
                                    <div class='row'>
                                      <div class='col'>
                                        <div id='kirim-warna'>
                                          <a href="`+ url + `" target="_blank">
                                            <img src="` + url + `" class="sendingimage"> </img>
                                          </a>
                                        </div>
                                        <small id='jamterima'>` + time + `</small>
                                        <small id="kirim" class="material-icons centang_done" >done_all</small>
                                      </div>
                                      <div class='col'>
                                        <div class="circle avatar-user">
                                          <span class="avatar-user-text">` + iconnama + `</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>`
                              );
                            }

                            $(".modal-content")
                              .stop()
                              .animate({
                                scrollTop: $(".modal-content")[0].scrollHeight,
                              });
                            $("#text-caption").val("");
                          }
                        });
                      });
                    });
                  }
                  i += 1;
                });
              }
              else {
                alert("Image Size must be under 1 Mb");
              }
            }
          };
          reader.readAsDataURL(this.files[0]);
        }
      });

      /*  close preview image */
      $(".close-image").click(function () {
        $(".contentimage").hide();
        $("#modalimage").hide();
        $(".container-fluid").show();
        $(".modal-content")
          .stop()
          .animate({ scrollTop: $(".modal-content")[0].scrollHeight });
        $("#file").val("");
        $("#text-caption").val("");
      });


      /* Upload Image Area here ---------------------------------------------------------------------------------------------- */


      /* Function Area here ---------------------------------------------------------------------------------------------- */

      /* Increatment nontification */
      function popInc(s) {
        // console.log(s);
        s = s + 1;
        // console.log(s)
        localStorage.setItem("nontification", s);
        // return false;
      }

      /*  parse minutes */
      function parseMinutes(g) {
        var smenit = g.toString();
        var tmpmenit = "";
        if (smenit.length == 1) {
          tmpmenit = "0" + smenit;
        } else {
          tmpmenit = smenit;
        }
        return tmpmenit;
      }



      /* parse date */
      function parseDate(s) {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        var month = new Array();
        month[0] = "January";
        month[1] = "February";
        month[2] = "March";
        month[3] = "April";
        month[4] = "May";
        month[5] = "June";
        month[6] = "July";
        month[7] = "August";
        month[8] = "September";
        month[9] = "October";
        month[10] = "November";
        month[11] = "December";

        var b = s.split(/\D+/);
        var d = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        dformat =
          weekday[d.getDay()] +
          ", " +
          month[d.getMonth()] +
          " " +
          d.getDate() +
          " ," +
          d.getFullYear();
        return dformat;
      }


      /* parse isodate */
      function parseISOString(s) {
        /* rumusnya adalah s = jam server, l = adalah jam local, k = s-l
        jam yang sesuai dengan jam sekarang adalah = s-k */
        var r = new Date();
        var time = r.getHours();
        var b = s.split(/\D+/);
        var d = new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        var jam = d.getHours() - time;
        var menit = d.getMinutes();
        var smenit = menit.toString();
        var amenit = "";
        if (smenit.length == 1) {
          var amenit = "0" + smenit;
        } else {
          amenit = d.getMinutes();
        }

        dformat = [d.getHours() - jam, amenit].join(":");
        return dformat;
      }



      /* load data function */
      function load() {
        if (localStorage.getItem("number") == 1) {
          // console.log("hit")
          let seslog = JSON.parse(localStorage.getItem("login"));
          // socket.emit("register-as-customer", seslog.id);

          $.ajax({
            url: urllink + "/customers/home/limit/" + seslog.id,
            type: "get",
            dataType: "json",
            success: function (result) {
              let message = result.data.reverse();
              // console.log(message[i])
              if (message.length < 20) {
                $("#console-admin").prepend(
                  `
                <div class="terima">
                  <div class="row">
                    <div class="col">
                      <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="m-vutura-logo" class="image">
                    </div>
                    <div class="col">
                      <div id="terima-warna">
                        Selamat datang di vutura` + seslog.username + ` , ada yang bisa saya bantu?
                      </div>
                    </div>
                  </div>
                `);
              }
              sessionStorage.setItem("lastChatItemId", message[0]._id)
              if (message.length != 0) {
                var tmptgl = parseDate(message[0].date);

                for (let i = 0; i < message.length; i++) {
                  var tgl = parseDate(message[i].date);
                  if (i == 0) {
                    tmptgl = tgl;
                    $("#firsttgl").append(
                      ` <div class="tgl1">
                          <div class="row">
                            <div class="col">
                              <p>` + tmptgl + `<p>
                            </div>
                          </div>
                        </div>`
                    );
                  }
                  if (tmptgl != tgl) {
                    tmptgl = tgl;
                    $("#console").append(
                      ` <div class="tgl">
                          <div class="row">
                            <div class="col">
                               <p>` + tmptgl + `<p>
                            </div>
                          </div>
                        </div>`
                    );
                  }
                  if (message[i].from == "admin") {
                    var asd = parseISOString(message[i].date);
                    if (message[i].img != "" && message[i].msg != "" && message[i].file == "") {
                      $("#console").append(
                        ` <div class="terima1">
                            <div class="row">
                              <div class="col">
                                <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                              </div>
                              <div class="col">
                                <div id="terima-warna">
                                  <a href="`+ message[i].img + `" target="_blank">
                                    <img src="` + message[i].img + `" class="sendingimage"> </img>
                                  </a>
                                  <p>` + message[i].msg + `</p>
                                </div>
                                <small id="jamterima">` + asd + `</small>
                              </div>
                            </div>
                          </div>`
                      );
                    }
                    if (message[i].file != "" && message[i].msg != "" && message[i].img == "") {
                      $("#console").append(
                        ` <div class="terima1-file">
                      <div class="row">
                        <div class="col">
                          <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                        </div>
                        <div class="col">
                          <div id="terima-warna-file">
                            <a href="`+ message[i].file + `" target="_blank">
                              <div class="row captionFile">
                                <i class="material-icons sizeIconFile" id="iconImages">insert_drive_file</i>
                                <p>` + message[i].msg + `</p>
                              </div>
                              <div class="overlay">
                              <i class="material-icons sizeIconFile" id="iconDownloads">file_download</i>
                              <p>` + message[i].msg + `</p>
                            </div>
                            </a>
                          </div>
                          <small id="jamterima">` + asd + `</small>
                        </div>
                      </div>
                    </div>`
                      );
                    }
                    if (message[i].img == "" && message[i].msg != "" && message[i].file == "") {
                      $("#console").append(
                        ` <div class="terima1">
                            <div class="row">
                              <div class="col">
                                <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                              </div>
                              <div class="col">
                                <div id="terima-warna">` + message[i].msg + `</div>
                                  <small id="jamterima">` + asd + `</small>
                                </div>
                              </div>
                          </div>`
                      );
                    }
                    if (message[i].msg == "" && message[i].img != "" && message[i].file == "") {
                      $("#console").append(
                        `  <div class="terima1">
                            <div class="row">
                              <div class="col">
                                <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                              </div>
                              <div class="col">
                                <div id="terima-warna">
                                  <a href="`+ message[i].file + `" target="_blank">
                                    <img src="` + message[i].file + `" class="sendingimage"> </img>
                                  </a>
                                </div>
                                <small id="jamterima">` + asd + `</small>
                              </div>
                            </div>
                          </div>`
                      );
                    }
                  } else {
                    var asd2 = parseISOString(message[i].date);
                    var iconnama = localStorage.getItem("namaicon");
                    if (message[i].read == Boolean(false)) {
                      if (message[i].msg != "" && message[i].img != "" && message[i].file == "") {
                        $("#console").append(
                          ` <div class='kirim'>
                              <div class='row'>      
                                <div class='col'>
                                  <div id='kirim-warna'>
                                    <a href="`+ message[i].img + `" target="_blank">
                                      <img src="` + message[i].img + `" class="sendingimage"> </img>
                                    </a>
                                    <p>` + message[i].msg + `</p>
                                  </div>
                                  <small id='jamterima'>` + asd2 + `</small>
                                  <small  id="kirim" class="material-icons centang">done_all</small>>
                                </div>
                                <div class='col'>
                                  <div class="circle avatar-user">
                                    <span class="avatar-user-text">` + iconnama + `</span>
                                  </div>
                                </div>
                              </div>
                            </div>`
                        );
                      }
                      if (message[i].file != "" && message[i].msg != "" && message[i].img == "") {
                        $("#console").append(
                          ` <div class='kirim'>
                        <div class='row'>      
                          <div class='col'>
                            <div id="kirim-warna-file">
                              <a href="`+ message[i].file + `" target="_blank">
                                <div class="row captionFile">
                                  <i class="material-icons sizeIconFile" id="iconImages">insert_drive_file</i>
                                  <p>` + message[i].msg + `</p>
                                </div>
                                <div class="overlay-kirim">
                                <i class="material-icons sizeIconFile" id="iconDownloads">file_download</i>
                                <p>` + message[i].msg + `</p>
                              </div>
                              </a>
                            </div>
                            <small id='jamterima'>` + asd2 + `</small>
                            <small  id="kirim" class="material-icons centang">done_all</small>>
                          </div>
                          <div class='col'>
                            <div class="circle avatar-user">
                              <span class="avatar-user-text">` + iconnama + `</span>
                            </div>
                          </div>
                        </div>
                      </div>`
                        );
                      }
                      if (message[i].img == "" && message[i].msg != "" && message[i].file == "") {
                        $("#console").append(
                          ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id='kirim-warna'>` + message[i].msg + `</div>
                                    <small id='jamterima'>` + asd2 + `</small>
                                    <small id="kirim" class="material-icons centang" >done_all</small>
                                  </div>
                                <div class='col'>
                                  <div class="circle avatar-user">
                                    <span class="avatar-user-text">` + iconnama + `</span>
                                  </div>
                                </div>
                              </div>
                            </div>`
                        );
                      }
                      if (message[i].msg == "" && message[i].img != "" && message[i].file == "") {
                        // console.log(message[i].open)
                        $("#console").append(
                          ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id='kirim-warna'>
                                    <a href="`+ message[i].img + `" target="_blank">
                                      <img src="` + message[i].img + `" class="sendingimage"> </img>
                                    </a>
                                  </div>
                                  <small id='jamterima'>` + asd2 + `</small>
                                  <small id="kirim" class="material-icons centang" >done_all</small>
                                </div>
                                <div class='col'>
                                  <div class="circle avatar-user">
                                    <span class="avatar-user-text">` + iconnama + `</span>
                                  </div>
                                </div>
                              </div>
                            </div>`
                        );
                      }
                    } else {
                      if (message[i].msg != "" && message[i].img != "" && message[i].file == "") {
                        $("#console").append(
                          ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                    <div id='kirim-warna'>
                                      <a href="`+ message[i].img + `" target="_blank">
                                        <img src="` + message[i].img + `" class="sendingimage"> </img>
                                      </a>
                                      <p>` + message[i].msg + `</p>
                                    </div>
                                    <small id='jamterima'>` + asd2 + `</small>
                                    <small id="kirim" class="material-icons centang_done" >done_all</small>
                                  </div>
                                  <div class='col'>
                                    <div class="circle avatar-user">
                                      <span class="avatar-user-text">` + iconnama + `</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>`
                        );
                      }
                      if (message[i].file != "" && message[i].msg != "" && message[i].img == "") {
                        $("#console").append(
                          ` <div class='kirim'>
                        <div class='row'>      
                          <div class='col'>
                            <div id="kirim-warna-file">
                              <a href="`+ message[i].file + `" target="_blank">
                                <div class="row captionFile">
                                  <i class="material-icons sizeIconFile" id="iconImages">insert_drive_file</i>
                                  <p>` + message[i].msg + `</p>
                                </div>
                                <div class="overlay-kirim">
                                <i class="material-icons sizeIconFile" id="iconDownloads">file_download</i>
                                <p>` + message[i].msg + `</p>
                              </div>
                              </a>
                            </div>
                            <small id='jamterima'>` + asd2 + `</small>
                            <small  id="kirim" class="material-icons centang_done">done_all</small>>
                          </div>
                          <div class='col'>
                            <div class="circle avatar-user">
                              <span class="avatar-user-text">` + iconnama + `</span>
                            </div>
                          </div>
                        </div>
                      </div>`
                        );
                      }
                      if (message[i].img == "" && message[i].msg != "" && message[i].file == "") {
                        $("#console").append(
                          ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id='kirim-warna'>` + message[i].msg + `</div>
                                    <small id='jamterima'>` + asd2 + `</small>
                                    <small id="kirim" class="material-icons centang_done" >done_all</small>
                                  </div>
                                  <div class='col'>
                                    <div class="circle avatar-user">
                                      <span class="avatar-user-text">` + iconnama + `</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>`
                        );
                      }
                      if (message[i].msg == "" && message[i].img != "" && message[i].file == "") {
                        // console.log(message[i].open)
                        $("#console").append(
                          ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id='kirim-warna'>
                                    <a href="`+ message[i].img + `" target="_blank">
                                      <img src="` + message[i].img + `" class="sendingimage"> </img>
                                    </a>
                                  </div>
                                  <small id='jamterima'>` + asd2 + `</small>
                                  <small id="kirim" class="material-icons centang_done" >done_all</small>
                                </div>
                                <div class='col'>
                                  <div class="circle avatar-user">
                                    <span class="avatar-user-text">` + iconnama + `</span>
                                  </div>
                                </div>
                              </div>
                            </div>`
                        );
                      }
                    }
                  }
                  $(".modal-content")
                    .stop()
                    .animate({ scrollTop: $(".modal-content")[0].scrollHeight });
                }
              }
            },
          });
        }
      }


      /* Function Area here ---------------------------------------------------------------------------------------------- */


      /* Socket On Area here ---------------------------------------------------------------------------------------------- */


      // terima data dari admin realtime socket
      socket.on("adminChat", (asd) => {
        // console.log(asd)
        // // console.log(positionInfo.width)
        var hideorpop = $("#myModal").css("display");
        // console.log(hideorpop)
        if (hideorpop == "none") {
          popInc(parseInt(localStorage.getItem("nontification")));
          var lotsnotific = localStorage.getItem("nontification");
          $(".badges-nontification").show();
          $(".badges-nontification").html(lotsnotific);
        }

        // console.log(asd)
        var dates = parseISOString(asd.date);
        if (asd.img != "" && asd.msg != "" && asd.file == "") {
          $("#console").append(
            ` <div class="terima1">
                <div class="row">
                  <div class="col">
                    <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                  </div>
                  <div class="col">
                    <div id="terima-warna">
                      <a href="`+ asd.img + `" >
                        <img src="` + asd.img + `" class="sendingimage"> </img>
                      </a>
                      <p>` + asd.msg + `</p>
                    </div>
                    <small id="jamterima">` + dates + `</small>
                  </div>
                </div>
              </div>`
          );
        }
        if (asd.file != "" && asd.msg != "" && asd.img == "") {
          $("#console").append(
            ` <div class="terima1">
                <div class="row">
                  <div class="col">
                    <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                  </div>
                  <div class="col">
                    <div id="terima-warna">
                      <a href="`+ asd.file + `" target="_blank">
                        <div class="row captionFile">
                          <i class="material-icons sizeIconFile" id="iconImages">insert_drive_file</i>
                          <p>` + asd.msg + `</p>
                        </div>
                      </a>
                    </div>
                    <small id="jamterima">` + dates + `</small>
                  </div>
                </div>
              </div>`
          );
        }
        if (asd.img == "" && asd.msg != "" && asd.file == "") {
          $("#console").append(
            ` <div class="terima1">
                <div class="row">
                  <div class="col">
                    <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                  </div>
                  <div class="col">
                    <div id="terima-warna">` + asd.msg + `</div>
                      <small id="jamterima">` + dates + `</small>
                    </div>
                  </div>
                </div>
              </div>`
          );
        }
        if (asd.msg == "" && asd.img != "" && asd.file == "") {
          $("#console").append(
            ` <div class="terima1">
                <div class="row">
                  <div class="col">
                    <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                  </div>
                  <div class="col">
                    <div id="terima-warna">
                      <a href="`+ asd.img + `">
                        <img src="` + asd.img + `" class="sendingimage"> </img>
                      </a>
                    </div>
                    <small id="jamterima">` + dates + `</small>
                  </div>
                </div>
              </div>`
          );
        }
        $(".modal-content")
          .stop()
          .animate({ scrollTop: $(".modal-content")[0].scrollHeight });
      });

      socket.on("open-admin", (data) => {
        if (data.msg == "opened") {
          $(".centang").css("color", "#4fc3f7")
        }
      });

      /* Socket On Area here ---------------------------------------------------------------------------------------------- */


      /* Jquery On Click or Listner Area here ------------------------------------------------------------------------------ */

      // $(".sendingimage").click(function () {
      //   console.log("test")
      // })

      // hide modal widgetchat
      $("#myModal").hide();
      // import tooltip and modal function materialize
      $(".modal").modal();
      var height = "";

      $(".modal-content").scroll(function () {
        let seslog = JSON.parse(localStorage.getItem("login"));
        var ScrollPosition = $(".modal-content").scrollTop()
        var modalHeight = $(".container-fluid").height()-234;
        // var NewHeight = $("").height();
        var LastChatId = sessionStorage.getItem("lastChatItemId");
        // console.log($(document).height())
        if (ScrollPosition == $(".modal-content").height() - $(".modal-content").height()) {
          $.ajax({
            url: urllink + "/customers/home/scroll/" + seslog.id + "/" + LastChatId,
            type: "get",
            dataType: "json",
            success: function (ChatResult) {
              let message = ChatResult.data;
              if(message.length == 0){
                $(".terima").remove();
                $("#console-admin").prepend(
                  `
                <div class="terima">
                  <div class="row">
                    <div class="col">
                      <img src="https://i.ibb.co/9H0xs0T/m-vutura-logo.png" alt="m-vutura-logo" class="image">
                    </div>
                    <div class="col">
                      <div id="terima-warna">
                        Selamat datang di vutura ` + seslog.username + ` , ada yang bisa saya bantu?
                      </div>
                    </div>
                  </div>
                `);

              }
              if (isNaN(message)) {
                // console.log(message)
                $(".tgl1").remove()
                if (message.length < 20) {
                  $("#console-admin").prepend(
                    `
                  <div class="terima">
                    <div class="row">
                      <div class="col">
                        <img src="https://i.ibb.co/9H0xs0T/m-vutura-logo.png" alt="m-vutura-logo" class="image">
                      </div>
                      <div class="col">
                        <div id="terima-warna">
                          Selamat datang di vutura ` + seslog.username + ` , ada yang bisa saya bantu?
                        </div>
                      </div>
                    </div>
                  `);
                }
                if (message.length != 0) {
                  var tmptgl = parseDate(message[0].date);

                  for (let i = 0; i < message.length; i++) {
                    sessionStorage.setItem("lastChatItemId", message[i]._id)
                    var tgl = parseDate(message[i].date);
                    if (i == 0) {
                      tmptgl = tgl;
                      $("#firsttgl").prepend(
                        ` <div class="tgl1">
                          <div class="row">
                            <div class="col">
                              <p>` + tmptgl + `<p>
                            </div>
                          </div>
                        </div>`
                      );
                    }
                    if (tmptgl != tgl) {
                      tmptgl = tgl;
                      $("#console").prepend(
                        ` <div class="tgl">
                          <div class="row">
                            <div class="col">
                               <p>` + tmptgl + `<p>
                            </div>
                          </div>
                        </div>`
                      );
                    }
                    if (message[i].from == "admin") {
                      var asd = parseISOString(message[i].date);
                      if (message[i].img != "" && message[i].msg != "" && message[i].file == "") {
                        $("#console").prepend(
                          ` <div class="terima1">
                            <div class="row">
                              <div class="col">
                                <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                              </div>
                              <div class="col">
                                <div id="terima-warna">
                                  <a href="`+ message[i].img + `" target="_blank">
                                    <img src="` + message[i].img + `" class="sendingimage"> </img>
                                  </a>
                                  <p>` + message[i].msg + `</p>
                                </div>
                                <small id="jamterima">` + asd + `</small>
                              </div>
                            </div>
                          </div>`
                        );
                      }
                      if (message[i].file != "" && message[i].msg != "" && message[i].img == "") {
                        $("#console").prepend(
                          ` <div class="terima1-file">
                      <div class="row">
                        <div class="col">
                          <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                        </div>
                        <div class="col">
                          <div id="terima-warna-file">
                            <a href="`+ message[i].file + `" target="_blank">
                              <div class="row captionFile">
                                <i class="material-icons sizeIconFile" id="iconImages">insert_drive_file</i>
                                <p>` + message[i].msg + `</p>
                              </div>
                              <div class="overlay">
                              <i class="material-icons sizeIconFile" id="iconDownloads">file_download</i>
                              <p>` + message[i].msg + `</p>
                            </div>
                            </a>
                          </div>
                          <small id="jamterima">` + asd + `</small>
                        </div>
                      </div>
                    </div>`
                        );
                      }
                      if (message[i].img == "" && message[i].msg != "" && message[i].file == "") {
                        $("#console").prepend(
                          ` <div class="terima1">
                            <div class="row">
                              <div class="col">
                                <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                              </div>
                              <div class="col">
                                <div id="terima-warna">` + message[i].msg + `</div>
                                  <small id="jamterima">` + asd + `</small>
                                </div>
                              </div>
                          </div>`
                        );
                      }
                      if (message[i].msg == "" && message[i].img != "" && message[i].file == "") {
                        $("#console").prepend(
                          `  <div class="terima1">
                            <div class="row">
                              <div class="col">
                                <img src="http://intern.vutura.io/widget/embedded/www/assets/m-vutura-logo.png" alt="" class="image">
                              </div>
                              <div class="col">
                                <div id="terima-warna">
                                  <a href="`+ message[i].file + `" target="_blank">
                                    <img src="` + message[i].file + `" class="sendingimage"> </img>
                                  </a>
                                </div>
                                <small id="jamterima">` + asd + `</small>
                              </div>
                            </div>
                          </div>`
                        );
                      }
                    } else {
                      var asd2 = parseISOString(message[i].date);
                      var iconnama = localStorage.getItem("namaicon");
                      if (message[i].read == Boolean(false)) {
                        if (message[i].msg != "" && message[i].img != "" && message[i].file == "") {
                          $("#console").prepend(
                            ` <div class='kirim'>
                              <div class='row'>      
                                <div class='col'>
                                  <div id='kirim-warna'>
                                    <a href="`+ message[i].img + `" target="_blank">
                                      <img src="` + message[i].img + `" class="sendingimage"> </img>
                                    </a>
                                    <p>` + message[i].msg + `</p>
                                  </div>
                                  <small id='jamterima'>` + asd2 + `</small>
                                  <small  id="kirim" class="material-icons centang">done_all</small>>
                                </div>
                                <div class='col'>
                                  <div class="circle avatar-user">
                                    <span class="avatar-user-text">` + iconnama + `</span>
                                  </div>
                                </div>
                              </div>
                            </div>`
                          );
                        }
                        if (message[i].file != "" && message[i].msg != "" && message[i].img == "") {
                          $("#console").prepend(
                            ` <div class='kirim'>
                        <div class='row'>      
                          <div class='col'>
                            <div id="kirim-warna-file">
                              <a href="`+ message[i].file + `" target="_blank">
                                <div class="row captionFile">
                                  <i class="material-icons sizeIconFile" id="iconImages">insert_drive_file</i>
                                  <p>` + message[i].msg + `</p>
                                </div>
                                <div class="overlay-kirim">
                                <i class="material-icons sizeIconFile" id="iconDownloads">file_download</i>
                                <p>` + message[i].msg + `</p>
                              </div>
                              </a>
                            </div>
                            <small id='jamterima'>` + asd2 + `</small>
                            <small  id="kirim" class="material-icons centang">done_all</small>>
                          </div>
                          <div class='col'>
                            <div class="circle avatar-user">
                              <span class="avatar-user-text">` + iconnama + `</span>
                            </div>
                          </div>
                        </div>
                      </div>`
                          );
                        }
                        if (message[i].img == "" && message[i].msg != "" && message[i].file == "") {
                          $("#console").prepend(
                            ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id='kirim-warna'>` + message[i].msg + `</div>
                                    <small id='jamterima'>` + asd2 + `</small>
                                    <small id="kirim" class="material-icons centang" >done_all</small>
                                  </div>
                                <div class='col'>
                                  <div class="circle avatar-user">
                                    <span class="avatar-user-text">` + iconnama + `</span>
                                  </div>
                                </div>
                              </div>
                            </div>`
                          );
                        }
                        if (message[i].msg == "" && message[i].img != "" && message[i].file == "") {
                          // console.log(message[i].open)
                          $("#console").prepend(
                            ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id='kirim-warna'>
                                    <a href="`+ message[i].img + `" target="_blank">
                                      <img src="` + message[i].img + `" class="sendingimage"> </img>
                                    </a>
                                  </div>
                                  <small id='jamterima'>` + asd2 + `</small>
                                  <small id="kirim" class="material-icons centang" >done_all</small>
                                </div>
                                <div class='col'>
                                  <div class="circle avatar-user">
                                    <span class="avatar-user-text">` + iconnama + `</span>
                                  </div>
                                </div>
                              </div>
                            </div>`
                          );
                        }
                      } else {
                        if (message[i].msg != "" && message[i].img != "" && message[i].file == "") {
                          $("#console").prepend(
                            ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                    <div id='kirim-warna'>
                                      <a href="`+ message[i].img + `" target="_blank">
                                        <img src="` + message[i].img + `" class="sendingimage"> </img>
                                      </a>
                                      <p>` + message[i].msg + `</p>
                                    </div>
                                    <small id='jamterima'>` + asd2 + `</small>
                                    <small id="kirim" class="material-icons centang_done" >done_all</small>
                                  </div>
                                  <div class='col'>
                                    <div class="circle avatar-user">
                                      <span class="avatar-user-text">` + iconnama + `</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>`
                          );
                        }
                        if (message[i].file != "" && message[i].msg != "" && message[i].img == "") {
                          $("#console").prepend(
                            ` <div class='kirim'>
                        <div class='row'>      
                          <div class='col'>
                            <div id="kirim-warna-file">
                              <a href="`+ message[i].file + `" target="_blank">
                                <div class="row captionFile">
                                  <i class="material-icons sizeIconFile" id="iconImages">insert_drive_file</i>
                                  <p>` + message[i].msg + `</p>
                                </div>
                                <div class="overlay-kirim">
                                <i class="material-icons sizeIconFile" id="iconDownloads">file_download</i>
                                <p>` + message[i].msg + `</p>
                              </div>
                              </a>
                            </div>
                            <small id='jamterima'>` + asd2 + `</small>
                            <small  id="kirim" class="material-icons centang_done">done_all</small>>
                          </div>
                          <div class='col'>
                            <div class="circle avatar-user">
                              <span class="avatar-user-text">` + iconnama + `</span>
                            </div>
                          </div>
                        </div>
                      </div>`
                          );
                        }
                        if (message[i].img == "" && message[i].msg != "" && message[i].file == "") {
                          $("#console").prepend(
                            ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id='kirim-warna'>` + message[i].msg + `</div>
                                    <small id='jamterima'>` + asd2 + `</small>
                                    <small id="kirim" class="material-icons centang_done" >done_all</small>
                                  </div>
                                  <div class='col'>
                                    <div class="circle avatar-user">
                                      <span class="avatar-user-text">` + iconnama + `</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>`
                          );
                        }
                        if (message[i].msg == "" && message[i].img != "" && message[i].file == "") {
                          // console.log(message[i].open)
                          $("#console").prepend(
                            ` <div class='kirim'>
                              <div class='row'>
                                <div class='col'>
                                  <div id='kirim-warna'>
                                    <a href="`+ message[i].img + `" target="_blank">
                                      <img src="` + message[i].img + `" class="sendingimage"> </img>
                                    </a>
                                  </div>
                                  <small id='jamterima'>` + asd2 + `</small>
                                  <small id="kirim" class="material-icons centang_done" >done_all</small>
                                </div>
                                <div class='col'>
                                  <div class="circle avatar-user">
                                    <span class="avatar-user-text">` + iconnama + `</span>
                                  </div>
                                </div>
                              </div>
                            </div>`
                          );
                        }
                      }
                    }
                    var NewHeight = $(".container-fluid").height() - 234;
                    // console.log(NewHeight)
                    $(".modal-content")[0].scrollTo(0, NewHeight-modalHeight)
                    // $(".modal-content")
                    //   .stop()
                    //   .animate({ scrollTop: $(".modal-content")[0].scrollHeight });
                  }
                }
              }
            }
          });
        }
      })

      // jika menekan tombol enter pada textarea maka data akan terinput
      $("#textarea1").keydown(function () {
        height = $("#textarea1").height();
        if (height > 60) {
          $("#textarea1").css("overflow-y", "scroll");
        }
        if (height > 40) {
          $(".modal-content").css("max-height", "60%");
        }
        if (height < 40) {
          $(".modal-content").css("max-height", "70%");
        }
        if (height < 60) {
          $("#textarea1").css("overflow-y", "hidden");
        }
        if ($("#textarea1").val() == "") {
          $("#textarea1").css("overflow-y", "hidden");
          $(".modal-content").css("max-height", "70%");
        }
        let seslog = JSON.parse(localStorage.getItem("login"));
        var message = $("textarea").val();
        if (event.keyCode == 13) {
          if (message != "") {
            // waktu sekarang
            var dt = new Date();
            var jam = dt.getHours();
            var smenit = parseMinutes(dt.getMinutes());
            var time = [jam, smenit].join(":");
            var data = {};
            data.msg = message;
            data.idcust = seslog.id;
            data.img = "";
            data.file = "";
            socket.emit("customerChat", data, (callback) => {
              var iconnama = localStorage.getItem("namaicon");
              // console.log(callback)
              if (!callback) {
                display =
                  ` <div class='kirim'>
                      <div class='row'>
                        <div class='col'>
                          <div id='kirim-warna'>` + message + `</div>
                          <small id='jamterima'>` + time + `</small>
                          <small id="kirim" class="material-icons centang" >done_all</small>
                        </div>
                        <div class='col'>
                          <div class="circle avatar-user">
                            <span class="avatar-user-text">` + iconnama + `</span>
                          </div>
                        </div>
                      </div>
                    </div>`;
                $("#console").append(display);
                $(".modal-content")
                  .stop()
                  .animate({ scrollTop: $(".modal-content")[0].scrollHeight });
              } else {
                display =
                  ` <div class='kirim'>
                      <div class='row'>
                        <div class='col'>
                          <div id='kirim-warna'>` + message + `</div>
                          <small id='jamterima'>` + time + `</small>
                          <small id="kirim" class="material-icons centang_done" >done_all</small>
                        </div>
                        <div class='col'>
                          <div class="circle avatar-user">
                            <span class="avatar-user-text">` + iconnama + `</span>
                          </div>
                        </div>
                      </div>
                    </div>`;
                $("#console").append(display);
                $(".modal-content")
                  .stop()
                  .animate({ scrollTop: $(".modal-content")[0].scrollHeight });
              }
            });
          } else {
            // console.log("No message");
            $("textarea").val("");
          }
          $("textarea").val("");
          return false;
        }
      });

      // jika menekan tombol send maka data akan terinpu
      $("#sendmes").click(function () {
        let seslog = JSON.parse(localStorage.getItem("login"));
        var messagess = $("textarea").val();
        if (messagess != "") {
          // waktu sekarang
          var dt = new Date();
          var jam = dt.getHours();
          var smenit = parseMinutes(dt.getMinutes());
          var time = [jam, smenit].join(":");
          var data = {};
          data.msg = messagess;
          data.idcust = seslog.id;
          data.img = "";
          data.file = "";
          socket.emit("customerChat", data, (callback) => {
            var iconnama = localStorage.getItem("namaicon");
            // console.log(callback)
            if (!callback) {
              display =
                ` <div class='kirim'>
                    <div class='row'>
                      <div class='col'>
                        <div id='kirim-warna'>` + messagess + `</div>
                          <small id='jamterima'>` + time + `</small>
                          <small id="kirim" class="material-icons centang" >done_all</small>
                        </div>
                        <div class='col'>
                          <div class="circle avatar-user">
                            <span class="avatar-user-text">` + iconnama + `</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>`;
              $("#console").append(display);
              $(".modal-content")
                .stop()
                .animate({ scrollTop: $(".modal-content")[0].scrollHeight });
            } else {
              display =
                ` <div class='kirim'>
                    <div class='row'>
                      <div class='col'>
                        <div id='kirim-warna'>` + messagess + `</div>
                          <small id='jamterima'>` + time + `</small>
                          <small id="kirim" class="material-icons centang_done" >done_all</small>
                        </div>
                      <div class='col'>
                        <div class="circle avatar-user">
                          <span class="avatar-user-text">` + iconnama + `</span>
                        </div>
                      </div>
                    </div>
                  </div>`;
              $("#console").append(display);
              $(".modal-content")
                .stop()
                .animate({ scrollTop: $(".modal-content")[0].scrollHeight });
            }
          });

          // load();
        } else {
          // console.log("No message");
          $("textarea").val("");
        }

        $("textarea").val("");
        return false;
      });

      // jika menekan tombol enter pada input saat mengisi nama maka akan terinput
      $("#submitlogin").click(function () {
        var hit = 0;
        var nama = $("#nama").val();
        var email = $("#email").val();
        const regexemail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        const emailreg = regexemail.test(email);
        const regexusername = /^([a-zA-Z]{2,15})$/i;
        const usernamereg = regexusername.test(nama);
        // console.log(emailreg, usernamereg)

        if (emailreg && usernamereg) {
          $("#warn1").text("");
          $("#warn2").text("");
          // console.log(nama, email)
          $.ajax({
            url: urllink + "/customers/login",
            type: "POST",
            dataType: "json",
            data: {
              username: nama,
              email: email,
            },
            success: function (result) {
              let data = result;
              // console.log(data)
              localStorage.removeItem("number");
              localStorage.setItem("number", 1);
              localStorage.setItem("login", JSON.stringify(data));
              localStorage.setItem("nontification", 0)


              var icon = nama.split("");
              localStorage.setItem("namaicon", icon[0].toUpperCase());

              var id = JSON.parse(localStorage.getItem("login"));
              socket.emit("register-as-customer", id.id);
              socket.emit("open-cust", id.id);
              localStorage.setItem("regist", true)
              localStorage.setItem("opencust", true)

              $("#terima-warna").text(
                "Selamat datang di vutura " + nama + ", ada yang bisa saya bantu?"
              );
              $(".header").css("background-color", "#f1efff");
              $(".modal-content-login").hide();
              $(".modal-content").show();
              $(".modal-content").css("overflow-y", "scroll");
              $(".message").show();
              $("#textarea1").removeAttr("disabled");
              $(".container-fluid").show();
              $(".content-login").hide();
              $("#myModal").show();
              $("#myModal").css("animation", "fadein 0.5s");

              $(".tgl1").remove();
              load();
            },
          });
        } else if (!usernamereg && emailreg) {
          if (nama.length > 15) {
            $("#warn1").text("Nama anda lebih dari 15 kata");
            $("#warn1").css("color", "red");
          } else {
            $("#warn1").text("Nama anda kosong / kurang");
            $("#warn1").css("color", "red");
          }
          $("#warn2").text("");
        } else if (usernamereg && !emailreg) {
          $("#warn1").text("");
          $("#warn2").text("Email tidak valid");
          $("#warn2").css("color", "red");
        } else {
          if (nama.length > 15) {
            $("#warn1").text("Nama anda lebih dari 15 kata");
            $("#warn1").css("color", "red");
          } else {
            $("#warn1").text("Nama anda kosong / kurang");
            $("#warn1").css("color", "red");
          }
          $("#warn2").text("Email tidak valid");
          $("#warn2").css("color", "red");
        }
      });

      // jika menekan tombol widget maka akan muncul pop up widget chat
      $("#myBtn").click(function () {
        if (
          localStorage.getItem("number") == 0 ||
          !localStorage.getItem("number")
        ) {
          /* if cust not login. number = 0 mean cust not login */
          const socket = io(urllink);
          const login = JSON.parse(localStorage.getItem("login"));
          $("#warn").text("");
          $(".header").css("background-color", "white");
          $(".modal-content").hide();
          $(".message").hide();
          $("#console").empty();
          $(".container-fluid").hide();
          $(".content-login").show(); //ubah
          $("#myModal").show();
          $("#myModal").css("animation", "fadein 0.5s");
          $("#tail").show();
          $("#tail").css("animation", "fadein 0.5s");
        } else {
          /* if login is done. number = 1 is same like the customer has been login */
          localStorage.setItem("nontification", 0)
          $(".badges-nontification").hide();
          $(".badges-nontification").html("");
          const loadModal = localStorage.getItem("loadmodal");
          if (loadModal == 0) {
            /* if login has store in localstorage and modal is close */

            $(".tgl1").remove();
            load();
            var id = JSON.parse(localStorage.getItem("login"));
            socket.emit("open-cust", id.id);
            $(".header").css("background-color", "#f1efff");
            $(".modal-content-login").hide();
            $(".modal-content").css("overflow-y", "scroll");
            $(".message").show();
            $("#textarea1").removeAttr("disabled");
            $(".container-fluid").show();
            $(".content-login").hide();
            $("#myModal").show();
            $("#myModal").css("animation", "fadein 0.5s");
            $("#tail").show();
            $("#tail").css("animation", "fadein 0.5s");
            $(".modal-content")
              .stop()
              .animate({ scrollTop: $(".modal-content")[0].scrollHeight });
            localStorage.setItem("loadmodal", 1)
          } else {
            /* if login has store in localstorage and modal is not close */
            $(".header").css("background-color", "#f1efff");
            $(".modal-content-login").hide();
            $(".modal-content").css("overflow-y", "scroll");
            $(".message").show();
            $("#textarea1").removeAttr("disabled");
            $(".container-fluid").show();
            $(".content-login").hide();
            $("#myModal").show();
            $("#myModal").css("animation", "fadein 0.5s");
            $("#tail").show();
            $("#tail").css("animation", "fadein 0.5s");
          }
        }
      });

      // jika menekan tanda x maka modal akan tertutup dan data dihapus
      $("#bintik").click(function () {
        if (!login) {
          /* if cust not login */
          $("#textarea1").removeAttr("disabled");
          $("#myModal").hide();
          $("#myModal").css("animation", "fadeout 0.5s");
          $("#tail").hide();
          $("#tail").css("animation", "fadeout 0.5s");
        } else {
          /* if cust is login */
          localStorage.setItem('loadmodal', 0)
          $(".terima").remove();
          $(".tgl1").remove();
          $(".tgl").remove();
          $(".kirim").remove();
          $(".terima1").remove();
          $("#myBtn").click;
          var id = JSON.parse(localStorage.getItem("login"));
          // socket.emit("close-cust", id.id);
          $("#textarea1").removeAttr("disabled");
          $("#myModal").hide();
          $("#myModal").css("animation", "fadeout 0.5s");
          $("#tail").hide();
          $("#tail").css("animation", "fadeout 0.5s");
        }
      });
    });
  });

/* Jquery On Click or Listner Area here ------------------------------------------------------------------------------ */