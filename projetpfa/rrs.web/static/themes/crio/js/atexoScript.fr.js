var name = navigator.appName ;
var version = navigator.appVersion;
if (name == 'Microsoft Internet Explorer') {
	id = version.indexOf('MSIE');
	version = version.substring(id+5,id+9);
}

function dateBandeau(value, offset)
{
    date=new Date();
    date.setTime( (value/1000 + date.getTimezoneOffset()*60 + new Number(offset)) * 1000);
    
    var jours=Array("Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi");
    var mois=Array("Janv.", "Fév.", "Mars.","Avril.","Mai.","Juin.","Juil.","Août","Sept.", "Oct.", "Nov.", "Dec.");
    
    nomJour=jours[date.getDay()];
    jour=date.getDate();
    nomMois=mois[date.getMonth()];
    annee=date.getFullYear();
    heures=date.getHours();
    minute=date.getMinutes();
    seconde=date.getSeconds();
    
    if(seconde<=9) {
    	seconde="0"+seconde;
    }    
    if(minute<=9) {
    	minute="0"+minute;
    }    
    if(heures<=9) {
    	heures="0"+heures;
    }
    
    if(document.getElementById("ctl0_bandeauAgent_dateAujourdhui")) {
		document.getElementById("ctl0_bandeauAgent_dateAujourdhui").innerHTML=nomJour+" "+jour+" "+nomMois+" "+annee+" "+heures+":"+minute;
	} else {
		document.getElementById("ctl0_bandeauEntreprise_dateAujourdhui").innerHTML=nomJour+" "+jour+" "+nomMois+" "+annee+" "+heures+":"+minute;
	}
	
	time=eval(value+"+1000");
	
	setTimeout("dateBandeau('"+time+"', '"+offset+"')",1000);
}

function isDate(dtStr)
{
	 var dtCh ="/";
	 var space = " ";
	 var point = ":";
	 var daysInMonth = DaysArray(12);
	 var pos1=dtStr.indexOf(dtCh);
	 var pos2=dtStr.indexOf(dtCh,pos1+1);
	 var pos3=dtStr.indexOf(space,pos2+1);
	 var pos4=dtStr.indexOf(point,pos2+1);
	 var strDay=dtStr.substring(0,pos1);
	 var strMonth=dtStr.substring(pos1+1,pos2);
	 var strYear=dtStr.substring(pos2+1, pos3);
	 var strHour=dtStr.substring(pos3+1, pos4);
	 var strMin=dtStr.substring(pos4+1);
	  strYr=strYear;
	 if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1);
	 if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1);
	 
	 for (var i = 1; i <= 3; i++) 
	 {
	  if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	 }
	 
	 var month=parseInt(strMonth);
	 var day=parseInt(strDay);
	 var year=parseInt(strYr);
	 var hour = parseInt(strHour);
	 var minute = parseInt(strMin);
	
	 if (pos1==-1 || pos2==-1 || pos3==-1 || pos4==-1)
	 {
	  	return false
	 }
	 if (strMonth.length<1 || month<1 || month>12)
	 {
	  	return false
	 }
	 if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month])
	 {
	  	return false
	 }
	 if (strYear.length != 4 || year==0 || year<1900 || year>3000)
	 {
	  	return false
	 }
	 if (strHour.length != 2 ||  hour<0 || hour>23)
	 {
	  	return false
	 }
	 if (strMin.length != 2 ||  minute<0 || minute>59)
	 {
	  	return false
	 }
	 if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(stripCharsInBag(stripCharsInBag(dtStr,dtCh),space), point))==false)
	 {
	  return false
	 }
	 return true
}

function daysInFebruary (year)
{
	// February has 29 days in any year evenly divisible by four,
    // EXCEPT for centurial years which are not also divisible by 400.
    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 ==0))) ? 29 : 28 );
}

//Fonction retournant le nombre de jour pour un mois donn�
function DaysArray(n) 
{
	for (var i = 1; i <= n; i++) 
	{
		this[i] = 31
		if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
		if (i==2) {this[i] = 29}
	}
	return this
}

//Fonction de v�rification si caract�re entier  
function isInteger(s)
{
	var i;
    for (i = 0; i < s.length; i++)
    {
		// Check that current character is number.
        var c = s.charAt(i);
        if (((c < "0") || (c > "9"))) return false;
	}
    // All characters are numbers.
    return true;
}

//Fonction de v�rification d'une sous-cha�ne dans une cha�ne
function stripCharsInBag(s, bag)
{
	var i;
    var returnString = "";
    // Search through string's characters one by one.
    // If character is not in bag, append to returnString.
	for (i = 0; i < s.length; i++)
	{
		var c = s.charAt(i);
        if (bag.indexOf(c) == -1) returnString += c;
    }
	return returnString;
}

function validateDateFormat(){

	dateConnu = document.getElementById("ctl0_CONTENU_PAGE_acteNaissance_dateNaissanceNonConnu").checked;
	if(!dateConnu){
		jour = document.getElementById("dateNaissance_jj").value;
		mois = document.getElementById("dateNaissance_mm").value;
		annee = document.getElementById("dateNaissance_aa").value;
		dtStr = jour + "/" + mois + "/" + annee + " 00:00";
		return isDate(dtStr);
	}
	return true;
}

function popUpAutoPosition () {
var pageHeight = document.getElementById('container').offsetHeight;
var pageWidth = document.getElementById('container').offsetWidth;

var name = navigator.appName ;
var version = navigator.appVersion;

var autoLeft = (screen.availWidth-pageWidth)/2;
var autoTop = (screen.availHeight-pageHeight)/2;

	/*if popup content higher than screen height*/
	if (pageHeight > screen.availHeight) {
		/*if IE*/
		if (name == 'Microsoft Internet Explorer') {
			id = version.indexOf('MSIE');
			version = version.substring(id+5,id+9);
			/*if IE 7*/
			if ( version == '7.0;') {
				//alert(version);
				window.resizeTo(pageWidth+50,screen.availHeight-120);
				window.moveTo(autoLeft-20,50); 
			}
			/*if other IE version*/
			else {
			window.resizeTo(pageWidth+50,screen.availHeight-100);
			window.moveTo(autoLeft,50);    
			}
		}
		/*if other navitor*/
		else {
		window.resizeTo(pageWidth+50,screen.availHeight-120);
		window.moveTo(autoLeft,50);    
		}
	}
	/*else if content smaller than screen height */
	else {
		/*if IE*/
		if (name == 'Microsoft Internet Explorer') {
			id = version.indexOf('MSIE');
			version = version.substring(id+5,id+9);
			/*if IE 7*/
			if ( version == '7.0;') {
				//alert(version);
				window.resizeTo(pageWidth+50,pageHeight+120);
				window.moveTo(autoLeft-20,autoTop); 
			}
			/*if other IE version*/
			else {
			window.resizeTo(pageWidth+50,pageHeight+80);
			window.moveTo(autoLeft,autoTop);    
			}
		}
		/*if other navitor*/
		else {
		window.resizeTo(pageWidth+50,pageHeight+120);
		window.moveTo(autoLeft,autoTop);    
		}
		
		
	}
	
}

