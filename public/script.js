
var userListData = [];
$(document).ready(function(){
	$("#fred").click(function(){
	var val1 = $("#val1").val();
	var val2 = $("#val2").val();
	var search = $("#search").val();
	
	alert(val1+'***'+val2);
	})
	
	$('.modif_u').click(function(){
		
	var val_id = $(this).attr('rel');
	var parameters = { search: $(this).attr('rel') };
		   $.get( '/voirUtilisateur',parameters, function(data) {
		   $('#results').html(data);
		   $("#myModal").html(data);
		   alert(data);
	});
	})
	$('#data_test').DataTable({
                responsive: true
    });	
	
	$('#data_user').DataTable({
                responsive: true
    });
	
	//populateTable();
	$('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
	
	$('td a.linkdeleteuser').on('click',function(){
		var res_id = $(this).attr('rel');
		
		deleteUser(res_id);
	});
	var url_modif =  '/modifierUtilisateur';
	$("#div_modif").load(url_modif)
})




// Show User Info
function showUserInfo(event) {
    event.preventDefault();
    var thisUserName = $(this).attr('rel');
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
    var thisUserObject = userListData[arrayPosition];
    $('#userInfolstname').text(thisUserObject.lastname);
    $('#userInfonumber').text(thisUserObject.phone_number);
    $('#userInfoadresse').text(thisUserObject.adresse);
    $('#userInfomail').text(thisUserObject.email);
    $('#userInfoname').text(thisUserObject.name);
    $('#userInfousername').text(thisUserObject.username);
    $('#userInfopassword').text(thisUserObject.password);

};


function deleteUser(vals) {
    if (confirm('Voulez vous supprimer l\'utilisateur qui a pour id '+vals+'?')) {
        $.ajax({
            type: 'DELETE',
            url: '/deleteuser/'+vals,
			success : function(response){
				 if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
			window.location.href = '/userlist';
			}
        });
    }
    else {
        return false;
    }
};