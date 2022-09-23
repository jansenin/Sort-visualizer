const sorts = []

function addSort(name, starter) {
    const newSort = {
        name,
        starter
    }
    sorts.push(newSort)
    const sortSelector = $(".sort-selector")
    sortSelector.empty()
    for (let i = 0; i < sorts.length; i++) {
        sortSelector.append(`<option${i === 0 ? " selected" : ""}>${sorts[i].name}</option>`)
    }
}

function getExplanationUnit(text, bgColor, borderColor) {
    return "<div class=\"explanation-unit\">" +
        "<span class=\"explanation-element-wrap\">" +
        `<div class=\"explanation-element-example\" style=\"background-color:${bgColor}; border-color:${borderColor};\"></div>` +
        `<span class=\"explanation-unit-text\"> - ${text}</span>` +
        "</span>" +
        "</div>"
}

function handleIfCanciled(config) {
    if (config.canciled) {
        handleNewState(GENERATED_STATE)
        return true
    }
    return false
}

function handleIfStoped(config, temp) {
    if (config.stopped) {
        config.noticeFunction = temp
    } else {
        temp()
    }
}

function changeElement(index, bgColor, borderColor) {
    let element = getElement(index)
    element.css("background-color", bgColor)
    element.css("border-color", borderColor)
}

function getElement(index) {
    return $(`.element:nth-child(${referenceArray[index] + 1})`)
}

function setElementHeight(index, height) {
    getElement(index).css("height", `${(height + 1) * 100.0 / currentRoundConfig.maxElement}%`)
}

function setAllElementsStateToNormal() {
    let e = $(".element")
    e.css("background-color", "black")
    e.css("border-color", "white")
}

function swap(index1, index2) {
    let difference = referenceArray[index2] - referenceArray[index1]
    transformArray[index1] += difference
    transformArray[index2] -= difference
    let c = array[index1]
    array[index1] = array[index2]
    array[index2] = c
    c = referenceArray[index1]
    referenceArray[index1] = referenceArray[index2]
    referenceArray[index2] = c
    getElement(index1).css("left", `${-transformArray[index1] / array.length * 100}%`)
    getElement(index2).css("left", `${-transformArray[index2] / array.length * 100}%`)
}