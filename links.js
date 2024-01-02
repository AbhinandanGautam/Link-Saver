function renderLinks(){
    var pageBody = document.getElementById("pageBody");
    pageBody.innerHTML = "";
    pageBody.innerHTML = `<h2>Stored Links:</h2>
    <ul id="linksList"></ul>`;
    
    chrome.storage.local.get({ links: [] }, function (result) {
        var links = result.links || [];
        var linksList = document.getElementById("linksList");
        linksList.innerHTML = "";
        links.forEach((link, index) => {
            var listItem = document.createElement("li");
            listItem.innerHTML = `<a href="${link}" target="_blank">${link}</a> <button class="deleteBtn" data-index="${index}">Delete</button>`
            linksList.appendChild(listItem);
        });
    });

    var linksList = document.getElementById("linksList");
    linksList.addEventListener('click', (e) => {
        if(e.target.getAttribute('data-index')){
            var indexToDelete = parseInt(e.target.getAttribute('data-index'), 10);
            chrome.storage.local.get({ links: [] }, function (result) {
                var updatedLinks = result.links || [];
                updatedLinks.splice(indexToDelete, 1);
                chrome.storage.local.set({ links: updatedLinks });
                renderLinks();
            });
        }
    })
}

function passwordPage(){
    var pageBody = document.getElementById("pageBody");
    pageBody.innerHTML = `<h2>Enter Password</h2>
    <form id="passwordForm">
        <label for="password">Password:</label>
        <input type="password" id="password" required>
        <button type="submit">Submit</button>
    </form>`;

    var passwordForm = document.getElementById("passwordForm");
    passwordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var passwordInput = document.getElementById('password');
        var password = passwordInput.value.trim();

        if (password === '1234') {
            renderLinks();
        } else {
            alert('Incorrect password. Please try again.');
        }
    })
}

document.addEventListener("DOMContentLoaded", () => passwordPage());
