// Replace with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytH3vOVCQhxaCHFxynAW2LR338bdUHagCgbuVWjH2PF4HscuZxn6UynP_-4rjtUIneMw/exec";

// Generate a random anonymous Rater ID
const raterId = "usr_" + Math.random().toString(36).substring(2, 8);

// Full 12-Trial Configuration matching your exact GitHub folder structure
const trialsData = [
  // --- CSOUND (2 Trials) ---
  {
    trial_id: 1,
    backend: "Csound",
    parameter: "flt.type",
    ref: "audio_files/audio_references/reference_csound.wav",
    stimuli: [
      { key: "p000", src: "audio_files/csound/p25_flt.type/p000.wav" },
      { key: "p025", src: "audio_files/csound/p25_flt.type/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_csound.wav" }, // Hidden Reference
      { key: "p075", src: "audio_files/csound/p25_flt.type/p075.wav" },
      { key: "p100", src: "audio_files/csound/p25_flt.type/p100.wav" }
    ]
  },
  {
    trial_id: 2,
    backend: "Csound",
    parameter: "cho.rate",
    ref: "audio_files/audio_references/reference_csound.wav",
    stimuli: [
      { key: "p000", src: "audio_files/csound/p40_cho.rate/p000.wav" },
      { key: "p025", src: "audio_files/csound/p40_cho.rate/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_csound.wav" },
      { key: "p075", src: "audio_files/csound/p40_cho.rate/p075.wav" },
      { key: "p100", src: "audio_files/csound/p40_cho.rate/p100.wav" }
    ]
  },

  // --- FLUIDSYNTH (3 Trials) ---
  {
    trial_id: 3,
    backend: "FluidSynth",
    parameter: "cc.expression",
    ref: "audio_files/audio_references/reference_fluidsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/fluidsynth/p04_cc.expression/p000.wav" },
      { key: "p025", src: "audio_files/fluidsynth/p04_cc.expression/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_fluidsynth.wav" },
      { key: "p075", src: "audio_files/fluidsynth/p04_cc.expression/p075.wav" },
      { key: "p100", src: "audio_files/fluidsynth/p04_cc.expression/p100.wav" }
    ]
  },
  {
    trial_id: 4,
    backend: "FluidSynth",
    parameter: "gen.mod_attack",
    ref: "audio_files/audio_references/reference_fluidsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/fluidsynth/p27_gen.mod_attack/p000.wav" },
      { key: "p025", src: "audio_files/fluidsynth/p27_gen.mod_attack/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_fluidsynth.wav" },
      { key: "p075", src: "audio_files/fluidsynth/p27_gen.mod_attack/p075.wav" },
      { key: "p100", src: "audio_files/fluidsynth/p27_gen.mod_attack/p100.wav" }
    ]
  },
  {
    trial_id: 5,
    backend: "FluidSynth",
    parameter: "gen.mod_sustain",
    ref: "audio_files/audio_references/reference_fluidsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/fluidsynth/p30_gen.mod_sustain/p000.wav" },
      { key: "p025", src: "audio_files/fluidsynth/p30_gen.mod_sustain/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_fluidsynth.wav" },
      { key: "p075", src: "audio_files/fluidsynth/p30_gen.mod_sustain/p075.wav" },
      { key: "p100", src: "audio_files/fluidsynth/p30_gen.mod_sustain/p100.wav" }
    ]
  },

  // --- PEDALBOARD (2 Trials) ---
  {
    trial_id: 6,
    backend: "Pedalboard",
    parameter: "flt.cutoff",
    ref: "audio_files/audio_references/reference_pedalboard.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pedalboard/p23_flt.cutoff/p000.wav" },
      { key: "p025", src: "audio_files/pedalboard/p23_flt.cutoff/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pedalboard.wav" },
      { key: "p075", src: "audio_files/pedalboard/p23_flt.cutoff/p075.wav" },
      { key: "p100", src: "audio_files/pedalboard/p23_flt.cutoff/p100.wav" }
    ]
  },
  {
    trial_id: 7,
    backend: "Pedalboard",
    parameter: "flt.mode",
    ref: "audio_files/audio_references/reference_pedalboard.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pedalboard/p25_flt.mode/p000.wav" },
      { key: "p025", src: "audio_files/pedalboard/p25_flt.mode/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pedalboard.wav" },
      { key: "p075", src: "audio_files/pedalboard/p25_flt.mode/p075.wav" },
      { key: "p100", src: "audio_files/pedalboard/p25_flt.mode/p100.wav" }
    ]
  },

  // --- PYO (3 Trials) ---
  {
    trial_id: 8,
    backend: "Pyo",
    parameter: "flt.resonance",
    ref: "audio_files/audio_references/reference_pyo.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pyo/p24_flt.resonance/p000.wav" },
      { key: "p025", src: "audio_files/pyo/p24_flt.resonance/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pyo.wav" },
      { key: "p075", src: "audio_files/pyo/p24_flt.resonance/p075.wav" },
      { key: "p100", src: "audio_files/pyo/p24_flt.resonance/p100.wav" }
    ]
  },
  {
    trial_id: 9,
    backend: "Pyo",
    parameter: "rev.damp",
    ref: "audio_files/audio_references/reference_pyo.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pyo/p40_rev.damp/p000.wav" },
      { key: "p025", src: "audio_files/pyo/p40_rev.damp/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pyo.wav" },
      { key: "p075", src: "audio_files/pyo/p40_rev.damp/p075.wav" },
      { key: "p100", src: "audio_files/pyo/p40_rev.damp/p100.wav" }
    ]
  },
  {
    trial_id: 10,
    backend: "Pyo",
    parameter: "del.time",
    ref: "audio_files/audio_references/reference_pyo.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pyo/p46_del.time/p000.wav" },
      { key: "p025", src: "audio_files/pyo/p46_del.time/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pyo.wav" },
      { key: "p075", src: "audio_files/pyo/p46_del.time/p075.wav" },
      { key: "p100", src: "audio_files/pyo/p46_del.time/p100.wav" }
    ]
  },

  // --- TORCHSYNTH (2 Trials) ---
  {
    trial_id: 11,
    backend: "TorchSynth",
    parameter: "adsr1.release",
    ref: "audio_files/audio_references/reference_torchsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/torchsynth/p03_adsr1.release/p000.wav" },
      { key: "p025", src: "audio_files/torchsynth/p03_adsr1.release/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_torchsynth.wav" },
      { key: "p075", src: "audio_files/torchsynth/p03_adsr1.release/p075.wav" },
      { key: "p100", src: "audio_files/torchsynth/p03_adsr1.release/p100.wav" }
    ]
  },
  {
    trial_id: 12,
    backend: "TorchSynth",
    parameter: "vco2.tuning",
    ref: "audio_files/audio_references/reference_torchsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/torchsynth/p72_vco2.tuning/p000.wav" },
      { key: "p025", src: "audio_files/torchsynth/p72_vco2.tuning/p025.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_torchsynth.wav" },
      { key: "p075", src: "audio_files/torchsynth/p72_vco2.tuning/p075.wav" },
      { key: "p100", src: "audio_files/torchsynth/p72_vco2.tuning/p100.wav" }
    ]
  }
];

