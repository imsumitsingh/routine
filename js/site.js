var HOST_URL = `https://api.jsonbin.io/v3/b/`;
var TOTAL_COUNT;
function funIsHoliday(dt) {
  let day = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
  let mon =
    dt.getMonth() + 1 < 10
      ? "0" + parseInt(dt.getMonth() + 1)
      : parseInt(dt.getMonth() + 1);
  let yr = dt.getFullYear();
  let dat = mon + "/" + day + "/" + yr;

  if (allHolidayDates.includes(dat)) {
    return {
      isHoliday: true,
      holidayName: calender[dat].Holiday,
    };
  } else {
    return {
      isHoliday: false,
      holidayName: "",
    };
  }
}

function isAm(dt) {
  return dt
    .toLocaleTimeString(`en-IN`, {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .toUpperCase()
    .includes("AM");
}

periodCount = 0;
function playAudio(pr) {
  if (periodCount != pr) {
    periodCount = pr;
    var x = document.getElementById("audio" + pr);
    try {
      x.play();
    } catch (err) {
      console.log(err);
    }
  }
}

function funIsSunday(dt) {
  return dt.getDay() === 0;
}

function nextOpenDate(dt) {
  let tmr = new Date(dt.getTime() + 1 * 24 * 60 * 60 * 1000);
  let day = tmr.getDate() < 10 ? "0" + tmr.getDate() : tmr.getDate();
  let mon =
    tmr.getMonth() + 1 < 10
      ? "0" + parseInt(tmr.getMonth() + 1)
      : parseInt(tmr.getMonth() + 1);
  let yr = tmr.getFullYear();
  let dat = mon + "/" + day + "/" + yr;

  while (true) {
    if (!allHolidayDates.includes(dat) && !funIsSunday(tmr)) {
      return tmr;
    } else {
      tmr = new Date(tmr.getTime() + 1 * 24 * 60 * 60 * 1000);
      day = tmr.getDate() < 10 ? "0" + tmr.getDate : tmr.getDate();
      mon =
        tmr.getMonth() + 1 < 10
          ? "0" + parseInt(tmr.getMonth() + 1)
          : parseInt(tmr.getMonth() + 1);
      yr = tmr.getFullYear();
      dat = mon + "/" + day + "/" + yr;
    }
  }
}

function getOccuppiedTeachers() {
  var arr = [];
  $(".teacher-name-title").each(function () {
    arr.push($(this).html());
  });
  return arr;
}
function getOccuppiedTeachersAv() {
  var arr = [];
  $(".teacher-name-title-routine").each(function () {
    arr.push($(this).html());
  });
  return arr;
}

function getSliced(str) {
  if (str.length > 16) {
    return str.slice(16) + "..";
  }
}

$(".openTeacher").click(function () {
  window.location='type-of-teacher.html'
  // $("#modteacher").modal("show");
  // $(".teacher-ul").empty();
  // var sortedTeacher = Object.keys(teachers).sort();
  // sortedTeacher.forEach(function (crr, index, arr) {
  //   $(".teacher-ul").append(`
  //     <div class="col-12 col-sm-12 col-md-12">
  //       <div class="teacher-main">
  //         <div class="teacher-img" style="background-color:${getRandomColor()}">
  //            <span>${crr.charAt(0)}</span>
  //         </div>
  //         <div class="teacher-name">
  //              <div class="teacher-name-inner"><h4>${crr}<span class="btnCopy" onclick="copy(event)" data-mobile="${teachers[crr].Mobile}"><i class="fa-regular fa-copy ml-1" ></i></span></h4></div>
  //              <div class="teacher-number"><i class="fa-solid fa-mobile-screen-button mr-1"></i>+91${
  //                teachers[crr].Mobile
  //              }</div>
  //         </div>
  //         <div class="teacher-call">
  //           <a class="teacher-call-phone" href="tel:+91${
  //             teachers[crr].Mobile
  //           }"><i class="fa-solid fa-phone"></i></a>
  //           <a class="teacher-call-whatsapp" href="https://wa.me/91${
  //             teachers[crr].Mobile
  //           }"><i class="fa-brands fa-whatsapp"></i></i></a>
  //         </div>
           
  //        </div>
  //       </div>
  //     `);
  // });
});

var bellWiseRtn = JSON.parse(bellWiseRoutine);
function display(prd) {
  $(".tiles-routine-inner").empty();
  var cls12='col-md-12'+' '+ 'col-12'+' '+'mb-3';
  var cls='col-md-3'+' '+ 'col-6'+' '+'mb-3';
  for (const key in bellWiseRtn[prd]) {
    $(".tiles-routine-inner").append(`
       <div class="${key==1? cls12: cls }">
              <div class="card text-dark bg-light mr-0"   id="${key.replace(
                "Class",
                ""
              )}"> 
                 <div class="card-body pt-1 pb-1 pl-1">
                 <div style="white-space:nowrap">
                    <span class="badge badge-gold">Class : ${key.replace(
                      "Class",
                      ""
                    )}</span>
                    <span class="badge badge-gold">${
                      bellWiseRtn[prd][key].subject == ""
                        ? "N/A"
                        : bellWiseRtn[prd][key].subject
                    }</span>
                    </div>
                        <div class="row  justify-content-center">
                          <div class="col-9 col-md-9 pr-0"><h6 onclick="openTeacherRoutp('${bellWiseRtn[prd][key].Teacher}')" id="titleRoutine${key}" class="card-title truncate mb-1 p-0 pt-1 teacher-name-title-routine">${
      bellWiseRtn[prd][key].Teacher
    }</h6></div>
                          <div class="col-3 pl-0 col-md-3 pr-0 text-right"><a id="callRoutine${key}" href="tel:+91${GetMobile(
      bellWiseRtn[prd][key].Teacher
    )}" class="badge badge-pill badge-gold-outline">Call</a></div>
                        </div>
                   </div>
           </div>
       `);
    var start = setDateTime(new Date(current), bellWiseRtn[prd][key].start);
    var end = setDateTime(new Date(current), bellWiseRtn[prd][key].end);
    $("#routineDuration").html(
      `${start.toLocaleString(`eng-IN`, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })} - ${end.toLocaleString(`eng-IN`, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`
    );
  }
}

$(".btnPrd").click(function () {
  $(".btnPrd").removeClass("colorCls");
  $(this).addClass("colorCls");
  var p = $(this).attr("id").replace("btn", "");
  display(p);
  funcAvTrachers()
});

$(".openRoutine").click(function () {
  if ($('.tiles-routine').css('display') !== 'none') {
    $(".current-period-detail").slideToggle(); 
    $(".period-detail").slideToggle(); 
    $('.tiles').empty()
    load();
   }
   else{   
    $(".period-detail").slideToggle(); 
    $(".current-period-detail").slideToggle(); 
    funcAvTrachers();
   }
  $(".tiles").slideToggle();
  $(".tiles-routine").slideToggle();
 
  
});
$(".closeRoutine").click(function () {
  $(".tiles-routine").slideUp();
  $(".tiles").slideDown();
});
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function copy(e) {
  var mobile = $(e.currentTarget).data("mobile");
  navigator.clipboard.writeText(mobile);
  $(e.currentTarget).popupTooltip("bottom", "Coppied");
  $(".popupTooltip").removeClass("side-bottom").addClass("top");
}

function GetMobile(name) {
  return teachers[name]?.Mobile;
}

function getNextHoliday() {
  var dt = new Date();
  var count = 0;
  allHolidayDates.forEach(function (crr, index, arr) {
    var arr = crr.split("/");
    var hdt = new Date(arr[2] + "-" + arr[0] + "-" + arr[1]);
    if (dt < hdt && count == 0) {
      var id =
        "#td" +
        hdt
          .toLocaleString(`hi-IN`, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replaceAll("/", "");
      $(id).parent().css({ color: "white", "background-color": "#c313da" });
      count++;
    //   $("marquee").html(
    //     `<span class="badge">दिनांक ${hdt.toLocaleString(`hi-IN`, {
    //       day: "2-digit",
    //       month: "2-digit",
    //       year: "numeric",
    //     })}(${hdt.toLocaleString(`hi-IN`, {
    //       weekday: "long",
    //     })}) को विधालय में ${calender[crr].Holiday} की छुट्टी है |</span>`
    //   );
     }
  });
}

function AjaxCall() {
  var bin = "65ea88071f5677401f3a1981";
  $.ajax({
    url: HOST_URL + bin,
    type: "GET",
    dataType: "json",
    headers: {
      "X-MASTER-KEY":
        "$2a$10$.6ZqttVZf.9LAJKH13lP7e9umulbPZu5dFVvDcZ6CC9DOBF8Z5aiu",
    },
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      $(".attendance-table-body").empty();
      $(".attendance-table-body-hs").empty();
      var totStd = 0;
      var totPre = 0;
      var totPer = 0;
      var totStdhs = 0;
      var totPrehs = 0;
      var totPerhs = 0;
      var todaysDate = new Date().toLocaleString(`hi-IN`, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      result.record.attendance_data.forEach(function (crr, index, arr) {
        if (parseInt(crr.Class) < 9) {
          $(".attendance-table-body").append(`
       <tr class="${
         parseInt(crr.Percentage.replace("%", "")) >= 75 ? "" : "clrGray"
       } ${crr.Date != todaysDate ? "clsBold" : ""}">
       <td>${crr.Class}</td>
       <td>${crr.Total}</td>
       <td>${crr.Attendance}</td>
       <td>${crr.Percentage}</td>
       <td>${
         parseInt(crr.Percentage.replace("%", "")) >= 75
           ? '<span class="badge badge-pill badge-gold">Yes</span>'
           : '<span class="badge badge-pill badge-danger">No</span>'
       }</td>
     
       <td>${crr.Date}</td>
       </tr>
       `);
          totStd = parseInt(totStd) + parseInt(crr.Total);
          totPre = parseInt(totPre) + parseInt(crr.Attendance);
          totPer =
            isNaN(Math.trunc((totPre / totStd) * 100)) == "NaN"
              ? 0
              : Math.trunc((totPre / totStd) * 100);
        } else {
          $(".attendance-table-body-hs").append(`
       <tr class="${
         parseInt(crr.Percentage.replace("%", "")) >= 75 ? "" : "clrGray"
       } ${crr.Date != todaysDate ? "clsBold" : ""}">
       <td>${crr.Class}</td>
       <td>${crr.Total}</td>
       <td>${crr.Attendance}</td>
       <td>${crr.Percentage}</td>
       <td>${
         parseInt(crr.Percentage.replace("%", "")) >= 75
           ? '<span class="badge badge-pill badge-gold">Yes</span>'
           : '<span class="badge badge-pill badge-danger">No</span>'
       }</td>
    
       <td>${crr.Date}</td>
      
       </tr>
       `);
          totStdhs = parseInt(totStdhs) + parseInt(crr.Total);
          totPrehs = parseInt(totPrehs) + parseInt(crr.Attendance);
          totPerhs = isNaN(Math.trunc((totPrehs / totStdhs) * 100))
            ? 0
            : Math.trunc((totPrehs / totStdhs) * 100);
        }
      });
      $(".TotalStudent").html(totStd);
      $(".TotalPresent").html(totPre);
      $(".TotalPercentage").html(totPer + "%");
      $(".TotalStudent-hs").html(totStdhs);
      $(".TotalPresent-hs").html(totPrehs);
      $(".TotalPercentage-hs").html(totPerhs + "%");
    },
    error: function (error) {},
  });
}
$("#txtClass").change(function () {
  if ($(this).val() == "") {
    $("#txtTotal").val("0");
    $("#txtPresent").val("0");
    $("#txtPercent").val("0%");
    return;
  }
  AjaxCallOnClassChange($(this).val());
});

function AjaxCallOnClassChange(cls) {
  var bin = "65ea88071f5677401f3a1981";
  $.ajax({
    url: HOST_URL + bin,
    type: "GET",
    dataType: "json",
    headers: {
      "X-MASTER-KEY":
        "$2a$10$.6ZqttVZf.9LAJKH13lP7e9umulbPZu5dFVvDcZ6CC9DOBF8Z5aiu",
    },
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      result.record.attendance_data.forEach(function (crr, index, arr) {
        if (cls == crr.Class) {
          $("#txtTotal").val(`${crr.Total}`);
          $("#txtPercent").val(`${crr.Percentage}`);
          $("#txtPresent").val(`${crr.Attendance}`);
        }
      });
    },
    error: function (error) {},
  });
}

$(".openAttendance").click(function () {
  AjaxCall();
  if ($("#period").html().includes("1")) {
    $(".attendance-input").show();
  } else {
    $(".attendance-input").hide();
  }
  $("#txtDate").val(
    `${new Date().toLocaleString(`hi-IN`, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })}`
  );
  $("#modattendance").modal("show");
});
$(".txtChange").keydown(function (e) {
  if ($("#txtClass").val() == "") {
    e.preventDefault();
    alert("Choose class");
    return;
  }
  if (parseInt($("#txtClass").val()) < 0) {
    e.preventDefault();
    alert("Negative Value not allowed");
    return;
  }
});
$(".txtChange").change(function () {
  var total = $("#txtTotal").val();
  var present = $("#txtPresent").val();
  if (parseInt(total) < parseInt(present) || total == "" || present == "") {
    alert("Total can not be smaller than present student.");
    $("#txtTotal").val("0");
    $("#txtPresent").val("0");
    $("#txtPercent").val("0%");
    return;
  }
  $("#txtPercent").val(
    `${
      isNaN(Math.trunc((parseInt(present) / parseInt(total)) * 100))
        ? "0"
        : Math.trunc((parseInt(present) / parseInt(total)) * 100)
    }%`
  );
});

function AjaxCallPost() {
  var cls = $("#txtClass").val();
  var total = $("#txtTotal").val();
  var present = $("#txtPresent").val();
  var percent = $("#txtPercent").val();
  var dat = $("#txtDate").val();

  var bin = "65ea88071f5677401f3a1981";
  $.ajax({
    url: HOST_URL + bin,
    type: "GET",
    dataType: "json",
    headers: {
      "X-MASTER-KEY":
        "$2a$10$.6ZqttVZf.9LAJKH13lP7e9umulbPZu5dFVvDcZ6CC9DOBF8Z5aiu",
    },
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      result.record.attendance_data.forEach(function (crr, index, arr) {
        if (crr.Class == cls) {
          crr.Total = parseInt(total);
          crr.Attendance = parseInt(present);
          crr.Percentage = percent;
          crr.Date = dat;
        }
      });
      PostData(result.record.attendance_data);
    },
    error: function (error) {},
  });
}

function PostData(data) {
  var updatedData = {
    attendance_data: data,
  };
  console.log(data);
  var bin = "65ea88071f5677401f3a1981";
  $.ajax({
    url: HOST_URL + bin,
    type: "PUT",
    dataType: "json",
    headers: {
      "X-MASTER-KEY":
        "$2a$10$.6ZqttVZf.9LAJKH13lP7e9umulbPZu5dFVvDcZ6CC9DOBF8Z5aiu",
    },
    contentType: "application/json",
    data: JSON.stringify(updatedData),
    success: function (result) {
      $(".attendance-table-body").empty();
      $(".attendance-table-body-hs").empty();
      var totStd = 0;
      var totPre = 0;
      var totPer = 0;
      var totStdhs = 0;
      var totPrehs = 0;
      var totPerhs = 0;
      var todaysDate = new Date().toLocaleString(`hi-IN`, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      result.record.attendance_data.forEach(function (crr, index, arr) {
        if (parseInt(crr.Class) < 9) {
          $(".attendance-table-body").append(`
          <tr class="${
            parseInt(crr.Percentage.replace("%", "")) >= 75 ? "" : "clrGray"
          } ${crr.Date != todaysDate ? "clsBold" : ""}">
          <td>${crr.Class}</td>
          <td>${crr.Total}</td>
          <td>${crr.Attendance}</td>
          <td>${crr.Percentage}</td>
          <td>${
            parseInt(crr.Percentage.replace("%", "")) >= 75
              ? '<span class="badge badge-pill badge-gold">Yes</span>'
              : '<span class="badge badge-pill badge-danger">No</span>'
          }</td>
    
          <td>${crr.Date}</td>
         
          </tr>
          `);
          totStd = parseInt(totStd) + parseInt(crr.Total);
          totPre = parseInt(totPre) + parseInt(crr.Attendance);
          totPer = isNaN(Math.trunc((totPre / totStd) * 100))
            ? "0"
            : Math.trunc((totPre / totStd) * 100);
        } else {
          $(".attendance-table-body-hs").append(`
          <tr class="${
            parseInt(crr.Percentage.replace("%", "")) >= 75 ? "" : "clrGray"
          } ${crr.Date != todaysDate ? "clsBold" : ""}">
          <td>${crr.Class}</td>
          <td>${crr.Total}</td>
          <td>${crr.Attendance}</td>
          <td>${crr.Percentage}</td>
          <td>${
            parseInt(crr.Percentage.replace("%", "")) >= 75
              ? '<span class="badge badge-pill badge-gold">Yes</span>'
              : '<span class="badge badge-pill badge-danger">No</span>'
          }</td>
    
          <td>${crr.Date}</td>
          
          </tr>
          `);
          totStdhs = parseInt(totStdhs) + parseInt(crr.Total);
          totPrehs = parseInt(totPrehs) + parseInt(crr.Attendance);
          totPerhs = isNaN(Math.trunc((totPrehs / totStdhs) * 100))
            ? 0
            : Math.trunc((totPrehs / totStdhs) * 100);
        }
      });
      $("#txtTotal").val("0");
      $("#txtPresent").val("0");
      $("#txtPercent").val("0%");
      $("#txtClass").prop("selectedIndex", 0);
      $(".TotalStudent").html(totStd);
      $(".TotalPresent").html(totPre);
      $(".TotalPercentage").html(totPer + "%");
      $(".TotalStudent-hs").html(totStdhs);
      $(".TotalPresent-hs").html(totPrehs);
      $(".TotalPercentage-hs").html(totPerhs + "%");
      alert("Saved");
    },
    error: function (error) {
      console.log(error);
    },
  });
}

$(".btnSave").click(function () {
  if ($("#txtClass").val() == "") {
    alert("Please choose a class");
    return;
  }
  if ($("#txtPresent").val() == "") {
    alert("Total can not be blank");
    return;
  }
  if ($("#txtTotal").val() == "") {
    alert("Total can not be blank");
    return;
  }

  AjaxCallPost();
});

function Notice() {
  var bin = "65ec944e266cfc3fde960418";
  $.ajax({
    url: HOST_URL + bin,
    type: "GET",
    dataType: "json",
    headers: {
      "X-MASTER-KEY":
        "$2a$10$.6ZqttVZf.9LAJKH13lP7e9umulbPZu5dFVvDcZ6CC9DOBF8Z5aiu",
    },
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      if (result.record.isDisplay == true) {
        $("marquee").html(
          `<span class="badge">${result.record.notice}</span>`
        );
        $("marquee").show();
      }
      else{
        $("marquee").hide();
      }
    },
    error: function (err) {},
  });
}

function GetSafeSaturdayDetail(e, weekcount,main="") {
  var bin = "65fb8e89dc74654018b5f185";
  $.ajax({
    url: HOST_URL + bin,
    type: "GET",
    dataType: "json",
    headers: {
      "X-MASTER-KEY":
        "$2a$10$.6ZqttVZf.9LAJKH13lP7e9umulbPZu5dFVvDcZ6CC9DOBF8Z5aiu",
    },
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      var k = "week" + weekcount;
      if(main==""){
      $("div", e).html(
        `<span class="">${
          result.record[k] === undefined
            ? "No information available"
            : result.record[k]
        }</span>`
      );
      $("div", e).slideToggle();
      }
      $(".divDetails-main").html(
        `<span class="">${
          result.record[k] === undefined
            ? "No information available"
            : result.record[k]
        }</span>`
      );
     
      $(".divDetails-main").slideToggle();
    },
    error: function (err) {},
  });
}
function GetSummary() {
  var bin = "65fd29f5266cfc3fde9c10d7";
  $.ajax({
    url: HOST_URL + bin,
    type: "GET",
    dataType: "json",
    headers: {
      "X-MASTER-KEY":
        "$2a$10$.6ZqttVZf.9LAJKH13lP7e9umulbPZu5dFVvDcZ6CC9DOBF8Z5aiu",
    },
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      $(".teacher-table-body").empty();
      var sortedData = result.record.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });
      sortedData.forEach(function (curr, index) {
        $(".teacher-table-body").append(`
            <tr><td>${++index}</td><td>${curr.teacher}</td><td>${curr.fromDate}</td><td>${curr.toDate}</td><td>${curr.leaveType}</td></tr>
           `);
      });
    },
    error: function (err) {},
  });
}

