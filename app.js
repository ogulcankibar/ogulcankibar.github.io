// Google Apps Script Web App URL'ini buraya yapıştır
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytH3vOVCQhxaCHFxynAW2LR338bdUHagCgbuVWjH2PF4HscuZxn6UynP_-4rjtUIneMw/exec";

const raterId = "usr_" + Math.random().toString(36).substring(2, 8);

// Dosya adlarına (sweep00X_vX.XXXX.wav) birebir uyumlu 12 testlik liste
const trialsData = [
  // --- CSOUND ---
  {
    trial_id: 1,
    backend: "Csound",
    parameter: "flt.type",
    ref: "audio_files/audio_references/reference_csound.wav",
    stimuli: [
      { key: "p000", src: "audio_files/csound/p25_flt.type/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/csound/p25_flt.type/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_csound.wav" },
      { key: "p075", src: "audio_files/csound/p25_flt.type/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/csound/p25_flt.type/sweep004_v1.0000.wav" }
    ]
  },
  {
    trial_id: 2,
    backend: "Csound",
    parameter: "cho.rate",
    ref: "audio_files/audio_references/reference_csound.wav",
    stimuli: [
      { key: "p000", src: "audio_files/csound/p40_cho.rate/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/csound/p40_cho.rate/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_csound.wav" },
      { key: "p075", src: "audio_files/csound/p40_cho.rate/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/csound/p40_cho.rate/sweep004_v1.0000.wav" }
    ]
  },

  // --- FLUIDSYNTH ---
  {
    trial_id: 3,
    backend: "FluidSynth",
    parameter: "cc.expression",
    ref: "audio_files/audio_references/reference_fluidsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/fluidsynth/p04_cc.expression/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/fluidsynth/p04_cc.expression/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_fluidsynth.wav" },
      { key: "p075", src: "audio_files/fluidsynth/p04_cc.expression/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/fluidsynth/p04_cc.expression/sweep004_v1.0000.wav" }
    ]
  },
  {
    trial_id: 4,
    backend: "FluidSynth",
    parameter: "gen.mod_attack",
    ref: "audio_files/audio_references/reference_fluidsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/fluidsynth/p27_gen.mod_attack/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/fluidsynth/p27_gen.mod_attack/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_fluidsynth.wav" },
      { key: "p075", src: "audio_files/fluidsynth/p27_gen.mod_attack/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/fluidsynth/p27_gen.mod_attack/sweep004_v1.0000.wav" }
    ]
  },
  {
    trial_id: 5,
    backend: "FluidSynth",
    parameter: "gen.mod_sustain",
    ref: "audio_files/audio_references/reference_fluidsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/fluidsynth/p30_gen.mod_sustain/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/fluidsynth/p30_gen.mod_sustain/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_fluidsynth.wav" },
      { key: "p075", src: "audio_files/fluidsynth/p30_gen.mod_sustain/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/fluidsynth/p30_gen.mod_sustain/sweep004_v1.0000.wav" }
    ]
  },

  // --- PEDALBOARD ---
  {
    trial_id: 6,
    backend: "Pedalboard",
    parameter: "flt.cutoff",
    ref: "audio_files/audio_references/reference_pedalboard.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pedalboard/p23_flt.cutoff/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/pedalboard/p23_flt.cutoff/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pedalboard.wav" },
      { key: "p075", src: "audio_files/pedalboard/p23_flt.cutoff/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/pedalboard/p23_flt.cutoff/sweep004_v1.0000.wav" }
    ]
  },
  {
    trial_id: 7,
    backend: "Pedalboard",
    parameter: "flt.mode",
    ref: "audio_files/audio_references/reference_pedalboard.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pedalboard/p25_flt.mode/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/pedalboard/p25_flt.mode/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pedalboard.wav" },
      { key: "p075", src: "audio_files/pedalboard/p25_flt.mode/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/pedalboard/p25_flt.mode/sweep004_v1.0000.wav" }
    ]
  },

  // --- PYO ---
  {
    trial_id: 8,
    backend: "Pyo",
    parameter: "flt.resonance",
    ref: "audio_files/audio_references/reference_pyo.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pyo/p24_flt.resonance/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/pyo/p24_flt.resonance/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pyo.wav" },
      { key: "p075", src: "audio_files/pyo/p24_flt.resonance/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/pyo/p24_flt.resonance/sweep004_v1.0000.wav" }
    ]
  },
  {
    trial_id: 9,
    backend: "Pyo",
    parameter: "rev.damp",
    ref: "audio_files/audio_references/reference_pyo.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pyo/p40_rev.damp/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/pyo/p40_rev.damp/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pyo.wav" },
      { key: "p075", src: "audio_files/pyo/p40_rev.damp/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/pyo/p40_rev.damp/sweep004_v1.0000.wav" }
    ]
  },
  {
    trial_id: 10,
    backend: "Pyo",
    parameter: "del.time",
    ref: "audio_files/audio_references/reference_pyo.wav",
    stimuli: [
      { key: "p000", src: "audio_files/pyo/p46_del.time/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/pyo/p46_del.time/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_pyo.wav" },
      { key: "p075", src: "audio_files/pyo/p46_del.time/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/pyo/p46_del.time/sweep004_v1.0000.wav" }
    ]
  },

  // --- TORCHSYNTH ---
  {
    trial_id: 11,
    backend: "TorchSynth",
    parameter: "adsr1.release",
    ref: "audio_files/audio_references/reference_torchsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/torchsynth/p03_adsr1.release/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/torchsynth/p03_adsr1.release/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_torchsynth.wav" },
      { key: "p075", src: "audio_files/torchsynth/p03_adsr1.release/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/torchsynth/p03_adsr1.release/sweep004_v1.0000.wav" }
    ]
  },
  {
    trial_id: 12,
    backend: "TorchSynth",
    parameter: "vco2.tuning",
    ref: "audio_files/audio_references/reference_torchsynth.wav",
    stimuli: [
      { key: "p000", src: "audio_files/torchsynth/p72_vco2.tuning/sweep000_v0.0000.wav" },
      { key: "p025", src: "audio_files/torchsynth/p72_vco2.tuning/sweep001_v0.2500.wav" },
      { key: "p050_hidden", src: "audio_files/audio_references/reference_torchsynth.wav" },
      { key: "p075", src: "audio_files/torchsynth/p72_vco2.tuning/sweep003_v0.7500.wav" },
      { key: "p100", src: "audio_files/torchsynth/p72_vco2.tuning/sweep004_v1.0000.wav" }
    ]
  }
];

let currentTrialIdx = 0;
let collectedResults = [];

window.startTest = function() {
  document.getElementById("onboarding-screen").classList.add("hidden");
  document.getElementById("trial-screen").classList.remove("hidden");
  loadTrial(currentTrialIdx);
};

function loadTrial(idx) {
  const trial = trialsData[idx];
  document.getElementById("trial-title").textContent = `Trial ${idx + 1} / ${trialsData.length} — ${trial.backend}: ${trial.parameter}`;
  
  const refAudio = document.getElementById("ref-audio");
  refAudio.src = trial.ref;
  refAudio.load();

  const container = document.getElementById("stimuli-container");
  container.innerHTML = "";

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

window.nextTrial = function() {
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
};

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