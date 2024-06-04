function insertPin(index) {
    const inputs = model.input;
    const users = model.users;
    const app = model.app;
    inputs.pin += index;
    for (let i = 0; i < users.length; i++) {
        if (inputs.pin == users[i].pin) app.login = users[i];
    }
    if (!app.login && inputs.pin.length >= 4) inputs.pin = ''
    else if (app.login) app.page = 'main';
    updateView()
}
