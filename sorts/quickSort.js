function iQS(i, m, config, calllback) {
    setTimeout(function () {
        if (handleIfCanciled(config)) return
        handleIfStoped(config, function () {
            setElementStateToComparingQS(i)
            setElementStateToComparingQS(m)
            if (array[i] < array[m]) {
                setTimeout(function () {
                    setElementStateToNormalQS(i)
                    iQS(i + 1)
                }, sortDelay)
            } else {
                setTimeout(function () {
                    if (handleIfCanciled(config)) return
                    handleIfStoped(config, function () {
                        setElementStateToNormalQS(i)
                        setElementStateToNormalQS(m)
                        setTimeout(function () {
                            if (handleIfCanciled(config)) return
                            handleIfStoped(config, calllback)
                        })
                    })
                }, sortDelay)
            }
        })
    }, sortDelay)
}

function jQS(j, m, config, callback) {
    setTimeout(function () {
        if (handleIfCanciled(config)) return
        handleIfStoped(config, function () {
            setElementStateToComparingQS(j)
            setElementStateToComparingQS(m)
            if (array[i] < x[m]) {
                iQS(i + 1)
                setTimeout(function () { setElementStateToNormalQS(i) }, sortDelay)
            } else {
                setTimeout(function () {
                    if (handleIfCanciled(config)) return
                    handleIfStoped(config, calllback)
                }, sortDelay)
            }
        })
    }, sortDelay)
}

function quickSort(l, r, i, j, xm, config) {
    if (handleIfCanciled(config)) { return }

    handleIfStoped(config, function () {
        do {

        } while (j <= i)
    })
    /*
    procedure sort(l,r:integer); {lлевый конец масива,r-правый конец}
    var
        i,j,x1,y1,m: integer;
    begin
        i:=l;
        j:=r;
        m:=round ((l+r)/2);{средний элемент}
        x1:=x[m];
        repeat
            while x[i]<x1 do inc(i);{пока левый больше среднего, подвигоем левый край вправо }
            while x[j]>x1 do dec(j);{пока правый меньше среднего, подвигаем левый вправо}
            if i<=j then {если левый и правый срослись}
            begin
                y1:=x[i];
                x[i]:=x[j];{меняем левый и правый}
                x[j]:=y1;
                inc(i); {левый вправо}
                dec(j); {правый влево}
            end;
        until i>j;{конец одной перестановки}
        if l<j then sort(l,j);{рекурсивно сортируем}
        if i<r then sort(i,r);{или левую или правую части}
        end;
    */
}

function setElementStateToComparingQS(index) {
    changeElement(index, "white", "black")
}

function setElementStateToNormalQS(index) {
    changeElement(index, "black", "white")
}

function setElementStateToSortedQS(index) {
    changeElement(index, "red", "white")
}

function quickSortStarter(config) {
    quickSort(0, 0, config)
    const quickSortUnits = [];
    quickSortUnits.push(getExplanationUnit("Элемент", "black", "white"))
    quickSortUnits.push(getExplanationUnit("Сравниваемый элемент", "white", "black"))
    quickSortUnits.push(getExplanationUnit("Отсортированный элемент", "red", "white"))
    return quickSortUnits
}

$(function () {
    addSort("Быстрая сортировка", quickSortStarter)
})