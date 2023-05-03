
  $(() => {
    $(".product-selector-wrapper.Size select option").each(function(){
        var option_txt = $(this).text();
        var text_length = option_txt.length;
        var right_txt = option_txt.slice(-8) + '"';
        var left_txt = option_txt.substr(0, text_length-8);
        $(this).text("").append(`<p style = 'text-align:left;' class = 'size_left'>${left_txt}</p>`);
        $(this).append(`<p style = 'text-align:right;' class = 'size_val'>${right_txt}</p>`)
    })
})