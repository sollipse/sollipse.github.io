(this.webpackJsonpresume=this.webpackJsonpresume||[]).push([[0],{119:function(e,t,a){},120:function(e,t,a){},121:function(e,t,a){},215:function(e,t,a){},218:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(19),i=a.n(r),l=(a(86),a(6)),c=a(2),s=a(75),m=a.n(s),d=(a(119),a(76)),u=a.n(d).a.getParser(window.navigator.userAgent).getBrowserName(),f=window.webkitAudioContext||window.AudioContext,h=performance.now(),b=(Math.random(),Object(c.styled)("div")({name:"Container",class:"cm0as6w"})),p=Object(c.styled)("div")({name:"Button",class:"b13mnax5"}),g=Object(c.styled)("div")({name:"NameTitle",class:"nbb0x40"}),w=Object(c.styled)("div")({name:"Description",class:"dlx5ske"}),y=Object(c.styled)("div")({name:"Row",class:"r1m43pa2"}),E=Object(c.styled)("a")({name:"Link",class:"lvm80j5"});var v=function(){var e=Object(n.useState)(),t=Object(l.a)(e,2),a=t[0],r=t[1],i=Object(n.useState)(),c=Object(l.a)(i,2),s=c[0],d=c[1],v=Object(n.useState)(new Uint8Array(1024)),x=Object(l.a)(v,2),j=x[0],k=x[1],O=Object(n.useState)("Firefox"!==u),S=Object(l.a)(O,2),q=S[0],F=S[1],z=Object(n.useState)(!1),A=Object(l.a)(z,2),I=A[0],T=A[1],B=Object(n.useState)(),C=Object(l.a)(B,2),L=C[0],M=C[1];return Object(n.useEffect)((function(){var e=document.getElementById("foo");if(e&&!a){var t=new f;d(t);var n=t.createAnalyser();if("Safari"===u)fetch("https://pk-resume.s3-us-west-2.amazonaws.com/Max+Cooper+-+Resynthesis+Original+Mix+Mesh-www.groovytunes.org.mp3").then((function(e){return e.arrayBuffer()})).then((function(e){return new Promise((function(a,n){t.decodeAudioData(e,a,n)}))})).then((function(e){console.log("here");var a=t.createBufferSource();a.buffer=e,a.connect(n),n.connect(t.destination),r(n),k(new Uint8Array(n.frequencyBinCount)),M(a),F(!1)})).catch((function(e){return console.log(e)}));else{var o=t.createMediaElementSource(e),i=t.createAnalyser();o.connect(i),i.connect(t.destination),r(i),k(new Uint8Array(i.frequencyBinCount))}}}),[I]),Object(n.useEffect)((function(){if(window.THREE&&a&&!document.getElementById("fark")){var e=window.THREE,t=new e.Scene,n=new e.Group,o=new e.PerspectiveCamera(20,window.innerWidth/window.innerHeight,.1,1e3);o.position.set(0,0,100),o.lookAt(t.position),t.add(o);var r=new e.WebGLRenderer({alpha:!0,antialias:!0});r.setSize(window.innerWidth,window.innerHeight),document.getElementById("App").prepend(r.domElement),r.domElement.id="fark";var i=new e.IcosahedronGeometry(2,4),l=new e.MeshLambertMaterial({color:"red",wireframe:!0}),c=new e.Mesh(i,l);c.position.set(0,0,0),n.add(c);var d=new e.AmbientLight(11184810);t.add(d);var f=new e.SpotLight(16777215);f.intensity=.9,f.position.set(-10,40,20),f.lookAt(c),f.castShadow=!0,t.add(f),t.add(n),r.render(t,o);!function e(){if(requestAnimationFrame(e),r.render(t,o),n.rotation.y+=.003,a){var i=0;"Safari"===u?i=s.currentTime:document.getElementById("foo")&&(i=document.getElementById("foo").currentTime),a.minDecibels=-100,a.maxDecibels=0,a.getByteTimeDomainData(j),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],a=arguments.length>2?arguments[2]:void 0,n=Math.floor(a/4-.005)+2,o=new m.a(n);e.geometry.vertices.forEach((function(e,a){var n=performance.now()%100;e.normalize();var r=6+(performance.now()-h)/15e3+4*o.noise3D(e.x+.02*Math.floor(n/1e3)*7,e.y+.02*Math.floor(n/1e3)*8,e.z+.02*Math.floor(n/1e3)*9)+.6*(t[a%t.length]||0)/128;e.multiplyScalar(r)})),e.geometry.verticesNeedUpdate=!0,e.geometry.normalsNeedUpdate=!0}(c,j,i)}}()}}),[window.THREE,a,j,I,s]),o.a.createElement(b,{className:"App",id:"App"},o.a.createElement(p,{id:"fee",onClick:function(){I?("Safari"===u?3!==L.playbackState&&L.stop(0):document.getElementById("foo").pause(),T(!1)):("Safari"===u?3!==L.playbackState?L.start(0):window.location.reload():document.getElementById("foo").play(),T(!0))}},o.a.createElement(y,{style:{color:"white",alignItems:"center",fontSize:32}},o.a.createElement("img",{style:{marginRight:10,marginTop:6,width:45,height:45,objectFit:"cover"},src:q?"https://media1.giphy.com/media/LsLK01Ko9Kf6M/source.gif":"https://pk-resume.s3-us-west-2.amazonaws.com/play-pause-button-transparent-13.png"}),q?"loading":I?"pause":"play")),o.a.createElement(g,{style:{opacity:a?1:0,transform:"translatey(".concat(a?0:-10,"px)")}},"Paul kanG",o.a.createElement(w,null,"software engineer"),o.a.createElement(y,null,o.a.createElement(E,{href:"#/work"},"work"),o.a.createElement(E,{href:"#/about"},"about")),o.a.createElement("div",{style:{height:30}}),o.a.createElement("audio",{onPlay:function(){return T(!0)},onPause:function(){return T(!1)},onCanPlayThrough:function(){"Safari"!==u&&F(!1)},crossOrigin:"anonymous",loop:!0,id:"foo",controls:"Safari"!==u},o.a.createElement("source",{src:"Safari"===u?"":"https://pk-resume.s3-us-west-2.amazonaws.com/Max+Cooper+-+Resynthesis+Original+Mix+Mesh-www.groovytunes.org.mp3"}))))};a(120);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var x=a(78),j=a(11),k=Object(c.styled)("div")({name:"Container",class:"c104vdon"}),O=Object(c.styled)("div")({name:"TextContainer",class:"tvml0oh"}),S=Object(c.styled)("h3")({name:"SectionTitle",class:"s1g5s5mx"}),q=Object(c.styled)("p")({name:"Paragraph",class:"pqpnek1"}),F=Object(c.styled)("img")({name:"Image",class:"i1j4il5d",vars:{"i1j4il5d-0":[function(e){return e.loaded?1:0}]}}),z=Object(c.styled)("div")({name:"Row",class:"rwawqi3"}),A=Object(c.styled)("div")({name:"Button",class:"btc6bdy"});a(121);var I=a(31),T=a(77),B=Object(c.styled)("div")({name:"Container",class:"cdfd02a"}),C=Object(c.styled)("div")({name:"VertLine",class:"v1mo274o"}),L=Object(c.styled)("div")({name:"Row",class:"rxbujk1"}),M=Object(c.styled)("div")({name:"Badge",class:"bygd3vm"}),D=Object(c.styled)("div")({name:"Content",class:"c1jdaci4"}),R=Object(c.styled)("div")({name:"Title",class:"t1xcgs7"}),P=Object(c.styled)("img")({name:"Image",class:"ikhffxz"}),G=Object(c.styled)("div")({name:"Button",class:"b7xoe41"}),H=function(e){var t=e.Head,a=e.Description,n=e.Gallery,r=e.DateString,i=Object(T.useVisible)(),c=Object(l.a)(i,2),s=c[0],m=c[1];return o.a.createElement(L,{ref:s},o.a.createElement(M,{style:{opacity:m>.1?1:0}},r),o.a.createElement(D,{style:{opacity:m<.3?0:1,transform:window.innerWidth<600?"":"translateX(".concat(20-20*m,"px)")}},o.a.createElement("div",{style:{zIndex:1}},o.a.createElement(R,null,t),a,n),o.a.createElement("div",{style:{top:0,left:0,position:"absolute",width:"100%",height:"100%",background:"black"}})))},W=Object(c.styled)("h1")({name:"BigTitle",class:"b5t8s7q"}),U=["https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F321357%2Fb5b65ee9-de9c-c62a-9956-790c1da759bd.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=7921bbf2cf4538c1d6c5f42aac174390","https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F321357%2Fe1d275c5-0e15-b019-b621-f84e11c6a922.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=27a51afc9864a2354628958990ce49c3","https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F321357%2Fbd539c08-5dc3-f0cd-9523-aa0875a41711.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=4ce872bd35f489aff93ad954d95d5ffc","https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F321357%2Ff3aa0282-1c8e-d8a2-2524-e37c3bc6e4ea.png?ixlib=rb-1.2.2&auto=format&gif-q=60&q=75&w=1400&fit=max&s=09402dbfa7d9d25b422bd9c086a4d156"],N=["https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2019/05/30/textract-ga-1.gif","https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2019/05/30/textract-ga-2.gif","https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2019/05/30/textract-ga-3.gif","https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2019/05/30/textract-ga-4.gif"];a(215),i.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(x.a,null,o.a.createElement(j.c,null,o.a.createElement(j.a,{path:"/about",component:function(){var e=Object(n.useState)(!1),t=Object(l.a)(e,2),a=t[0],r=t[1];return o.a.createElement(k,null,o.a.createElement("a",{href:"#"},o.a.createElement(A,null,"<","back")),o.a.createElement(O,null,o.a.createElement("div",{style:{height:60}}),o.a.createElement(S,null,"Bio"),o.a.createElement(q,null,!a&&o.a.createElement("div",{style:{width:200,height:200,float:"left"}}),o.a.createElement(F,Object.assign({onLoad:function(){return r(!0)}},{loaded:a},{src:"https://pk-resume.s3-us-west-2.amazonaws.com/27892933_423327414762672_6560785457737629696_n.jpg"})),o.a.createElement("b",null,"I'm Paul"),", your friendly neighborhood front-end engineer. For the past six years, I've worked in the field of Computer Vision to make complex Machine Learning concepts accessible to everyone."),o.a.createElement("br",null),o.a.createElement(q,null,"I helped build the facial recognition technology used by"," ",o.a.createElement("a",{href:"https://www.thorn.org/about-our-fight-against-sexual-exploitation-of-children/"},"Thorn")," ","to fight sex trafficking. I also worked heavily on the document analysis service used by"," ",o.a.createElement("a",{href:"https://aws.amazon.com/textract/customers/"},"Change Healthcare")," ","to process medical documents for millions of patients, as well as by the Washington Post to digitize their news platform. It's important to me that the things I build are used by the right people, for the right reasons."),o.a.createElement("br",null),o.a.createElement(q,null,o.a.createElement("b",null,"The future is coming faster by the day.")," For those of us with the power to enact change, it is our duty to ensure the march of progress doesn't trample over the rare and precious things that make us human."),o.a.createElement(S,{style:{color:"white",fontSize:40}},"Get in touch"),o.a.createElement(q,null,o.a.createElement(z,null,o.a.createElement("div",null,"Email:","    ",o.a.createElement("a",{style:{marginLeft:46},href:"mailto:paulkang@amazon.com"},"solipsistic@berkeley.edu")),o.a.createElement("div",null,"Github:"," ",o.a.createElement("a",{style:{marginLeft:33},href:"https://github.com/sollipse"},"sollipse")),o.a.createElement("div",null,"LinkedIn:"," ",o.a.createElement("a",{style:{marginLeft:10},href:"https://www.linkedin.com/in/paul-kang-67a75494/"},"Paul Kang"))))))}}),o.a.createElement(j.a,{path:"/work",component:function(){return o.a.createElement(I.b,null,o.a.createElement("a",{href:"#"},o.a.createElement(G,null,"<","back")),o.a.createElement("div",{style:{height:60}}),o.a.createElement(W,null,"Work Timeline",o.a.createElement("a",{download:!0,style:{color:"white",cursor:"pointer",fontSize:20,fontFamily:"Raleway"},href:"https://pk-resume.s3-us-west-2.amazonaws.com/Awesome_CV+(1).pdf"},"download resume")),o.a.createElement(B,null,o.a.createElement(C,null),o.a.createElement(H,{DateString:"01/2020",Head:o.a.createElement("a",{href:"https://console.aws.amazon.com/rekognition/custom-labels"},"Custom Labels"),Description:o.a.createElement("p",null,"The AWS Custom Labels console allows users without Machine Learning experience to train AI models capable of detecting custom objects.",o.a.createElement("br",null),"Some applications of this technology include:",o.a.createElement("ul",null,o.a.createElement("li",null,"Measuring how many times a product organically appears in the Twitter and Instagram live feeds."),o.a.createElement("li",null,"Sorting product by ripeness and size"),o.a.createElement("li",null,"Identifying malformed, warped, or miscolored products."),o.a.createElement("li",null,"Identifying counterfeit products.")),"The fundamental goal of Custom Labels is to create way for professions such as agriculture, fashion and construction to leverage the power of machine learning in their fields, without requiring a technical backround or engineering degree."),Gallery:o.a.createElement(I.a,null,U.map((function(e){return o.a.createElement("a",{href:e,"data-attribute":"SRL"},o.a.createElement(P,{src:e}))})))}),o.a.createElement(H,{DateString:"09/2019",Head:o.a.createElement("a",{href:"https://console.aws.amazon.com/textract/home"},"Textract"),Description:o.a.createElement("p",null,"Textract allows customers to pull raw text, key-values, and tables out of images of documents. This allows businesses and government organizations to automate the time-consuming and hard-to-scale process of data entry.",o.a.createElement("br",null),o.a.createElement("br",null),"Files processed through Textract are CSV compatible: an organization can take millions of tax forms, or loan applications, and digitize them searchably and sanely.",o.a.createElement("br",null),o.a.createElement("br",null),"As of the 2020 pandemic, Textract has been used extensively by multiple departments of the US government to process millions of loan and aid application documents."),Gallery:o.a.createElement(I.a,null,N.map((function(e){return o.a.createElement("a",{href:e,"data-attribute":"SRL"},o.a.createElement(P,{src:e}))})))})))}}),o.a.createElement(j.a,{path:"/",component:v})))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},81:function(e,t,a){e.exports=a(218)},86:function(e,t,a){}},[[81,1,2]]]);
//# sourceMappingURL=main.c20a4f43.chunk.js.map