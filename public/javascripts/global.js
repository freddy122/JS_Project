// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();
	$('#data_user table tbody').on('click', 'td a.linkdeleteuser', deleteUser);
	$('.linkdeleteuser').click(function(){
		alert('aaaa')
	})
});

// Functions =============================================================

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON('/users/userlist', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

// Delete User
function deleteUser(event) {
    event.preventDefault();
    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');
    // Check and make sure the user confirmed
    if (confirmation === true) {
        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deleteuser/' + $(this).attr('rel')
        }).done(function( response ) {
            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }
            // Update the table
            populateTable();
        });
    }
    else {
        // If they said no to the confirm, do nothing
        return false;
    }
};
