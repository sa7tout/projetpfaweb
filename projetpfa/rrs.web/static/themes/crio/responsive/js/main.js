J(document).ready(function() {
	/*Tooltip*/
	J('.info-bulle').tooltip();
	/*Tabs*/
	J('.nav-tabs').tab();
    J('.nav-tabs a').click(function (e) {
		e.preventDefault();
  	  J(this).tab('show');
    })	
	
	/*Message selection tableau*/
	J('table.check-group .checkall').popover({ 
		html : true,
		//placement : 'top',
		content: function() {
		  return J('#popover_content_wrapper').html();
		}
	});	
	
	/*Check all*/
    J('.checkall').click(function() {
        var JcheckBoxes = J(this).parents('.check-group').find('td input[type=checkbox]');
		//JcheckBoxes.prop('checked', J(this).is(':checked') ? true : false);	
		if (J(this).is(':checked')) {
			JcheckBoxes.prop('checked',true);
			J('.popover').popover('show');
			}
		else {
			JcheckBoxes.prop('checked',false);
			J('.popover').popover('hide');
		}
    });
	/*Modal body resize on modal open*/
	J('.modal').on('shown', function() {
		rescale();
	});
	
	/*Alert fadeIn on open*/
	J('.alert:visible').hide().fadeIn(500);
	
	//Display alt value as a title on mouseover	
    J('a').hover(function() {
		if (J(this).find('i').attr('aria-label')!='') {
			var title = J(this).find('i').attr('aria-label');
			J(this).attr('title',title);
		}
    }, function() {
        J(this).removeAttr('title');
    });
	
});

//----------------------Fonction Add back to top link---------------------//
J(function() {
	J(window).scroll(function() {
		if(J(this).scrollTop() != 0) {
			J('#toTop').fadeIn();	
		} else {
			J('#toTop').fadeOut();
		}
	});
 
	J('#toTop').click(function() {
		J('body,html').animate({scrollTop:0},400);
	});	
});


//----------------------Fonction Light Javascript Table Filter---------------------//
(function(document) {
	'use strict';

	var LightTableFilter = (function(Arr) {

		var _input;

		function _onInputEvent(e) {
			_input = e.target;
			var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
			Arr.forEach.call(tables, function(table) {
				Arr.forEach.call(table.tBodies, function(tbody) {
					Arr.forEach.call(tbody.rows, _filter);
				});
			});
		}

		function _filter(row) {
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
			row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
		}

		return {
			init: function() {
				var inputs = document.getElementsByClassName('light-table-filter');
				Arr.forEach.call(inputs, function(input) {
					input.oninput = _onInputEvent;
				});
			}
		};
	})(Array.prototype);

	document.addEventListener('readystatechange', function() {
		if (document.readyState === 'complete') {
			LightTableFilter.init();
		}
	});

})(document);

//----------------------Fonction navigation previous/next tab---------------------//
var Jtabs = J('.nav-tabs li');
J('.prev-tab').on('click', function() {
    Jtabs.filter('.active').prev('li').find('a[data-toggle="tab"]').tab('show');
});
J('.next-tab').on('click', function() {
    Jtabs.filter('.active').next('li').find('a[data-toggle="tab"]').tab('show');
	J('html, body').animate({scrollTop:0}, 'slow');
});


/*Function resize Modal body*/
function rescale(){
    var size = {width: J(window).width() , height: J(window).height() }
    var offset = 20
    var offsetBody = 150
    J('#myModal').css('height', size.height - offset );
    J('.modal-body').css('height', size.height - (offset + offsetBody ));
    J('#myModal').css('top', 0);
}
J(window).bind("resize", rescale);












