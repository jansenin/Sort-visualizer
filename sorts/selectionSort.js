function selectionSort(minPos, i, j, config) {
    if (handleIfCanciled(config)) { return }
    handleIfStoped(config, function () {
        temp = function () {
            if (handleIfCanciled(config)) { return }
            handleIfStoped(config, function () {
                if (i >= array.length || j >= array.length) {
                    setElementStateToSortedSS(array.length - 1)
                    handleNewState(GENERATED_STATE)
                    return
                }
                setElementStateToComparingSS(j)
                setTimeout(function () {
                    if (handleIfCanciled(config)) { return }
                    handleIfStoped(config, function () {
                        setElementStateToNormalSS(j)
                        setElementStateToNormalSS(minPos)
                        if (array[j] < array[minPos]) {
                            minPos = j
                        }
                        setElementStateToMinElementSS(minPos)
                        setTimeout(function () {
                            if (handleIfCanciled(config)) { return }
                            handleIfStoped(config, function () { selectionSort(minPos, i, j + 1, config) })
                        }, sortDelay)
                    })
                }, sortDelay)
            })
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
                if (handleIfCanciled(config)) { return }
                handleIfStoped(config, function () {
                    temp2()
                    setTimeout(temp, sortDelay)
                })
            }, sortDelay)
        } else {
            setTimeout(temp, sortDelay)
        }
    })

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
    selectionSortUnits.push(getExplanationUnit("Elements", "black", "white"))
    selectionSortUnits.push(getExplanationUnit("Comparing elements", "white", "black"))
    selectionSortUnits.push(getExplanationUnit("Sorted elements", "red", "white"))
    selectionSortUnits.push(getExplanationUnit("Minimal element in unsorted array", "yellow", "white"))
    return selectionSortUnits
}

$(function () {
    addSort("Selection sort", selectionSortStarter)
})