var newWin = null;
function popUp(strURL,strScrollbars) {
	/*if (newWin !== null) {
		if(!newWin.closed) {
		newWin.close();
		}
	}*/
	var strOptions="";
	strOptions="toolbar=no,menubar=no,scrollbars="+strScrollbars+",resizable,location=no";
	newWin = window.open(strURL, 'newWin', strOptions);
	newWin.focus();
}
	function dateValidator(sender, param){
		 var idChamp = sender.control.id;
		 VAL = document.getElementById(idChamp).value;
		 if (VAL != '' && !isValidDate(parseInt(VAL.split('/')[0], 10), parseInt(VAL.split('/')[1], 10), parseInt(VAL.split('/')[2], 10)))
		 {
		  	return false;
		 }else{
		  	return true;
		 }
	}
    function typeCourrierValidator(){
        var i=1 ;
        while (object = document.getElementById("ctl0_CONTENU_PAGE_DemandeComp_listeType_ctl"+i+"_courrier"))
        {
            if (object.checked)
            {
                return true;
            }
            i++;
       }
        return false;

    }
	function validateFileUpload(sender, param){
		
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_ajoutReponse").checked){
			if(document.getElementById('ctl0_CONTENU_PAGE_panelTraitement_idFile').value == '1'){
				  return true;
			 } else {
			 	return false;
			 }
		 }
		  return true;
	}


	function arrayUnset(array, value){
		if(inArray(array,value))
			array.splice(array.indexOf(value), 1);
	}


	function ReloadPopup(){
		 if(document.all) { //IE
			  	document.all.ctl0_fromPopUp.submit();
			 } else {
				fromGlobal = document.getElementById('ctl0_fromPopUp');
			  	fromGlobal.submit();
			 }
		
	}
	
function inArray(array, p_val) {
    var l = array.length;
    for(var i = 0; i < l; i++) {
        if(array[i] == p_val) {
            return true;
        }
    }
    return false;
}




function clickClavier(value)
{
	 fromPopUp = document.getElementById('ctl0_fromPopUp');
	 fromPopUp.method= "get";
	 fromPopUp.text1.value = fromPopUp.text1.value + value;

}
function writeToInputOpener(input,button)
{
	fromPopUp = document.getElementById('ctl0_fromPopUp');
	inputObj = window.opener.document.getElementById(input);
	buttonObj = window.opener.document.getElementById(button);
	 fromPopUp.method= "post";
	 inputObj.value =  fromPopUp.text1.value;
	 buttonObj.click();
	 window.close();

}


