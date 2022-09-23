let currentRoundConfig = {
    elementCount: 10,
    maxElement: 10,
    canciled: false,
    stopped: false,
    noticeFunction: null
}

const inputs = {
    sortSelector: null,
    sortDelaySelect: null,
    elementCountInput: null,
    maxElementInput: null,
    startButton: null,
    terminateButton: null,
    generatorSelector: null
}

let array = []
let transformArray = [] // not in pixels, but in elements
let referenceArray = []
let elementsDiv = null
const SORTING_STATE = 0
const STOP_STATE = 1
const GENERATED_STATE = 2
let state = NOT_GENERATED_STATE = 3
let sortDelay = 500

function genArray(generator) {
    array = []
    for (let i = 0; i < currentRoundConfig.elementCount; i++) {
        array[i] = Math.floor(generator(currentRoundConfig.elementCount, i) * currentRoundConfig.maxElement)
        transformArray[i] = 0
        referenceArray[i] = i
    }
}

function calcElementWidth() { // in %
    return Math.min(3.0, 100.0 / currentRoundConfig.elementCount)
}

function calcElementMargin() {
    return calcElementWidth() / 10
}

function createElementsFromArray() {
    let elementWidth = calcElementWidth()
    let elementMargin = calcElementMargin()
    elementsDiv.empty()
    for (let i = 0; i < array.length; i++) {
        let elementHeight = ((array[i] + 1) * 1.0 / currentRoundConfig.maxElement) * 100
        elementsDiv.append(`<div class=\"element\" style=\"width: ${elementWidth}%; height: ${elementHeight}%; margin-right:${elementMargin}\"></div>`)
        elementsDiv.last().css("margin-right", "0")
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false
    return true
}

let messageClearFuncId
let messageElement = null
function message(mes) {
    messageElement.text(mes)
    clearTimeout(messageClearFuncId)
    messageClearFuncId = setTimeout(function () {
        messageElement.text("")
    }, 2000)
}


function setup() {
    elementsDiv = $(".elements")
    inputs.sortSelector = $(".sort-selector")
    inputs.sortDelaySelect = $(".sort-delay-input")
    inputs.elementCountInput = $(".element-count-input")
    inputs.maxElementInput = $(".max-element-input")
    inputs.startButton = $(".start-button")
    inputs.terminateButton = $(".terminate-button")
    inputs.generatorSelector = $(".generator-selector")

    inputs.sortDelaySelect.val(sortDelay)
    inputs.elementCountInput.val(currentRoundConfig.elementCount)
    inputs.maxElementInput.val(currentRoundConfig.maxElement)

    inputs.sortDelaySelect.on("change", function () {
        let newDelay = inputs.sortDelaySelect.val()
        if (!(newDelay !== undefined && newDelay > 0 && newDelay < 10000)) return
        sortDelay = Math.max(20, newDelay)
        $(".element").css("transition", `all ${sortDelay * 0.8}ms ease`)
    })

    inputs.terminateButton.on("click", function () {
        if (state === SORTING_STATE) {
            currentRoundConfig.canciled = true
            handleNewState(GENERATED_STATE)

            let newConfig = {}

            newConfig.elementCount = currentRoundConfig.elementCount
            newConfig.maxElement = currentRoundConfig.maxElement
            newConfig.canciled = false
            newConfig.stopped = false
            newConfig.noticeFunction = null
            currentRoundConfig = newConfig
            setAllElementsStateToNormal()
        }
    })

    messageElement = $(".message")
}

function handleNewState(newState) {
    state = newState
    switch (state) {
        case GENERATED_STATE:
            inputs.startButton.text("Начать")
            break
        case STOP_STATE:
            inputs.startButton.text("Продолжить")
            break
        case SORTING_STATE:
            inputs.startButton.text("Пауза")
            break
        case NOT_GENERATED_STATE:
            inputs.startButton.text("Начать")
            break
    }
}

function getSortByName(name) {
    for (let sort in sorts) {
        if (sorts[sort].name === name) {
            return sorts[sort].starter
        }
    }
}

function isConfigCorrect(currentRoundConfig) {
    let result = {
        result: false,
        comment: ""
    }
    if (currentRoundConfig.elementCount !== undefined) {
        if (currentRoundConfig.maxElement !== undefined) {
            if (isNumberKey(currentRoundConfig.elementCount)) {
                if (isNumberKey(currentRoundConfig.maxElement)) {
                    if (currentRoundConfig.elementCount < 100) {
                        if (currentRoundConfig.maxElement < 10000) {
                            if (currentRoundConfig.elementCount > 1) {
                                if (currentRoundConfig.maxElement > 1) {
                                    result.result = true
                                } else {
                                    result.comment = "Верхняя граница элементов должна быть больше 1"
                                }
                            } else {
                                result.comment = "Количество элементов должно быть больше 1"
                            }
                        } else {
                            result.comment = "Верхняя граница элементов должна быть меньше 10000"
                        }
                    } else {
                        result.comment = "количество элементов должно быть меньше 100"
                    }
                } else {
                    result.comment = "верхняя граница элементов должна быть натуральным числом"
                }
            } else {
                result.comment = "Количество элементов должно быть натуральным числом"
            }
        } else {
            result.comment = "Верхняя граница элементов не определена"
        }
    } else {
        result.comment = "Количество элементов не определено"
    }
    return result
}

function randomGenerator(count, i) { return Math.random() }

function sineGenerator(count, i) { return Math.sin(i * 1.0 / count * 2 * Math.PI) / 2.0 + 0.5 }

function lineGenerator(count, i) { return (count - i) * 1.0 / count }

function getGeneratorFromName(name) {
    switch (name) {
        case "Случайная": return randomGenerator
        case "Синус": return sineGenerator
        case "Линия": return lineGenerator
    }
}

$(function () {
    setup();
    $(".generate-button").on("click", function () {
        let newConfig = {}

        newConfig.elementCount = inputs.elementCountInput.val()
        newConfig.maxElement = inputs.maxElementInput.val()
        newConfig.canciled = false
        newConfig.stopped = false
        newConfig.noticeFunction = null
        let configCheckResult = isConfigCorrect(newConfig)
        if (configCheckResult.result) {
            currentRoundConfig.canciled = true
            currentRoundConfig = newConfig
            let generator = getGeneratorFromName(inputs.generatorSelector.val())
            if (generator !== undefined) {
                genArray(generator)
                createElementsFromArray()
                $(".element").css("transition", `all ${sortDelay * 0.8}ms ease`)
                handleNewState(GENERATED_STATE)
            } else {
                message("Имя генератора неправильное")
            }
        } else {
            message(configCheckResult.comment)
        }
    })
    $(".start-button").on("click", function () {
        if (state === STOP_STATE) {
            if (typeof currentRoundConfig.noticeFunction === "function") {
                currentRoundConfig.stopped = false
                handleNewState(SORTING_STATE)
                let noticeFunc = currentRoundConfig.noticeFunction
                currentRoundConfig.noticeFunction = undefined
                noticeFunc()
            }
        } else if (state === SORTING_STATE) {
            currentRoundConfig.stopped = true
            currentRoundConfig.noticeFunction = undefined
            handleNewState(STOP_STATE)
        } else if (state === GENERATED_STATE) {
            let sortName = inputs.sortSelector.val()
            let sort = getSortByName(sortName)
            if (sort !== undefined) {
                setAllElementsStateToNormal()
                handleNewState(SORTING_STATE)
                const expUnits = sort(currentRoundConfig)
                const explanation = $(".explanation")
                explanation.empty()
                expUnits.forEach(element => {
                    explanation.append(element)
                });
            } else {
                message("Имя сортировки неправильное")
            }
        } else {
            message("Сгенерируйте ваш массив")
        }
    })
})