var inventoryDB = new PouchDB('inventory');
var remoteCouch = new PouchDB ('http://descension.me/couch/inventory');
destroy();
addInventoryItem("test", "1", true, "weapon", "dummy stats", "dummy bonus stats");
showInventoryItems();

function destroy() {
        inventoryDB.destroy().then(function () {
+        return remoteCouch.destroy();
+    }).then(function () {
          console.log('after destroy()');
        }).catch(function (err) {
          console.log('destroy err=' + err);
        });
      }

function addInventoryItem(title, tier, store, type, stats, bonus)
        {
        var item = {
                _id: new Date().toISOString(),
                title: title,
                tier: tier,
                store: store,
                type: type,
                stats: stats,
                bonus: bonus
                };
        inventoryDB.put(item, function callback(err, result){
                if (!err) {
                        console.log('Item successfully added!');
                        }
                      });
              }
      function showInventoryItems(){
              inventoryDB.allDocs({include_docs: true, descending: true}, function(err, doc) {
                      redrawInventoryUI(doc.rows);
                      });
              }
      
      inventoryDB.changes({
              since: 'now',
              live: true
              }).on('change', showInventoryItems);
              
function redrawInventoryUI (rows) {
        var bag = document.getElementById('unequipped-box');
        var weapon = document.getElementById('weapon-box');
        var armor = document.getElementById('armor-box');
        var offhand = document.getElementById('offhand-box');
        var accessory = document.getElementById('unequipped-box');
        
        rows.forEach(function(item){
           if (inventoryContains(item, "unequipped-box")){
                   return;
           } else if (inventoryContains(item, "weapon-box"))
           {
                return;
           } else if (inventoryContains(item, "armor-box")){
                return;
           } else if (inventoryContains(item, "accessory-box")){
                return;
           } else if (inventoryContains(item, "offhand-box")){
                return;
           } else {
                   addItem(item, "unequipped-box");
           }
           });
        }
        
function inventoryContains(item, id){
        var box = document.getElementById(id).childNodes;
        for (var li in box){
                if (box[li].id = item._id){
                        return true;
                }
        }
        return false;
}
function addItem(item, id){
        var newItem = document.createElement('li');
        newItem.className = "item";
        jQuery.data(newItem, "id", item._id);
        jQuery.data(newItem, "title", item.title);
        jQuery.data(newItem, "store", item.store);
        jQuery.data(newItem, "type", item.type);
        jQuery.data(newItem, "stats", item.stats);
        jQuery.data(newItem, "bonus", item.bonus);
        newItem.title = "<b>" + item.title + "</b><br><br>" + item.stats + "<br><br><b>Enchantments</b><br><br>";
        newItem.appendChild(document.createTextNode(item.title));
        document.getElementById(id).appendChild(newItem);
}
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
