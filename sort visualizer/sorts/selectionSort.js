function selectionSort(minPos, i, j, config) {
    if (config.canciled) {
        handleNewState(GENERATED_STATE)
        return
    }
    temp = function () {
        temp = function () {
            if (config.canciled) {
                handleNewState(GENERATED_STATE)
                return
            }
            temp = function () {
                if (i >= array.length || j >= array.length) {
                    setElementStateToSortedSS(array.length - 1)
                    handleNewState(GENERATED_STATE)
                    return
                }
                setElementStateToComparingSS(j)
                setTimeout(function () {
                    if (config.canciled) {
                        handleNewState(GENERATED_STATE)
                        return
                    }
                    temp = function () {
                        setElementStateToNormalSS(j)
                        setElementStateToNormalSS(minPos)
                        if (array[j] < array[minPos]) {
                            minPos = j
                        }
                        setElementStateToMinElementSS(minPos)
                        setTimeout(function () {
                            if (config.canciled) {
                                handleNewState(GENERATED_STATE)
                                return
                            }
                            temp = function () { selectionSort(minPos, i, j + 1, config) }
                            if (config.stopped) config.noticeFunction = temp
                            else temp()
                        }, sortDelay)
                    }
                    if (config.stopped) config.noticeFunction = temp
                    else temp()
                }, sortDelay)
            }
            if (config.stopped) config.noticeFunction = temp
            else temp()
        }

        temp2 = function () { }
        needTimeout = false
        if (j >= array.length) {
            swap(minPos, i)
            setElementStateToSortedSS(i)
            temp2 = function () {
                i++
                j = i + 1
                minPos = i
                setElementStateToMinElementSS(minPos)
            }
            needTimeout = true
        }
        if (needTimeout) {
            setTimeout(function () {
                if (config.canciled) {
                    handleNewState(GENERATED_STATE)
                    return
                }
                temp3 = function () {
                    temp2()
                    setTimeout(temp, sortDelay)
                }
                if (config.stopped) config.noticeFunction = temp3
                else temp3()
            }, sortDelay)
        } else {
            setTimeout(temp, sortDelay)
        }
    }
    if (config.stopped) config.noticeFunction = temp
    else temp()

    /*
    let minPos
    for (let i = 0; i < array.length; i++) {
        minPos = i
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minPos]) minPos = j;
        }
        let c = array[minPos]
        array[minPos] = array[i]
        array[i] = c
    }*/
}

function setElementStateToComparingSS(index) {
    changeElement(index, "white", "black")
}

function setElementStateToNormalSS(index) {
    changeElement(index, "black", "white")
}

function setElementStateToSortedSS(index) {
    changeElement(index, "red", "white")
}

function setElementStateToMinElementSS(index) {
    changeElement(index, "yellow", "white")
}

function selectionSortStarter(config) {
    selectionSort(0, 0, 0, config)
    const selectionSortUnits = [];
    selectionSortUnits.push(getExplanationUnit("Элемент", "black", "white"))
    selectionSortUnits.push(getExplanationUnit("Сравниваемый элемент", "white", "black"))
    selectionSortUnits.push(getExplanationUnit("Отсортированный элемент", "red", "white"))
    selectionSortUnits.push(getExplanationUnit("Минимальный элемент в неотсортированном массиве", "yellow", "white"))
    return selectionSortUnits
}

$(function () {
    addSort("Сортировка выбором", selectionSortStarter)
})