function checkRoles() {
    const member = model.members;
    const inputs = model.input;
    inputs.totalbonus = 0;
    let roletypes = ['tank', 'heal', 'mage', 'melee', 'range'];
    inputs.rolecomp = [0, 0, 0, 0, 0];
    for (let i = 0; i < member.length; i++) {
        for (let x = 0; x < roletypes.length; x++) {
            if (member[i].type == roletypes[x]) {
                inputs.rolecomp[x]++
            }
        }
    }
    for (let i = 0; i < inputs.rolecomp.length; i++) {
        if (inputs.rolecomp[i] > 0) {
            inputs.totalbonus++
        }
    }
    updateView();
}

function selectName(index) {
    const inputs = model.input;
    const member = model.members;
    if (inputs.selection[1] == member[index].name) inputs.selection[1] = null
    else inputs.selection[1] = member[index].name;
    inputs.selection[0] = null;
    inputs.selection[2] = null;
    let topPosition = (index * 50) + 200;
    inputs.selection[3] = topPosition;
    updateView();
}

function removeInfo() {
    const inputs = model.input;
    inputs.selection[1] = null;
    updateView();
}

function selectJob(type, index) {
    const inputs = model.input;
    const member = model.members;
    if (type == 'allround') {
        index == 'Tank' ? type = 'tank' :
        index == 'Healer' ? type = 'heal' :
        index == 'Magic' ? type = 'mage' :
        index == 'Melee' ? type = 'melee' :
        index == 'Range' ? type = 'range' : 
        index == 'remove' ? type = null : ''
    }
    if (index == 'remove') member[inputs.selection[0]].role = null;
    else member[inputs.selection[0]].role = index;
    member[inputs.selection[0]].type = type;
    inputs.selection[0] = null;
    checkRoles();
    updateView();
}

function showRoleSelection(index) {
    const inputs = model.input;
    if (inputs.selection[0] == index) inputs.selection[0] = null
    else inputs.selection[0] = index;
    inputs.selection[1] = null;
    inputs.selection[2] = null;
    let topPosition = index <= 2 ? (index * 50) + 150 : 250;
    inputs.selection[3] = topPosition;
    updateView();
}

function showPosSelection(index) {
    const inputs = model.input;
    if (inputs.selection[2] == index) inputs.selection[2] = null
    else inputs.selection[2] = index;
    inputs.selection[0] = null;
    inputs.selection[1] = null;
    let topPosition = index <= 5 ? (index * 50) + 150 : 400;
    inputs.selection[3] = topPosition;
    updateView();
}

function selectPos(posIndex) {
    const inputs = model.input;
    const member = model.members;
    member[inputs.selection[2]].pos = posIndex;
    inputs.selection[2] = null;
    updateView();
}