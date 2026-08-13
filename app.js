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

// 5 Sentezleyiciye Ait TAM (Exhaustive) Parametre Havuzu
const poolData = {
    Csound: [
        { parameter: "osc1.wave", folder: "p00_osc1.wave" },
        { parameter: "osc1.amplitude", folder: "p01_osc1.amplitude" },
        { parameter: "osc1.detune_c", folder: "p02_osc1.detune_c" },
        { parameter: "osc1.detune_f", folder: "p03_osc1.detune_f" },
        { parameter: "osc1.octave", folder: "p04_osc1.octave" },
        { parameter: "osc2.wave", folder: "p05_osc2.wave" },
        { parameter: "osc2.amplitude", folder: "p06_osc2.amplitude" },
        { parameter: "osc2.detune_c", folder: "p07_osc2.detune_c" },
        { parameter: "osc2.detune_f", folder: "p08_osc2.detune_f" },
        { parameter: "osc2.octave", folder: "p09_osc2.octave" },
        { parameter: "mix.osc1", folder: "p10_mix.osc1" },
        { parameter: "mix.osc2", folder: "p11_mix.osc2" },
        { parameter: "mix.noise", folder: "p12_mix.noise" },
        { parameter: "amp.attack", folder: "p13_amp.attack" },
        { parameter: "amp.decay", folder: "p14_amp.decay" },
        { parameter: "amp.sustain", folder: "p15_amp.sustain" },
        { parameter: "amp.release", folder: "p16_amp.release" },
        { parameter: "amp.alpha", folder: "p17_amp.alpha" },
        { parameter: "mod.attack", folder: "p18_mod.attack" },
        { parameter: "mod.decay", folder: "p19_mod.decay" },
        { parameter: "mod.sustain", folder: "p20_mod.sustain" },
        { parameter: "mod.release", folder: "p21_mod.release" },
        { parameter: "mod.depth", folder: "p22_mod.depth" },
        { parameter: "flt.cutoff", folder: "p23_flt.cutoff" },
        { parameter: "flt.resonance", folder: "p24_flt.resonance" },
        { parameter: "flt.type", folder: "p25_flt.type" },
        { parameter: "flt.env_depth", folder: "p26_flt.env_depth" },
        { parameter: "flt.lfo2_depth", folder: "p27_flt.lfo2_depth" },
        { parameter: "flt.key_follow", folder: "p28_flt.key_follow" },
        { parameter: "lfo1.rate", folder: "p29_lfo1.rate" },
        { parameter: "lfo1.pitch_depth", folder: "p30_lfo1.pitch_depth" },
        { parameter: "lfo1.amp_depth", folder: "p31_lfo1.amp_depth" },
        { parameter: "lfo1.wave", folder: "p32_lfo1.wave" },
        { parameter: "lfo2.rate", folder: "p33_lfo2.rate" },
        { parameter: "lfo2.flt_depth", folder: "p34_lfo2.flt_depth" },
        { parameter: "lfo2.wave", folder: "p35_lfo2.wave" },
        { parameter: "lfo2.delay", folder: "p36_lfo2.delay" },
        { parameter: "rev.time", folder: "p37_rev.time" },
        { parameter: "rev.level", folder: "p38_rev.level" },
        { parameter: "rev.damp", folder: "p39_rev.damp" },
        { parameter: "cho.rate", folder: "p40_cho.rate" },
        { parameter: "cho.depth", folder: "p41_cho.depth" },
        { parameter: "cho.mix", folder: "p42_cho.mix" },
        { parameter: "del.time", folder: "p43_del.time" },
        { parameter: "del.feedback", folder: "p44_del.feedback" },
        { parameter: "del.mix", folder: "p45_del.mix" },
        { parameter: "dist.drive", folder: "p46_dist.drive" },
        { parameter: "dist.tone", folder: "p47_dist.tone" },
        { parameter: "dist.mix", folder: "p48_dist.mix" },
        { parameter: "master.volume", folder: "p49_master.volume" },
        { parameter: "master.tune", folder: "p50_master.tune" },
        { parameter: "master.lfo3_rate", folder: "p51_master.lfo3_rate" }
    ],
    FluidSynth: [
        { parameter: "note.pitch_bend", folder: "p01_note.pitch_bend" },
        { parameter: "cc.modulation", folder: "p02_cc.modulation" },
        { parameter: "cc.breath", folder: "p03_cc.breath" },
        { parameter: "cc.expression", folder: "p04_cc.expression" },
        { parameter: "cc.balance", folder: "p06_cc.balance" },
        { parameter: "cc.pan", folder: "p07_cc.pan" },
        { parameter: "cc.brightness", folder: "p08_cc.brightness" },
        { parameter: "cc.resonance", folder: "p09_cc.resonance" },
        { parameter: "cc.attack_time", folder: "p10_cc.attack_time" },
        { parameter: "cc.release_time", folder: "p11_cc.release_time" },
        { parameter: "cc.vib_rate", folder: "p12_cc.vib_rate" },
        { parameter: "cc.vib_depth", folder: "p13_cc.vib_depth" },
        { parameter: "cc.vib_delay", folder: "p14_cc.vib_delay" },
        { parameter: "cc.portamento", folder: "p15_cc.portamento" },
        { parameter: "cc.reverb", folder: "p16_cc.reverb" },
        { parameter: "cc.chorus", folder: "p17_cc.chorus" },
        { parameter: "cc.tremolo", folder: "p18_cc.tremolo" },
        { parameter: "cc.phaser", folder: "p19_cc.phaser" },
        { parameter: "cc.detune", folder: "p20_cc.detune" },
        { parameter: "gen.vol_attack", folder: "p21_gen.vol_attack" },
        { parameter: "gen.vol_hold", folder: "p22_gen.vol_hold" },
        { parameter: "gen.vol_decay", folder: "p23_gen.vol_decay" },
        { parameter: "gen.vol_sustain", folder: "p24_gen.vol_sustain" },
        { parameter: "gen.vol_release", folder: "p25_gen.vol_release" },
        { parameter: "gen.attenuation", folder: "p26_gen.attenuation" },
        { parameter: "gen.mod_attack", folder: "p27_gen.mod_attack" },
        { parameter: "gen.mod_hold", folder: "p28_gen.mod_hold" },
        { parameter: "gen.mod_decay", folder: "p29_gen.mod_decay" },
        { parameter: "gen.mod_sustain", folder: "p30_gen.mod_sustain" },
        { parameter: "gen.mod_release", folder: "p31_gen.mod_release" },
        { parameter: "gen.filter_fc", folder: "p32_gen.filter_fc" },
        { parameter: "gen.filter_q", folder: "p33_gen.filter_q" },
        { parameter: "gen.mod_env_flt", folder: "p34_gen.mod_env_flt" },
        { parameter: "gen.mod_lfo_flt", folder: "p35_gen.mod_lfo_flt" },
        { parameter: "gen.mod_lfo_freq", folder: "p36_gen.mod_lfo_freq" },
        { parameter: "gen.mod_lfo_dly", folder: "p37_gen.mod_lfo_dly" },
        { parameter: "gen.vib_lfo_freq", folder: "p38_gen.vib_lfo_freq" },
        { parameter: "gen.vib_lfo_dly", folder: "p39_gen.vib_lfo_dly" },
        { parameter: "gen.mod_lfo_pit", folder: "p40_gen.mod_lfo_pit" },
        { parameter: "gen.vib_lfo_pit", folder: "p41_gen.vib_lfo_pit" },
        { parameter: "gen.mod_env_pit", folder: "p42_gen.mod_env_pit" },
        { parameter: "gen.coarse_tune", folder: "p43_gen.coarse_tune" },
        { parameter: "gen.fine_tune", folder: "p44_gen.fine_tune" },
        { parameter: "gen.scale_tuning", folder: "p45_gen.scale_tuning" },
        { parameter: "gen.mod_lfo_vol", folder: "p46_gen.mod_lfo_vol" },
        { parameter: "gen.reverb_send", folder: "p47_gen.reverb_send" },
        { parameter: "gen.chorus_send", folder: "p48_gen.chorus_send" },
        { parameter: "gen.sample_start", folder: "p49_gen.sample_start" }
    ],
    Pedalboard: [
        { parameter: "osc1.wave", folder: "p00_osc1.wave" },
        { parameter: "osc1.amplitude", folder: "p01_osc1.amplitude" },
        { parameter: "osc1.detune_c", folder: "p02_osc1.detune_c" },
        { parameter: "osc1.detune_f", folder: "p03_osc1.detune_f" },
        { parameter: "osc1.octave", folder: "p04_osc1.octave" },
        { parameter: "osc2.wave", folder: "p05_osc2.wave" },
        { parameter: "osc2.amplitude", folder: "p06_osc2.amplitude" },
        { parameter: "osc2.detune_c", folder: "p07_osc2.detune_c" },
        { parameter: "osc2.detune_f", folder: "p08_osc2.detune_f" },
        { parameter: "osc2.octave", folder: "p09_osc2.octave" },
        { parameter: "mix.osc1", folder: "p10_mix.osc1" },
        { parameter: "mix.osc2", folder: "p11_mix.osc2" },
        { parameter: "mix.noise", folder: "p12_mix.noise" },
        { parameter: "amp.attack", folder: "p13_amp.attack" },
        { parameter: "amp.decay", folder: "p14_amp.decay" },
        { parameter: "amp.sustain", folder: "p15_amp.sustain" },
        { parameter: "amp.release", folder: "p16_amp.release" },
        { parameter: "amp.alpha", folder: "p17_amp.alpha" },
        { parameter: "mod.attack", folder: "p18_mod.attack" },
        { parameter: "mod.decay", folder: "p19_mod.decay" },
        { parameter: "mod.sustain", folder: "p20_mod.sustain" },
        { parameter: "mod.release", folder: "p21_mod.release" },
        { parameter: "mod.depth", folder: "p22_mod.depth" },
        { parameter: "flt.cutoff", folder: "p23_flt.cutoff" },
        { parameter: "flt.resonance", folder: "p24_flt.resonance" },
        { parameter: "flt.mode", folder: "p25_flt.mode" },
        { parameter: "flt.env_depth", folder: "p26_flt.env_depth" },
        { parameter: "flt.lfo2_depth", folder: "p27_flt.lfo2_depth" },
        { parameter: "flt.key_follow", folder: "p28_flt.key_follow" },
        { parameter: "lfo1.rate", folder: "p29_lfo1.rate" },
        { parameter: "lfo1.pitch_depth", folder: "p30_lfo1.pitch_depth" },
        { parameter: "lfo1.amp_depth", folder: "p31_lfo1.amp_depth" },
        { parameter: "lfo1.wave", folder: "p32_lfo1.wave" },
        { parameter: "lfo1.delay", folder: "p33_lfo1.delay" },
        { parameter: "lfo2.rate", folder: "p34_lfo2.rate" },
        { parameter: "lfo2.flt_depth", folder: "p35_lfo2.flt_depth" },
        { parameter: "lfo2.wave", folder: "p36_lfo2.wave" },
        { parameter: "lfo2.delay", folder: "p37_lfo2.delay" },
        { parameter: "rev.room_size", folder: "p38_rev.room_size" },
        { parameter: "rev.wet", folder: "p39_rev.wet" },
        { parameter: "rev.damp", folder: "p40_rev.damp" },
        { parameter: "rev.width", folder: "p41_rev.width" },
        { parameter: "cho.rate", folder: "p42_cho.rate" },
        { parameter: "cho.depth", folder: "p43_cho.depth" },
        { parameter: "cho.mix", folder: "p44_cho.mix" },
        { parameter: "cho.centre_delay", folder: "p45_cho.centre_delay" },
        { parameter: "del.time", folder: "p46_del.time" },
        { parameter: "del.feedback", folder: "p47_del.feedback" },
        { parameter: "del.mix", folder: "p48_del.mix" },
        { parameter: "del.filter_hz", folder: "p49_del.filter_hz" },
        { parameter: "dist.drive_db", folder: "p50_dist.drive_db" },
        { parameter: "dist.tone", folder: "p51_dist.tone" },
        { parameter: "dist.mix", folder: "p52_dist.mix" },
        { parameter: "master.volume", folder: "p53_master.volume" },
        { parameter: "master.tune", folder: "p54_master.tune" },
        { parameter: "master.phaser_mix", folder: "p55_master.phaser_mix" }
    ],
    Pyo: [
        { parameter: "osc1.wave", folder: "p00_osc1.wave" },
        { parameter: "osc1.amplitude", folder: "p01_osc1.amplitude" },
        { parameter: "osc1.detune_c", folder: "p02_osc1.detune_c" },
        { parameter: "osc1.detune_f", folder: "p03_osc1.detune_f" },
        { parameter: "osc1.octave", folder: "p04_osc1.octave" },
        { parameter: "osc2.wave", folder: "p05_osc2.wave" },
        { parameter: "osc2.amplitude", folder: "p06_osc2.amplitude" },
        { parameter: "osc2.detune_c", folder: "p07_osc2.detune_c" },
        { parameter: "osc2.detune_f", folder: "p08_osc2.detune_f" },
        { parameter: "osc2.octave", folder: "p09_osc2.octave" },
        { parameter: "mix.osc1", folder: "p10_mix.osc1" },
        { parameter: "mix.osc2", folder: "p11_mix.osc2" },
        { parameter: "mix.noise", folder: "p12_mix.noise" },
        { parameter: "amp.attack", folder: "p13_amp.attack" },
        { parameter: "amp.decay", folder: "p14_amp.decay" },
        { parameter: "amp.sustain", folder: "p15_amp.sustain" },
        { parameter: "amp.release", folder: "p16_amp.release" },
        { parameter: "amp.alpha", folder: "p17_amp.alpha" },
        { parameter: "mod.attack", folder: "p18_mod.attack" },
        { parameter: "mod.decay", folder: "p19_mod.decay" },
        { parameter: "mod.sustain", folder: "p20_mod.sustain" },
        { parameter: "mod.release", folder: "p21_mod.release" },
        { parameter: "mod.depth", folder: "p22_mod.depth" },
        { parameter: "flt.cutoff", folder: "p23_flt.cutoff" },
        { parameter: "flt.resonance", folder: "p24_flt.resonance" },
        { parameter: "flt.type", folder: "p25_flt.type" },
        { parameter: "flt.env_depth", folder: "p26_flt.env_depth" },
        { parameter: "flt.lfo2_depth", folder: "p27_flt.lfo2_depth" },
        { parameter: "flt.key_follow", folder: "p28_flt.key_follow" },
        { parameter: "lfo1.rate", folder: "p29_lfo1.rate" },
        { parameter: "lfo1.pitch_depth", folder: "p30_lfo1.pitch_depth" },
        { parameter: "lfo1.amp_depth", folder: "p31_lfo1.amp_depth" },
        { parameter: "lfo1.wave", folder: "p32_lfo1.wave" },
        { parameter: "lfo1.delay", folder: "p33_lfo1.delay" },
        { parameter: "lfo2.rate", folder: "p34_lfo2.rate" },
        { parameter: "lfo2.flt_depth", folder: "p35_lfo2.flt_depth" },
        { parameter: "lfo2.wave", folder: "p36_lfo2.wave" },
        { parameter: "lfo2.delay", folder: "p37_lfo2.delay" },
        { parameter: "rev.size", folder: "p38_rev.size" },
        { parameter: "rev.level", folder: "p39_rev.level" },
        { parameter: "rev.damp", folder: "p40_rev.damp" },
        { parameter: "rev.pre_delay", folder: "p41_rev.pre_delay" },
        { parameter: "cho.rate", folder: "p42_cho.rate" },
        { parameter: "cho.depth", folder: "p43_cho.depth" },
        { parameter: "cho.mix", folder: "p44_cho.mix" },
        { parameter: "cho.feedback", folder: "p45_cho.feedback" },
        { parameter: "del.time", folder: "p46_del.time" },
        { parameter: "del.feedback", folder: "p47_del.feedback" },
        { parameter: "del.mix", folder: "p48_del.mix" },
        { parameter: "del.filter", folder: "p49_del.filter" },
        { parameter: "dist.drive", folder: "p50_dist.drive" },
        { parameter: "dist.slope", folder: "p51_dist.slope" },
        { parameter: "dist.mix", folder: "p52_dist.mix" },
        { parameter: "dist.input_gain", folder: "p53_dist.input_gain" },
        { parameter: "master.volume", folder: "p54_master.volume" },
        { parameter: "master.tune", folder: "p55_master.tune" }
    ],
    TorchSynth: [
        { parameter: "adsr1.attack", folder: "p00_adsr1.attack" },
        { parameter: "adsr1.decay", folder: "p01_adsr1.decay" },
        { parameter: "adsr1.sustain", folder: "p02_adsr1.sustain" },
        { parameter: "adsr1.release", folder: "p03_adsr1.release" },
        { parameter: "adsr1.alpha", folder: "p04_adsr1.alpha" },
        { parameter: "adsr2.attack", folder: "p05_adsr2.attack" },
        { parameter: "adsr2.decay", folder: "p06_adsr2.decay" },
        { parameter: "adsr2.sustain", folder: "p07_adsr2.sustain" },
        { parameter: "adsr2.release", folder: "p08_adsr2.release" },
        { parameter: "adsr2.alpha", folder: "p09_adsr2.alpha" },
        { parameter: "lfo1.frequency", folder: "p10_lfo1.frequency" },
        { parameter: "lfo1.mod_depth", folder: "p11_lfo1.mod_depth" },
        { parameter: "lfo1.initial_phase", folder: "p12_lfo1.initial_phase" },
        { parameter: "lfo1.sin", folder: "p13_lfo1.sin" },
        { parameter: "lfo1.tri", folder: "p14_lfo1.tri" },
        { parameter: "lfo1.saw", folder: "p15_lfo1.saw" },
        { parameter: "lfo1.rsaw", folder: "p16_lfo1.rsaw" },
        { parameter: "lfo1.sqr", folder: "p17_lfo1.sqr" },
        { parameter: "lfo1_amp.attack", folder: "p18_lfo1_amp.attack" },
        { parameter: "lfo1_amp.decay", folder: "p19_lfo1_amp.decay" },
        { parameter: "lfo1_amp.sustain", folder: "p20_lfo1_amp.sustain" },
        { parameter: "lfo1_amp.release", folder: "p21_lfo1_amp.release" },
        { parameter: "lfo1_amp.alpha", folder: "p22_lfo1_amp.alpha" },
        { parameter: "lfo1_rate.attack", folder: "p23_lfo1_rate.attack" },
        { parameter: "lfo1_rate.decay", folder: "p24_lfo1_rate.decay" },
        { parameter: "lfo1_rate.sustain", folder: "p25_lfo1_rate.sustain" },
        { parameter: "lfo1_rate.release", folder: "p26_lfo1_rate.release" },
        { parameter: "lfo1_rate.alpha", folder: "p27_lfo1_rate.alpha" },
        { parameter: "lfo2.frequency", folder: "p28_lfo2.frequency" },
        { parameter: "lfo2.mod_depth", folder: "p29_lfo2.mod_depth" },
        { parameter: "lfo2.initial_phase", folder: "p30_lfo2.initial_phase" },
        { parameter: "lfo2.sin", folder: "p31_lfo2.sin" },
        { parameter: "lfo2.tri", folder: "p32_lfo2.tri" },
        { parameter: "lfo2.saw", folder: "p33_lfo2.saw" },
        { parameter: "lfo2.rsaw", folder: "p34_lfo2.rsaw" },
        { parameter: "lfo2.sqr", folder: "p35_lfo2.sqr" },
        { parameter: "lfo2_amp.attack", folder: "p36_lfo2_amp.attack" },
        { parameter: "lfo2_amp.decay", folder: "p37_lfo2_amp.decay" },
        { parameter: "lfo2_amp.sustain", folder: "p38_lfo2_amp.sustain" },
        { parameter: "lfo2_amp.release", folder: "p39_lfo2_amp.release" },
        { parameter: "lfo2_amp.alpha", folder: "p40_lfo2_amp.alpha" },
        { parameter: "lfo2_rate.attack", folder: "p41_lfo2_rate.attack" },
        { parameter: "lfo2_rate.decay", folder: "p42_lfo2_rate.decay" },
        { parameter: "lfo2_rate.sustain", folder: "p43_lfo2_rate.sustain" },
        { parameter: "lfo2_rate.release", folder: "p44_lfo2_rate.release" },
        { parameter: "lfo2_rate.alpha", folder: "p45_lfo2_rate.alpha" },
        { parameter: "mixer.vco1", folder: "p46_mixer.vco1" },
        { parameter: "mixer.vco2", folder: "p47_mixer.vco2" },
        { parameter: "mixer.noise", folder: "p48_mixer.noise" },
        { parameter: "mm.adsr1_vco1p", folder: "p49_mm.adsr1_vco1p" },
        { parameter: "mm.adsr1_vco1a", folder: "p50_mm.adsr1_vco1a" },
        { parameter: "mm.adsr1_vco2p", folder: "p51_mm.adsr1_vco2p" },
        { parameter: "mm.adsr1_vco2a", folder: "p52_mm.adsr1_vco2a" },
        { parameter: "mm.adsr1_noisea", folder: "p53_mm.adsr1_noisea" },
        { parameter: "mm.adsr2_vco1p", folder: "p54_mm.adsr2_vco1p" },
        { parameter: "mm.adsr2_vco1a", folder: "p55_mm.adsr2_vco1a" },
        { parameter: "mm.adsr2_vco2p", folder: "p56_mm.adsr2_vco2p" },
        { parameter: "mm.adsr2_vco2a", folder: "p57_mm.adsr2_vco2a" },
        { parameter: "mm.adsr2_noisea", folder: "p58_mm.adsr2_noisea" },
        { parameter: "mm.lfo1_vco1p", folder: "p59_mm.lfo1_vco1p" },
        { parameter: "mm.lfo1_vco1a", folder: "p60_mm.lfo1_vco1a" },
        { parameter: "mm.lfo1_vco2p", folder: "p61_mm.lfo1_vco2p" },
        { parameter: "mm.lfo1_vco2a", folder: "p62_mm.lfo1_vco2a" },
        { parameter: "mm.lfo1_noisea", folder: "p63_mm.lfo1_noisea" },
        { parameter: "mm.lfo2_vco1p", folder: "p64_mm.lfo2_vco1p" },
        { parameter: "mm.lfo2_vco1a", folder: "p65_mm.lfo2_vco1a" },
        { parameter: "mm.lfo2_vco2p", folder: "p66_mm.lfo2_vco2p" },
        { parameter: "mm.lfo2_vco2a", folder: "p67_mm.lfo2_vco2a" },
        { parameter: "mm.lfo2_noisea", folder: "p68_mm.lfo2_noisea" },
        { parameter: "vco1.tuning", folder: "p69_vco1.tuning" },
        { parameter: "vco1.mod_depth", folder: "p70_vco1.mod_depth" },
        { parameter: "vco1.initial_phase", folder: "p71_vco1.initial_phase" },
        { parameter: "vco2.tuning", folder: "p72_vco2.tuning" },
        { parameter: "vco2.mod_depth", folder: "p73_vco2.mod_depth" },
        { parameter: "vco2.initial_phase", folder: "p74_vco2.initial_phase" },
        { parameter: "vco2.shape", folder: "p75_vco2.shape" }
    ]
};

