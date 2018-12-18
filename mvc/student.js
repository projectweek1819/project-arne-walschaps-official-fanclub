// Schrijf hier je code
function onMouseDown(state, args) {
    return state + 1;
}

function onMouseDown2(state, args) {
    return {count: state.count + 1};
}


function counter3() {
    function onMouseDown(state, args) {
        return {count: state.count + 1};
    }

    return {controller: {onMouseDown}};
}

function counter4() {
    function onMouseDown(state, args) {
        return {count: state.count + 1};
    }

    function onKeyDown(state, args) {
        return {count: 0};
    }

    return {controller: {onMouseDown, onKeyDown}};
}

function counter5() {
    function onMouseDown(state, args) {
        if (args.shift) {
            if (state.count > 0) {
                return {count: state.count - 1};
            }
            return {count: 0};
        }
        else {
            return {count: state.count + 1};
        }

    }

    function onKeyDown(state, args) {
        if (args.key === "0") {
            return {count: 0};
        }
        else if (args.key === "ArrowUp" || args.key === " ") {
            return {count: state.count + 1};
        }
        else if (args.key === "ArrowDown") {
            if (state.count > 0) {
                return {count: state.count - 1};
            }
            return {count: 0};
        }
        else {
            return {count: state.count};
        }
    }

    return {controller: {onMouseDown, onKeyDown}}

}

function counter6() {
    function increment(state) {
        return {count: state.count + 1};
    }

    function decrement(state) {
        if (state.count > 0) {
            return {count: state.count - 1};
        }
        else {
            return state;
        }
    }

    function reset(state) {
        return {count: 0};
    }

    function onMouseDown(state, args) {
        if (args.shift) {
            return model.decrement(state);
        }
        else {
            return model.increment(state);
        }
    }

    function onKeyDown(state, args) {
        if (args.key === "0") {
            return model.reset(state);
        }
        else if (args.key === "ArrowUp" || args.key === " ") {
            return model.increment(state);
        }
        else if (args.key === "ArrowDown") {

            return model.decrement(state);
        }
        else {
            return state;
        }
    }

    const controller = {onMouseDown, onKeyDown};
    const model = {increment, decrement, reset};
    return {controller, model};
}

function counter7() {
    function add(state, amount) {
        if (state.count + amount < 0) {
            return {count: 0}
        }
        else {
            return {count: state.count + amount}
        }
    }

    function reset(state) {
        return {count: 0};
    }

    function onMouseDown(state, args) {
        if (args.shift && args.ctrl) {
            return model.add(state, -5);
        }
        else if (args.shift) {
            return model.add(state, -1);
        }
        else if (args.ctrl) {
            return model.add(state, 5);
        }
        else {
            return model.add(state, 1)
        }
    }

    function onKeyDown(state, args) {
        if (args.key === "0") {
            return model.reset(state);
        }
        else if ((args.key === "ArrowUp" || args.key === " ") && args.ctrl) {
            return model.add(state, 5);
        }
        else if (args.key === "ArrowUp" || args.key === " ") {
            return model.add(state, 1);
        }
        else if (args.key === "ArrowDown" && args.ctrl) {
            return model.add(state, -5);
        }
        else if (args.key === "ArrowDown") {
            return model.add(state, -1);
        }
        else {
            return state;
        }
    }

    const controller = {onMouseDown, onKeyDown};
    const model = {add, reset};
    return {controller, model};
}


function chronometer() {
    function timePassed({elapsedTime}, amount) {
        elapsedTime += amount;
        return {elapsedTime};
    }

    function onTimerTick(state, dt) {
        return model.timePassed(state, dt);
    }


    const model = {timePassed}
    const controller = {onTimerTick}
    return {model, controller};
}

