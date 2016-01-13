jQuery(document).ready( function($){
	$.fn.evenElements = function() {	
		var heights  = [];
		
		$(this).removeAttr("style").height('auto');
		
		this.each( function() {
			if($(this).css('transition-duration')){
				transition_duration = (typeof transition_duration == "undefined" ? $(this).css('transition-duration') : transition_duration);
				$(this).css('transition-duration', '0s');
			}
			
			var height = $(this).height('auto').outerHeight();
			
			heights.push(height);
		});	
		
		var largest = Math.max.apply(Math, heights);
	
		return this.each(function() {
            $(this).height(largest);
				
			$(this).css('transition-duration', transition_duration);
        });
	}
	
	jQuery.fn.extend({
	  	renameAttr: function( name, newName, removeData ) {
			var val;
			return this.each(function() {
			  	val = jQuery.attr( this, name );
		  		jQuery.attr( this, newName, val );
		  		jQuery.removeAttr( this, name );
		  		// remove original data
		  		if (removeData !== false){
					jQuery.removeData( this, name.replace('data-','') );
		  		}
			});
	  	}
	});
	
	function debouncer( func , timeout ) {
	   var timeoutID , timeout = timeout || 200;
	   return function () {
	      var scope = this , args = arguments;
	      clearTimeout( timeoutID );
	      timeoutID = setTimeout( function () {
	          func.apply( scope , Array.prototype.slice.call( args ) );
	      } , timeout );
	   }
	}
			
	function commaSeparateNumber(val){
		while (/(\d+)(\d{3})/.test(val.toString())){
		  val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		}
		return val;
	}
 
 
	
	 
	$(".portfolioFilter li a").click( function(e){
		e.preventDefault();
		$(".portfolioFilter li.active").removeClass("active");
		$(this).parent().addClass('active');
	});
	
 
 
 
	
	// portfolio sorting
	if($(".portfolioContainer").length){
		$(".portfolioContainer").mixItUp({
			callbacks: {
				onMixLoad: function(state){
					//$(".portfolioContainer .mix").each( function(i, n){ $(this).css("float", "none"); });
				}/*,
				onMixStart: function(state){
					$(".portfolioContainer .mix").each( function(i, n){ $(this).height($(".portfolioContainer .mix").height()); });
				}*/
			}
		});
	}
	
	 

 
	 
	if($(".portfolioContainer").length){
		//$(".portfolioContainer > div").evenElements();
	}
	
	   
	
});
	
 
	
 