function initialiser_map(){
        
      var geocoder = new google.maps.Geocoder();
      var pays ="Maroc";
     
      switch(pays){
      	case "France": var latlng = new google.maps.LatLng(48.85, 2.35);break;
		case "Maroc" : var latlng = new google.maps.LatLng(31.63,-8.00);break;
		default : var latlng = new google.maps.LatLng(31.63,-8.00);break;
      }
      
      
      var ctaLayer = new google.maps.KmlLayer('http://vps58424.ovh.net:90/lt_reclamation_v3/atexo.demande/ressources/frontiere_maroc.kml');
      
	  
	  // OPTION : ELIMINER LES NOMS DES PAYS ET LES FRONTIERES ADMINISTRATIVE
	  var stylez = [
        {
          featureType: "administrative.country",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [
            { visibility: "off" }
          ]
        }
        	      ];
		
	  // Create a new StyledMapType object, passing it the array of styles,
	  // as well as the name to be displayed on the map type control.
      var noPOIMapType = new google.maps.StyledMapType(stylez, {name: "Plan"});
      
      
      
       //********************************************************************************************//
      //*************************************  CARTE **********************************************//       
     //********************************************************************************************// 

      var options = {
		      zoom: 6,
              zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
              mapTypeControlOptions: {
			      mapTypeIds: ['satellite', 'no_poi'],
                  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
			    }
        };

         var carte = new google.maps.Map(document.getElementById("carte"), options);
         carte.mapTypes.set('no_poi', noPOIMapType);
         carte.setMapTypeId('no_poi');
         carte.setTilt(45);
      
      
          //********************************************************************************************//
         //*************************************  MARQUEUR ********************************************//       
        //********************************************************************************************//
         
      var marker = new google.maps.Marker({
                    map: carte,
                    draggable:true,
                    title:'Déplacer ce marqueur sur le lieu de la demande'
                    });
                    
       //********************************************************************************************//
      //*************************************  GEOCODING SERVICE ***********************************//       
     //********************************************************************************************//
	suffix = "ctl0_CONTENU_PAGE_DemandeComp_";
	win = window;
	if(window.opener) {
		win = window.opener;
	}
     if(!win.document.getElementById("ctl0_CONTENU_PAGE_DemandeComp_lbl")) {
			suffix = "ctl0_CONTENU_PAGE_creationdemandeComp_DemandeComp_";
		}
      var address = win.document.getElementById(suffix+"lbl").value;
      if(address =='')
      {
      	address = pays;
      }
      
      geocoder.geocode( { 'address': address}, function(results, status) {
           if (status == google.maps.GeocoderStatus.OK) {
               carte.setCenter(results[0].geometry.location);
               //setTimeout(carte.setZoom(12),3000);
                    carte.setZoom(8);
                    marker.setPosition(results[0].geometry.location);
                    
                    if(win.document.getElementById(suffix+"lblLat").value ==0 && win.document.getElementById(suffix+"lblLat").value ==0)
                    {
                     win.document.getElementById(suffix+"lblLat").value =latlng.lat();
                     win.document.getElementById(suffix+"lblLong").value=latlng.lng();
                     }else{
                         var latLngDeMonExChoix=new google.maps.LatLng(win.document.getElementById(suffix+"lblLat").value,win.document.getElementById(suffix+"lblLong").value);
                         carte.setCenter(latLngDeMonExChoix);
                         marker.setPosition(latLngDeMonExChoix);
                     }
                  
             } else {
               if(pays =='Maroc')
               {
	              ctaLayer.setMap(carte);
               }
               carte.setCenter(latlng);
               marker.setPosition(latlng);
               carte.setZoom(8);
            }
      });
      
      
      //********************************************************************************************//
     //*************************************  EVENTS **********************************************//       
    //********************************************************************************************//      
          // Lorsqu on bouge le marqueur on intercèpte sa position         
           google.maps.event.addListener(marker, 'dragend', function(event) {
             win.document.getElementById(suffix+"lblLat").value  = event.latLng.lat();
             win.document.getElementById(suffix+"lblLong").value = event.latLng.lng();
            });
            
            
            // Changer le type de la carte entraîne le dessin de la frontière Est du Maroc 
           if(pays =='Maroc')
           {
	           google.maps.event.addListener(carte, 'maptypeid_changed', function(event) {
	                  var mapType = carte.getMapTypeId();
	                  if(mapType=="satellite"){
	                    if(carte.getZoom() <=5 ) {ctaLayer.setMap(carte); }
	                  }else{
	                    ctaLayer.setMap(carte);
	                  }
	            });
				<!--  // Forcer le zoom min à un seuil de 4 -->
				google.maps.event.addListener(carte, 'zoom_changed', function() {
	                if(carte.getZoom() <=5 ) {ctaLayer.setMap(carte); }
				}); 
	        }



      } // FIN FUNCTION INTIALISATION DE LA MAP

      /* utiliser dans la popup détail demande .... */
        function initialiser_map2(lat,long){
        
	      var geocoder = new google.maps.Geocoder();
	      var latlng = new google.maps.LatLng(lat,long);
	      var ctaLayer = new google.maps.KmlLayer('http://demo.reclamation.gov.ma/index.php5?page=agent.Auth');
      
	     var noPOILabels = [
	     { 
	        featureType: "poi", 
	        elementType: "labels", 
	        stylers: [ { visibility: "off" } ] 
	  
	     }];
	     
	      // OPTION : ELIMINER LES NOMS DES PAYS ET LES FRONTIERES ADMINISTRATIVE
	  var stylez = [
        {
          featureType: "administrative.country",
          elementType: "labels",
          stylers: [
            { visibility: "off" }
          ]
        },{
          featureType: "administrative.country",
          elementType: "geometry",
          stylers: [
            { visibility: "off" }
          ]
        }
        	      ];
    
    // Create a new StyledMapType object, passing it the array of styles,
    // as well as the name to be displayed on the map type control.
      var noPOIMapType = new google.maps.StyledMapType(stylez, {name: "Plan"});
	      var options = {
	          zoom: 13,
              minZoom :5,
	          center: latlng,
	           zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
              mapTypeControlOptions: {
			      mapTypeIds: ['satellite', 'no_poi'],
                  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
			    }
	        };
	
         var carte = new google.maps.Map(document.getElementById("carte"), options);
         carte.mapTypes.set('no_poi', noPOIMapType);
         carte.setMapTypeId('no_poi');
         carte.setTilt(45);
         carte.setCenter(latlng);
         
          var marker2 = new google.maps.Marker({
           position:latlng , 
           map: carte,
           draggable:false,
           title:'le lieu de la demande'
           });
                    
         // Changer le type de la carte entraîne le dessin de la frontière Est du Maroc et cacher les 2 réctangles         
           google.maps.event.addListener(carte, 'maptypeid_changed', function(event) {
                  var mapType = carte.getMapTypeId();
               if(mapType=="satellite"){
                    //ctaLayer.setMap(carte);
                    if(carte.getZoom() <=5 ) {ctaLayer.setMap(carte); }
                   }else{
                    ctaLayer.setMap(null);
                   }
            });
            
            // Forcer le zoom min à un seuil de 4 
			google.maps.event.addListener(carte, 'zoom_changed', function() {
                if(carte.getZoom() <=5 ) {ctaLayer.setMap(carte); }
			});


            //google.maps.event.addDomListener(window, 'load', initialiser_map2);

            google.maps.event.addDomListener(window, "resize", function() {
            var center = carte.getCenter();
            google.maps.event.trigger(carte, "resize");
            carte.setCenter(center);
            });


            J('#modalRecapitulatif').on('shown', function () {
            google.maps.event.trigger(carte, "resize");
            });
			
      }
    
   
   /* création de la classe Point : elle fait réference à deux propriétés à savoir latitude et longitude
      la fonction latlng permet d'instancier et retourner l'objet latlng de la classe de LatLng de google maps
        */
   
   function Point(latitude,longitude,id,url,message) {
	   this.latitude  = latitude;
	   this.longitude = longitude;
       this.id = id;
       this.url = url;
       this.message = message;
	   
	    var latlng = function() { 
	        return new google.maps.LatLng(latitude,longitude);
	    } 
     
  }
   
   
 var Marqueurs;
	   var tabMarqueurs = new Array();
	   var infobulles =new Array();
	   var info;
       var carte;
       
    function initialiserRapport(arrayPoints,address){
        var zoom = 12;
        var geocoder = new google.maps.Geocoder();
        var pays ="Maroc";
      	switch(pays){
	      	case "France": var latlng = new google.maps.LatLng(48.85, 2.35);zoom = 5;break;
			case "Maroc" : var latlng = new google.maps.LatLng(31.63,-8.00);zoom = 5;break;
			default : var latlng = new google.maps.LatLng(31.63,-8.00);zoom = 12;break;
      	}
      
        var ctaLayer = new google.maps.KmlLayer('http://demo.reclamation.gov.ma/index.php5?page=agent.Auth');
      
       
        // OPTION : ELIMINER LES NOMS DES PAYS ET LES FRONTIERES ADMINISTRATIVE
		  var stylez = [
	        {
	          featureType: "administrative.country",
	          elementType: "labels",
	          stylers: [
	            { visibility: "off" }
	          ]
	        },{
	          featureType: "administrative.country",
	          elementType: "geometry",
	          stylers: [
	            { visibility: "off" }
	          ]
	        }
        	      ];
		
        var noPOIMapType = new google.maps.StyledMapType(stylez, {name: "Plan"});
       
        var options = {
            zoom: 5,
       		minZoom :3,
            zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
              mapTypeControlOptions: {
			      mapTypeIds: ['satellite', 'no_poi'],
                  style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
			    }
          };
  
        carte = new google.maps.Map(document.getElementById("carte"), options);
        carte.mapTypes.set('no_poi', noPOIMapType);
        carte.setMapTypeId('no_poi');
        carte.setTilt(45);
        
          geocoder.geocode( { 'address': address}, function(results, status) {
             if (status == google.maps.GeocoderStatus.OK) {
                 carte.setCenter(results[0].geometry.location);
                 if(address != pays){
                 	carte.setZoom(8);
                 }else{
                 	carte.setZoom(zoom);
                 }
                 
               } else {
	               if(pays =='Maroc')
	               {
		             // ctaLayer.setMap(carte);
	               }
                 	//carte.setCenter(latlng);
                 	carte.setZoom(4);
              }
            });
        
       		 var i =0;
			 var cursor ='';
			 if(arrayPoints[i].message != ''){
				cursor=  '<p><h1 id="firstHeading" class="firstHeading">Message :</h1>'+arrayPoints[i].message+'</p>'+'<p> Pour plus d\'infos : '+arrayPoints[i].url+'</p>';
			  }
              for(i=0; i < arrayPoints.length;i++){
                Marqueurs = new  google.maps.Marker({
                position : new google.maps.LatLng(arrayPoints[i].latitude,arrayPoints[i].longitude),//new google.maps.LatLng(point.latitude,point.longitude),
                map: carte,
                draggable : false,
                clickable:true,
                cursor: cursor,
                title : ''+arrayPoints[i].id
                });
                
              tabMarqueurs.push(Marqueurs);
              }
            
            var j=0;
            info = new google.maps.InfoWindow({
                            content: ''
                             });
            
            for(j=0;j < tabMarqueurs.length ; j++){
				if(tabMarqueurs[j].cursor != ''){
			     google.maps.event.addListener(tabMarqueurs[j], 'click',function(data){
                  carte.panTo(this.getPosition());
                  info.setContent(this.getCursor());
                  info.open(carte, this);
                 });
				}
           }
                  
            // Changer le type de la carte entraîne le dessin de la frontière Est du Maroc et cacher les 2 réctangles         
           google.maps.event.addListener(carte, 'maptypeid_changed', function(event) {
                  var mapType = carte.getMapTypeId();
               if(mapType=="satellite"){
                    if(carte.getZoom() <=5 ) {ctaLayer.setMap(carte); }
                   }else{
                    ctaLayer.setMap(carte);
                   }
            });
            
      }    

 function annulerSelection(){
	suffix = "ctl0_CONTENU_PAGE_DemandeComp_";
	if(!window.opener.document.getElementById("ctl0_CONTENU_PAGE_DemandeComp_lblLat")) {
		suffix = "ctl0_CONTENU_PAGE_creationdemandeComp_DemandeComp_";
	}
    window.opener.document.getElementById(suffix+"lblLat").value=0;
    window.opener.document.getElementById(suffix+"lblLong").value=0;
    window.close();
  }
  
  function validateEntite(){
  	var profil = document.getElementById("ctl0_CONTENU_PAGE_listeProfils").value;
  	var idProfilResponsableCentral = 5;
  	if(profil!=idProfilResponsableCentral){
  		var entite = document.getElementById("ctl0_CONTENU_PAGE_listeEntites").value; 
  		if(!entite){
  			return false;
  		}else{
  			return true;
  		}
  	}
  	return true;
  }
  
    function serverValidate(){
		suffix = "ctl0_CONTENU_PAGE_DemandeComp_";
		if(!window.opener.document.getElementById("ctl0_CONTENU_PAGE_DemandeComp_ListeProvince")) {
		suffix = "ctl0_CONTENU_PAGE_creationdemandeComp_DemandeComp_";
		}
		if(document.getElementById(suffix+"ListeProvince").selectedIndex!=0 && document.getElementById(suffix+"communeListe").selectedIndex==0)
		{
		 return false;
		}
		else
		{
		 return true;
	    }
}

  function afficherBlocAffecte(panelAAfficher)
	{
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelActionAffecte")){
			document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelActionAffecte").style.display = 'none';
		}
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelActionTraite")){
			document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelActionTraite").style.display = 'none';
		}
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelActionRefuse")){
			document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelActionRefuse").style.display = 'none';
		}
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelClasserRequete")){
			document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelClasserRequete").style.display = 'none';
		}
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelSoumettreReponseCircuitAdmin")){
			document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelSoumettreReponseCircuitAdmin").style.display = 'none';
		}
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelPartagerRec")){
			document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelPartagerRec").style.display = 'none';
		}
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelAjoutReponseDemande")){
			document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_panelAjoutReponseDemande").style.display = 'none';
		}
		panelAAfficher.style.display = 'block';
	}

 /*Transparent layer that makes the the popup parent window inactive*/
 //pour une popup
 /*Checks IE 6.0*/
	var name = navigator.appName ;
	var version = navigator.appVersion;
	
	if (name == 'Microsoft Internet Explorer') {
		id = version.indexOf('MSIE');
		version = version.substring(id+5,id+9);
	}
 
