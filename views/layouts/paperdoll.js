//toggles between tabs
jQuery(document).ready(function() {
    jQuery('.tabs .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');

        // Show/Hide Tabs
        jQuery('.tabs ' + currentAttrValue).show().siblings().hide();

        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });
});
//
$(function() {
         $( ".unequipped" ).sortable({
           connectWith: ".equipped"
         }).disableSelection();
         $( ".equipped" ).sortable({
           connectWith: ".unequipped"
         }).disableSelection();
         $( "#weapon-box" ).on( "sortreceive", function(event, ui) {
           if($(ui.item).text().indexOf("Weapon") == -1)
            {
              $(ui.sender).sortable('cancel');
            }
            else{
              var elementList = document.querySelectorAll("#weapon-box li");
              if(elementList.length > 1){
                for (i = 1; i < elementList.length; i++)
                  {
                    document.querySelector("#weapon-box").removeChild(elementList[i]);
                    document.querySelector("#unequipped-box").appendChild(elementList[i]);
                  }
              }

            if($(ui.item).text().indexOf("2-Hand") != -1)
             {
               if(document.querySelector("#offhand-box li")){
                 var element = document.querySelector("#offhand-box li");
                 document.querySelector("#offhand-box").removeChild(element);
                 document.querySelector("#unequipped-box").appendChild(element);
               }
             }
           }
         });
      });
  $(function () {
        $(document).tooltip({
            content: function () {
                return $(this).prop('title');
            }
        });
    });
$(function(){
  var parsetest = ["Tier-1-Thorned-Crystal-Barrier;4;s;o;0/2/0;2/1/0/0/0/0/0;thorns:1;date", "2"];
  for (var entry in parsetest){
    var item = parsetest[entry].split(';');
    alert(item);
  }


});
