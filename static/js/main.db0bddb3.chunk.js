(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(e,t,a){},16:function(e,t,a){},17:function(e,t,a){},18:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(8),r=a.n(s),o=(a(15),a(2)),c=a(3),l=a(6),u=a(4),m=a(1),h=a(5),g=function(e){function t(){return Object(o.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement("li",null,i.a.createElement("button",{onClick:function(){return e.props.submitAnswer(e.props.value)}},this.props.value))}}]),t}(n.Component),d=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={questionNumber:0,category:"",correct_answer:"",difficulty:"",incorrect_answers:[],question:"",answers:[],loading:!0},a.getQuestionData=a.getQuestionData.bind(Object(m.a)(a)),a.decodeHTML=a.decodeHTML.bind(Object(m.a)(a)),a.shuffleArray=a.shuffleArray.bind(Object(m.a)(a)),a.submitAnswer=a.submitAnswer.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"decodeHTML",value:function(e){var t=document.createElement("textarea");return t.innerHTML=e,t.value}},{key:"shuffleArray",value:function(e){for(var t=e.length-1;t>0;t--){var a=Math.floor(Math.random()*(t+1)),n=[e[a],e[t]];e[t]=n[0],e[a]=n[1]}return e}},{key:"getQuestionData",value:function(){var e=this.props.questions[this.state.questionNumber],t=this.decodeHTML(e.question),a=e.incorrect_answers;a.push(e.correct_answer);var n=this.shuffleArray(a),i=this.decodeHTML(e.correct_answer);this.setState({category:e.category,correct_answer:i,difficulty:e.difficulty,incorrect_answers:e.incorrect_answers,question:t,answers:n,loading:!1})}},{key:"submitAnswer",value:function(e){var t=this;e===this.state.correct_answer?this.state.questionNumber===this.props.questions.length-1?(console.log("right answer. set isTrivia to false (overflow)"),this.props.isTriviaSwitch()):(console.log("right answer. next question number (+1 state) and update question (no overflow)"),this.setState({questionNumber:this.state.questionNumber+1},function(){t.getQuestionData()})):this.state.questionNumber===this.props.questions.length-1?(console.log("wrong answer + overflow. set isTrivia to false"),this.props.isTriviaSwitch()):(console.log("no overflow + wrong answer next question number (+1 state) and update question"),this.setState({questionNumber:this.state.questionNumber+1},function(){t.getQuestionData()}))}},{key:"componentDidMount",value:function(){this.getQuestionData()}},{key:"render",value:function(){var e=this,t=this.state,a=t.correct_answer,n=t.difficulty,s=t.question,r=t.answers;return t.loading?i.a.createElement("h1",null,"loading!"):i.a.createElement("div",null,i.a.createElement("p",null,"difficulty: ",n),i.a.createElement("h3",null,s),i.a.createElement("h4",null,"correct answer: ",a),i.a.createElement("ul",null,r.map(function(t){var a=e.decodeHTML(t);return i.a.createElement(g,{value:a,submitAnswer:e.submitAnswer})})))}}]),t}(n.Component),p=(a(16),[{id:9,name:"General Knowledge"},{id:10,name:"Entertainment: Books"},{id:11,name:"Entertainment: Film"},{id:12,name:"Entertainment: Music"},{id:13,name:"Entertainment: Musicals & Theatres"},{id:14,name:"Entertainment: Television"},{id:15,name:"Entertainment: Video Games"},{id:16,name:"Entertainment: Board Games"},{id:17,name:"Science & Nature"},{id:18,name:"Science: Computers"},{id:19,name:"Science: Mathematics"},{id:20,name:"Mythology"},{id:21,name:"Sports"},{id:22,name:"Geography"},{id:23,name:"History"},{id:24,name:"Politics"},{id:25,name:"Art"},{id:26,name:"Celebrities"},{id:27,name:"Animals"},{id:28,name:"Vehicles"},{id:29,name:"Entertainment: Comics"},{id:30,name:"Science: Gadgets"},{id:31,name:"Entertainment: Japanese Anime & Manga"},{id:32,name:"Entertainment: Cartoon & Animations"}]),v=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={isRulesToggled:!1,isCategoriesToggled:!1},a.toggleRules=a.toggleRules.bind(Object(m.a)(a)),a.toggleCategories=a.toggleCategories.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"toggleRules",value:function(){this.setState({isRulesToggled:!this.state.isRulesToggled,isCategoriesToggled:!1})}},{key:"toggleCategories",value:function(){this.setState({isCategoriesToggled:!this.state.isCategoriesToggled,isRulesToggled:!1})}},{key:"render",value:function(){var e=this,t=this.state,a=t.isRulesToggled,n=t.isCategoriesToggled;return i.a.createElement("div",{className:"main-menu-container"},n?i.a.createElement("div",{className:"categories-container"},i.a.createElement("h1",null,"Category list"),i.a.createElement("p",null,"Choose any category you want to answer questions on!"),i.a.createElement("ul",{className:"category-list"},i.a.createElement("li",{className:"category-item"},i.a.createElement("button",{onClick:function(){e.props.applyCategory(1),e.toggleCategories()}},"All categories (default)")),p.map(function(t){return i.a.createElement("li",{className:"category-item",key:t.id},i.a.createElement("button",{onClick:function(){e.props.applyCategory(t.id),e.toggleCategories()}},t.name))}))):i.a.createElement("div",{className:"header"},i.a.createElement("h1",{className:"title"},"Trivia quiz"),i.a.createElement("div",{className:"settings"},i.a.createElement("button",{className:"button button-settings",onClick:this.toggleRules},i.a.createElement("h3",null,i.a.createElement("i",{className:"fas fa-list"})," Rules")),i.a.createElement("button",{className:"button button-categories",onClick:function(){e.toggleCategories(),e.props.triviaSwitch()}},i.a.createElement("h3",null,i.a.createElement("i",{className:"fas fa-cog"})," Categories"))),a?i.a.createElement("p",{className:"rules-info"},"Choose the category you like the most (or don't choose anything) and press start button.",i.a.createElement("br",null)," You will get Score-points for each correct answer, the amount of which depends on the difficulty ",i.a.createElement("br",null),"For each wrong answer you will lose score-points as well. ",i.a.createElement("br",null),i.a.createElement("br",null),"Good luck to you!"):null))}}]),t}(n.Component),f=(a(17),function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={error:null,questions:null,isTrivia:!1,isTriviaMenu:!0,category:0,difficulty:0,questionsNumber:10},a.isTriviaSwitch=a.isTriviaSwitch.bind(Object(m.a)(a)),a.apiCall=a.apiCall.bind(Object(m.a)(a)),a.applyCategory=a.applyCategory.bind(Object(m.a)(a)),a.switchTriviaMenu=a.switchTriviaMenu.bind(Object(m.a)(a)),a}return Object(h.a)(t,e),Object(c.a)(t,[{key:"apiCall",value:function(e){var t=this;fetch(e).then(function(e){return e.json()}).then(function(e){t.setState({questions:e.results,error:!1})}).catch(function(e){return console.error(e)},function(){t.setState({error:!0})})}},{key:"componentWillMount",value:function(){this.apiCall("https://opentdb.com/api.php?amount=10")}},{key:"isTriviaSwitch",value:function(){var e=this;this.setState({isTrivia:!this.state.isTrivia},function(){1!==e.state.category&&0!==e.state.category?e.apiCall("https://opentdb.com/api.php?amount=10&category="+e.state.category):e.apiCall("https://opentdb.com/api.php?amount=10")})}},{key:"applyCategory",value:function(e){this.switchTriviaMenu(),this.setState({isTrivia:!1,category:e}),1===e?this.apiCall("https://opentdb.com/api.php?amount=10"):(this.apiCall("https://opentdb.com/api.php?amount=10&category=".concat(e)),console.log("current category: "+e))}},{key:"switchTriviaMenu",value:function(){this.setState({isTriviaMenu:!this.state.isTriviaMenu})}},{key:"render",value:function(){var e=this.state,t=e.isTrivia,a=e.questions,n=e.isTriviaMenu;return a?i.a.createElement("div",{className:"main-container"},i.a.createElement("div",{className:"inner-container"},i.a.createElement(v,{applyCategory:this.applyCategory,triviaSwitch:this.switchTriviaMenu}),n?i.a.createElement("div",{className:"trivia-menu"},this.state.isTrivia?i.a.createElement(d,{questions:this.state.questions,isTriviaSwitch:this.isTriviaSwitch}):"press start",i.a.createElement("button",{onClick:this.isTriviaSwitch},t?"Menu":"Start!")):null)):i.a.createElement("div",null,"LOADING")}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},9:function(e,t,a){e.exports=a(18)}},[[9,1,2]]]);
//# sourceMappingURL=main.db0bddb3.chunk.js.map