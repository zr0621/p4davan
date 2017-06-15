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

  var download_fw=function (fw_pid, fw_ver, dld_type) {
    var base_url = get_base_url(cur_mirror_id);
    var file_ext = '';
    switch(dld_type) {
      case 'fw':
      file_ext = '.trx';
      break;
      case 'md5sum':
      file_ext = '.trx.md5sum.txt';
      break;
      case 'sign':
      file_ext = '.trx.sign.txt';
      break;
      case 'changelog':
      file_ext = '.changelog.txt';
      break;
    }
    var url = base_url + "/" + fw_pid + "/" + fw_ver + file_ext;
    var link=document.createElement('a');
    link.style.display = "none";
    document.body.appendChild(link);
    link.href=url ;
    link.download = url;
    link.click();
  };
  var d1_ver = '';
  var y1_ver = '';
  var k2_ver = '';
  var get_rom_release=function(product_id) {
    $.get('/firmware/release/' + product_id + '.txt', function(version){
      $('#fw_ver').val(version.replace(product_id+'_', ''));
      $btn = $('#download_fw');
      $md5 = $('#download_md5sum');
      $sign = $('#download_sign');
      $changelog = $('#download_changelog');
      $btn.text(product_id);
      $btn.attr('title', version);
      $btn.unbind('click');
      $md5.unbind('click');
      $sign.unbind('click');
      $changelog.unbind('click');
      $btn.bind('click', function(){ download_fw(product_id, version, 'fw'); });
      $md5.bind('click', function(){ download_fw(product_id, version, 'md5sum'); });
      $sign.bind('click', function(){ download_fw(product_id, version, 'sign'); });
      $changelog.bind('click', function(){ download_fw(product_id, version, 'changelog'); });
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
