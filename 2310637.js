const reader = new Html5Qrcode("camera");
let scannerOn = false;

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
            showInventory(place);
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

function showInventory(data) {
    const inventory = document.getElementById("inventory");
    const nameEl    = document.getElementById("inv-name");
    const stockEl   = document.getElementById("inv-stock");
    const priceEl   = document.getElementById("inv-price");

    nameEl.innerText  = "Name: " + data.name;
    stockEl.innerText = "In store: " + (data.inStock ? "Yes" : "No");
    priceEl.innerText = "Price: €" + data.price;

    inventory.style.display = "flex";
}