function chronometer2() {
    function timePassed({elapsedTime, active}, amount) {
        if (active) {
            elapsedTime += amount;
        }
        return {elapsedTime, active};
    }

    function toggle({elapsedTime, active}) {
        active = !active;
        return {elapsedTime, active};
    }

    function reset({elapsedTime, active}) {
        elapsedTime = 0;
        return {elapsedTime, active};
    }

    function onTimerTick(state, dt) {
        return model.timePassed(state, dt);
    }

    function onKeyDown(state, args) {
        if (args.key === " ") {
            return model.toggle(state);
        }
        else if (args.key === "0") {
            return model.reset(state);
        }
    }


    const model = {timePassed, toggle, reset}
    const controller = {onTimerTick, onKeyDown}
    return {model, controller};

}


function circle() {

    function render(state) {
        let bla = {type: "circle", center: {x: 100, y: 100}, radius: 10, color: "red"};
        return [bla];
    }


    const model = {};
    const controller = {};
    const view = {render};
    return {model, controller, view};
}


function circle2() {

    function render(state) {
        let bla = {type: "circle", center: state.position, radius: 10, color: "red"};
        return [bla];
    }

    function moveTo({position}, newPosition) {
        position = newPosition;
        return {position};
    }

    function onMouseDown(state, args) {
        return model.moveTo(state, args.position);
    }


    const model = {moveTo};
    const controller = {onMouseDown};
    const view = {render};
    return {model, controller, view};
}

function circle3() {

    function render(state) {
        let bla = {type: "circle", center: state.position, radius: 10, color: "red"};
        return [bla];
    }

    function moveTo({position}, newPosition) {
        position = newPosition;
        return {position};
    }

    function onMouseDown(state, args) {
        return model.moveTo(state, args.position);
    }

    function onMouseMove(state, args) {
        return model.moveTo(state, args.position);
    }


    const model = {moveTo};
    const controller = {onMouseDown, onMouseMove};
    const view = {render};
    return {model, controller, view};
}


function drawing() {
    function render(state) {
        let r = 5
        if (state.addMode) {
            r = 2;
        }
        let red = {type: "circle", center: state.position, radius: r, color: "red"};
        let cirkels = [];
        for (let i = 0; i < state.dots.length; i++) {
            cirkels.push({...red, radius: 2, center: state.dots[i], color: "green"})
        }
        cirkels.push(red);
        return cirkels;
    }

    function moveTo(state, position) {
        if (state.addMode) {
            return {...state, position, dots: [...state.dots, position]};
        }
        else {
            return {...state, position: position};
        }
    }

    function setAddMode({position, dots, addMode}, newAddMode) {
        let state = {position, dots, addMode};
        state.addMode = newAddMode;
        return state;
    }

    function onMouseDown(state, args) {
        return model.setAddMode(state, true);
    }

    function onMouseUp(state, args) {
        return model.setAddMode(state, false);
    }

    function onMouseMove(state, args) {
        return model.moveTo(state, args.position);
    }

    const model = {moveTo, setAddMode};
    const controller = {onMouseDown, onMouseMove, onMouseUp};
    const view = {render};
    return {model, controller, view};
}

function random() {

    function throwDie(state) {
        next = (4578 * state.rng ** 2 - 976161 * state.rng + 6156489) % 79729693;
        return {rng: next, dieValue: next % 6 + 1};
    }

    function onKeyDown(state, args) {
        if (args.key === " ") {
            return model.throwDie(state);
        }
        else {
            return state;
        }
    }

    function render(state) {
        return [{type: "text", position: {x: 50, y: 50}, string: state.dieValue.toString()}];
    }

    const model = {throwDie};
    const controller = {onKeyDown};
    const view = {render};
    return {model, controller, view};
}

