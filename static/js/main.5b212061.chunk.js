(window["webpackJsonpfcc-calculator"]=window["webpackJsonpfcc-calculator"]||[]).push([[0],{12:function(e,t,a){e.exports=a(20)},17:function(e,t,a){},19:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(11),s=a.n(c),i=(a(17),a(1)),o=a(8),l=a.n(o),u=a(9),h=a(3),p=a(4),m=a(6),d=a(5),k=a(2),b=a(7),v=(a(19),function(e){function t(){return Object(h.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("button",{id:this.props.idName,className:"main-button",value:this.props.value,onClick:this.props.action},this.props.innerName)}}]),t}(r.a.Component)),N=function(e){function t(){return Object(h.a)(this,t),Object(m.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(b.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"display-container"},r.a.createElement("h1",{id:"display"},this.props.currentValue," "),r.a.createElement("h2",null," ",this.props.userTokenStack))}}]),t}(r.a.Component),g=function(e){function t(e){var a;return Object(h.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).state={currentValue:"0",userTokenStack:[],operatorStack:[],outputStack:[],hasDecimal:!1,isOperator:!1,isNegative:!1,total:null},a.handleChange=a.handleChange.bind(Object(k.a)(a)),a.clearState=a.clearState.bind(Object(k.a)(a)),a.handleCalculateTotal=a.handleCalculateTotal.bind(Object(k.a)(a)),a.precedenceChecker=a.precedenceChecker.bind(Object(k.a)(a)),a.previousOperatorCheck=a.previousOperatorCheck.bind(Object(k.a)(a)),a.checkForNegativeNumber=a.checkForNegativeNumber.bind(Object(k.a)(a)),a.checkForDecimal=a.checkForDecimal.bind(Object(k.a)(a)),a.operator=a.operator.bind(Object(k.a)(a)),a}return Object(b.a)(t,e),Object(p.a)(t,[{key:"checkForDecimal",value:function(e){switch(e){case".":this.setState({hasDecimal:!0})}}},{key:"previousOperatorCheck",value:function(e){switch(e){case" + ":case" - ":this.setState({isOperator:!0,hasDecimal:!1});break;case" x ":case" / ":this.setState({isOperator:!0,hasDecimal:!1,isNegative:!1});break;default:this.setState({isOperator:!1})}}},{key:"operator",value:function(e){switch(e){case" + ":case" - ":case" x ":case" /":return 1;default:return-1}}},{key:"checkForNegativeNumber",value:function(e){var t=parseFloat(e),a=this.state.currentValue[this.state.currentValue.length-3];if(console.log(a+" current: "+e),!isNaN(t)&&"-"===a){console.log("made it"),t="-"+t,console.log(t),console.log(this.state.currentValue);var n=this.state.currentValue,r=n.substring(0,n.length-4)+t;this.setState({currentValue:r}),console.log(this.state.currentValue)}}},{key:"precedenceChecker",value:function(e){switch(e){case"+":case"-":return 0;case"x":case"/":return 1}}},{key:"handleChange",value:function(){var e=Object(u.a)(l.a.mark(function e(t){var a,n,r,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(this.state.hasDecimal),a=t.target.value,!(this.state.hasDecimal&&"."===a||this.state.isOperator&&isNaN(a))){e.next=8;break}return n=this.state.currentValue.charAt(this.state.currentValue.length-2)," - "===a&&"-"!==n?this.setState({currentValue:this.state.currentValue+a}):this.state.isOperator&&this.operator(a)&&"."!==a&&(r=this.state.currentValue,c=r.substring(0,r.length-2)+a,this.setState({currentValue:c})),!this.state.hasDecimal&&this.state.isOperator&&"."===a&&this.setState({currentValue:this.state.currentValue+a,hasDecimal:!0}),e.abrupt("return");case 8:return"0"===this.state.currentValue&&this.state.isOperator?this.setState({currentValue:this.state.currentValue+a}):"0"===this.state.currentValue?this.setState({currentValue:a}):this.setState({currentValue:this.state.currentValue+a}),e.next=13,this.previousOperatorCheck(a);case 13:return e.next=15,this.checkForDecimal(a);case 15:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"handleCalculateTotal",value:function(){var e=Object(u.a)(l.a.mark(function e(){var t,a,n,r,c,s,o,u,h,p,m=this;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("handle calc: "+this.state.currentValue),e.next=3,this.state.currentValue.split(" ");case 3:return t=e.sent,e.next=6,t.filter(function(e){return""!==e});case 6:for(t=e.sent,a=0;a<t.length;a++)"-"===t[a]&&isNaN(t[a-1])&&(n="-"+t[a+1],t[a+1]=n,t.splice(a,1));return e.t0=this,e.next=12,[].concat(Object(i.a)(this.state.userTokenStack),Object(i.a)(t));case 12:e.t1=e.sent,e.t2={userTokenStack:e.t1},e.t0.setState.call(e.t0,e.t2),console.log("pre tokenstack "+this.state.userTokenStack),this.state.userTokenStack.forEach(function(e){var t=parseFloat(e);if(isNaN(t))if(void 0===m.state.operatorStack||0===m.state.operatorStack.length)m.setState({operatorStack:[].concat(Object(i.a)(m.state.operatorStack),[e])});else{var a=Object(i.a)(m.state.operatorStack),n=Object(i.a)(m.state.outputStack),r=a.pop();m.precedenceChecker(e)<=m.precedenceChecker(r)?(n.push(r),a.push(e),m.setState({operatorStack:Object(i.a)(a),outputStack:Object(i.a)(n)})):(a.push(r,e),m.setState({operatorStack:Object(i.a)(a)}))}else m.setState({outputStack:[].concat(Object(i.a)(m.state.outputStack),[e])})}),this.setState({outputStack:[].concat(Object(i.a)(this.state.outputStack),Object(i.a)(this.state.operatorStack.reverse()))}),console.log("final order: "+this.state.outputStack),r=null,c=null,s=Object(i.a)(this.state.outputStack),o=[],u=null,h=0;case 25:if(!(h<s.length)){e.next=52;break}if(console.log(h),console.log(o),!isNaN(s[h])){e.next=47;break}console.log("in here also: "+s[h]),c=o.pop(),r=o.pop(),e.t3=s[h],e.next="+"===e.t3?35:"-"===e.t3?37:"x"===e.t3?39:"/"===e.t3?41:43;break;case 35:return u=r+c,e.abrupt("break",44);case 37:return u=r-c,e.abrupt("break",44);case 39:return u=r*c,e.abrupt("break",44);case 41:return u=r/c,e.abrupt("break",44);case 43:return e.abrupt("break",44);case 44:o.push(u),e.next=49;break;case 47:console.log("number: "+s[h]),o.push(parseFloat(s[h]));case 49:h++,e.next=25;break;case 52:console.log(" modulu: "+o[0]),null===o[0]&&(o[0]=0),p=o[0]%1===0?o[0].toFixed(0):o[0].toFixed(4),this.clearState(),this.setState({currentValue:p});case 57:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"clearState",value:function(){this.setState({currentValue:"0",userTokenStack:[],operatorStack:[],outputStack:[],hasDecimal:!1,isOperator:!1,isNegative:!1,total:null})}},{key:"render",value:function(){return r.a.createElement("div",{className:"calculator"},r.a.createElement("div",{className:"grid-container"},r.a.createElement(N,{currentValue:this.state.currentValue,userTokenStack:this.state.userTokenStack,total:this.state.total}),r.a.createElement(v,{idName:"clear",innerName:"AC",action:this.clearState}),r.a.createElement(v,{idName:"one",innerName:"1",value:"1",action:this.handleChange}),r.a.createElement(v,{idName:"two",innerName:"2",value:"2",action:this.handleChange}),r.a.createElement(v,{idName:"three",innerName:"3",value:"3",action:this.handleChange}),r.a.createElement(v,{idName:"four",innerName:"4",value:"4",action:this.handleChange}),r.a.createElement(v,{idName:"five",innerName:"5",value:"5",action:this.handleChange}),r.a.createElement(v,{idName:"six",innerName:"6",value:"6",action:this.handleChange}),r.a.createElement(v,{idName:"seven",innerName:"7",value:"7",action:this.handleChange}),r.a.createElement(v,{idName:"eight",innerName:"8",value:"8",action:this.handleChange}),r.a.createElement(v,{idName:"nine",innerName:"9",value:"9",action:this.handleChange}),r.a.createElement(v,{idName:"zero",innerName:"0",value:"0",action:this.handleChange}),r.a.createElement(v,{idName:"add",innerName:"+",value:" + ",action:this.handleChange}),r.a.createElement(v,{idName:"subtract",innerName:"-",value:" - ",action:this.handleChange}),r.a.createElement(v,{idName:"multiply",innerName:"X",value:" x ",action:this.handleChange}),r.a.createElement(v,{idName:"divide",innerName:"/",value:" / ",action:this.handleChange}),r.a.createElement(v,{idName:"equals",innerName:"=",value:" = ",action:this.handleCalculateTotal}),r.a.createElement(v,{idName:"decimal",value:".",innerName:".",action:this.handleChange})))}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,1,2]]]);
//# sourceMappingURL=main.5b212061.chunk.js.map