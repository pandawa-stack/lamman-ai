// File: apps/web/src/components/forms/VoiceForm.tsx
'use client';

import { useProjectStore } from '@/store/useProjectStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Voice } from '@repo/types';

const ARCHETYPES = ["Pragmatic Expert", "Friendly Guide", "Bold Challenger", "Warm Mentor"];
const TONES = ["tegas", "ringkas", "humble", "berani", "cerdas", "hangat", "visioner", "pro-aksi", "humoris", "inspiratif"];
const READING_LEVELS = ["dasar", "menengah", "lanjutan"];

export function VoiceForm() {
  // Gunakan updateVoice agar konsisten dengan store terbaru
  const { voice, setStep, updateVoice } = useProjectStore();

  const handleSelectChange = (id: keyof Voice, value: string) => {
    if (id === 'tone') {
        const newTone = voice.tone.includes(value) 
            ? voice.tone.filter(t => t !== value)
            : [...voice.tone, value];
        updateVoice({ [id]: newTone.slice(0, 4) } as Partial<Voice>); 
    } else {
        updateVoice({ [id]: value } as Partial<Voice>);
    }
  };

  const handleCheckboxChange = (id: keyof Voice, checked: boolean) => {
    updateVoice({ [id]: checked } as Partial<Voice>);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold tracking-tight">🗣️ Step 2: Brand Voice</h2>
      <p className="text-muted-foreground">Tentukan kepribadian copy. AI akan menyesuaikan nada, diksi, dan framing.</p>

      {/* --- Archetype & Level --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-6 rounded-lg border">
        <div className="space-y-2">
          <Label htmlFor="archetype">Brand Archetype</Label>
          <Select value={voice.archetype} onValueChange={(v) => handleSelectChange('archetype', v)}>
            <SelectTrigger id="archetype">
              <SelectValue placeholder="Pilih Archetype" />
            </SelectTrigger>
            <SelectContent>
              {ARCHETYPES.map(a => (
                <SelectItem key={a} value={a}>{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reading_level">Reading Level</Label>
          <Select value={voice.reading_level} onValueChange={(v) => handleSelectChange('reading_level', v as Voice['reading_level'])}>
            <SelectTrigger id="reading_level">
              <SelectValue placeholder="Pilih Level" />
            </SelectTrigger>
            <SelectContent>
              {READING_LEVELS.map(l => (
                <SelectItem key={l} value={l}>{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* --- Tone of Voice (Multiselect) --- */}
      <div className="space-y-4 bg-muted/20 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3">🎵 Tone (Pilih Maksimal 4) — Saat ini: {voice.tone.length}/4</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {TONES.map(t => (
            <div key={t} className="flex items-center space-x-2">
              <Checkbox
                id={t}
                checked={voice.tone.includes(t)}
                onCheckedChange={() => handleSelectChange('tone', t)}
                disabled={voice.tone.length >= 4 && !voice.tone.includes(t)}
              />
              <Label htmlFor={t} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* --- Style Toggles --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-lg border">
        <div className="flex items-start space-x-3">
          <Checkbox id="power_words" checked={voice.power_words} onCheckedChange={(c) => handleCheckboxChange('power_words', c as boolean)} />
          <Label htmlFor="power_words" className="text-sm font-medium leading-none">Gunakan Power Words (Kata-kata persuasif)</Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox id="jargon_free" checked={voice.jargon_free} onCheckedChange={(c) => handleCheckboxChange('jargon_free', c as boolean)} />
          <Label htmlFor="jargon_free" className="text-sm font-medium leading-none">Hindari Jargon/Buzzword</Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox id="use_statistics" checked={voice.use_statistics} onCheckedChange={(c) => handleCheckboxChange('use_statistics', c as boolean)} />
          <Label htmlFor="use_statistics" className="text-sm font-medium leading-none">Include Data/Statistik (Jika relevan)</Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox id="conversational" checked={voice.conversational} onCheckedChange={(c) => handleCheckboxChange('conversational', c as boolean)} />
          <Label htmlFor="conversational" className="text-sm font-medium leading-none">Conversational Style (Gaya santai)</Label>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {/* ✅ PERBAIKAN: Kembali ke Step 0 (Brief) */}
        <Button variant="outline" onClick={() => setStep(0)}>
          ← Kembali: Brief
        </Button>
        
        {/* ✅ PERBAIKAN: Lanjut ke Step 2 (Generate Copy) */}
        <Button 
          onClick={() => setStep(2)} 
          disabled={voice.tone.length === 0}
        >
          Lanjut: Generate Copy →
        </Button>
      </div>
    </div>
  );
}