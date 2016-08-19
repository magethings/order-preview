var orderpreview = Class.create(
    {
        initialize : function()
        {
            if(this.checkGrid()) {
                initPreview
            }
        },

        checkGrid: function ()
        {
            if($$('#sales_order_grid_table').size() > 0)
                return true;
        },

        initPreview: function () {
            $('sales_order_grid_table').childElements()[2].childElements().each(function(tr){
                var orderIdTd = tr.childElements()[1],
                    orderIdText = orderIdTd.childNodes[0].textContent.trim(),
                    elem = new Element('div', { 'id': 'order-text-' + orderIdText }).update(orderIdText);
                elem.setStyle({position:'relative', textDecoration: 'underline', textDecorationStyle: 'dashed'});

                if($$('#order-text-'+orderIdText).size() == 0){
                    orderIdTd.update(elem);
                }


                if($$('#order-' + orderIdText).size() == 0){

                    var my_span = new Element('span', { 'id': 'tooltip-' + orderIdText }).update("Order Info");

                    my_span.setStyle({display: 'none'});

                    orderIdTd.appendChild(my_span);

                }

                //event on mouse over
                $$('#order-text-' + orderIdText).invoke('observe', 'mouseover', function(event) {
                    $('tooltip-' + orderIdText).show();
                })

                $$('#order-text-' + orderIdText).invoke('observe', 'mouseout', function(event) {
                    $('tooltip-' + orderIdText).hide();
                })

            })
        }
    });

document.observe('dom:loaded', function() {
    new orderpreview();
});