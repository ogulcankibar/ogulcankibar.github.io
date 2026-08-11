document.addEventListener("DOMContentLoaded", () => {
    // Optional: Randomize the display order of stimuli to prevent ordering bias
    shuffleStimuli();
});

/**
 * Randomizes stimulus presentation order on page load while keeping track
 * of labels (Stimulus A, B, C...) for visual clarity.
 */
function shuffleStimuli() {
    const container = document.getElementById("stimuli-container");
    if (!container) return;

    const rows = Array.from(container.children);
    
    // Fisher-Yates shuffle
    for (let i = rows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rows[i], rows[j]] = [rows[j], rows[i]];
    }

    // Re-append in randomized order & re-assign Stimulus labels A-E
    const labels = ["Stimulus A", "Stimulus B", "Stimulus C", "Stimulus D", "Stimulus E"];
    rows.forEach((row, index) => {
        row.querySelector(".stimulus-label").textContent = labels[index];
        container.appendChild(row);
    });
}

/**
 * Collects form inputs and submits them directly to a Google Form.
 */
function submitResults() {
    const inputs = document.querySelectorAll('.score-input');
    const results = {};

    inputs.forEach(input => {
        const paramKey = input.getAttribute('data-param');
        results[paramKey] = input.value;
    });

    // Replace with your Google Form Action URL
    const googleFormUrl = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";
    const formData = new FormData();

    // Map your parameter points to Google Form entry IDs
    // Replace entry.XXXXXXXXX with actual IDs from your Google Form pre-filled link
    formData.append("entry.1000000001", results["p005"]);
    formData.append("entry.1000000002", results["p025"]);
    formData.append("entry.1000000003", results["p050_hidden"]);
    formData.append("entry.1000000004", results["p075"]);
    formData.append("entry.1000000005", results["p095"]);

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData
    }).then(() => {
        alert("Thank you! Your listening test response has been recorded.");
        submitBtn.textContent = "Submitted";
    }).catch(err => {
        console.error("Submission Error:", err);
        alert("There was an error submitting your results. Please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Test Results";
    });
}