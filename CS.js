var refresh
function showHome() {
	clearInterval(refresh);
    if (currentTab != "Home") {
        currentTab = "Home";
        showNoTabs();
        document.getElementById("Home").style.backgroundColor = "lightBlue";
        document.getElementById("SectionA").style.display = "inline";
    }
}

function showCourses(cPS) {
    if (currentTab != "Courses") {
        currentTab = "Courses";
        showNoTabs();
        document.getElementById("Courses").style.backgroundColor = "lightBlue";
		document.getElementById("SectionB").style.display = "inline";
		}
        var tableContent = "<tr class='Title'><td>CourseCode</td><td>Title</td><td>Description</td></tr>";
        for (var i = 0; i < cPS.length; ++i) {     
			if(i&1==1){
				tableContent+="<tr class='Odd'>";
			}
			else{
				tableContent+="<tr class='Even'>";
			}
			tableContent += "<td>"  +cPS[i].catalogNbr +"</td><td>"+ cPS[i].title +"</td><td>"+ cPS[i].description+"</td></tr>";
        }
	document.getElementById("cTab").innerHTML = tableContent;
}

function showPeople(list) {
    if (currentTab != "People") {
        currentTab = "People";
        showNoTabs();
        document.getElementById("People").style.backgroundColor = "lightBlue";
        document.getElementById("SectionC").style.display = "inline";
    }
    var tableContent = "<tr class='Title'><td>Name</td><td>Picture</td><td>email</td><td>phone</td><td>add contact</td></tr>";
    for (var i = 0; i < list.length; ++i) { 
		if(i&1==1){
				tableContent+="<tr class='Odd'>";
		}
		else{
			tableContent+="<tr class='Even'>";
		}
		name = list[i].firstname + " " + list[i].lastname;
		personId = list[i].personId;
		imageId = list[i].imageId;
		if(imageId == undefined){image = "<img src='logo.svg'style='width:115px;height:115px;'>";}
		else{
			imgurl = 'https://unidirectory.auckland.ac.nz/people/imageraw/'+ personId + '/' + imageId +'/small';
			image = "<img src='"+imgurl+"style='width:100%;height:100%;'"+">"; }
		email = "<a href='mailto:"+list[i].emailAddresses[0]+"'>&#9993;</a>";
		if (list[i].extn == undefined){phone = "n/a";}
		else{phone = "<a href='tel:09-373 7999,"+list[i].extn+"'>&#9742;</a";}
		vcard = "<a href='https://unidirectory.auckland.ac.nz/people/vcard/"+list[i].profileUrl[1]+"'>+&#9786</a>";
		tableContent += "<td>"+name+"</td><td>"+image+"</td><td>"+email+"</td><td>"+phone+"</td><td>"+vcard+"</td></tr>";
    }
	document.getElementById("pTab").innerHTML = tableContent;
}


function showNews(feed) {
    if (currentTab != "News") {
        currentTab = "News";
        showNoTabs();
        document.getElementById("News").style.backgroundColor = "lightBlue";
        document.getElementById("SectionD").style.display = "inline";
	}
		var content = '';
		var channels = feed.getElementsByTagName("channel");
		var items = channels.item(0).getElementsByTagName("item");	
	
		for (item in items) {
			content += "<div>" + (typeof items[item].childNodes != 'undefined' ? "<a href='" + items[item].childNodes[5].textContent + "'>" + items[item].childNodes[1].textContent : '') + "</a></b></h3><p>" + (typeof items[item].childNodes != 'undefined' ? items[item].childNodes[3].textContent: '') + "</p><hr></div>";
		}
		document.getElementById("newsdiv").innerHTML += content;
}

