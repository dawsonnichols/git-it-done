var issueContainerEl = document.querySelector("#issues-container");



var getRepoIssues = function(repo) {
console.log(repo); 
var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; 
fetch(apiUrl).then(function(response) {
    if (response.ok) {
        response.json().then(function(data) {
            dispalyIssues(data);  
        });
    } else { 
        alert("There was a problem with your request!"); 
}
}); 
}
getRepoIssues("facebook/react"); 

var dispalyIssues = function(issues) {
    if (issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues!";
        return; 
    }
    for (var i = 0; i < issues.length; i++) {
        // create link element to take users to github issues 
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center"
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank"); 
        // crete span to hold issues title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;
        // append to container
        issueEl.appendChild(titleEl); 
        // create a type element
        var typeEl = document.createElement("span"); 
        // check if issue is an actual issue or a pull request 
        if (issues[i].pull_request) {
            typeEl.textContent = "(pull request)";
        } else {
            typeEl.textcontent = "(Issue)"; 
        }
        issueEl.appendChild(typeEl); 
        issueContainerEl.appendChild(issueEl); 
    }
}