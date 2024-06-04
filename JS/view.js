function updateView() {
    let html = '';
    html = mainPage();
    document.getElementById('app').innerHTML = html;
}

function mainPage() {
    const inputs = model.input;
    const bonus = model.input.totalbonus;
    let html = /*HTML*/`
        <h1>DawnTrail Compositions</h1><br/>
        <div class="centered">  
        ${inputs.selection[1] !== null ? displayMemberInfo() : ''}
        ${inputs.selection[0] !== null ? displayRoleSelection() : ''}
        ${inputs.selection[2] !== null ? displayPosSelection() : ''}
            <div class="memberTable">
                <h2>Gamers</h2>
                <div class="members">
                    ${displayMembers()}
                </div>
            </div>
        </div>
        <br/><br/>
        <div class="compInfo">
            <div class="bonus">
                <div>bonus</div>
                <div class="bonuss" style="color: ${bonusColor()}">${bonus ? bonus : '0'}%</div>
            </div>
            <div class="missing">
                ${checkComp()}
            </div>
        </div>
            
    `;
    return html;
}

function displayMemberInfo() {
    const member = model.members;
    const inputs = model.input;
    let innerhtml = `<img class="memberInfo" style="top: ${inputs.selection[3]}px" onclick="removeInfo();" src="pics/${inputs.selection[1]}.jpg"/>`;
    //for (let i = 0; i < member.length; i++) {
    //    innerhtml += `<img class="memberInfo" src="pics/${i}.jpg"/>`
    //}
    return innerhtml;
}

function checkComp() {
    const inputs = model.input;
    const member = model.members;
    let view = ['rgb(72,197,0)', 'rgb(204, 58, 58)', '✔️', '❌', 'gray', '❔']
    let tankcheck = inputs.rolecomp[0] >= 2 ? true : false;
    let healcheck = [false, false, false, false];
    let dpscheck = [(inputs.rolecomp[2] ? true : false), (inputs.rolecomp[3] ? true : false), (inputs.rolecomp[4] ? true : false)];
    let overlap = true;
    const roles = new Set();
    let innerhtml = '';
    for (let i = 0; i < member.length; i++) {
        if (member[i].role == 'Healer') {
            healcheck[2] = true;
            healcheck[3] = true;
        }
        else {
            if (member[i].role == 'WHM' || member[i].role == 'AST') {
                healcheck[0] = true;
                healcheck[2] = false;
            }
            if (member[i].role == 'SCH' || member[i].role == 'SGE') {
                healcheck[1] = true;
                healcheck[3] = false;
            }
        }
    }
    for (let i = 0; i < member.length; i++) {
        if (member[i].type) {
            if (member[i].role !== 'Tank' && member[i].role !== 'Healer' && member[i].role !== 'Magic' && member[i].role !== 'Melee' && member[i].role !== 'Range') {
                if (roles.has(member[i].role)) {
                    overlap = false;
                    break;
                }
                roles.add(member[i].role);
            }
        }
    }
    if (inputs.rolecomp[0] > 4 || inputs.rolecomp[1] > 4 || inputs.rolecomp[2] > 4 || inputs.rolecomp[3] > 6 || inputs.rolecomp[4] > 3) overlap = false;
    const checkerDiv = '<div class="checker" style="color: ';
    innerhtml += /*HTML*/`
        ${checkerDiv}${tankcheck ? view[0] : view[1]}">${tankcheck ? view[2] : view[3]}2 Tanks</div>
        ${checkerDiv}${healcheck[0] ? view[0] : healcheck[2] ? view[4] : view[1]}">${healcheck[0] ? view[2] : healcheck[2] ? view[5] : view[3]}Pure Healer</div>
        ${checkerDiv}${healcheck[1] ? view[0] : healcheck[3] ? view[4] : view[1]}">${healcheck[1] ? view[2] : healcheck[3] ? view[5] : view[3]}Shield Healer</div>
        ${checkerDiv}${dpscheck[0] ? view[0] : view[1]}">${dpscheck[0] ? view[2] : view[3]}Magic DPS</div>
        ${checkerDiv}${dpscheck[1] ? view[0] : view[1]}">${dpscheck[1] ? view[2] : view[3]}Melee DPS</div>
        ${checkerDiv}${dpscheck[2] ? view[0] : view[1]}">${dpscheck[2] ? view[2] : view[3]}Ranged DPS</div>
        ${checkerDiv}${overlap ? view[0] : view[1]}">${overlap ? view[2] : view[3]}Different jobs</div>
    `;
    inputs.healer = healcheck;
    return innerhtml;
}

function bonusColor() {
    const bonus = model.input.totalbonus;
    if (!bonus) return 'rgb(83,0,0)'
    if (bonus == 1) return 'rgb(155,0,0)'
    if (bonus == 2) return 'rgb(197,56,0)'
    if (bonus == 3) return 'rgb(197,118,0)'
    if (bonus == 4) return 'rgb(197,177,0)'
    if (bonus == 5) return 'rgb(72,197,0)'
}

