$(function(){
  var all_products = new Array("NEWIFI-D1", "NEWIFI-Y1", "PSG1218-K2", "PSG1218-256M", "YOUKU-L1");
  var base_url_mirror = ["http://router.mirror1.80x86.io:8088",
  "https://github.com/ihacklog/p4davan-fw/raw/master/down/rom",
  "http://files.80x86.io/router/rom"
];
var cur_mirror_id = 0;
var cur_device_id = "NEWIFI-D1";
var get_base_url = function(mirror_id) {
    var id = parseInt(mirror_id);
    var base_url = (id >= 0 && id <3) ? base_url_mirror[id] : base_url_mirror[0];
    return base_url;
};

  var download_fw=function (fw_pid, fw_ver) {
    var base_url = get_base_url(cur_mirror_id);
    var url = base_url + "/" + fw_pid + "/" + fw_ver + ".trx";
    var link=document.createElement('a');
    link.style.display = "none";
    document.body.appendChild(link);
    link.href=url ;
    link.click();
  };
  var d1_ver = '';
  var y1_ver = '';
  var k2_ver = '';
  var get_rom_release=function(product_id) {
    $.get('/firmware/release/' + product_id + '.txt', function(version){
      $btn = $('#download_fw');
      $btn.text(product_id);
      $('#fw_ver').val(version.replace(product_id+'_', ''));
      $btn.attr('title', version);
      $btn.bind('click', function(){
        download_fw(product_id, version);
      });
    });
  }

  $('#sel_mirror').change(function(e){
    //console.log($(this).val());
    cur_mirror_id = $(this).val();
  $('#sel_device').trigger('change');
  });
  $('#sel_mirror').trigger('change');


$('#sel_device').change(function(e){
    //console.log($(this).val());
    cur_device_id = $(this).val();
    get_rom_release(cur_device_id);
  });
  $('#sel_device').trigger('change');
});