function overlay() {
	el = document.getElementById("overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	var myPageHeight = document.getElementById('page-layout').offsetHeight;
	/* SDR Le 17/03/2009 desactivation parceque ca plante IE6 */
	//document.getElementById('overlay').style.height = myPageHeight+200+'px';
	autoPositionLayer();
	initFloatingIframe();
}

function overlay2() {
el = document.getElementById("overlay2");
el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
var myPageHeight = document.getElementById('page-layout').offsetHeight;
/* SDR Le 17/03/2009 desactivation parceque ca plante IE6 */
//document.getElementById('overlay2').style.height = myPageHeight+200+'px';
autoPositionLayer2();
initFloatingIframe2();
}

/*Set Floating Iframe size*/
function initFloatingIframe() {
	if (document.getElementById('floatingIframe')){ 
	var myIframe = document.getElementById('floatingIframe');
	var myContainerHeight = document.getElementById('container').offsetHeight;
	var myContainerWidth = document.getElementById('container').offsetWidth;
	myIframe.style.height = myContainerHeight+'px';
	myIframe.style.width = myContainerWidth+'px';	
	}	
}

/*Set Floating Iframe size*/
function initFloatingIframe2() {
if (document.getElementById('floatingIframe2')){
var myIframe = document.getElementById('floatingIframe2');
var myContainerHeight = document.getElementById('container2').offsetHeight;
var myContainerWidth = document.getElementById('container2').offsetWidth;
myIframe.style.height = myContainerHeight+'px';
myIframe.style.width = myContainerWidth+'px';
}
}

function autoPositionLayer() {

	if (document.getElementById('container')) {
		var myLayer =  document.getElementById('container');
	}
	
	/*Positionnement horizontal du Div container par rapport a la taille de la fenetre*/
	var windowWidth = 0;
	if (typeof(window.innerWidth) == 'number') {
		windowWidth= window.innerWidth;
	}
	else {
		if (document.documentElement && document.documentElement.clientWidth) {
			windowWidth= document.documentElement.clientWidth;
		}
		else {
			if (document.body && document.body.clientWidth) {
				windowWidth = document.body.clientWidth;
			}
		}
	}
	var newWidth = windowWidth/2 ;
	myLayer.style.top = newWidth+'px';
	var myContainerWidth = document.getElementById('container').offsetWidth;
	var myContainerWidthPosition = myContainerWidth/2;
	myLayer.style.left = newWidth-myContainerWidthPosition+'px';
	
	
	/*Positionnement vertical du Div container par rapport a la taille de la fenetre*/
	var windowHeight = 0;
	if (typeof(window.innerHeight) == 'number') {
		windowHeight= window.innerHeight;
	}
	else {
		if (document.documentElement && document.documentElement.clientHeight) {
			windowHeight= document.documentElement.clientHeight;

		}
		else {
			if (document.body && document.body.clientHeight) {
				windowHeight = document.body.clientHeight;
			}
		}
	}
	var newHeight = Math.round(windowHeight/2) ;
	myLayer.style.top = newHeight+'px';
	var myContainerHeight = document.getElementById('container').offsetHeight;
	var myContainerHeightPosition = myContainerHeight/2;
	if ( version == '6.0;') {
	myLayer.style.top = document.documentElement.scrollTop+myContainerHeightPosition+'px';	
		
	}
	else {
	myLayer.style.top = newHeight-myContainerHeightPosition+'px';	
	}
}

function autoPositionLayer2() {

if (document.getElementById('container2')) {
var myLayer =  document.getElementById('container2');
}

/*Positionnement horizontal du Div container par rapport a la taille de la fenetre*/
var windowWidth = 0;
if (typeof(window.innerWidth) == 'number') {
windowWidth= window.innerWidth;
}
else {
if (document.documentElement && document.documentElement.clientWidth) {
windowWidth= document.documentElement.clientWidth;
}
else {
if (document.body && document.body.clientWidth) {
windowWidth = document.body.clientWidth;
}
}
}
var newWidth = windowWidth/2 ;
myLayer.style.top = newWidth+'px';
var myContainerWidth = document.getElementById('container2').offsetWidth;
var myContainerWidthPosition = myContainerWidth/2;
myLayer.style.left = newWidth-myContainerWidthPosition+'px';


/*Positionnement vertical du Div container par rapport a la taille de la fenetre*/
var windowHeight = 0;
if (typeof(window.innerHeight) == 'number') {
windowHeight= window.innerHeight;
}
else {
if (document.documentElement && document.documentElement.clientHeight) {
windowHeight= document.documentElement.clientHeight;

}
else {
if (document.body && document.body.clientHeight) {
windowHeight = document.body.clientHeight;
}
}
}
var newHeight = Math.round(windowHeight/2) ;
myLayer.style.top = newHeight+'px';
var myContainerHeight = document.getElementById('container2').offsetHeight;
var myContainerHeightPosition = myContainerHeight/2;
if ( version == '6.0;') {
myLayer.style.top = document.documentElement.scrollTop+myContainerHeightPosition+'px';

}
else {
myLayer.style.top = newHeight-myContainerHeightPosition+'px';
}
}

function ValidateListeEntite()
{
	if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_listeEntite"))
	{
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_statutAffecte").checked)
		{
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_listeEntite").selectedIndex!=0)
			return true;
				else
			return false;
		}
		else
		return true;
	}
	else
	return true;

}
function ValidateListeAgent()
{
	if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_ListeAgent") && (!document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_listeEntite")))
	{
		if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_statutAffecte").checked)
		{
		    if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_ListeAgent").selectedIndex!=0)
			return true;
				else
			return false;
		}
		return true;
	}
	else
	return true;

}
 function serverValidateLieuEntite(){
		if(document.getElementById("ctl0_CONTENU_PAGE_ListeRegion").selectedIndex!=0 && document.getElementById("ctl0_CONTENU_PAGE_ListeProvince").selectedIndex!=0 && document.getElementById("ctl0_CONTENU_PAGE_communeListe").selectedIndex !=0)
		{
		 return true;
		}
		else
		{
		 return false;
	    } 
}
 function viderAgents(){
 	if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_listeEntite").value == ''){
 		document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_ListeAgent").options.length=0;
 	}
 }

	function showLoader2() {
	
		el = document.getElementById("ctl0_CONTENU_PAGE_pageLoader");
		if(el.style.display == "none") {
			el.style.display = "block";
		}
		else {
			el.style.display = "none";
		}
	}
	
	function showLoaderPopup() {
	
		el = document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_pageLoader");
		if(el.style.display == "none") {
			el.style.display = "block";
		}
		else {
			el.style.display = "none";
		}
	}
	
	function enableLoader(idObjet){
	 if(document.getElementById(idObjet)) { 
		showLoader();
	  }
	}
	 function ValidateEntiteRecep(sender,parameter)
    {
    	if(document.getElementById("ctl0_CONTENU_PAGE_ouiRequerant").checked){
    		if(parameter){
    			return true;
    		}else {
    			return false;
    		}
   		}else{
   			return true;
   		}
    }
	function showLoader3() {
	
		el = document.getElementById("ctl0_CONTENU_PAGE_pageLoaderConcernee");
		if(el.style.display == "none") {
			el.style.display = "block";
		}
		else {
			el.style.display = "none";
		}
	}
	function afficherPanelTypeAlert()
	{ 
		panel = document.getElementById("ctl0_CONTENU_PAGE_panelTypeAlerte");
		if(document.getElementById("ctl0_CONTENU_PAGE_alertActive").checked) {
			panel.style.display = "block";
		}
		else {
			panel.style.display = "none";
		}
	}
	function showLoaderPopupSoumettre() {
	
		el = document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_pageLoaderSoumettreRep");
		if(el.style.display == "none") {
			el.style.display = "block";
		}
		else {
			el.style.display = "none";
		}
	}
	function afficherSource(){
		panel = document.getElementById("ctl0_CONTENU_PAGE_panelSourceFormat");
		if(document.getElementById("ctl0_CONTENU_PAGE_autreCanal").checked) {
			panel.style.display = "block";
		}
		else {
			panel.style.display = "none";
		}
	}
	function cacherNouveauMessage(bouton){
		bouton.style.display = "none";
	}
	function showLoaderPartage() {
		el = document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_pageLoaderPartage");
		if(el.style.display == "none") {
			el.style.display = "block";
		}
		else {
			el.style.display = "none";
		}
	}
	function masquerBouton(){
		el =document.getElementById("ctl0_CONTENU_PAGE_confirmation_etapeSuivante");
		el.style.display = "none";
	}
	function masquerBoutonCtl(){
		el =document.getElementById("ctl0_CONTENU_PAGE_creationdemandeComp_etapeSuivante3");
		el.style.display = "none";
	}

	function masquerConfirmer(){
		el =document.getElementById("ctl0_CONTENU_PAGE_coordonnees_etapeSuivant");
		el.style.display = "none";
	}

	function onErreurCreationDemandeCtl(){
		if(document.getElementById('ctl0_CONTENU_PAGE_creationdemandeComp_coordonnees_etapeSuivante'))
		document.getElementById('ctl0_CONTENU_PAGE_creationdemandeComp_coordonnees_etapeSuivante').style.display='';
		divErreur =document.getElementById("panelErreur");
		if(divErreur){
		divErreur.style.display = '';
		}
	}

	function onErreurCreationDemande(){
		if(document.getElementById('ctl0_CONTENU_PAGE_coordonnees_etapeSuivant'))
           document.getElementById('ctl0_CONTENU_PAGE_coordonnees_etapeSuivant').style.display='';
		divErreur =document.getElementById("panelErreur");
		if(divErreur){
			divErreur.style.display = '';
		}
	}

    function onErreurCreationCoordonneDemande(){

        divErreur =document.getElementById("panelErreurCoordonnees");
        if(divErreur){
          divErreur.style.display = '';
        }
    }
    function onSuccessCreationDemande(){
	//	if(document.getElementById('ctl0_CONTENU_PAGE_coordonnees_etapeSuivant'))
      //     document.getElementById('ctl0_CONTENU_PAGE_coordonnees_etapeSuivant').style.display='none';
		divErreur =document.getElementById("panelErreur");
		if(divErreur){
			divErreur.style.display = 'none';
		}
	}

	function showLoader() {
		if(J("#bloc-loader").is(":visible")) {
			J("#bloc-loader").hide();
		}
		else {
			J("#bloc-loader").show();
		}
	}
