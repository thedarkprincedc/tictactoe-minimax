(function(){
    function onItemBlockClicked(event){

    }
    $.fn.tictactoe = function(options){
        options = $.extend({}, $.fn.tictactoe.defaults, options || {});
        var deferred = $.Deferred();
        $(".item-block").click(onItemBlockClicked);

        return deferred.promise();
    }
    $.fn.colorSwatches.defaults = {
        url: null
    };
})();