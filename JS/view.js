function updateView() {
    const page = model.app.page;
    if (page == null) pinPage();
    if (page == 'main') mainPage();
    document.getElementById('app').innerHTML = model.html;
};

function pinPage() {
    model.html = /*HTML*/`
        <h1>Insert PIN</h1>
        <h2>${displayedPin()}</h2>
        <br/><br/>
        <div class="pinGrid">
            ${displayNumbers(1, 9)}
            <div></div>
            ${displayNumbers(0, 0)}
        </div>
    `;
};

function displayNumbers(startValue, endValue) {
    let innerHTML = '';
    for (let i = startValue; i <= endValue; i++) {
        innerHTML += /*HTML*/`
            <div class="pinButton" onclick="insertPin(${i})">${i}</div>
        `;
    }
    return innerHTML;
};

function displayedPin() {
    const pin = model.input.pin;
    let innerHTML = '';
    for (let i = 0; i < 3; i++) {
        innerHTML += 
            !pin.slice(i, (i+1)) ? '*&ensp;' : pin.slice(i, (i+1)) + '&ensp;'
    }
    innerHTML += !pin.slice(3,4) ? '*' : pin.slice(3,4)
    return innerHTML;
};

function mainPage() {
    model.html = /*HTML*/`
        <h1>yo</h1>
    `;
}