function validationDonneesTraitement(sender, parameter)
	{
	    if(document.getElementById("ctl0_CONTENU_PAGE_panelTraitement_statutTraite").checked){
		    if(parameter == '' || !parameter)
		        return false;
		    else
	        	return true;
	        }else{
	        	return true;
	        }
	}
	
function mdpChange(sender, parameter){

	document.getElementById("ctl0_CONTENU_PAGE_mdpChangeValue").value = 1;
}
function validateMdpPasse(sender, parameter){
	 if(document.getElementById("ctl0_CONTENU_PAGE_mdpChangeValue").value == 1)
	 {
        var pwd = document.getElementById("ctl0_CONTENU_PAGE_userMdp").value;
        if( document.getElementById("ctl0_CONTENU_PAGE_userMdpActuel").value ==''){
            return false;
            }
        if(spansAtLeastNCharacterSets(pwd, 3) && pwd.length >= 8 ){
            if(pwd != document.getElementById("ctl0_CONTENU_PAGE_userMdpConfirm").value){
                return false;
            }
            return true;
        }
	 	    return false;
	 }
	 return true;
}
function validateuserMdpActuel(sender, parameter){
    if( document.getElementById("ctl0_CONTENU_PAGE_userMdpActuel").value ==''){
        return false;
    }
    return true;
}
function spansAtLeastNCharacterSets( word, N)
{
    // Calcul les différents types de caractères du mot de passe
    // word : mot de passe, N : Nombre minimun de types de caractère différents pour retour à vrai
    if (word == null)
        return false;

    var csets = new Array(false,false,false,false);

    ncs = 0;
    var listeNombre = "0123456789";
    var listeCaractereSpe = "&éê^'(-è_çà)=*ù!:;,?òì./§-+<>$£µ%{}âôîû@\|[]²ß~]°#¨"+'"';
    for (i = 0; i < word.length; i++)
    {
        c= word.charAt(i);
        if (listeNombre.indexOf(c)>=0)
            {
                // caractère numérique
                if (csets[0] == false)
                    {
                        csets[0] = true;
                        ncs++;
                        if (ncs >= N)
                            return true;
                    }
            }
        else if (listeCaractereSpe.indexOf(c)>=0)
        {
            // caractère spécial
            if (csets[1] == false)
            {
                csets[1] = true;
                ncs++;
                if (ncs >= N)
                    return true;
                }
            }
            else if (c.toUpperCase() ==c)
            {
            // caractère en Majuscule
            if (!csets[2])
            {
                csets[2] = true;
                ncs++;
                if (ncs >= N)
                    return true;
                }
                continue;
            }
            else if (c.toLowerCase() ==c)
            {
                // caractère en Minuscule
                if (!csets[3])
                {
                    csets[3] = true;
                    ncs++;
                    if (ncs >= N)
                    return true;
                }
            }
        }
        return false;
    }

