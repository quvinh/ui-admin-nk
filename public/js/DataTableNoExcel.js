/* eslint-disable no-undef */
$(function () {
    $.fn.dataTable.ext.errMode = 'none';
    $("#example1").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
    }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
    
});