function bubbleSort(i, j, curRoundConfig) {
    if (curRoundConfig.canciled) {
        handleNewState(GENERATED_STATE)
        return
    }

    temp = function () {
        if (j >= array.length - i - 1) {
            j = 0
            setElementStateToSortedBS(array.length - 1 - i)
            i++
        }
        if (i >= array.length - 1) {
            setElementStateToSortedBS(0)
            handleNewState(GENERATED_STATE)
            return
        }

        setElementStateToComparingBS(j)
        setElementStateToComparingBS(j + 1)

        setTimeout(function () {
            if (curRoundConfig.canciled) {
                handleNewState(GENERATED_STATE)
                return
            }
            temp = function () {
                if (array[j] > array[j + 1]) {
                    swap(j, j + 1)
                }

                setTimeout(function () {
                    if (curRoundConfig.canciled) {
                        handleNewState(GENERATED_STATE)
                        return
                    }
                    temp = function () {
                        setElementStateToNormalBS(j)
                        setElementStateToNormalBS(j + 1)
                        bubbleSort(i, j + 1, curRoundConfig)
                    }
                    if (curRoundConfig.stopped) {
                        curRoundConfig.noticeFunction = temp
                    } else {
                        temp()
                    }
                }, sortDelay)
            }
            if (curRoundConfig.stopped) {
                curRoundConfig.noticeFunction = temp
            } else {
                temp()
            }
        }, sortDelay)
    }
    if (curRoundConfig.stopped) {
        curRoundConfig.noticeFunction = temp
    } else {
        temp()
    }
    /*
    for(let i = 0;i < array.length;i++) {
        for(let j = 0;j < array.length - i - 1;j++) {
            if(array[j] < array[j + 1]) {
                let c = array[j]
                array[j] = array[j + 1]
                array[j + 1] = c
            }
        }
    }
    */
}

function setElementStateToComparingBS(index) {
    changeElement(index, "white", "black")
}

function setElementStateToNormalBS(index) {
    changeElement(index, "black", "white")
}

function setElementStateToSortedBS(index) {
    changeElement(index, "red", "white")
}

function bubbleSortStarter(config) {
    bubbleSort(0, 0, config)
    const selectionSortUnits = [];
    selectionSortUnits.push(getExplanationUnit("Элемент", "black", "white"))
    selectionSortUnits.push(getExplanationUnit("Сравниваемый элемент", "white", "black"))
    selectionSortUnits.push(getExplanationUnit("Отсортированный элемент", "red", "white"))
    return selectionSortUnits
}

$(function () {
    addSort("Сортировка пузырьком", bubbleSortStarter)
})