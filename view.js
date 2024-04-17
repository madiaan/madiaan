let html = '';

function updateView() {
    mainPage();
    document.getElementById('app').innerHTML = html;
}

function mainPage() {
    html = /*HTML*/ `
    <h1>yo</h1>
    <div>description</div>
    <button>knapp</button>
    <br/><br/><br/>
    <div>hello world</div>
    `;
}