function showHideBlocDateReponse(){
    var checkBox = document.getElementById('ctl0_CONTENU_PAGE_panelTraitementDemande_chBoxReponseElctro');
    element = document.getElementById("blocDateReponse");
    if(checkBox){
        if(element.style.display == "block" || element.style.display == ""){
            element.style.display = "none";
        }else{
            element.style.display = "";
        }
    }
}

function showLoaderEntite() {
    el = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_pageLoaderEntite");
    if(el.style.display == "none") {
    el.style.display = "block";
    }
    else {
    el.style.display = "none";
    }
}

function viderAgents2(){
if(document.getElementById("ctl0_CONTENU_PAGE_ctl9_listeEntite").value == ''){
document.getElementById("ctl0_CONTENU_PAGE_ctl9_ListeAgent").options.length=0;
}
}


function ValidateListeAgent2()
{
    var bool = false;
    if(document.getElementById("ctl0_CONTENU_PAGE_echangeComp_ListeAgent") && document.getElementById("ctl0_CONTENU_PAGE_echangeComp_ListeAgent").selectedIndex != 0)
    {
        bool = true;
    }
    return bool;
}

function confirmationPartage(message){

var radioAffectation = document.getElementById('ctl0_CONTENU_PAGE_echangeComp_radioAffectation');
var radioPartageElemntReponse = document.getElementById('ctl0_CONTENU_PAGE_echangeComp_radioPartageDemande');
var radioPartageDemandeInfo = document.getElementById('ctl0_CONTENU_PAGE_echangeComp_radioPartagePrInfo');


if(radioPartageElemntReponse && radioPartageDemandeInfo && (radioPartageDemandeInfo.checked || radioPartageElemntReponse.checked)){

var res = confirm(message);
return res;
}
return true;

}



function validatePjReponse(){
    var chBoxReponseElctro = document.getElementById("ctl0_CONTENU_PAGE_panelTraitementDemande_chBoxReponseElctro");
    var lblNomPj = document.getElementById("ctl0_CONTENU_PAGE_panelTraitementDemande_idFile");
    if(!lblNomPj.value){
        return false;
    }
    return true;
}


function validatePjClassement(){
var radioHorsAttribution = document.getElementById("ctl0_CONTENU_PAGE_panelTraitementDemande_radioHorsAttribution");
var lblNomPj = document.getElementById("ctl0_CONTENU_PAGE_panelTraitementDemande_idFile_classer");
if(radioHorsAttribution.checked && !lblNomPj.value){
return false;
}
return true;
}

function validateDateReponse(){
    var chBoxReponseElctro = document.getElementById("ctl0_CONTENU_PAGE_panelTraitementDemande_chBoxReponseElctro");
    var txtDateReponse = document.getElementById("ctl0_CONTENU_PAGE_panelTraitementDemande_dateReponse");

if(!chBoxReponseElctro || !chBoxReponseElctro.checked){
if(txtDateReponse.value){
return true;
}else{
return false;
}
}
return true;
}


function showHideBlocDateReponseReq(){
var checkBox = document.getElementById('ctl0_CONTENU_PAGE_panelTraitementDemande_checkBoxReclamation');
element = document.getElementById("blocDateReponseRequerant");
blocMessage = document.getElementById("blocMessageRequerant");
blocFormat =  document.getElementById("blocFormat");
if(checkBox){
if(element.style.display == "block" || element.style.display == ""){
element.style.display = "none";
blocFormat.style.display = "none";
blocMessage.style.display = "";
}else{
element.style.display = "";
blocFormat.style.display = "";
blocMessage.style.display = "none";
}
}
}

function validatePjMessageReponseRequerant(){
var pjRequerant = document.getElementById('ctl0_CONTENU_PAGE_panelTraitementDemande_idFileReponseRequerant');
var messageRequerant = document.getElementById('ctl0_CONTENU_PAGE_panelTraitementDemande_messageRequerant');

if(pjRequerant.value || !messageRequerant || messageRequerant.value){
return true;
}
return false;

}

function validateDateReponseRequerant(){
var chBoxReponseRequerant = document.getElementById("ctl0_CONTENU_PAGE_panelTraitementDemande_checkBoxReclamation");
var dateReponse = document.getElementById('ctl0_CONTENU_PAGE_panelTraitementDemande_dateReponseRequerant');

if(chBoxReponseRequerant && !chBoxReponseRequerant.checked){
if(dateReponse.value){
return true;
}else{
return false;
}
}
return true;
}


function mdpChange2(){
    document.getElementById('ctl0_CONTENU_PAGE_mdpChangeValue').value = 1;
}
function validateMdpPasse2(sender, parameter){
if(document.getElementById("ctl0_CONTENU_PAGE_mdpChangeValue").value == 1)
{
var pwd = document.getElementById("ctl0_CONTENU_PAGE_user_mdp").value;
if(spansAtLeastNCharacterSets(pwd, 3) && pwd.length >= 8 ){
if(pwd != document.getElementById("ctl0_CONTENU_PAGE_user_mdpConfirm").value){
return false;
}
return true;
}
return false;
}
return true;
}


function showLoaderResponsive(){
    J(document).ready(function(){
    J('#bloc-loader').show();
    setTimeout(function() { J("#bloc-loader").fadeOut(100); }, 1000);
    });
}

function hideLoaderResponsive(){
J('#bloc-loader').hide();
}

