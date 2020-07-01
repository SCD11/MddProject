let map = L.map('map').setView([25.45,81.82], 10);

//now calling the tile layers
L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=OEVNUkQCaGkQ0w8t3yqF', {
    attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map);

let a1_icon = L.icon({
    iconUrl : './ambulance.png',
    shadowUrl : './shadow.png',
    shadowAnchor : [0,-15],
    shadowSize : [85,35],   
    iconSize : [75,35],
    iconAnchor : [0,0],
})

let a1_active_icon = L.icon({
    iconUrl : './ambulance_active.png',
    shadowUrl : './shadow.png',
    shadowAnchor : [0,-15],
    shadowSize : [85,35],   
    iconSize : [75,35],
    iconAnchor : [0,0],
})

let emergency_icon = L.icon({
    iconUrl : './emergency.png',
    shadowUrl : './shadow.png',
    shadowAnchor : [0,-15],
    shadowSize : [85,35],   
    iconSize : [85,35],
    iconAnchor : [0,0],
})

let markerGroup = L.layerGroup().addTo(map);
let ambulanceActiveGroup = L.layerGroup().addTo(map);

let a1 = L.marker([25.45,81.00],{icon:a1_icon}).addTo(map);//ambulance markers
let a2 = L.marker([25.45,81.75],{icon:a1_icon}).addTo(map);//ambulance markers
let a3 = L.marker([25.70,82.15],{icon:a1_icon}).addTo(map);//ambulance markers

let sos = document.querySelector('.sos');//user doing sos
let response = document.querySelector('.response');//ambulance responding

sos.addEventListener('click', sosed);
response.addEventListener('click',responsed);

let arr = [];
let count = 3;
let vehicleCount = document.querySelector('#vehicleNums');
let lock_1 = 0;
let lock_2 = 0;
let lock_3 = 0;
function sosed(){
    let random_lat = randomLet();
    let random_lng = randomLng();
    
    let d1 = Math.sqrt( Math.pow((25.45 - random_lat),2) + Math.pow((81.00 - random_lng),2));
    let d2 = Math.sqrt( Math.pow((25.45 - random_lat),2) + Math.pow((81.75 - random_lng),2));
    let d3 = Math.sqrt( Math.pow((25.70 - random_lat),2) + Math.pow((82.15 - random_lng),2));  
    if (count < 1){
        vehicleCount.textContent = "Emergency Vehicles Out Of Service!";
    }
    else{
        let closest = minimumDistances(d1, d2, d3);
        if ( closest == d1 ){
            lock_1 = 1;
            let temp = L.marker([25.45,81.00],{icon:a1_active_icon}).addTo(ambulanceActiveGroup);
            temp.bindPopup(`<h1>Heading for Emergency ${(4-count)}</h1>`);
        }
        else if ( closest == d2 ){
            lock_2 = 1;
            let temp = L.marker([25.45,81.75],{icon:a1_active_icon}).addTo(ambulanceActiveGroup);
            temp.bindPopup(`<h1>Heading for Emergency ${(4-count)}</h1>`);
        }
        else if ( closest == d3 ){
            lock_3 = 1;
            let temp = L.marker([25.70,82.15],{icon:a1_active_icon}).addTo(ambulanceActiveGroup);
            temp.bindPopup(`<h1>Heading for Emergency ${(4-count)}</h1>`);

        }
        count -= 1;
        arr[arr.length] = L.marker([random_lat, random_lng],{icon:emergency_icon}).addTo(markerGroup);
        arr[arr.length - 1].bindPopup(`<h1>Emergency ${3 - count}</h1>`)
        vehicleCount.textContent = count;
        console.log(arr)
    }
}

function minimumDistances(a, b, c){
    min = 12000;
    arr1 = [a,b,c];
    arr2 = [lock_1, lock_2, lock_3];
    for ( i = 0; i < 3; i++ ){
        if ( arr1[i] < min && arr2[i] == 0){
            min = arr1[i];
        }
    }
    return min
}
function randomLet(){
    return ((Math.random()*5+2)/10 + 25);
}

function randomLng(){
    return ((Math.random()*18)/10 + 81);
}

function responsed(){
    count = 3;
    markerGroup.clearLayers();
    ambulanceActiveGroup.clearLayers();
    lock_1 = 0;
    lock_2 = 0;
    lock_3 = 0;
    
}
