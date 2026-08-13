const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbytH3vOVCQhxaCHFxynAW2LR338bdUHagCgbuVWjH2PF4HscuZxn6UynP_-4rjtUIneMw/exec";
const raterId = "usr_" + Math.random().toString(36).substring(2, 8);

// Dil Tesisatı (i18n)
let currentLang = "tr";
let currentTheme = "dark";

const i18n = {
    tr: {
        title: "Dinleme Testi: Sentezleyici Tınısal Duyarlılığı",
        desc: "Sentezleyici kontrollerindeki değişimlerin insan kulağı tarafından nasıl algılandığını değerlendirmemize yardımcı olun.",
        warn_title: "⚠️ İşitsel Güvenlik Uyarısı:",
        warn_text: "Sentezleyici parametre taramaları ani yüksek frekanslar veya ses seviyesi değişiklikleri içerebilir. Lütfen kulaklık veya hoparlör ses seviyenizi güvenli bir düzeye ayarlayın.",
        label_exp: "Ses Deneyimi:",
        exp_1: "Ses Tasarımcısı / Ses Mühendisi",
        exp_2: "Müzik Teknolojisi / Müzisyen",
        exp_3: "Genel Dinleyici",
        label_hw: "Dinleme Ekipmanı:",
        hw_1: "Kulak Üstü Kulaklık",
        hw_2: "Kulak İçi Kulaklık",
        hw_3: "Referans Monitörü",
        btn_start: "Deneyi Başlat",
        ref_title: "Referans Ses (Çıpa, p = 0.50)",
        rate_title: "Referansa Kıyasla Tınısal Farkı Puanlayın:",
        scale_0: "0 = Referans ile Birebir Aynı",
        scale_100: "100 = Tamamen Farklı Ses",
        btn_next: "Sonraki Test",
        thanks_title: "Teşekkür Ederiz!",
        thanks_text: "Yanıtlarınız başarıyla araştırma veri tabanımıza kaydedildi.",
        trial_prefix: "Test"
    },
    en: {
        title: "Listening Test: Synthesizer Timbral Sensitivity",
        desc: "Help us evaluate how human listening perceives changes across synthesizer controls compared to baseline reference sounds.",
        warn_title: "⚠️ Audio Safety Warning:",
        warn_text: "Synthesizer parameter sweeps may contain sudden high frequencies or gain shifts. Please adjust your playback volume to a safe level.",
        label_exp: "Audio Background:",
        exp_1: "Sound Designer / Audio Engineer",
        exp_2: "Audio Researcher / Musician",
        exp_3: "Casual Listener",
        label_hw: "Listening Equipment:",
        hw_1: "Over-ear Headphones",
        hw_2: "In-Ear Monitors / Earbuds",
        hw_3: "Studio Monitors",
        btn_start: "Start Experiment",
        ref_title: "Reference Sound (Baseline Anchor, p = 0.50)",
        rate_title: "Rate Timbral Differences against Reference:",
        scale_0: "0 = Identical to Reference",
        scale_100: "100 = Completely Different Sound",
        btn_next: "Next Trial",
        thanks_title: "Thank You!",
        thanks_text: "Your responses have been successfully submitted to the research database.",
        trial_prefix: "Trial"
    }
};

// Tüm Sentezleyiciler ve Parametre Havuzu
const poolData = {
    Csound: [
        { parameter: "flt.type", folder: "p25_flt.type" },
        { parameter: "cho.rate", folder: "p40_cho.rate" }
        // Diğer Csound parametre klasörlerini buraya ekleyebilirsin
    ],
    FluidSynth: [
        { parameter: "cc.expression", folder: "p04_cc.expression" },
        { parameter: "gen.mod_attack", folder: "p27_gen.mod_attack" },
        { parameter: "gen.mod_sustain", folder: "p30_gen.mod_sustain" }
    ],
    Pedalboard: [
        { parameter: "flt.cutoff", folder: "p23_flt.cutoff" },
        { parameter: "flt.mode", folder: "p25_flt.mode" }
    ],
    Pyo: [
        { parameter: "flt.resonance", folder: "p24_flt.resonance" },
        { parameter: "rev.damp", folder: "p40_rev.damp" },
        { parameter: "del.time", folder: "p46_del.time" }
    ],
    TorchSynth: [
        { parameter: "adsr1.release", folder: "p03_adsr1.release" },
        { parameter: "vco2.tuning", folder: "p72_vco2.tuning" }
    ]
};

