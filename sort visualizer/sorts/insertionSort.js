function insertionSort(i, j, config) {
    if (config.canciled) {
        handleNewState(GENERATED_STATE)
        return
    }
    if (j <= 0) {
        i++
        j = i
        setElementsBefourIToSortedStateIS(i)
    }
    if (i >= array.length) {
        handleNewState(GENERATED_STATE)
        return
    }
    temp = function () {
        setElementStateToComparingIS(j)
        setElementStateToComparingIS(j - 1)
        setTimeout(function () {
            if (config.canciled) {
                handleNewState(GENERATED_STATE)
                return
            }
            temp = function () {
                let sorted = false
                if (j > 0 && (array[j] < array[j - 1])) {
                    swap(j, j - 1)
                } else {
                    sorted = true
                }
                setTimeout(function () {
                    if (config.canciled) {
                        handleNewState(GENERATED_STATE)
                        return
                    }
                    temp = function () {
                        if (sorted) {
                            setElementsBefourIToSortedStateIS(i + 1)
                            insertionSort(i + 1, i + 1, config)
                            return
                        }
                        setElementStateToNormalIS(j)
                        setElementStateToNormalIS(j - 1)
                        setTimeout(function () {
                            if (config.canciled) {
                                handleNewState(GENERATED_STATE)
                                return
                            }
                            temp = function () {
                                insertionSort(i, j - 1, config)
                            }
                            if (config.stopped) config.noticeFunction = temp
                            else temp()
                        })
                    }
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

    /*
    for (let i = 1; i < array.lenght; i++) {
        let tmp = array[i];
        for (let j = i - 1; j >= 0 && (array[j] > tmp); j--) {
            array[j + 1] = array[j];
        }
        array[j + 1] = tmp;
    }
    */
}

function setElementsBefourIToSortedStateIS(index) {
    for (let i = 0; i < index; i++) {
        setElementStateToSortedIS(i)
    }
}

function setElementStateToComparingIS(index) {
    changeElement(index, "white", "black")
}

function setElementStateToNormalIS(index) {
    changeElement(index, "black", "white")
}

function setElementStateToSortedIS(index) {
    changeElement(index, "red", "white")
}

function insertionSortStarter(config) {
    insertionSort(0, 0, config)
    const selectionSortUnits = [];
    selectionSortUnits.push(getExplanationUnit("Элемент", "black", "white"))
    selectionSortUnits.push(getExplanationUnit("Сравниваемый элемент", "white", "black"))
    selectionSortUnits.push(getExplanationUnit("Отсортированный элемент", "red", "white"))
    return selectionSortUnits
}

$(function () {
    addSort("Сортировка вставками", insertionSortStarter)
})