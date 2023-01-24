const grid = document.querySelector('.grid')
console.log('hello')
function createCell(x,y,status){
    const cell = document.createElement('div')
    cell.setAttribute('data-x',x)
    cell.setAttribute('data-y',y)
    cell.id = 'cell'
    cell.className = status
    return cell
}
function findCell(y,x){
    let found = document.querySelector(`[data-y="${y}"][data-x="${x}"]`)
    found.classList = 'ship'
}
let x = 0
    let y = 9
for(let i = 0; i < 100; i++){
    if(x >= 9){
        y--
        x=0
    }else if(y == 9 && i == 0){
        x = 0
    }else{
        x++
    }
    grid.appendChild(createCell(x,y,null))
    
   
}
findCell(3,3)