let activeTrials = [];
let currentTrialIdx = 0;
let collectedResults = [];

// Rastgele Seçim Fonksiyonu
function initRandomExperiment() {
    const synths = Object.keys(poolData);
    const chosenSynth = synths[Math.floor(Math.random() * synths.length)];
    const availableParams = poolData[chosenSynth];
    
    // Karıştır ve 10 tanesini seç (eğer 10'dan azsa hepsini al)
    const shuffledParams = [...availableParams].sort(() => Math.random() - 0.5);
    const selectedParams = shuffledParams.slice(0, 10);

    const synthFolder = chosenSynth.toLowerCase();
    const refPath = `audio_files/audio_references/reference_${synthFolder}.wav`;

    activeTrials = selectedParams.map((item, index) => {
        return {
            trial_id: index + 1,
            backend: chosenSynth,
            parameter: item.parameter,
            ref: refPath,
            stimuli: [
                { key: "p000", src: `audio_files/${synthFolder}/${item.folder}/sweep000_v0.0000.wav` },
                { key: "p025", src: `audio_files/${synthFolder}/${item.folder}/sweep001_v0.2500.wav` },
                { key: "p050_hidden", src: refPath },
                { key: "p075", src: `audio_files/${synthFolder}/${item.folder}/sweep003_v0.7500.wav` },
                { key: "p100", src: `audio_files/${synthFolder}/${item.folder}/sweep004_v1.0000.wav` }
            ]
        };
    });
}

// Tek Bir Ses Çalma Kontrolü (Diğer çalan sesleri durdurur)
function attachAudioListeners() {
    const allAudios = document.querySelectorAll("audio");
    allAudios.forEach(audio => {
        audio.addEventListener("play", () => {
            allAudios.forEach(otherAudio => {
                if (otherAudio !== audio) {
                    otherAudio.pause();
                    otherAudio.currentTime = 0;
                }
            });
        });
    });
}

window.startTest = function() {
    initRandomExperiment();
    document.getElementById("onboarding-screen").classList.add("hidden");
    document.getElementById("trial-screen").classList.remove("hidden");
    loadTrial(currentTrialIdx);
};

function loadTrial(idx) {
    const trial = activeTrials[idx];
    const prefix = i18n[currentLang].trial_prefix;
    
    // KÖR TEST: Sadece Test numarası yazar, Synth ve Parametre adı gizlidir
    document.getElementById("trial-title").textContent = `${prefix} ${idx + 1} / ${activeTrials.length}`;
    
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
            <audio controls src="${item.src}" class="test-audio"></audio>
            <input type="range" class="score-input" data-key="${item.key}" min="0" max="100" value="50" oninput="this.nextElementSibling.value = this.value">
            <output>50</output>
        `;
        container.appendChild(row);
    });

    attachAudioListeners();
}

window.nextTrial = function() {
    const trial = activeTrials[currentTrialIdx];
    const inputs = document.querySelectorAll(".score-input");
    const scores = {};

    inputs.forEach(input => {
        scores[input.getAttribute("data-key")] = parseInt(input.value, 10);
    });

    // Backend için synth ve parametre ismi JSON paketinde saklanır
    collectedResults.push({
        trial_id: trial.trial_id,
        backend: trial.backend,
        parameter: trial.parameter,
        scores: scores
    });

    currentTrialIdx++;

    if (currentTrialIdx < activeTrials.length) {
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

// Tema ve Dil Yönetimi
window.toggleTheme = function() {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);
    document.getElementById("theme-btn").textContent = currentTheme === "dark" ? "☀️ Açık Mod" : "🌙 Koyu Mod";
};

window.toggleLanguage = function() {
    currentLang = currentLang === "tr" ? "en" : "tr";
    document.getElementById("lang-btn").textContent = currentLang === "tr" ? "EN" : "TR";
    
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (i18n[currentLang][key]) {
            el.textContent = i18n[currentLang][key];
        }
    });
};