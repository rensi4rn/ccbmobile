function _2439b0b66ffe28e6ed50cf0bff1ea2515860e791(){};var Base64={};Base64.code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";Base64.encode=function(n,p){p=(typeof p=="undefined")?false:p;var g,b,a,r,o,k,j,h,i=[],f="",m,q,l;var d=Base64.code;q=p?Utf8.encode(n):n;m=q.length%3;if(m>0){while(m++<3){f+="=";q+="\0"}}for(m=0;m<q.length;m+=3){g=q.charCodeAt(m);b=q.charCodeAt(m+1);a=q.charCodeAt(m+2);r=g<<16|b<<8|a;o=r>>18&63;k=r>>12&63;j=r>>6&63;h=r&63;i[m/3]=d.charAt(o)+d.charAt(k)+d.charAt(j)+d.charAt(h)}l=i.join("");l=l.slice(0,l.length-f.length)+f;return l};Base64.decode=function(n,e){e=(typeof e=="undefined")?false:e;var g,b,a,o,k,i,h,q,j=[],p,m;var f=Base64.code;m=e?Utf8.decode(n):n;for(var l=0;l<m.length;l+=4){o=f.indexOf(m.charAt(l));k=f.indexOf(m.charAt(l+1));i=f.indexOf(m.charAt(l+2));h=f.indexOf(m.charAt(l+3));q=o<<18|k<<12|i<<6|h;g=q>>>16&255;b=q>>>8&255;a=q&255;j[l/4]=String.fromCharCode(g,b,a);if(h==64){j[l/4]=String.fromCharCode(g,b)}if(i==64){j[l/4]=String.fromCharCode(g)}}p=j.join("");return e?Utf8.decode(p):p};