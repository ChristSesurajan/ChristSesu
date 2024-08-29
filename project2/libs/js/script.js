function refreshperson() {
  document.getElementById('searchInp').value = '';
  $("#nonedata").hide();
  $.ajax({
      url: "libs/php/getAll.php",
      type: "GET",
      dataType: "json",
      beforeSend: function () {
          document.getElementById("loadingSpinner").style.display = 'block';
      },
      success: function (result) {
          var personnelTableBody = document.getElementById('personnelTableBody');
          personnelTableBody.innerHTML = ''; 
  
          var frag = document.createDocumentFragment();
  
          result.data.forEach(function (item) {
              var row = document.createElement("tr");
  
              var nameCell = document.createElement("td");
              var nameText = document.createTextNode(item.lastName + ', ' + item.firstName);
              nameCell.appendChild(nameText);
              row.appendChild(nameCell);
  
              var emailCell = document.createElement("td");
              emailCell.className = "d-none d-md-table-cell";
              var emailText = document.createTextNode(item.email);
              emailCell.appendChild(emailText);
              row.appendChild(emailCell);
  
              var actionsCell = document.createElement("td");
              actionsCell.className = "text-center";
  
              var editButton = document.createElement("button");
              editButton.type = "button";
              editButton.className = "btn btn-primary btn-sm";
              editButton.setAttribute("data-bs-toggle", "modal");
              editButton.setAttribute("data-bs-target", "#editPersonnelModal");
              editButton.setAttribute("data-id", item.id);
              editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
              editButton.style.marginRight = '5px';
              
  
              let deleteButton = document.createElement("button");
              deleteButton.type = "button";
              deleteButton.className = "btn  btn-primary btn-sm";
              deleteButton.setAttribute("data-bs-toggle", "modal");
              deleteButton.setAttribute("data-bs-target", "#deleteModal");
              deleteButton.setAttribute("data-id", item.id);
              deleteButton.id = "perdeletebutt";
              deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
             
              var buttonsCell = document.createElement('td');
              buttonsCell.className = 'text-end'; // Right align buttons
              buttonsCell.appendChild(editButton);
              buttonsCell.appendChild(deleteButton);

              
              row.appendChild(actionsCell);
              row.appendChild(buttonsCell);
              frag.appendChild(row);
          });
  
          personnelTableBody.appendChild(frag);
      },
      error: function (jqXHR, textStatus, errorThrown) {
          var modalTitle = document.querySelector("#editPersonnelModal .modal-title");
          if (modalTitle) {
              modalTitle.textContent = "Error retrieving data";
          }
      },
      complete: function () {
          document.getElementById("loadingSpinner").style.display = 'none';
      }
  });
}

function refreshdept(){
  document.getElementById('searchInp').value = '';

  $.ajax({
      url: "libs/php/getAllDepartments.php",
      type: "GET",
      dataType: "json",
      success: function (depdata) {
          //console.log(depdata);
          var tableBodyDept = document.getElementById('departmentTableBody');
          tableBodyDept.innerHTML = ''; 
          var deptfrag = document.createDocumentFragment();
          depdata.data.forEach(function (item) {
              var deptRow = document.createElement('tr');
             
            //console.log(item)
              ['name','locname','id'].forEach(function (deptKey) {
                  if (deptKey === 'id') {
                      
                      var editButton = document.createElement('button');
                      editButton.type = 'button';
                      editButton.className = 'btn btn-primary btn-sm';
                      editButton.setAttribute('data-bs-toggle', 'modal');
                      editButton.setAttribute('data-bs-target', '#editDepartmentModal');
                      editButton.setAttribute('data-id', item[deptKey]);
                      editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
                      editButton.style.marginRight = '5px'; // Add space between buttons
  
                    
                      let deleteButton = document.createElement('button');
                      deleteButton.id = 'deptdeletebutt';
                      deleteButton.type = 'button';
                      deleteButton.className = 'btn btn-primary btn-sm';
                      deleteButton.setAttribute('data-bs-toggle', 'modal');
                      deleteButton.setAttribute('data-bs-target', '#deletdeptModal');
                      deleteButton.setAttribute('data-id', item[deptKey]);
                      deleteButton.value = item[deptKey];
                      deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';
  
                      var buttonsCell = document.createElement('td');
                      buttonsCell.className = 'text-end'; 
                      buttonsCell.appendChild(editButton);
                      buttonsCell.appendChild(deleteButton);
  
                      deptRow.appendChild(buttonsCell);
                  } else {
                      var deptTd = document.createElement('td');
                      deptTd.id = deptKey;
                      var deptValue = document.createElement('p');
                      deptValue.textContent = item[deptKey];
                      deptTd.appendChild(deptValue);
                      deptRow.appendChild(deptTd);
                  }
              });
              deptfrag.appendChild(deptRow)

              //deptRow.append(deptfrag)
              tableBodyDept.appendChild(deptfrag);
          });
      },
      error: function (jqXHR, textStatus, errorThrown) {
              console.log(textStatus);
          var modalTitle = document.querySelector("#editPersonnelModal .modal-title");
          if (modalTitle) {
              modalTitle.textContent = "Error retrieving data";
          }
      },
      complete: function () {
          document.getElementById("loadingSpinner").style.display = 'none';
      }
  });
  }