function random2() {

    function nextRandom(n) {
        return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
    }

    function throwDie(state) {
        next = model.nextRandom(state.rng);
        return [next % 6 + 1, {rng: next, grade: state.grade}];
    }

    function generateGrade(state) {
        let sum = 0;
        for (let i = 0; i < 3; i++) {
            let worp = throwDie(state);
            state = worp[1];
            sum += worp [0];
        }
        return {rng: state.rng, grade: sum};
    }

    function onKeyDown(state, args) {
        if (args.key === " ") {
            return model.generateGrade(state);
        }
    }

    function render(state) {
        return [{type: "text", position: {x: 50, y: 50}, string: state.grade.toString()}];
    }


    const model = {throwDie, nextRandom, generateGrade};
    const controller = {onKeyDown};
    const view = {render};
    return {model, controller, view};
}

function whack() {
    function distance(p, q) {
        return Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
    }

    function nextRandomNumber(n) {
        return (4578 * n ** 2 - 976161 * n + 6156489) % 79729693;
    }

    function shrinkMole(mole, amount) {
        if (mole.size >= amount) {
            return {...mole, size: mole.size - amount};
        }
        else {
            return {...mole, size: 0};
        }
    }

    function shrinkMoles(moles, amount) {
        newMoles = [];
        for (let i = 0; i < moles.length; i++) {
            newMoles.push({...moles[i]});
            newMoles[i] = model.shrinkMole(newMoles[i], amount)
        }
        return newMoles;
    }

    function removeZeroSizedMoles(moles) {
        let newMoles = [];
        for (let i = 0; i < moles.length; i++) {
            if (moles[i].size != 0) {
                newMoles.push(moles[i]);
            }
        }
        return newMoles;
    }

    function createMole(rng) {
        let a = model.nextRandomNumber(rng);
        let b = model.nextRandomNumber(a);
        let c = model.nextRandomNumber(b);

        return [{position: {x: a % 500, y: b % 500}, size: c % 25 + 5}, c]
    }

    function replenishMoles(moles, rng) {
        newMoles = [];
        for (let i = 0; i < moles.length; i++) {
            newMoles.push({...moles[i]});
        }
        while (newMoles.length < 3) {
            newMole = createMole(rng);
            newMoles.push(newMole[0]);
            rng = newMole[1];
        }
        return [newMoles, rng];
    }

    function findMoleAt(moles, position) {
        for (let i = 0; i < moles.length; i++) {
            if (moles[i].size >= model.distance(moles[i].position, position)) {
                return i;
            }
        }
        return -1;
    }

    function removeMoleWithIndex(moles, index) {
        newMoles = [];
        for (let i = 0; i < moles.length; i++) {
            if (i !== index) {
                newMoles.push({...moles[i]});
            }
        }
        return newMoles;
    }

    function hit(state, position) {
        if (state.health > 0) {
            let index = findMoleAt(state.moles, position);
            if (index === -1) {
                let health = Math.max(0, state.health - 5);
                return { ...state, health };
            }
            else {
                let health = state.health + 5;
                let moles = removeMoleWithIndex(state.moles, index);
                let [replenished, rng] = replenishMoles(moles, state.rng);
                let { timeLasted } = state;
                return { timeLasted, health, moles: replenished, rng };
            }
        }
        else {
            return state;
        }
    }

    function advanceTime(state, dt) {
        if (state.health > 0) {
            let [moles, rng] = replenishMoles(removeZeroSizedMoles(shrinkMoles(state.moles, dt * 10)), state.rng);
            let health = Math.max(0, state.health - dt * 10);
            let timeLasted = state.timeLasted + dt;
            return { timeLasted, health, moles, rng };
        }
        else {
            return state;
        }
    }

    function onTimerTick(state, dt) {
        return advanceTime(state, dt);
    }


    const model = {
        advanceTime,
        shrinkMoles,
        hit, removeMoleWithIndex,
        findMoleAt,
        replenishMoles,
        shrinkMole,
        distance,
        nextRandomNumber,
        removeZeroSizedMoles,
        createMole
    };
  /*  const controller = {onTimerTick};
    const view = {};
    return {model, controller, view};
}*/