/* eslint-disable no-undef */
$(function () {
    $.fn.dataTable.ext.errMode = 'none';
    $("#shelf").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#shelf_wrapper .col-md-6:eq(0)');
    $("#manager").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#manager_wrapper .col-md-6:eq(0)');
    $("#item").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#item_wrapper .col-md-6:eq(0)');
    $("#supplier").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#supplier_wrapper .col-md-6:eq(0)');
    $("#inventory").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#supplier_wrapper .col-md-6:eq(0)');
    $("#history-inventory").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#supplier_wrapper .col-md-6:eq(0)');
    $("#list-item").DataTable({
        "responsive": true, "lengthChange": false, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
    }).buttons().container().appendTo('#supplier_wrapper .col-md-6:eq(0)');
    $("#item").on('click', '.btnDelete', function () {
        $(this).closest('tr').remove();
    });


});