let currentTrialIdx = 0;
let collectedResults = [];

function startTest() {
  document.getElementById("onboarding-screen").classList.add("hidden");
  document.getElementById("trial-screen").classList.remove("hidden");
  loadTrial(currentTrialIdx);
}

function loadTrial(idx) {
  const trial = trialsData[idx];
  document.getElementById("trial-title").textContent = `Trial ${idx + 1} / ${trialsData.length} — ${trial.backend}: ${trial.parameter}`;
  document.getElementById("ref-audio").src = trial.ref;

  const container = document.getElementById("stimuli-container");
  container.innerHTML = "";

  // Fisher-Yates shuffle to randomize stimulus presentation order
  const shuffled = [...trial.stimuli].sort(() => Math.random() - 0.5);
  const labels = ["Stimulus A", "Stimulus B", "Stimulus C", "Stimulus D", "Stimulus E"];

  shuffled.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "stimulus-row";
    row.innerHTML = `
      <span class="stimulus-label">${labels[index]}</span>
      <audio controls src="${item.src}"></audio>
      <input type="range" class="score-input" data-key="${item.key}" min="0" max="100" value="50" oninput="this.nextElementSibling.value = this.value">
      <output>50</output>
    `;
    container.appendChild(row);
  });
}

function nextTrial() {
  const trial = trialsData[currentTrialIdx];
  const inputs = document.querySelectorAll(".score-input");
  const scores = {};

  inputs.forEach(input => {
    scores[input.getAttribute("data-key")] = parseInt(input.value, 10);
  });

  collectedResults.push({
    trial_id: trial.trial_id,
    backend: trial.backend,
    parameter: trial.parameter,
    scores: scores
  });

  currentTrialIdx++;

  if (currentTrialIdx < trialsData.length) {
    loadTrial(currentTrialIdx);
  } else {
    submitAllData();
  }
}

function submitAllData() {
  document.getElementById("trial-screen").classList.add("hidden");
  
  const payload = {
    timestamp: new Date().toISOString(),
    participant: {
      rater_id: raterId,
      audio_experience: document.getElementById("experience").value,
      playback_hardware: document.getElementById("hardware").value
    },
    ratings: collectedResults
  };

  fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    document.getElementById("completion-screen").classList.remove("hidden");
  }).catch(err => console.error("Error submitting data:", err));
}