function enableLoaderResponsive(idObjet){
if(document.getElementById(idObjet)) {
showLoaderResponsive();
}
}



    var carte;
    var marker;

    function initMap(){

        var geocoder = new google.maps.Geocoder();
         var pays ="Maroc";

         switch(pays){
         case "France": var latlng = new google.maps.LatLng(48.85, 2.35);break;
         case "Maroc" : var latlng = new google.maps.LatLng(31.63,-8.00);break;
         default : var latlng = new google.maps.LatLng(31.63,-8.00);break;
         }


        var ctaLayer = new google.maps.KmlLayer('http://vps58424.ovh.net:90/lt_reclamation_v3/atexo.demande/ressources/frontiere_maroc.kml');


        // OPTION : ELIMINER LES NOMS DES PAYS ET LES FRONTIERES ADMINISTRATIVE
        var stylez = [
            {
                featureType: "administrative.country",
                elementType: "labels",
                stylers: [
                    { visibility: "off" }
                ]
            },{
                featureType: "administrative.country",
                elementType: "geometry",
                stylers: [
                    { visibility: "off" }
                ]
            }
        ];

        // Create a new StyledMapType object, passing it the array of styles,
        // as well as the name to be displayed on the map type control.
        var noPOIMapType = new google.maps.StyledMapType(stylez, {name: "Plan"});



        //********************************************************************************************//
        //*************************************  CARTE **********************************************//
        //********************************************************************************************//

        var options = {
            zoom: 6,
            zoomControlOptions: { style: google.maps.ZoomControlStyle.SMALL },
            mapTypeControlOptions: {
                mapTypeIds: ['satellite', 'no_poi'],
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            }
        };

        carte = new google.maps.Map(document.getElementById("carte"), options);
        carte.mapTypes.set('no_poi', noPOIMapType);
        carte.setMapTypeId('no_poi');
        carte.setTilt(45);


        //********************************************************************************************//
        //*************************************  MARQUEUR ********************************************//
        //********************************************************************************************//

        marker = new google.maps.Marker({
            map: carte,
            draggable:true,
            title:'Déplacer ce marqueur sur le lieu de la demande'
        });

        //********************************************************************************************//
        //*************************************  GEOCODING SERVICE ***********************************//
        //********************************************************************************************//

        var address = "";
		suffix = "ctl0_CONTENU_PAGE_DemandeComp_";
		win = window;
		if(window.opener) {
			win = window.opener;
		}

		if(win.document.getElementById("ctl0_CONTENU_PAGE_DemandeComp_lieuComp_lbl")) {
			suffix = "ctl0_CONTENU_PAGE_DemandeComp_lieuComp_";
		} else if(!win.document.getElementById("ctl0_CONTENU_PAGE_DemandeComp_lbl")) {
			suffix = "ctl0_CONTENU_PAGE_creationdemandeComp_DemandeComp_";
		}
        var address = window.document.getElementById(suffix+"lbl").value;
        if(address =='')
        {
            address = pays;
        }

        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                carte.setCenter(results[0].geometry.location);
                //setTimeout(carte.setZoom(12),3000);
                carte.setZoom(8);
                marker.setPosition(results[0].geometry.location);

               /*if(window.document.getElementById(suffix+"lblLat").value ==0 && window.document.getElementById(suffix+"lblLat").value ==0)
                {
                    window.document.getElementById(suffix+"lblLat").value =latlng.lat();
                    window.document.getElementById(suffix+"lblLong").value=latlng.lng();
                }else{
                    var latLngDeMonExChoix=new google.maps.LatLng(window.document.getElementById(suffix+"lblLat").value,window.document.getElementById(suffix+"lblLong").value);
                    carte.setCenter(latLngDeMonExChoix);
                    marker.setPosition(latLngDeMonExChoix);
                }*/

            } else {
                if(pays =='Maroc')
                {
                    ctaLayer.setMap(carte);
                }
                carte.setCenter(latlng);
                marker.setPosition(latlng);
                carte.setZoom(8);
            }
        });


        //********************************************************************************************//
        //*************************************  EVENTS **********************************************//
        //********************************************************************************************//
        // Lorsqu on bouge le marqueur on intercèpte sa position
        google.maps.event.addListener(marker, 'dragend', function(event) {
            window.document.getElementById(suffix+"lblLat").value  = event.latLng.lat();
            window.document.getElementById(suffix+"lblLong").value = event.latLng.lng();
        });


        // Changer le type de la carte entraîne le dessin de la frontière Est du Maroc
        if(pays =='Maroc')
        {
            google.maps.event.addListener(carte, 'maptypeid_changed', function(event) {
                var mapType = carte.getMapTypeId();
                if(mapType=="satellite"){
                    if(carte.getZoom() <=5 ) {ctaLayer.setMap(carte); }
                }else{
                    ctaLayer.setMap(carte);
                }
            });

            google.maps.event.addListener(carte, 'zoom_changed', function() {
                if(carte.getZoom() <=5 ) {ctaLayer.setMap(carte); }
            });
        }


        // Create the DIV to hold the control and call the CenterControl() constructor
        // passing in this DIV.
        var centerControlDiv = document.createElement('div');
        var centerControl = new CenterControl(centerControlDiv, carte);

        centerControlDiv.index = 1;
        centerControlDiv.style['padding-top'] = '10px';

        carte.controls[google.maps.ControlPosition.LEFT_CENTER].push(centerControlDiv);

        google.maps.event.addDomListener(window, "resize", function() {
        var center = carte.getCenter();
        google.maps.event.trigger(carte, "resize");
        carte.setCenter(center);
        });

    } // FIN FUNCTION INTIALISATION DE LA MAP


    function reloadMarker(){
	suffix = "ctl0_CONTENU_PAGE_DemandeComp_";
	win = window;
	if(window.opener) {
		win = window.opener;
	}
	if(!win.document.getElementById("ctl0_CONTENU_PAGE_DemandeComp_lblLat")) {
		suffix = "ctl0_CONTENU_PAGE_creationdemandeComp_DemandeComp_";
		if(!window.document.getElementById("ctl0_CONTENU_PAGE_creationdemandeComp_DemandeComp_lblLat")) {
			suffix = "ctl0_CONTENU_PAGE_DemandeComp_lieuComp_";
		}
	}
        var geocoder = new google.maps.Geocoder();
        var address = window.document.getElementById(suffix+"lbl").value;
        if(address =='')
        {
            address = pays;
        }

        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                carte.setCenter(results[0].geometry.location);
                //setTimeout(carte.setZoom(12),3000);
                carte.setZoom(8);
                marker.setPosition(results[0].geometry.location);

               /* if(window.document.getElementById(suffix+"lblLat").value ==0 && window.document.getElementById(suffix+"lblLat").value ==0)
                {
                    window.document.getElementById(suffix+"lblLat").value =latlng.lat();
                    window.document.getElementById(suffix+"lblLong").value=latlng.lng();
                }else{
                    var latLngDeMonExChoix=new google.maps.LatLng(window.document.getElementById(suffix+"lblLat").value,window.document.getElementById(suffix+"lblLong").value);
                    carte.setCenter(latLngDeMonExChoix);
                    marker.setPosition(latLngDeMonExChoix);
                }*/

            } else {
                if(pays =='Maroc')
                {
                    ctaLayer.setMap(carte);
                }
                carte.setCenter(latlng);
                marker.setPosition(latlng);
                carte.setZoom(8);
            }
        });


    }






    function CenterControl(controlDiv, map) {

        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Annuler la localisation';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(234, 241, 141)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = 'Annuler';
        controlUI.appendChild(controlText);

        // Setup the click event listeners: simply set the map to Chicago.
        controlUI.addEventListener('click', function() {
            J('#carte').hide();
            J('#instructionCarte').hide();
			suffix = "ctl0_CONTENU_PAGE_DemandeComp_";
			if(!window.document.getElementById("ctl0_CONTENU_PAGE_DemandeComp_lblLat")) {
				suffix = "ctl0_CONTENU_PAGE_creationdemandeComp_DemandeComp_";
				if(!window.document.getElementById("ctl0_CONTENU_PAGE_creationdemandeComp_DemandeComp_lblLat")) {
					suffix = "ctl0_CONTENU_PAGE_DemandeComp_lieuComp_";
				}
			}
            window.document.getElementById(suffix+"lblLat").value = 0;
            window.document.getElementById(suffix+"lblLong").value = 0;
        });

    }




    /*
    * Expression regulière qui valide un email
    */
    function validateEmail(elementValue){
    var emailPattern =  /^([a-z0-9._-]|[A-Z0-9._-])+@([a-z0-9.-]|[A-Z0-9.-]){2,}[.][a-z]{2,}$/;
    return emailPattern.test(elementValue);
    }



    function validatorEmail(sender, parameter)
    {
        if(parameter !='') {
            if(validateEmail(parameter))
				return true;
			else
				return false;
		}
        else {
            return false;
        }
    }
var newWindow;
function popUpWin(url, strWidth, strHeight){
	var top = (screen.height/2)-(strHeight/2);
	var left = (screen.width/2)-(strWidth/2);
	closeWin();
	var tools="";
	tools = "resizable,toolbar=no,location=no,scrollbars=yes,width="+strWidth+",height="+strHeight+",left="+left+",top="+top+"";
	newWindow = window.open(url, 'newWin', tools);
	newWindow.focus();
}

