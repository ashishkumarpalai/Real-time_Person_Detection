
const URL = "https://teachablemachine.withgoogle.com/models/6UAN1fMrb/";

let model, webcam, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        const predictionElement = document.createElement("div");
        predictionElement.className = "prediction";
        labelContainer.appendChild(predictionElement);
    }
}

async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // Example alert system
    const highestPrediction = prediction.reduce((max, prediction) =>
        prediction.probability > max.probability ? prediction : max
    );
    if (highestPrediction.probability > 0.8) {
        const className = highestPrediction.className;
        // alert(`Detected: ${className}`);


        // Select the ancor element
        const a = document.querySelector("a");
        // Hide the ancor tag
        a.style.display = "none";
    }
}

// aleart data

// Select the alert section element
const alertSection = document.getElementById("alert-section");

async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;
    }

    // Example alert system
    const highestPrediction = prediction.reduce((max, prediction) =>
        prediction.probability > max.probability ? prediction : max
    );
    if (highestPrediction.probability > 0.8) {
        const className = highestPrediction.className;
        alertSection.textContent = `Person detected: ${className}`;
        
        // Select the ancor element
        const a = document.querySelector("a");
        // Hide the ancor tag
        a.style.display = "none";
    } else {
        alertSection.textContent = "No person detected";
        // Select the ancor element
        const a = document.querySelector("a");
        // Hide the ancor tag
        a.style.display = "none";

        
    }
}
