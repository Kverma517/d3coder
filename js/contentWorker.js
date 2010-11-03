/** 
 * @version 0.4
 * @author Maik Kulbe <info@linux-web-development.de>
 * @copyright (c) 2010 Maik Kulbe
 */

D3content = {

		createDiv: function(title, text)
		{
			text = D3content.base64_decode(text);
    		var hr = new Element('hr');
			
    		if(!$('D3-inject')) {
			    var infoDiv = new Element('div').set({
			        //Any other property uses Element:setProperty.
			        'id': 'D3-inject'
			    });
			    var heading = new Element('h1').set({
			    	'id': 'D3-inject-heading',
			    	'text': 'd3coder Output:'
			    });
			    $(document.body).grab(infoDiv);
			    $('D3-inject').grab(heading);
		        $('D3-inject').grab(hr);

			    var closeElem = new Element('a').set({
			    	'id': 'D3-inject-close',
			    	'text': 'CLOSE [X]'
			    });
		
			    $(document.body).grab(closeElem);
		
			    $('D3-inject-close').addEvent('click', function(){
			    	$('D3-inject').destroy();
			    	$('D3-inject-close').destroy();
			    });
			} else {
			    var infoDiv = $('D3-inject');
			}
			var infoHeading = new Element('h3').set({
	            'class': 'D3-inject-heading',
	            'text': title
	        });
	        
	        var infoText = new Element('p').set({
	            'class': 'D3-inject-text',
	            'text': text
	        });

	        var hr = new Element('hr');
	        
	        $(infoDiv).grab(infoHeading);
	        $(infoDiv).grab(infoText);
	        $(infoDiv).grab(hr);
		},
		logConsole: function(text) 
		{
			console.log(D3content.base64_decode(text));
		},
		base64_decode: function (data) {
		    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, dec = "", tmp_arr = [];
		 
		    if (!data) {
		        return data;
		    }
		 
		    data += '';
		 
		    do {  // unpack four hexets into three octets using index points in b64
		        h1 = b64.indexOf(data.charAt(i++));
		        h2 = b64.indexOf(data.charAt(i++));
		        h3 = b64.indexOf(data.charAt(i++));
		        h4 = b64.indexOf(data.charAt(i++));
		 
		        bits = h1<<18 | h2<<12 | h3<<6 | h4;
		 
		        o1 = bits>>16 & 0xff;
		        o2 = bits>>8 & 0xff;
		        o3 = bits & 0xff;
		 
		        if (h3 == 64) {
		            tmp_arr[ac++] = String.fromCharCode(o1);
		        } else if (h4 == 64) {
		            tmp_arr[ac++] = String.fromCharCode(o1, o2);
		        } else {
		            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
		        }
		    } while (i < data.length);
		 
		    dec = tmp_arr.join('');
		    dec = this.utf8_decode(dec);
		 
		    return dec;
		},
		utf8_decode: function ( str_data ) {
		   var tmp_arr = [], i = 0, ac = 0, c1 = 0, c2 = 0, c3 = 0;
		    
		    str_data += '';
		    
		    while ( i < str_data.length ) {
		        c1 = str_data.charCodeAt(i);
		        if (c1 < 128) {
		            tmp_arr[ac++] = String.fromCharCode(c1);
		            i++;
		        } else if ((c1 > 191) && (c1 < 224)) {
		            c2 = str_data.charCodeAt(i+1);
		            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
		            i += 2;
		        } else {
		            c2 = str_data.charCodeAt(i+1);
		            c3 = str_data.charCodeAt(i+2);
		            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
		            i += 3;
		        }
		    }
		 
		    return tmp_arr.join('');
		}
};