function showNotices(feed) {
    if (currentTab != "Notices") {
        currentTab = "Notices";
        showNoTabs();
        document.getElementById("Notices").style.backgroundColor = "lightBlue";
        document.getElementById("SectionE").style.display = "inline";
	}
		var content = '';
		var channels = feed.getElementsByTagName("channel");
		var items = channels.item(0).getElementsByTagName("item");	
	
		for (item in items) {
			content += "<div>" + (typeof items[item].childNodes != 'undefined' ? "<a href='" + items[item].childNodes[5].textContent + "'>" + items[item].childNodes[1].textContent : '') + "</a></b></h3><p>" + (typeof items[item].childNodes != 'undefined' ? items[item].childNodes[3].textContent: '') + "</p><hr></div>";
		}
	document.getElementById("noticesdiv").innerHTML += content;

}
function showComments(feed) {
    if (currentTab != "GuestBook") {
        currentTab = "GuestBook";
        showNoTabs();
        document.getElementById("GuestBook").style.backgroundColor = "lightBlue";
        document.getElementById("SectionF").style.display = "inline";
	}
	var content = '';
	content += feed;
	document.getElementById("commentdiv").innerHTML = content;
}
function postcomment(){
	var name = document.getElementById("name").value;
	var comment = document.getElementById("message").value;
	var xhr = new XMLHttpRequest
	var uri = 	"http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/comment?name="+name;
	xhr.open("POST", uri, true);
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

xhr.send(JSON.stringify(comment));
	xhr.onload = function () {
	}
}

function showNoTabs() {
    document.getElementById("Home").style.backgroundColor = "transparent";
    document.getElementById("Courses").style.backgroundColor = "transparent";
    document.getElementById("People").style.backgroundColor = "transparent";
    document.getElementById("News").style.backgroundColor = "transparent";
    document.getElementById("Notices").style.backgroundColor = "transparent";
    document.getElementById("GuestBook").style.backgroundColor = "transparent";

    document.getElementById("SectionA").style.display = "none";
    document.getElementById("SectionB").style.display = "none";
    document.getElementById("SectionC").style.display = "none";
    document.getElementById("SectionD").style.display = "none";
    document.getElementById("SectionE").style.display = "none";
    document.getElementById("SectionF").style.display = "none";
}
function getCourses() {
	clearInterval(refresh);
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/courses";
	// var uri =  "http://redsox.tcs.auckland.ac.nz/ups/UniProxService.svc/courses";
	xhr.open("GET",uri,true);
	xhr.onload = function(){
		resp =JSON.parse(xhr.responseText);
		showCourses(resp.data);
		//showCourses(resp.courses.coursePaperSection);
	}
	xhr.send(null);
}
function getPeople() {
	clearInterval(refresh);
    var xhr = new XMLHttpRequest();
    var uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/people";
    xhr.open("GET", uri, true);
    xhr.onload = function () {
        resp = JSON.parse(xhr.responseText);
        showPeople(resp.list);
    }
    xhr.send(null);
}
function getNews(){
	clearInterval(refresh);
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/newsfeed";
	xhr.open("GET",uri, true);
	xhr.onload = function() {
		if (this.readyState == 4 && this.status == 200) {
			var toparse = new DOMParser();
			var feed = toparse.parseFromString(this.responseText, 'text/xml');
			showNews(feed);
		}
	};
	xhr.send(null);
}
function getNotices(){
	clearInterval(refresh);
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/noticesfeed";
	xhr.open("GET",uri, true);
	xhr.onload = function() {
		if (this.readyState == 4 && this.status == 200) {
			var toparse = new DOMParser();
			var feed = toparse.parseFromString(this.responseText, 'text/xml');
			showNotices(feed);
		}
	};
	xhr.send(null);
}
function getComments(){
	var xhr = new XMLHttpRequest();
	var uri = "http://redsox.uoa.auckland.ac.nz/ups/UniProxService.svc/htmlcomments";
	xhr.open("GET",uri, true);
	xhr.onload = function() {
		if (this.readyState == 4 && this.status == 200) {
			showComments(xhr.responseText);
		}
	};
	xhr.send(null);
}
function caller() {
    refresh = setInterval(getComments, 500);
}
