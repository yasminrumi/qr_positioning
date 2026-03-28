const reader = new Html5Qrcode("camera");
let scannerOn = false;

const btn = document.getElementById("btn");
const mapContainer = document.getElementById("mapContainer");
const marker = document.getElementById("marker");

function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
            const place = JSON.parse(text);
            showMarkerAt(place.top, place.left);
            
            document.getElementById("itemName").innerText = "Name: " + place.name;
            document.getElementById("itemStock").innerText = "In store: " + (place.in_store ? "yes" : "no");
            document.getElementById("itemPrice").innerText = "Price: €" + place.price;
            
            toggleScanner();
        }
    ).catch(function (err) {
        console.error(err);
    });  
}

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}

btn.onclick = toggleScanner;