function getSaturdaysIndexes(date) {
  // Get the month and year of the given date
  const monthDays = getDaysInMonth(date);
  const month = date.getMonth();
  const year = date.getFullYear();

  // Initialize an array to store the Saturdays
  const saturdays = [];

  // Loop through all the days of the month
  for (let day = 1; day <= monthDays; day++) {
    // Create a new date object for the current day
    const currentDate = new Date(year, month, day);

    // Check if the current date is in the same month
    if (currentDate.getMonth() === month) {
      // Check if the current date is a Saturday (day 6 corresponds to Saturday)
      if (currentDate.getDay() === 6) {
        saturdays.push(currentDate);
      }
    } else {
      // If we've reached the next month, break the loop
      
    }
  }

  // Initialize an object to store the indexes of Saturdays
  const indexes = {};

  // Loop through the found Saturdays and index them
  saturdays.forEach((saturday, index) => {
    if (index === 0) {
      indexes[
        saturday
          .toLocaleString(`hi-IN`, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replaceAll("/", "")
      ] = "1";
    } else if (index === 1) {
      indexes[
        saturday
          .toLocaleString(`hi-IN`, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replaceAll("/", "")
      ] = "2";
    } else if (index === 2) {
      indexes[
        saturday
          .toLocaleString(`hi-IN`, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replaceAll("/", "")
      ] = "3";
    } else if (index === 3) {
      indexes[
        saturday
          .toLocaleString(`hi-IN`, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replaceAll("/", "")
      ] = "4";
    }
    // If there are more than four Saturdays, break the loop
    if (index === 3) {
      return;
    }
  });

  // Return the object containing indexes of Saturdays
  return indexes;
}

function getSaturdaysDates(date) {
  // Get the month and year of the given date
  const monthDays = getDaysInMonth(date);
  const month = date.getMonth();
  const year = date.getFullYear();

  // Initialize an array to store the Saturdays
  const saturdays = [];

  // Loop through all the days of the month
  for (let day = 1; day <= monthDays; day++) {
    // Create a new date object for the current day
    const currentDate = new Date(year, month, day);

    // Check if the current date is in the same month
    if (currentDate.getMonth() === month) {
      // Check if the current date is a Saturday (day 6 corresponds to Saturday)
      if (currentDate.getDay() === 6) {
        saturdays.push(currentDate);
      }
    } else {
      // If we've reached the next month, break the loop
      
    }
  }

  // Initialize an object to store the indexes of Saturdays
  const indexes = {};

  // Loop through the found Saturdays and index them
  saturdays.forEach((saturday, index) => {
    if (index === 0) {
      indexes[0] = saturday.toLocaleString(`hi-IN`, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } else if (index === 1) {
      indexes[1] = saturday.toLocaleString(`hi-IN`, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } else if (index === 2) {
      indexes[2] = saturday.toLocaleString(`hi-IN`, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } else if (index === 3) {
      indexes[3] = saturday.toLocaleString(`hi-IN`, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
    // If there are more than four Saturdays, break the loop
    if (index === 3) {
      return;
    }
  });

  // Return the object containing indexes of Saturdays
  return indexes;
}

function getDaysInMonth(date) {
  // Get the month and year of the given date
  const month = date.getMonth();
  const year = date.getFullYear();

  // Create a new Date object for the next month
  // (day 0 means the last day of the previous month)
  const nextMonthDate = new Date(year, month + 1, 0);

  // Return the day component of the next month's date
  // This will give us the total number of days in the month of the given date
  return nextMonthDate.getDate();
}

var activity = JSON.parse(activityDetails);
setTimeout(() => {
  SafeSat();
}, 5000);

function SafeSat() {
  if (
    $("#period").html().includes("1") ||
    $("#period").html().includes("2") ||
    $("#period").html().includes("3") ||
    $("#period").html().includes("4") ||
    $("#period").html().includes("5") ||
    $("#period").html().includes("6") ||
    $("#period").html().includes("7")
  ) {
    var safeDate = new Date()
      .toLocaleString(`hi-IN`, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replaceAll("/", "");
    var crrMonth = new Date().getMonth();
    var safeSaturdays = getSaturdaysIndexes(new Date());
    var safeSaturdaysKeys = Object.keys(safeSaturdays);
    if (safeSaturdaysKeys.includes(safeDate)) {
      var week = safeSaturdays[safeDate];
      var content = activity[crrMonth][week];
      var yearlyweekcount=parseInt(week)+((crrMonth)*4)
      $("#safe").empty().append(`
  <div class="card safe-div" style="border: 1px solid #216721;width:100%; position:relative;overflow:hidden" onclick=" GetSafeSaturdayDetail(this,${yearlyweekcount},'y')">
  <div id="safeNew"><img src="img/new.png"  style="width:30px ;height:30px;"></div>
    <div class="card-body pt-1 pb-1  pr-1">
    <span class="badge badge-gold mr-1">Safe Saturday</span><span class="badge badge-danger">सुरक्षित शनिवार</span><br/>
    <div class="badge badge-light safeContent">${content?.Activity}</div>
    <div class="divDetails-main" style="display:none"></div>
  </div>
</div>
`).css("margin-bottom", "1rem");
    }
  }
}

$(".btnHoliday").click(function () {
  $(".btnHoliday").removeClass("btnHoliday-border");
  $(this).addClass("btnHoliday-border");
  if ($(this).text() == "Holiday") {
    $(".safe-saturday").css("display", "none");
    $(".calender").css("display", "block");
  } else {
    $(".calender").css("display", "none");
    $(".safe-saturday").css("display", "block");
  }
  var id = "#safe" + getNextSaturdayDate();
  $(id).parent().css({ color: "white", "background-color": "#c313da" });
});
$(".btnTeacher").click(function () {
  $(".btnTeacher").removeClass("btnHoliday-border");
  $(this).addClass("btnHoliday-border");
  if ($(this).text() == "Teachers") {
    $(".teachers-input").css("display", "none");
    $(".teacher-ul").css("display", "flex");
  } else {
    $(".teacher-ul").css("display", "none");
    $(".teachers-input").css("display", "flex");
  }
  // var id="#safe"+getNextSaturdayDate()
  // $(id).parent().css({"color":"white","background-color":"#c313da"})
});

function getMonthName(monthNumber) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (monthNumber >= 0 && monthNumber <= 11) {
    return months[monthNumber];
  } else {
    return "Invalid month number";
  }
}
var weekcount = 0;
for (const k in activity) {
  if (activity.hasOwnProperty(k)) {
    Object.keys(activity[k]).forEach(function (crr, index, arr) {
      var dt = new Date(new Date().getFullYear(), parseInt(k), 1);
      var satur = getSaturdaysDates(dt);
      weekcount++;
      if (index == 0) {
        $(".safe-saturday").append(
          `<li class="pb-2"><span class="badge badge-gold">${getMonthName(
            k
          )}</span><table class="table table-bordered tblSafe" id="li${k}"></ul></li>`
        );
      }
      var id = "#li" + k;
      var safeday = satur[index];
      $(id).append(
        `<tr>
        <td>
        W-${index + 1}
        </td>
        <td style="width:67%;cursor:pointer" onclick="GetSafeSaturdayDetail(this,${weekcount})">
        ${
          activity[k][crr].Activity
        }
        <div class="divDetails" style="display:none"></div></td><td id="safe${safeday.replaceAll( "/","")}" style="width:20%">${safeday}</td> </tr>`
      );
    });
  }
}

function getNextSaturdayDate() {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

  // Calculate days until the next Saturday
  const daysUntilSaturday = (6 - dayOfWeek + 7) % 7;

  // Calculate the date of the next Saturday
  const nextSaturday = new Date(today);
  nextSaturday.setDate(today.getDate() + daysUntilSaturday);

  return nextSaturday
    .toLocaleString(`hi-IN`, {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replaceAll("/", "");
}
var teachersList = JSON.parse(teachersDetails);
$("#txtTeachers").empty();
var opt = '<option value="">--Choose Teacher--</option>';
Object.keys(teachersList)
  .sort()
  .forEach(function (curr, index) {
    opt += `<option value="${curr}">${curr}</option>`;
  });
$("#txtTeachers").append(opt);

function PostSummary(leaveRecord) {
  var record = {
    teacher: $("#txtTeachers").val(),
    fromDate: $("#txtFromDate").val(),
    toDate: $("#txtToDate").val(),
    leaveType: $("#txtLeaveType").val(),
    createdDate: new Date(),
  };
  leaveRecord.push(record);
  var bin = "65fd29f5266cfc3fde9c10d7";
  $.ajax({
    url: HOST_URL + bin,
    type: "PUT",
    dataType: "json",
    headers: {
      "X-MASTER-KEY":
        "$2a$10$.6ZqttVZf.9LAJKH13lP7e9umulbPZu5dFVvDcZ6CC9DOBF8Z5aiu",
    },
    contentType: "application/json",
    data: JSON.stringify(leaveRecord),
    success: function (result) {
      $("#txtTeachers").val(""),
        $("#txtFromDate").val(""),
        $("#txtToDate").val(""),
        $("#txtLeaveType").val("C.L."),
        alert("Saved");
      GetSummary();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

$(".btnSaveTeacher").click(function () {
  if (
    $("#txtTeachers").val() == "" ||
    $("#txtFromDate").val() == "" ||
    $("#txtToDate").val() == "" ||
    $("#txtLeaveType").val() == ""
  ) {
    alert("All fields are required");
    return;
  }
  var bin = "65fd29f5266cfc3fde9c10d7";
  $.ajax({
    url: HOST_URL + bin,
    type: "GET",
    dataType: "json",
    headers: {
      "X-MASTER-KEY":
        "$2a$10$.6ZqttVZf.9LAJKH13lP7e9umulbPZu5dFVvDcZ6CC9DOBF8Z5aiu",
    },
    contentType: "application/json; charset=utf-8",
    success: function (result) {
      PostSummary(result.record);
    },
    error: function (err) {},
  });
});
GetSummary();


// function([string1, string2],target id,[color1,color2])    
//consoleText(['FULIYAKHAND'], 'text',['wheat','wheat','wheat']);

function consoleText(words, id, colors) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console');
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(id)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function() {

    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function() {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function() {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function() {
    if (visible === true) {
      con.className = 'console-underscore d-none'
      visible = false;

    } else {
      con.className = 'console-underscore d-none'

      visible = true;
    }
  }, 400)
}

$(".mode-trigger").click(function(){
  if($('.color-mode').hasClass("hide-mode")){
    $('.color-mode').removeClass("hide-mode").animate({"right":"0"})
  }
  else{
    $('.color-mode').addClass("hide-mode").animate({"right":"-200px"})
  }
})

$('.change-theme').click(function(){
  if($(this).hasClass("th-day")){
    // dark theme
    $(":root").css({
      "--core-color":"#191f3a",
      "--core-text-color":"rgb(255 255 255 / 74%)",
      "--body-color":"#171b35"
    })
    $(this).removeClass("th-day").addClass("th-night")
    $(this).empty().append(`<i class="fa-solid fa-sun mr-1"></i><span></span>`)
    localStorage.setItem("theme","dark")
  }
  else{
    // light theme
    $(":root").css({
      "--core-color":"white",
      "--core-text-color":"rgb(0 0 0 / 75%)",
      "--body-color":"#e6ebf1"
    })
    $(this).addClass("th-day").removeClass("th-night")
    $(this).empty().append(`<i class="fa-solid fa-moon mr-1"></i><span></span>`)
    localStorage.setItem("theme","light")
  }
 
})

function setTheme(){
  var theme=localStorage.getItem("theme")== null? "light":localStorage.getItem("theme");
  if(theme=="dark"){
    // dark theme
    $(":root").css({
      "--core-color":"#191f3a",
      "--core-text-color":"rgb(255 255 255 / 74%)",
      "--body-color":"#171b35"
    })
    $('.change-theme').removeClass("th-day").addClass("th-night")
    $('.change-theme').empty().append(`<i class="fa-solid fa-sun mr-1"></i><span></span>`)
    localStorage.setItem("theme","dark")
  }
  else{
    // light theme
    $(":root").css({
      "--core-color":"white",
      "--core-text-color":"rgb(0 0 0 / 75%)",
      "--body-color":"#e6ebf1"
    })
    $('.change-theme').addClass("th-day").removeClass("th-night")
   // $('.change-theme').append(`<i class="fa-solid fa-moon mr-1"></i><span></span>`)
    localStorage.setItem("theme","light")
  }
}

// if(isAm(new Date())){
//   $(":root").css({
//     "--core-color":"#f8f9fa",
//     "--core-text-color":"rgba(0, 0, 0, 0.782)",
//     "--body-color":"#f8f9fa"
//   })
// }
// else{
//   $(":root").css({
//     "--core-color":"rgb(43, 49, 46)",
//     "--core-text-color":"rgba(255, 255, 255, 0.759)",
//     "--body-color":"rgba(0,0,0,0.8)"
//   })

var teacherRout=JSON.parse(teacherRoutine)


function clicked(item,teacher)
{
  var  id="#div-"+$(item).attr("id")
  var tblid="#tbl-"+$(item).attr("id")
  $(tblid).empty()
  teacherRout[teacher]?.forEach(function(crr, index, arr){
    $(tblid).append(`
    <tr>
         <td >${crr.Bell}</td>
         <td >${GetWords(crr.Class)}</td>
         <td >${crr.Subject}</td>
    </tr>
    `)
  })
  
  $(id).slideToggle()
  $(item).toggleClass("rotate")
}
function pclicked(item,teacher)
{
  var  id="#p-div-"+$(item).attr("id")
  var tblid="#p-tbl-"+$(item).attr("id")
  $(tblid).empty()
  teacherRout[teacher]?.forEach(function(crr, index, arr){
    $(tblid).append(`
    <tr>
         <td >${crr.Bell}</td>
         <td >${GetWords(crr.Class)}</td>
         <td >${crr.Subject}</td>
    </tr>
    `)
  })
  
  $(id).slideToggle()
  $(item).toggleClass("rotate")
}


function GetWords(num){
  switch (num) {
    case "Class1-2":
      return "One & Two"      
    case "Class3":
     return "Three"      
    case "Class4":
     return "Four"      
    case "Class5":
     return "Five"
    case "Class6":
     return "Six"      
    case "Class7":
     return "Seven"      
    case "Class8":
     return "Eight"      
    case "Class9":
     return "Nine"      
    case "Class10":
     return "Ten"      
    case "Class11":
       return "Eleven"        
    case "Class12":
         return "Twelve" 
    default:     
  }
}

function openTeacherRout(tch){  
  $("#tbl-teacher-rout").empty()
  teacherRout[tch]?.forEach(function(crr, index, arr){
    $("#tbl-teacher-rout").append(`
    <tr>
         <td >${crr.Bell}</td>
         <td >${GetWords(crr.Class)}</td>
         <td >${crr.Subject}</td>
    </tr>
    `)
  })
  $("#modTeacherRout").modal("show")
}
function openTeacherRoutp(tch){  
  $("#tbl-teacher-rout").empty()
  teacherRout[tch]?.forEach(function(crr, index, arr){
    $("#tbl-teacher-rout").append(`
    <tr>
         <td >${crr.Bell}</td>
         <td >${GetWords(crr.Class)}</td>
         <td >${crr.Subject}</td>
    </tr>
    `)
  })
  $("#modTeacherRout").modal("show")
}