function refloc(){
  document.getElementById('searchInp').value = '';

$.ajax({
    url: "libs/php/getallLocation.php",
    type: "GET",
    dataType: "json",
    beforeSend: function () {
        document.getElementById("loadingSpinner").style.display = 'block';
    },
    success: function (locres) {
        var locaBodyDept = document.getElementById('locationTableBody');
        locaBodyDept.innerHTML = ''; 
        var locfrag = document.createDocumentFragment();
        locres.data.forEach(function (ites) {
            var locRow = document.createElement('tr');

            ['name', 'id'].forEach(function (locKey) {
                if (locKey === 'id') {
           
                    var editButton = document.createElement('button');
                    editButton.type = 'button';
                    editButton.className = 'btn btn-primary btn-sm';
                    editButton.setAttribute('data-bs-toggle', 'modal');
                    editButton.setAttribute('data-bs-target', '#editLocationModal');
                    editButton.setAttribute('data-id', ites[locKey]);
                    editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
                    editButton.style.marginRight = '5px'; 

                 
                    var deleteButton = document.createElement('button');
                    deleteButton.id = 'locdeletebutt';
                    deleteButton.type = 'button';
                    deleteButton.className = 'btn btn-primary btn-sm';
                    deleteButton.setAttribute('data-bs-toggle', 'modal');
                    deleteButton.setAttribute('data-bs-target', '#deletlocoModal');
                    deleteButton.setAttribute('data-id', ites[locKey]);
                    deleteButton.value = ites[locKey];
                    deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

                    var buttonsCell = document.createElement('td');
                    buttonsCell.className = 'text-end'; 
                    buttonsCell.appendChild(editButton);
                    buttonsCell.appendChild(deleteButton);

                    locRow.appendChild(buttonsCell);
                } else {
                    var locTd = document.createElement('td');
                    locTd.id = locKey;
                    var locValue = document.createElement('p');
                    locValue.textContent = ites[locKey];
                    locTd.appendChild(locValue);
                    locRow.appendChild(locTd);
                }
            });
            locfrag.appendChild(locRow)
            locaBodyDept.appendChild(locfrag);
        });
    },
    error: function (jqXHR, textStatus, errorThrown) {
        var modalTitle = document.querySelector("#editPersonnelModal .modal-title");
        if (modalTitle) {
            modalTitle.textContent = "Error retrieving data";
        }
    },
    complete: function () {
        document.getElementById("loadingSpinner").style.display = 'none';
    }
});
}




