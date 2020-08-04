fetch('http://puzzle.mead.io/puzzle').then((res)=>{
    res.json().then((data)=>{
        console.log(data);
    });
})

console.log('ejdwef');



const weatherinp = document.querySelector('form');
const locationInp = document.querySelector('input');
weatherinp.addEventListener('submit', (e)=>{
    e.preventDefault();
    const loc = locationInp.value;
    if (loc=='') {
        return console.log('enter a location');
    }
    const url = 'http://localhost:3000/weather?address=' + loc;
    fetch(url).then((res) => {
        res.json().then((data) => {
            console.log(data);
        })
    })
})