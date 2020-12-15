function rowHeight(rows) {
    return rows.map(row => {
        return row.reduce((max, cell) => {
            return Math.max(max, cell.minHeight)
        }, 0)
    })

}


function colWidth(rows) {
    // 此时遍历的是第一行的每一个cell
    return rows[0].map((cell, i) => {
        //遍历每行的colIndex 返回宽度
        return rows.map(row => { row[i] }).reduce((max, cell) => {
            return Math.max(max,cell.minWidth) 
         },0)
    })
}





function table() {

}




table([{ a: 1, b: 2, c: 3 }, { a: 5, b: 8, c: 12 }, { b: 3, c: 10, z: 88 }])