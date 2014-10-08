$('a[role=tab]').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})