function displayMembers() {
    const member = model.members;
    const inputs = model.input;
    const roleCount = {};
    const roles = new Set();
    const posCount = {};
    const positions = new Set();
    let innerHTML = ''
    for (let i = 0; i < member.length; i++) {
        if (member[i].role) {
            if (member[i].role !== 'Tank' && member[i].role !== 'Healer' && member[i].role !== 'Magic' && member[i].role !== 'Melee' && member[i].role !== 'Range') {
                if (roleCount[member[i].role]) {
                    roleCount[member[i].role]++;
                    roles.add(member[i].role);
                }
                else {
                    roleCount[member[i].role] = 1;
                }
            }
        }
        if (member[i].pos) {
            if (posCount[member[i].pos]) {
                posCount[member[i].pos]++;
                positions.add(member[i].pos);
            }
            else {
                posCount[member[i].pos] = 1;
            }
        }
    }
    for (let i = 0; i < member.length; i++) {
        const roleDupe = member[i].role && roles.has(member[i].role);
        const posDupe = member[i].pos && positions.has(member[i].pos);

        innerHTML += /*HTML*/`
            <div class="memberRole" onclick="showRoleSelection(${i})" 
                style="background-color: ${member[i].type == 'tank' ? 'lightblue' :
                                            member[i].type == 'heal' ? 'lightgreen' :
                                            member[i].type == 'mage' ? 'magenta' :
                                            member[i].type == 'melee' ? 'coral' :
                                            member[i].type == 'range' ? 'orange' : 'white'}; ${inputs.selection[0] == i ? 'border: 4px solid green;' : ''}">
                ${memberRole(i)}
            </div>
            <div class="${!roleDupe ? 'memberY' : 'memberN'}" ${selectedSquare('name', member[i].name, roleDupe)} onclick="selectName(${i})">${member[i].name}</div>
            <div class="${!posDupe ? 'memberY' : 'memberN'}" ${selectedSquare('pos', i, posDupe)} onclick="showPosSelection(${i})">${member[i].pos ? member[i].pos : ''}</div>
        `;
    }
    return innerHTML;
}

function selectedSquare(typeIndex, memberIndex, dupeIndex) {
    const selected = model.input.selection;
    if (typeIndex == 'name' && selected[1] == memberIndex) {
        if (!dupeIndex) return 'style="background-color: rgb(150, 150, 150)"'
        else if (dupeIndex) return 'style="background-color: rgb(201, 100, 89)"'
    }
    if (typeIndex == 'pos' && selected[2] == memberIndex) {
        if (!dupeIndex) return 'style="background-color: rgb(150, 150, 150)"'
        else if (dupeIndex) return 'style="background-color: rgb(201, 100, 89)"'
    }
}

function displayPosSelection() {
    const inputs = model.input;
    const member = model.members;
    const position = ['MT','OT','H1','H2','M1','M2','R1','R2']
    let innerhtml = /*HTML*/`
        <div class="posWindow" style="top: ${inputs.selection[3]}px">
    `;
    for (let i = 0; i < position.length; i++) {
        innerhtml += /*HTML*/`
            <div class="posSelect" onclick="selectPos('${position[i]}')">${position[i]}</div>
        `;
    }
    innerhtml += '</div>'
    return innerhtml
}

function displayRoleSelection() {
    const inputs = model.input;
    let innerhtml = '';
    innerhtml = /*HTML*/`
        <div class="selectionWindow" style="top: ${inputs.selection[3]}px">
            ${displayContents()}
        </div>
    `;
    return innerhtml;
}

function displayContents() {
    const roles = model.role;
    let innerhtml = '';
    let roleTypes = ['tank', 'heal', 'mage', 'melee', 'range', 'allround'];
    let colors = ['lightblue','lightgreen','magenta','coral','orange', 'white']
    for (let i = 0; i < roleTypes.length; i++) {
        //let type = i == 0 ? roles.tank.length : i == 1 ? roles.heal.length : i == 2 ? roles.mage.length : i == 3 ? roles.melee.length : i == 4 ? roles.range.length : '';
        let type = i == 0 ? roles.tank : i == 1 ? roles.heal : i == 2 ? roles.mage : i == 3 ? roles.melee : i == 4 ? roles.range : i == 5 ? roles.allround : '';
        innerhtml += /*HTML*/`
            <div class="selectionRoles" style="background-color: ${colors[i]}">
        `;
        for (let x = 0; x < type.length; x++) {
            innerhtml += /*HTML*/`
            <div>
                <img class="selectionPic" src="pics/${type[x]}.png" onclick="selectJob('${roleTypes[i]}', '${type[x]}')"/>
            </div>
            `;
        }
        innerhtml += '</div>'
    }
    return innerhtml;
}

function memberRole(index) {
    const member = model.members;
    let innerhtml = '';
    if (member[index].role) {
        innerhtml = /*HTML*/`
            <img class="pics" src="pics/${member[index].role}.png"/>
            <div class="roleName">${member[index].role}</div>
        `;
    }
    return innerhtml;
}