$(document).ready(function () {
  if ($("#departmentsBtn").hasClass("active") || $("#locationsBtn").hasClass("active")) {
    $("#filterBtn").addClass('disabled').attr('disabled', true);
  
     }
     $.ajax({
      url: "libs/php/getAllDepartments.php",
      type: "GET",
      dataType: "json",
      success: function (results) {
        //console.log(results);
        $("#filterDepartment").empty();
        $("#filterDepartment").append(
          $("<option>", {
            value:'',
            text:'All'
          }))
        $.each(results.data, function () {
          $("#filterDepartment").append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
        //console.error("Error retrieving departments: ", textStatus, errorThrown);
        $("#createfilterModal .modal-title").text("Error retrieving data").css("color", "red");
      }
    });
  
    $.ajax({
      url: "libs/php/getallLocation.php", 
      type: "GET",
      dataType: "json",
      success: function (results) {
        //console.log(results);
        $("#filterLocation").empty();
        $("#filterLocation").append(
          $("<option>", {
            value: '',
            text: 'All'
          })
        );
        $.each(results.data, function () {
          $("#filterLocation").append(
            $("<option>", {
              value: this.id,
              text: this.name
            })
          );
        });

      },
      error: function (jqXHR, textStatus, errorThrown) {
        //console.error("Error retrieving locations: ", textStatus, errorThrown);
        $("#createfilterModal .modal-title").text("Error retrieving data").css("color", "red");
      }
    });
  $("#spine").hide();
  $.ajax({
    url: "libs/php/getAll.php",
    type: "GET",
    dataType: "json",
    beforeSend: function () {
        document.getElementById("loadingSpinner").style.display = 'block';
    },
    success: function (result) {
      $("#nonedata").hide();
        var personnelTableBody = document.getElementById('personnelTableBody');
        personnelTableBody.innerHTML = ''; 

        var frag = document.createDocumentFragment();

        result.data.forEach(function (item) {
            var row = document.createElement("tr");

            var nameCell = document.createElement("td");
            var nameText = document.createTextNode(item.lastName + ', ' + item.firstName);
            nameCell.appendChild(nameText);
            row.appendChild(nameCell);

            var emailCell = document.createElement("td");
            emailCell.className = "d-none d-md-table-cell";
            var emailText = document.createTextNode(item.email);
            emailCell.appendChild(emailText);
            row.appendChild(emailCell);

            var actionsCell = document.createElement("td");
            actionsCell.className = "text-center";

            var editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "btn btn-primary btn-sm";
            editButton.setAttribute("data-bs-toggle", "modal");
            editButton.setAttribute("data-bs-target", "#editPersonnelModal");
            editButton.setAttribute("data-id", item.id);
            editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
            editButton.style.marginRight = '5px';
            

            let deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn  btn-primary btn-sm";
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#deleteModal");
            deleteButton.setAttribute("data-id", item.id);
            deleteButton.id = "perdeletebutt";
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
           
            var buttonsCell = document.createElement('td');
            buttonsCell.className = 'text-end'; // Right align buttons
            buttonsCell.appendChild(editButton);
            buttonsCell.appendChild(deleteButton);

            
            row.appendChild(actionsCell);
            row.appendChild(buttonsCell);
            frag.appendChild(row);
        });

        personnelTableBody.appendChild(frag);
    },
    error: function (jqXHR, textStatus, errorThrown) {
        var modalTitle = document.querySelector("#editPersonnelModal .modal-title");
        if (modalTitle) {
            modalTitle.textContent = "Error retrieving data";
        }
    },
    complete: function () {
        document.getElementById("loadingSpinner").style.display = 'none';
    }
});


  $("#searchInp").on("keyup", function () {
   var inpname=$('#searchInp').change().val();
   ///console.log(inpname)

    $.ajax({
      url: "libs/php/SearchAll.php",
      type: "POST",
      dataType: "json",
      data:{
            txt:inpname
      },
      beforeSend: function () {
        $("#loadingSpinner").show();
      },
      success: function (result) {
        //console.log(result);
        var existingCombos = new Set();
        let personnelTableBody = document.getElementById('personnelTableBody');
        personnelTableBody.innerHTML = ''; 

        let frag = document.createDocumentFragment();

        result.data.found.forEach(function (item) {
            let row = document.createElement("tr");

            let nameCell = document.createElement("td");
            let nameText = document.createTextNode(item.lastName + ', ' + item.firstName);
            nameCell.appendChild(nameText);
            row.appendChild(nameCell);

            let emailCell = document.createElement("td");
            emailCell.className = "d-none d-md-table-cell";
            let emailText = document.createTextNode(item.email);
            emailCell.appendChild(emailText);
            row.appendChild(emailCell);

            let actionsCell = document.createElement("td");
            actionsCell.className = "text-center";

            var editButton = document.createElement("button");
            editButton.type = "button";
            editButton.className = "btn btn-primary btn-sm";
            editButton.setAttribute("data-bs-toggle", "modal");
            editButton.setAttribute("data-bs-target", "#editPersonnelModal");
            editButton.setAttribute("data-id", item.id);
            editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
            editButton.style.marginRight = '5px';
            

            let deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn  btn-primary btn-sm";
            deleteButton.setAttribute("data-bs-toggle", "modal");
            deleteButton.setAttribute("data-bs-target", "#deleteModal");
            deleteButton.setAttribute("data-id", item.id);
            deleteButton.id = "perdeletebutt";
            deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
           
            var buttonsCell = document.createElement('td');
            buttonsCell.className = 'text-end'; // Right align buttons
            buttonsCell.appendChild(editButton);
            buttonsCell.appendChild(deleteButton);

            
            row.appendChild(actionsCell);
            row.appendChild(buttonsCell);
            frag.appendChild(row);
            personnelTableBody.appendChild(frag);
            let locaBodyDept = document.getElementById('locationTableBody');
            locaBodyDept.innerHTML = ''; 
           // console.log(item);
           let locRow = document.createElement('tr');
            let locfrag = document.createDocumentFragment();
              ['locationName', 'locationID'].forEach(function (locKey) {
                if (locKey === 'locationID') {
                    // Create the edit button
                    let editButton = document.createElement('button');
                    editButton.type = 'button';
                    editButton.className = 'btn btn-primary btn-sm';
                    editButton.setAttribute('data-bs-toggle', 'modal');
                    editButton.setAttribute('data-bs-target', '#editLocationModal');
                    editButton.setAttribute('data-id', item[locKey]);
                    editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
                    editButton.style.marginRight = '5px'; // Add space between buttons

                    // Create the delete button
                    let deleteButton = document.createElement('button');
                    deleteButton.id = 'locdeletebutt';
                    deleteButton.type = 'button';
                    deleteButton.className = 'btn btn-primary btn-sm';
                    deleteButton.setAttribute('data-bs-toggle', 'modal');
                    deleteButton.setAttribute('data-bs-target', '#deletlocoModal');
                    deleteButton.setAttribute('data-id', item[locKey]);
                    deleteButton.value = item[locKey];
                    deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';

                    // Create a new table cell for the buttons
                    let buttonsCell = document.createElement('td');
                    buttonsCell.className = 'text-end'; // Right align buttons
                    buttonsCell.appendChild(editButton);
                    buttonsCell.appendChild(deleteButton);

                    locRow.appendChild(buttonsCell);
                } else {
                    let locTd = document.createElement('td');
                    locTd.id = locKey;
                    let locValue = document.createElement('p');
                    locValue.textContent = item[locKey];
                    locTd.appendChild(locValue);
                    locRow.appendChild(locTd);
                }
            });
            locfrag.appendChild(locRow)
            locaBodyDept.appendChild(locfrag);
            
            var deptCombo = `${item.departmentName}|${item.locationName}`; 
            //console.log(deptCombo);
           
            if (existingCombos.has(deptCombo)) {
              return; 
              
          }
          let deptfrag = document.createDocumentFragment();
            existingCombos.add(deptCombo);
            let tableBodyDept = document.getElementById('departmentTableBody');
            tableBodyDept.innerHTML = ''; 
            let deptRow = document.createElement('tr');
              ['departmentName', 'locationName','departmentID'].forEach(function (deptKey) {
               
          
                      if (deptKey === 'departmentID') {
                          
                        let editButton = document.createElement('button');
                          editButton.type = 'button';
                          editButton.className = 'btn btn-primary btn-sm';
                          editButton.setAttribute('data-bs-toggle', 'modal');
                          editButton.setAttribute('data-bs-target', '#editDepartmentModal');
                          editButton.setAttribute('data-id', item[deptKey]);
                          editButton.innerHTML = '<i class="fa-solid fa-pencil fa-fw"></i>';
                          editButton.style.marginRight = '5px'; // Add space between buttons
      
                          // Create the delete button
                          let deleteButton = document.createElement('button');
                          deleteButton.id = 'deptdeletebutt';
                          deleteButton.type = 'button';
                          deleteButton.className = 'btn btn-primary btn-sm';
                          deleteButton.setAttribute('data-bs-toggle', 'modal');
                          deleteButton.setAttribute('data-bs-target', '#deletdeptModal');
                          deleteButton.setAttribute('data-id', item[deptKey]);
                          deleteButton.value = item[deptKey];
                          deleteButton.innerHTML = '<i class="fa-solid fa-trash fa-fw"></i>';
      
                          // Create a new table cell for the buttons
                          let buttonsCell = document.createElement('td');
                          buttonsCell.className = 'text-end'; // Right align buttons
                          buttonsCell.appendChild(editButton);
                          buttonsCell.appendChild(deleteButton);
      
                          deptRow.appendChild(buttonsCell);
                      } else {
                        let deptTd = document.createElement('td');
                          deptTd.id = deptKey;
                          let deptValue = document.createElement('p');
                          deptValue.textContent = item[deptKey];
                          deptTd.appendChild(deptValue);
                          deptRow.appendChild(deptTd);
                      }
                  });
                  deptfrag.appendChild(deptRow)
                  tableBodyDept.appendChild(deptfrag);
             
             
              })




    },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
       // console.log(textStatus);
       // console.log(errorThrown);

      },complete: function () {
        $("#loadingSpinner").hide();
      }

    })

  });
  
  $("#refreshBtn").click(function () {
    
    if ($("#personnelBtn").hasClass("active")) {
      
      // Refresh personnel table
      refreshperson();
      
    } else {
      
      if ($("#departmentsBtn").hasClass("active")) {
        
        // Refresh department table
            refreshdept();
        
      } else {
        
        // Refresh location table
        refloc();
      }
      
    }
    
  });

//delete button person
var personid;
    
$('#deleteModal').on('show.bs.modal', function (event) {
     $("#spine6").hide();
   // var deletperrModal = new bootstrap.Modal(document.getElementById('deleteModal'));
   // deletperrModal.show();
    
    $("#deleerror").hide();
    personid = $(event.relatedTarget).attr("data-id");
    //console.log(personid)
    $.ajax({
      url: 'libs/php/getPersonnelByID.php',
      type: 'POST',
      dataType: 'json',
      data: {
          id: personid
      },
      success: function (response) {
        //console.log(response.data)
        $("#deleteForm").html(`Are you sure that you want to remove the entry for <b> ${response.data.personnel[0].firstName} ${response.data.personnel[0].lastName}</b>?`).show();
        $('#dependencyWarning').hide();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error retrieving departments: ", textStatus, errorThrown);
        $("#deleteModal .modal-title").text("Error retrieving data");
      }
  });


   //console.log($(e.relatedTarget).attr("data-id")) 

})

$('#confirmDelete').click(function (e) {
  e.preventDefault();
  
  //console.log(personid)
  $.ajax({
    url: 'libs/php/deleteperson.php',
    type: 'POST',
    dataType: 'json',
    data: {
        id: personid
    },
    success: function (deleteResponse) {
        
            $("#deleteForm").hide();
            $("#spine6").show().delay(1000).fadeOut('slow', function () {
                $("#deleteModal").hide();
            });
            refreshperson();
    },
    error: function (jqXHR, textStatus, errorThrown) {
      //console.error("Error retrieving departments: ", textStatus, errorThrown);
      $("#deleteModal .modal-title").text("Error retrieving data");
    }
});
   
})
  
//delete button person end

  

//delete button dept

var detid;
    
$('#deletdeptModal').on('show.bs.modal', function (event) {
  $("#spine7").hide();
  //$("#deletdeptForm").show();
 //var deletdeptModal = new bootstrap.Modal(document.getElementById('deletdeptModal'));
 //deletdeptModal.show();
 $("#deletdeptForm").show();
 
 $("#deleerror1").hide();
detid =  $(event.relatedTarget).attr("data-id");
 $('#deptconfirmDelete').data('id', detid);

 $.ajax({
  url: 'libs/php/getDepartmentByID.php',
  type: 'POST',
  dataType: 'json',
  data: {
      id: detid
  },
  success: function (deptidres) {
    //console.log(deptidres)
   let depna=deptidres.data[0].name;
 $.ajax({
  url: 'libs/php/dependencycheck.php',
  type: 'POST',
  dataType: 'json',
  data: {
     name:'dept',
      id: detid
  },
  success: function (deletedepResponse) {
    
   if(deletedepResponse.hasDependencies) {
      $("#deleerror1").html(`You cannot remove the entry for <b>${depna}</b> because it has <b>${deletedepResponse.count}</b> employees assigned to it.`).show();
      $("#message1").hide();
      $("#deptconfirmDelete").hide();
      $("#nobtn1").text('CLOSE');
}else{
   $("#deleerror1").hide();
      $("#message1").html(`Are you sure that you want to remove the entry for <b>${depna}</b>?`).show();
      $("#deptconfirmDelete").show();
      $("#nobtn1").text('NO');
}
         
        
 },
 error: function (jqXHR, textStatus, errorThrown) {
   //console.error("Error retrieving departments: ", textStatus, errorThrown);
   $("#deletdeptModal .modal-title").text("Error retrieving data").css("color", "red");
 }
});
},
error: function (jqXHR, textStatus, errorThrown) {
  //console.error("Error retrieving departments: ", textStatus, errorThrown);
  $("#deletdeptModal .modal-title").text("Error retrieving data").css("color", "red");
}
});

 
//console.log($(e.relatedTarget).attr("data-id")) 

})

$('#deptconfirmDelete').click(function (e) {

e.preventDefault();



     
 

    $.ajax({
      url: 'libs/php/deleteDepartmentByID.php',
      type: 'POST',
      dataType: 'json',
      data: {
          id: detid
      },
      success: function (satus) {

        $("#deletdeptForm").hide();
        $("#spine7").show().delay(1000).fadeOut('slow', function () {
        $("#deletdeptModal").hide();
        
        });
        refreshdept();

      },
      error: function (jqXHR, textStatus, errorThrown) {
        //console.error("Error retrieving departments: ", textStatus, errorThrown);
        $("#deletdeptModal .modal-title").text("Error retrieving data").css("color", "white");
      }
     });

   
    

})




//delete button dept end




//delete button loco

var lociids;
    
$('#deletlocoModal').on('show.bs.modal', function (event) {
  $("#spine8").hide();
 //var deletlocoModal = new bootstrap.Modal(document.getElementById('deletlocoModal'));
 //deletlocoModal.show();
 $("#deletlocoForm").show();
 $("#deleerror2").hide();
 lociids =  $(event.relatedTarget).attr("data-id");
 $('#lococonfirmDelete').data('id', lociids);
 //$("#lococonfirmDelete").show();

 $.ajax({
  url: 'libs/php/getlocationbyid.php',
  type: 'POST',
  dataType: 'json',
  data: {
      id: lociids
  },
  success: function (locidres) {
    //console.log(deptidres)
   let locna=locidres.data[0].name;
 $.ajax({
  url: 'libs/php/dependencycheck.php',
  type: 'POST',
  dataType: 'json',
  data: {
     name:'loc',
      id: lociids
  },
  success: function (deletedepResponse) {
    
   if(deletedepResponse.hasDependencies) {
      $("#deleerror2").html(`You cannot remove the entry for <b>${locna}</b> because it has <b>${deletedepResponse.count}</b> Department assigned to it.`).show();
      $("#message2").hide();
      $("#lococonfirmDelete").hide();
      $("#nobtn").text('CLOSE');
}else{
  $("#nobtn").text('NO');
   $("#deleerror2").hide();
      $("#message2").html(`Are you sure that you want to remove the entry for <b>${locna}</b>?`).show();
      $("#lococonfirmDelete").show();
}
         
        
 },
 error: function (jqXHR, textStatus, errorThrown) {
   //console.error("Error retrieving departments: ", textStatus, errorThrown);
   $("#deletdeptModal .modal-title").text("Error retrieving data").css("color", "red");
 }
});
},
error: function (jqXHR, textStatus, errorThrown) {
  //console.error("Error retrieving departments: ", textStatus, errorThrown);
  $("#deletdeptModal .modal-title").text("Error retrieving data").css("color", "red");
}
});


 

})

$('#lococonfirmDelete').click(function (e) {

e.preventDefault();

     
    $.ajax({
      url: 'libs/php/deletelocation.php',
      type: 'POST',
      dataType: 'json',
      data: {
          id: lociids
      },
      success: function (satus) {

        $("#deletlocoForm").hide();
        $("#spine8").show().delay(1000).fadeOut('slow', function () {
            $("#deletlocoModal").hide();
            
        });
        
        refloc();
      },
      error: function (jqXHR, textStatus, errorThrown) {
        //console.error("Error retrieving departments: ", textStatus, errorThrown);
        $("#deletlocoModal .modal-title").text("Error retrieving data").css("color", "red");
      }
     });

         
})



//delete button person end
  
  $("#createfilterModal").on('show.bs.modal' , function () {
    
    // createfilterModal = new bootstrap.Modal(document.getElementById('createfilterModal'));
     // createfilterModal.show()
    $("#createfilterForm").show();
    $("#filterbtn").show();
    $("#error").hide(); 
    $("#nonedata").hide();
    $("#createfilterModal .modal-title").text("Create Filter").css("color", "white");

      
    
     
    
    });
   
    $("#filterDepartment").on('change', function (e) {
      e.preventDefault(); // Prevent default form submission
      $("#nonedata").hide();
      var deptid= $("#filterDepartment").val();
      $("#filterLocation").val('');
      var locid=$("#filterLocation").val();
      //console.log(deptid,locid);
    
        $("#createfilterModal .modal-title").text("Create Filter").css("color", "white");
        if(deptid===''){
          refreshperson()
        }else{

        
        $.ajax({
          url: "libs/php/filter.php",
          type: "POST",
          dataType: "json",
          data: {
            depii: deptid,
            id: locid
          },
          success: function (results) {
            //console.log(results);
            let personnelTableBody = document.getElementById('personnelTableBody');
            let frag = document.createDocumentFragment(); // Create a document fragment
            
            if (results.data.found == '') { 
              $("#nonedata").show();
          } else {
              $("#nonedata").hide();
          
              personnelTableBody.innerHTML = ''; 
    
              results.data.found.forEach(function (item) {
               // console.log(item)
                  let row = document.createElement("tr");
      
                  let nameCell = document.createElement("td");
                  let nameText = document.createTextNode(item.lastName + ', ' + item.firstName);
                  nameCell.appendChild(nameText);
                  row.appendChild(nameCell);

                  let deparCell = document.createElement("td");
                  deparCell.className = "d-none d-md-table-cell";
                  let depaText = document.createTextNode(item.departmentName);
                  deparCell.appendChild(depaText);
                  row.appendChild(deparCell);

                  let locCell = document.createElement("td");
                  locCell.className = "d-none d-md-table-cell";
                  let locText = document.createTextNode(item.locationName);
                  locCell.appendChild(locText);
                  row.appendChild(locCell);
                
                  let emailCell = document.createElement("td");
                  emailCell.className = "d-none d-md-table-cell";
                  let emailText = document.createTextNode(item.email);
                  emailCell.appendChild(emailText);
                  row.appendChild(emailCell);
      
                  let actionsCell = document.createElement("td");
                  actionsCell.className = "text-center";
      
                  let editButton = document.createElement("button");
                  editButton.type = "button";
                  editButton.className = "btn btn-primary btn-sm";
                  editButton.setAttribute("data-bs-toggle", "modal");
                  editButton.setAttribute("data-bs-target", "#editPersonnelModal");
                  editButton.setAttribute("data-id", item.id);
                  editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
                  editButton.style.marginRight = '5px';
                  actionsCell.appendChild(editButton);
      
                  let deleteButton = document.createElement("button");
                  deleteButton.type = "button";
                  deleteButton.className = "btn  btn-primary btn-sm";
                  deleteButton.setAttribute("data-bs-toggle", "modal");
                  deleteButton.setAttribute("data-bs-target", "#deleteModal");
                 deleteButton.setAttribute("data-id", item.id);
                 deleteButton.value = item.id;
                 deleteButton.id = "perdeletebutt";
                 deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                  actionsCell.appendChild(deleteButton);
      
                  row.appendChild(actionsCell);
                  frag.appendChild(row);
              });
      
              personnelTableBody.appendChild(frag);
            }
            
            
          },
          error: function (jqXHR, textStatus, errorThrown) {
          // console.error("Error applying filter: ", textStatus, errorThrown);
            $("#createfilterModal .modal-title").text("Error applying filter").css("color", "red");
          }
        });
        }
    });

    $("#filterLocation").on('change', function (e) {
      e.preventDefault(); // Prevent default form submission
      $("#nonedata").hide();
      $("#filterDepartment").val('');
      var deptid= $("#filterDepartment").val();
      var locid=$("#filterLocation").val();
      //console.log(deptid,locid);
    
        $("#createfilterModal .modal-title").text("Create Filter").css("color", "white");
        if(locid===''){
          refreshperson()
        }else{

        
        $.ajax({
          url: "libs/php/filter.php",
          type: "POST",
          dataType: "json",
          data: {
            depii: deptid,
            id: locid
          },
          success: function (results) {
            //console.log(results);
            let personnelTableBody = document.getElementById('personnelTableBody');
            let frag = document.createDocumentFragment(); // Create a document fragment
            
            if (results.data.found == '') { 
              $("#nonedata").show();
          } else {
              $("#nonedata").hide();
          
              personnelTableBody.innerHTML = ''; 
    
              results.data.found.forEach(function (item) {
               // console.log(item)
                  let row = document.createElement("tr");
      
                  let nameCell = document.createElement("td");
                  let nameText = document.createTextNode(item.lastName + ', ' + item.firstName);
                  nameCell.appendChild(nameText);
                  row.appendChild(nameCell);

                  let deparCell = document.createElement("td");
                  deparCell.className = "d-none d-md-table-cell";
                  let depaText = document.createTextNode(item.departmentName);
                  deparCell.appendChild(depaText);
                  row.appendChild(deparCell);

                  let locCell = document.createElement("td");
                  locCell.className = "d-none d-md-table-cell";
                  let locText = document.createTextNode(item.locationName);
                  locCell.appendChild(locText);
                  row.appendChild(locCell);
                
                  let emailCell = document.createElement("td");
                  emailCell.className = "d-none d-md-table-cell";
                  let emailText = document.createTextNode(item.email);
                  emailCell.appendChild(emailText);
                  row.appendChild(emailCell);
      
                  let actionsCell = document.createElement("td");
                  actionsCell.className = "text-center";
      
                  let editButton = document.createElement("button");
                  editButton.type = "button";
                  editButton.className = "btn btn-primary btn-sm";
                  editButton.setAttribute("data-bs-toggle", "modal");
                  editButton.setAttribute("data-bs-target", "#editPersonnelModal");
                  editButton.setAttribute("data-id", item.id);
                  editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
                  editButton.style.marginRight = '5px';
                  actionsCell.appendChild(editButton);
      
                  let deleteButton = document.createElement("button");
                  deleteButton.type = "button";
                  deleteButton.className = "btn  btn-primary btn-sm";
                  deleteButton.setAttribute("data-bs-toggle", "modal");
                  deleteButton.setAttribute("data-bs-target", "#deleteModal");
                 deleteButton.setAttribute("data-id", item.id);
                  deleteButton.value = item.id;
                  deleteButton.id = "perdeletebutt";
                  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
                  actionsCell.appendChild(deleteButton);
      
                  row.appendChild(actionsCell);
                  frag.appendChild(row);
              });
      
              personnelTableBody.appendChild(frag);
            }
            
            
          },
          error: function (jqXHR, textStatus, errorThrown) {
          // console.error("Error applying filter: ", textStatus, errorThrown);
            $("#createfilterModal .modal-title").text("Error applying filter").css("color", "red");
          }
        });
        }
    });
  

  
    $("#addBtn").click(function () {
    
      // Replicate the logic of the refresh button click to open the add modal for the table that is currently on display
      if ($("#personnelBtn").hasClass("active")) {
          $("#spine3").hide();
          var createPersonnelModal = new bootstrap.Modal(document.getElementById('createPersonnelModal'));
      
          $("#createPersonnelFirstName").val('');
          $("#createPersonnelLastName").val('');
          $("#createPersonnelJobTitle").val('');
          $("#createPersonnelEmailAddress").val('');
          createPersonnelModal.show();
          $.ajax({
            url:
              "libs/php/getAllDepartments.php",
            type: "GET",
            dataType: "json",
            success: function (results) {
              //console.log(results);
              $("#createPersonnelDepartment").empty();
              $.each(results.data, function () {
                $("#createPersonnelDepartment").append(
                  $("<option>", {
                    value: this.id,
                    text: this.name
                  })
                );
              });
            }
          })
  
          // Ensure only one submit handler is attached
          $("#createPersonnelForm").off("submit").on("submit", function (e) {
              e.preventDefault();
  
              let perfname = $("#createPersonnelFirstName").val();
              let perlname = $("#createPersonnelLastName").val();
              let perjt = $("#createPersonnelJobTitle").val();
              let perem = $("#createPersonnelEmailAddress").val();
              let perdep = $("#createPersonnelDepartment").val();    
  
              $.ajax({
                  url: "libs/php/createperson.php",
                  type: "POST",
                  dataType: "json",
                  data: {
                      fname: perfname,
                      lname: perlname,
                      jobt: perjt,
                      email: perem,
                      depait: perdep
                  },
                  beforeSend: function () {
                      $("#loadingSpinner").show();
                  },
                  success: function (result) {
                      if (result.status.code === "200") {
                          $("#createPersonnelForm").hide();
                          $("#spine3").show().delay(1500).fadeOut('slow', function () {
                              $("#createPersonnelForm").show();
                          });
                      } 
                      refreshperson();
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                      $("#createPersonnelModal .modal-title").text("ID already taken. Try a different number").css('color', 'black');
                  },
                  complete: function () {
                      $("#loadingSpinner").hide();
                  }
              });
          });
          
      } else if ($("#departmentsBtn").hasClass("active")) {
          $("#spine4").hide();
          var createDepartmentModal = new bootstrap.Modal(document.getElementById('createDepartmentModal'));
          $("#createDepartment").val('');
          createDepartmentModal.show();
          $.ajax({
            url:
              "libs/php/getallLocation.php",
            type: "GET",
            dataType: "json",
            success: function (results) {
              //console.log(results);
              $("#deptiDeptLocation").empty();
              $.each(results.data, function () {
                $("#deptiDeptLocation").append(
                  $("<option>", {
                    value: this.id,
                    text: this.name
                  })
                );
              });
            },
          });
  
          // Ensure only one submit handler is attached
          $("#createDepartmentForm").off("submit").on("submit", function (e) {
              e.preventDefault();
              let credept = $("#createDepartment").val();
              let loiid = $("#deptiDeptLocation").val();
  
              $.ajax({
                  url: "libs/php/createdept.php",
                  type: "POST",
                  dataType: "json",
                  data: {
                      depname: credept,
                      locid: loiid
                  },
                  beforeSend: function () {
                      $("#loadingSpinner").show();
                  },
                  success: function (result) {
                      if (result.status.code === "200") {
                          $("#createDepartmentForm").hide();
                          $("#spine4").show().delay(1000).fadeOut('slow', function () {
                              $("#createDepartmentForm").show();
                          });
                      } 
                      refreshdept();
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                      $("#createDepartmentModal .modal-title").text("ID already taken. Try a different number").css('color', 'black');
                  },
                  complete: function () {
                      $("#loadingSpinner").hide();
                  }
              });
          });
  
      } else {
          $("#spine5").hide();
          var createLocationModal = new bootstrap.Modal(document.getElementById('createLocationModal'));
          $("#createLocation").val('');
          createLocationModal.show();
  
          // Ensure only one submit handler is attached
          $("#createLocationForm").off("submit").on("submit", function (e) {
              e.preventDefault();
              let locname = $("#createLocation").val();
  
              $.ajax({
                  url: "libs/php/createlocation.php",
                  type: "POST",
                  dataType: "json",
                  beforeSend: function () {
                      $("#loadingSpinner").show();
                  },
                  data: {
                      lociname: locname
                  },
                  success: function (result) {
                      if (result.status.code === "200") {
                          $("#createLocationForm").hide();
                          $("#spine5").show().delay(1000).fadeOut('slow', function () {
                              $("#createLocationForm").show();
                          });
                      } 
                      refloc();
                  },
                  error: function (jqXHR, textStatus, errorThrown) {
                      $("#createLocationModal .modal-title").text("ID already taken. Try a different number").css('color', 'black');
                  },
                  complete: function () {
                      $("#loadingSpinner").hide();
                  }
              });
          });
      }
  });
  
  
  $("#personnelBtn").click(function () {
    
    // Call function to refresh personnel table
    refreshperson();
    $("#filterBtn").removeClass('disabled');
  });
  
  $("#departmentsBtn").click(function () {
    if ($("#departmentsBtn").hasClass("active") || $("#locationsBtn").hasClass("active")) {
      $("#filterBtn").addClass('disabled');
    
       }
    
    // Call function to refresh department table
    refreshdept();
  });
  
  $("#locationsBtn").click(function () {
    if ($("#departmentsBtn").hasClass("active") || $("#locationsBtn").hasClass("active")) {
      $("#filterBtn").addClass('disabled');
    
       }
    
    // Call function to refresh location table
    refloc();
  });
  

  var locatiod;
  $("#editLocationModal").on("show.bs.modal", function (e) {
    $("#spine2").hide();
    locatiod=$(e.relatedTarget).attr("data-id")
    //console.log($(e.relatedTarget).attr("data-id"))
    $.ajax({
      url:
        "libs/php/getlocationbyid.php",
      type: "POST",
      dataType: "json",
      data: {
        id:locatiod
      },
      success: function (result) {
        //console.log(result);
        $('#editLocation').val(result.data[0].name);

      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    });

  })


  $("#editLocationForm").on("submit", function (e) {
    let lociid=locatiod;
    let lepname= $('#editLocation').val();
    //console.log(lociid+lepname)
$.ajax({
    url: "libs/php/updatLocation.php",
    type: "POST",
    dataType: "json",
    data: {  
        locaname: lepname,
        lid: lociid
    },
    beforeSend: function () {
        $("#loadingSpinner").show();
    },
    success: function (result) {
        //console.log(result.status.code);
        $("#editLocationForm").hide();
        $("#spine2").show().delay(1000).fadeOut('slow', function() {
          
          $("#editLocationForm").show();
      });
      refloc();
      
    },
    error: function (jqXHR, textStatus, errorThrown) {
        $("#editPersonnelModal .modal-title").text("Error retrieving data");
        //console.log(textStatus);
        //console.log(errorThrown);
    },
    complete: function () {
        $("#loadingSpinner").hide();
  

    }
});
e.preventDefault();


  })



  var deptidfor;
  $("#editDepartmentModal").on("show.bs.modal", function (e) {
    $("#spine1").hide();
    deptidfor=$(e.relatedTarget).attr("data-id")
    //console.log($(e.relatedTarget).attr("data-id"))
    $.ajax({
      url:
        "libs/php/getDepartmentByID.php",
      type: "POST",
      dataType: "json",
      data: {
        id: $(e.relatedTarget).attr("data-id") 
      },
      success: function (result) {
        //console.log(result);
        $('#editDepartment').val(result.data[0].name);
        $.ajax({
          url:
            "libs/php/getallLocation.php",
          type: "GET",
          dataType: "json",
          success: function (results) {
            //console.log(results);
            $("#editDeptLocation").empty();
            $.each(results.data, function () {
              $("#editDeptLocation").append(
                $("<option>", {
                  value: this.id,
                  text: this.name
                })
              );
            });

          },
          error: function (jqXHR, textStatus, errorThrown) {
            $("#editPersonnelModal .modal-title").replaceWith(
              "Error retrieving data"
            );
          }
        });


      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    });

  })


  $("#editDepartmentForm").on("submit", function (e) {
    let depid=deptidfor;
    let depname= $('#editDepartment').val();
    let locaid= $("#editDeptLocation").val();
    //console.log(depid+depname+locaid)
$.ajax({
    url: "libs/php/updateDept.php",
    type: "POST",
    dataType: "json",
    data: {  
        name: depname,
        locid: locaid,
        did: depid
    },
    beforeSend: function () {
        $("#loadingSpinner").show();
    },
    success: function (result) {
        //console.log(result.status.code);
        $("#editDepartmentForm").hide();
        $("#spine1").show().delay(1000).fadeOut('slow', function() {
          
          $("#editDepartmentForm").show();
      });
      refreshdept();
      
    },
    error: function (jqXHR, textStatus, errorThrown) {
        $("#editPersonnelModal .modal-title").text("Error retrieving data");
        //console.log(textStatus);
       // console.log(errorThrown);
    },
    complete: function () {
        $("#loadingSpinner").hide();
  

    }
});
e.preventDefault();


  })



  
  $("#editPersonnelModal").on("show.bs.modal", function (e) {
    $("#editPersonnelForm").show();
    
    $.ajax({
      url:
        "libs/php/getPersonnelByID.php",
      type: "POST",
      dataType: "json",
      data: {
        // Retrieve the data-id attribute from the calling button
        // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
        // for the non-jQuery JavaScript alternative
        id: $(e.relatedTarget).attr("data-id") 
      },
      success: function (result) {
        var resultCode = result.status.code;
  
        if (resultCode == 200) {
          
          // Update the hidden input with the employee id so that
          // it can be referenced when the form is submitted
  
          $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);
  
          $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
          $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
          $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
          $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);
  
          $("#editPersonnelDepartment").html("");
  
          $.each(result.data.department, function () {
            $("#editPersonnelDepartment").append(
              $("<option>", {
                value: this.id,
                text: this.name
              })
            );
          });
  
          $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);
          
        } else {
          $("#editPersonnelModal .modal-title").replaceWith(
            "Error retrieving data"
          );
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#editPersonnelModal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    });
  });
  
  // Executes when the form button with type="submit" is clicked
  
  $("#editPersonnelForm").on("submit", function (e) {
        let peid= $("#editPersonnelEmployeeID").val();
        let finame=$("#editPersonnelFirstName").val();
        let laname=$("#editPersonnelLastName").val();
        let jotitle=$("#editPersonnelJobTitle").val();
        let emadr=$("#editPersonnelEmailAddress").val();
        let pedept= $("#editPersonnelDepartment").val();

        //console.log(peid + finame + laname + jotitle + emadr + pedept);
    $.ajax({
        url: "libs/php/upadatePerson.php",
        type: "POST",
        dataType: "json",
        data: {
            fname: finame,
            lname: laname,
            jtitle: jotitle,
            eadr: emadr,
            pdept: pedept,
            pid: peid
        },
        beforeSend: function () {
            $("#loadingSpinner").show();
        },
        success: function (result) {
            //console.log(result.status.code);
            $("#editPersonnelForm").hide();
            $("#spine").show().delay(1000).fadeOut('slow', function() {
              
              $("#editPersonnelForm").show();
          });
        
          refreshperson();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editPersonnelModal .modal-title").text("Error retrieving data");
            //console.log(textStatus);
           // console.log(errorThrown);
        },
        complete: function () {
            $("#loadingSpinner").hide();
      

        }
    });

/*
 $('#preloader').delay(2000).fadeOut('slow', function() {
             
                $(this).remove();
            });
*/
        
        
    // Executes when the form button with type="submit" is clicked
    // stop the default browser behviour
  
    e.preventDefault();
  
    // AJAX call to save form data
    
  });

 
  $(window).on('load', function() {
  
         if ($('#preloader').length) {
            
            $('#preloader').delay(1000).fadeOut('slow', function() {
             
                $(this).remove();
            });
        }
       
    
  })
  
})