function IncrimenteValueBlocAffection(){
    var $input = J("#idAction");
    if ($input.val()>=1){
      $input.val(parseInt($input.val())+1);
    }
}
function decrimenteValueBlocAffection(){
    var $input = J("#idAction");
    if ($input.val()>=1){
    $input.val(parseInt($input.val())-1);
    }
}


function affectationEncopieDemandeElementValidator(){
    var i=1 ;
    while (object = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tabEntiteAgentEncopie_tabPartage_ctl"+i+"_idEntite"))
    {
        return true;
    }
    while (object = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tabEntiteAgent_tabPartage_ctl"+i+"_idEntite"))
    {
        return true;
    }
    if(document.getElementById("ctl0_CONTENU_PAGE_echangeComp_idAction") != null){
        var idAction = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_idAction").value;
        if(idAction > 0){
            return true;
        }

    }
    return false;
}

function validatePjCourriereSortant(){
    typeSortant = false;
    var object = document.getElementById("ctl0_CONTENU_PAGE_DemandeComp_listeType_ctl2_courrier");
    if(object){
        if(object.checked){
            typeSortant = true;
        }
    }
    ctl0_CONTENU_PAGE_DemandeComp_listeType_ctl1_courrier
    ctl0_CONTENU_PAGE_DemandeComp_listeType_ctl2_courrier

    var pj = document.getElementById('ctl0_CONTENU_PAGE_DemandeComp_idFile');
    if(pj.value != "1" && (typeSortant == true) ){
         return false;
    }
    return true;

}

function hideShowPanelPjPrincipale(){
    var objPrincipale =document.getElementById('ctl0_CONTENU_PAGE_echangeComp_checkBoxRemplacerPrincipalePj');
    if(objPrincipale != null){
        if(objPrincipale.checked){
            document.getElementById('ctl0_CONTENU_PAGE_echangeComp_panelPjPrincipale').style = "display:block";
        } else {
            document.getElementById('ctl0_CONTENU_PAGE_echangeComp_panelPjPrincipale').style = "display:none";
        }
    }
}


function closeWin(){
	if (newWindow != null){
		if(!newWindow.closed)
			newWindow.close();
	}
}

function popinAffectationEncopieDemandeElementValidator(){
    var i=1 ;
    while (object = document.getElementById("ctl0_CONTENU_PAGE_tableauDemandes_popinActionGroupe_tabEntiteAgentEncopie_tabPartage_ctl"+i+"_idEntite"))
    {
        return true;
    }
    while (object = document.getElementById("ctl0_CONTENU_PAGE_tableauDemandes_popinActionGroupe_tabEntiteAgent_tabPartage_ctl"+i+"_idEntite"))
    {
         return true;
    }
    if(document.getElementById("ctl0_CONTENU_PAGE_tableauDemandes_popinActionGroupe_idAction") != null){
        var idAction = document.getElementById("ctl0_CONTENU_PAGE_tableauDemandes_popinActionGroupe_idAction").value;
        if(idAction > 0){
            return true;
        }
    }
    return false;
}

function checkAll(isAllChecked, className) {
	try {
		J("." + className).each(function () {
			var tempId = J(this).attr('id');
			obj = document.getElementById(tempId);
			obj.checked = isAllChecked;
		});

	} catch (err) {
		alert(err.message);
		console.log(err.message);
	}
}


function removeValidators(idForm, partName) {
    var i = 0;
    var length = Prado.Validation.managers[idForm].validators.length;
    while(i<length)
    {
        if(Prado.Validation.managers[idForm].validators[i] && Prado.Validation.managers[idForm].validators[i].control.name.indexOf(partName)>0){
            Prado.Validation.managers[idForm].removeValidator(Prado.Validation.managers[idForm].validators[i]);
        }
        else {
            i++;
        }
    }
}

function setIdCircuitToModify(idCircuit, dateReception)
{
J(".circuitPapierToModify").each(function() {
var circuitPapierToModifyHidden = (J(this).attr("id"));
document.getElementById(circuitPapierToModifyHidden).value=idCircuit;
});

document.getElementById('ctl0_CONTENU_PAGE_circuitPapier_txtdate').value=dateReception;
}

function validateEmailNumeroTel (){

	suffix = "ctl0_CONTENU_PAGE_";
	if(!document.getElementById("ctl0_CONTENU_PAGE_email")) {
		suffix = "ctl0_CONTENU_PAGE_filtreDemandeComp_";
	}
	email = document.getElementById(suffix+"email");
	telephone = document.getElementById(suffix+"telephone");
	if(email.value || telephone.value){
		return true;
	}
	return false;
}

function showHideFormat(){
	canalAutre = document.getElementById('ctl0_CONTENU_PAGE_listeCanalDepot_ctl1_canal');
	if(canalAutre != null){
		if(canalAutre.checked){
			document.getElementById('ctl0_CONTENU_PAGE_panelSourceFormat').style.display = '';
		} else {
			document.getElementById('ctl0_CONTENU_PAGE_panelSourceFormat').style.display = 'none';
		}
	}
}

function showHidePanelUploadFile(){
	if(document.getElementById("ctl0_CONTENU_PAGE_traitementChoix_02").checked){
		J('#panelBtWithUpload').show();
		J('#panelFileInput').show();
		J('#panelBtWithoutUpload').hide();
		J('#panelNiveauSatisfaction').hide();

	} else {
		J('#panelBtWithoutUpload').show();
		J('#panelBtWithUpload').hide();
		J('#panelFileInput').hide();
		J('#panelNiveauSatisfaction').show();
	}
}
function satisfactionValidator(){
	var i=1 ;
	var objetSatisfaction = document.getElementById("ctl0_CONTENU_PAGE_traitementChoix_01");
	if(objetSatisfaction.checked){
		while (object = document.getElementById("ctl0_CONTENU_PAGE_niveauSatisfaction_0"+i))
		{
			if (object.checked)
			{
				return true;
			}
			i++;
		}
		return false;
	}
	return true;
}


function EchangeIntergenvalidator(){

		var i=1 ;
		while (object = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tableauEchangeAffectation_tabEchange_ctl"+i+"_listeEntite"))
		{
			objectExterne = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tableauEchangeAffectation_tabEchange_ctl"+i+"_listeEntiteExterne")
			if(object.selectedIndex!=0 || objectExterne.selectedIndex!=0){
				return true;
			}
			i++;
		}

		var i=1 ;
		while (object = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tableauEchangeAffectationMultiple_tabEchange_ctl"+i+"_listeEntite"))
		{
			objectExterne = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tableauEchangeAffectationMultiple_tabEchange_ctl"+i+"_listeEntiteExterne")
			if(object.selectedIndex!=0 || objectExterne.selectedIndex!=0){
			return true;
		}
		i++;
		}
		var i=1 ;
		while (object = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tableauEchangeEnCopie_tabEchange_ctl"+i+"_listeEntite"))
		{
			objectExterne = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tableauEchangeEnCopie_tabEchange_ctl"+i+"_listeEntiteExterne")
			if(object.selectedIndex!=0 || objectExterne.selectedIndex!=0){
				return true;
			}
			i++;
		}
		var i=1 ;
		while (object = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tableauEchangeElementRep_tabEchange_ctl"+i+"_listeEntite"))
		{
			objectExterne = document.getElementById("ctl0_CONTENU_PAGE_echangeComp_tableauEchangeElementRep_tabEchange_ctl"+i+"_listeEntiteExterne")
			if(object.selectedIndex!=0 || objectExterne.selectedIndex!=0){
				return true;
			}
			i++;
		}

		return false;
}

