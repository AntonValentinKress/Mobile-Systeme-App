/*
function replaceElement(placeholderId, templateId) {
    const placeholder = document.getElementById(placeholderId);
    const template = document.getElementById(templateId);

    

    if (placeholder && template && template.content) {
        const clone = document.importNode(template.content, true);
        const mainElement = clone.firstElementChild;
        if (mainElement) {
            mainElement.id = placeholderId
        }

        placeholder.replaceWith(clone);
        setEventListeners()

        console.log('Ansicht "' + templateId + '"" geladen')
        
    } else {
        console.error('Platzhalter oder Template nicht gefunden.');
    }
}

function replaceElementonButtonClick(target) {
    replaceElement('Platzhalter',target)
}

replaceElement('Platzhalter','Hauptmenü')
*/

function setEventListeners() {
    const farbschemaButton = document.getElementById("FarbschemaButton");
    if (farbschemaButton) {farbschemaButton.addEventListener("click", () => replaceElement('Platzhalter', 'Farbschema'));}

    const hauptmenüButton = document.getElementById("HauptmenüButton");
    if (hauptmenüButton) {hauptmenüButton.addEventListener("click", () => replaceElement('Platzhalter', 'Hauptmenü'));}

    const maschinendatenButton = document.getElementById("MaschinendatenButton");
    if (maschinendatenButton) {maschinendatenButton.addEventListener("click", () => replaceElement('Platzhalter', 'Maschinendaten'));}

    const rotationButton = document.getElementById("RotationButton");
    if (rotationButton) {rotationButton.addEventListener("click", () => replaceElement('Platzhalter', 'Rotation'));}

    const supportButton = document.getElementById("SupportButton");
    if (supportButton) {supportButton.addEventListener("click", () => replaceElement('Platzhalter', 'Support'));}

    const bluebutton = document.getElementById("btn-blau");
    if (bluebutton) {bluebutton.addEventListener("click", () => updateColor(43, 103, 198));}
    
    const orangebutton = document.getElementById("btn-orange");
    if (orangebutton) {orangebutton.addEventListener("click", () => updateColor(190, 132, 43));}
                
    const türkisbutton = document.getElementById("btn-türkis");
    if (türkisbutton) {türkisbutton.addEventListener("click", () => updateColor(43, 193, 134));}

    const grünbutton = document.getElementById("btn-grün");
    if (grünbutton) {grünbutton.addEventListener("click", () => updateColor(142, 206, 44));}

    const gelbbutton = document.getElementById("btn-gelb");
    if (gelbbutton) {gelbbutton.addEventListener("click", () => updateColor(235, 235, 46));}

    const lilabutton = document.getElementById("btn-lila");
    if (lilabutton) {lilabutton.addEventListener("click", () => updateColor(176, 41, 176));}
    
}

function updateColor(red, green, blue) {
    const rgb = red + "," + green + "," + blue
    document.documentElement.style.setProperty('--farbe', rgb);
    console.log('Neue Farbe (RGB): ' +rgb)
}

async function updateRotation() {
    try {
        const response = await fetch('/maschinendaten');
        
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }

        const data = await response.json();

        const yaw = data.orientation.yaw.toFixed(2);
        const pitch = data.orientation.pitch.toFixed(2);
        const roll = data.orientation.roll.toFixed(2);

        document.documentElement.style.setProperty('--rotation', yaw);

        document.getElementById('Yaw').textContent = yaw + ' °'; 
        document.getElementById('Pitch').textContent = pitch + ' °';
        document.getElementById('Roll').textContent = roll + ' °';
    
        console.log('Neue Orientierung: (' +yaw+"|"+pitch+"|"+roll+ ')°')

    } catch (error) {
        console.error('Fehler beim Abrufen der Daten:', error);
    }
}

// Optional: Die Funktion regelmäßig alle 5 Sekunden erneut aufrufen, um die Daten zu aktualisieren
setInterval(fetchAndUpdateRotationData, 500);





class Hauptmenü extends HTMLElement {
    // Class public field
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields
    constructor() {
        super();
        const templateContent = document
            .getElementById('Hauptmenü')
            .content
            .cloneNode(true);

        this.attachShadow({ mode: 'open' })
            .appendChild(templateContent);
    }

    connectedCallback() {
        console.log('Hauptmenü wurde geöffnet!');
    }

    disconnectedCallback() {
        console.log('Hauptmenü wird geschlossen!');
    }

}

customElements.define('hauptmenue', Hauptmenü);