let activeTrials = [];
let currentTrialIdx = 0;
let collectedResults = [];

// Fisher-Yates Rastgele Karıştırma Algoritması
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// 1 Synth Seçimi + Seçilen Synth'ten RASTGELE 10 Parametre Seçimi
function initRandomExperiment() {
    const synths = Object.keys(poolData);
    const chosenSynth = synths[Math.floor(Math.random() * synths.length)];
    const availableParams = poolData[chosenSynth];
    
    // Seçilen synth'e ait tüm parametreleri karıştır ve RASTGELE 10 TANESİNİ al
    const shuffledParams = shuffleArray(availableParams);
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
                { key: "p000", src: `audio_files/${synthFolder}/${item.folder}/sweep_v0.0000.wav` },
                { key: "p025", src: `audio_files/${synthFolder}/${item.folder}/sweep_v0.2500.wav` },
                { key: "p050_hidden", src: refPath },
                { key: "p075", src: `audio_files/${synthFolder}/${item.folder}/sweep_v0.7500.wav` },
                { key: "p100", src: `audio_files/${synthFolder}/${item.folder}/sweep_v1.0000.wav` }
            ]
        };
    });
}

// Tek Bir Ses Çalma Kontrolü (Aynı anda sadece 1 ses çalar)
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
    if (!trial) return;

    const prefix = i18n[currentLang].trial_prefix;
    
    // KÖR TEST: Synth ve Parametre adı gizlenir, sadece Test numarası yazar
    document.getElementById("trial-title").textContent = `${prefix} ${idx + 1} / ${activeTrials.length}`;
    
    const refAudio = document.getElementById("ref-audio");
    refAudio.src = trial.ref;
    refAudio.load();

    const container = document.getElementById("stimuli-container");
    container.innerHTML = "";

    // 5 uyaranı (A, B, C, D, E) karıştır
    const shuffledStimuli = shuffleArray(trial.stimuli);
    const labels = ["Stimulus A", "Stimulus B", "Stimulus C", "Stimulus D", "Stimulus E"];

    shuffledStimuli.forEach((item, index) => {
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

    toggleLanguage(true);
    attachAudioListeners();
}

window.nextTrial = function() {
    const trial = activeTrials[currentTrialIdx];
    const inputs = document.querySelectorAll(".score-input");
    const scores = {};

    inputs.forEach(input => {
        scores[input.getAttribute("data-key")] = parseInt(input.value, 10);
    });

    // Backend (Google Sheets) için Synth adı ve Parametre adı JSON'a eklenir
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

window.toggleLanguage = function(preserveTrial = false) {
    if (!preserveTrial) {
        currentLang = currentLang === "tr" ? "en" : "tr";
    }
    document.getElementById("lang-btn").textContent = currentLang === "tr" ? "EN" : "TR";
    
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (i18n[currentLang][key]) {
            el.textContent = i18n[currentLang][key];
        }
    });

    if (activeTrials.length > 0) {
        const prefix = i18n[currentLang].trial_prefix;
        document.getElementById("trial-title").textContent = `${prefix} ${currentTrialIdx + 1} / ${activeTrials.length}`;
    }
};