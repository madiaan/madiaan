const model = {
    input: {
        //selection: [0]memberNumberIndex, [1]memberNameIndex, [2]memberPositionIndex, [3]cssAdjustmentIndex
        selection: [null, null, null, null],
        totalbonus: null,
        //[0]tank, [1]heal, [2]mage, [3]melee, [4]range
        rolecomp: [0, 0, 0, 0, 0],
    },
    members: [
        {name: 'Konich', role: null, type: null, pos: null,},
        {name: 'Tamb0', role: null, type: null, pos: null,},
        {name: 'Kamil', role: null, type: null, pos: null,},
        {name: 'Myst', role: null, type: null, pos: null,},
        {name: 'Ris', role: null, type: null, pos: null,},
        {name: 'Wai', role: null, type: null, pos: null,},
        {name: 'Thalian', role: null, type: null, pos: null,},
        {name: 'Morena', role: null, type: null, pos: null,},
    ],
    role: {
        tank: ['WAR', 'PLD', 'DRK', 'GNB'],
        heal: ['WHM', 'SCH', 'AST', 'SGE'],
        mage: ['SMN', 'BLM', 'RDM', 'PIC'],
        melee: ['DRG', 'MNK', 'NIN', 'SAM', 'RPR', 'VPR'],
        range: ['BRD', 'MCH', 'DNC'],
        allround: ['Tank', 'Healer', 'Magic', 'Melee', 'Range', 'remove'],
    },
}