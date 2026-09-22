/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode, useState } from 'react';
import { AlertTriangle, Check, Copy, HelpCircle, X } from 'lucide-react';
import type { VerdictTier, YesNoUnsure } from '../../kelly/types';

// Four visually distinct tiers, kept in the site's dark-editorial register
// (desaturated rather than traffic-light bright) but genuinely different
// hues — this is the one place on the site where color must be read
// correctly at a glance, so it can't lean on arterial-red for everything.
export const VERDICT_STYLES: Record<VerdictTier, { text: string; border: string; bg: string; dot: string; ring: string }> = {
  green: { text: 'text-[#7cbf6a]', border: 'border-[#7cbf6a]/40', bg: 'bg-[#7cbf6a]/10', dot: 'bg-[#7cbf6a]', ring: 'shadow-[0_24px_60px_-24px_rgba(124,191,106,0.35)]' },
  amber: { text: 'text-[#e0a83e]', border: 'border-[#e0a83e]/40', bg: 'bg-[#e0a83e]/10', dot: 'bg-[#e0a83e]', ring: 'shadow-[0_24px_60px_-24px_rgba(224,168,62,0.35)]' },
  red: { text: 'text-arterial-red', border: 'border-arterial-red/40', bg: 'bg-arterial-red/10', dot: 'bg-arterial-red', ring: 'shadow-[0_24px_60px_-24px_rgba(230,59,78,0.4)]' },
  darkred: { text: 'text-[#ff5468]', border: 'border-[#8f1620]', bg: 'bg-[#8f1620]/40', dot: 'bg-[#ff5468]', ring: 'shadow-[0_24px_60px_-24px_rgba(143,22,32,0.6)]' },
};

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="w-8 h-px bg-arterial-red" />
      <span className="text-caption text-arterial-red font-bold tracking-[0.3em] uppercase">{children}</span>
    </div>
  );
}

export function FieldWrap({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-3">
      <span className="text-caption text-pebble tracking-[0.15em] uppercase font-bold">{label}</span>
      {children}
      {hint && <span className="text-body text-ash/60 leading-snug">{hint}</span>}
    </label>
  );
}

const inputClass =
  'bg-void-canvas border border-iron/25 rounded-lg px-5 py-4 text-body text-bone-white w-full focus:outline-none focus:border-arterial-red transition-colors placeholder:text-pebble/30';

export function NumberField({
  label,
  hint,
  value,
  onChange,
  suffix,
  placeholder,
  min = 0,
}: {
  label: string;
  hint?: string;
  value: number | '';
  onChange: (v: number | '') => void;
  suffix?: string;
  placeholder?: string;
  min?: number;
}) {
  return (
    <FieldWrap label={label} hint={hint}>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min={min}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          className={inputClass + (suffix ? ' pr-16' : '')}
        />
        {suffix && (
          <span className="absolute right-5 top-1/2 -translate-y-1/2 text-caption text-pebble">{suffix}</span>
        )}
      </div>
    </FieldWrap>
  );
}

export function SelectField<T extends string>({
  label,
  hint,
  value,
  onChange,
  options,
}: {
  label: string;
  hint?: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <FieldWrap label={label} hint={hint}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className={inputClass + ' appearance-none cursor-pointer'}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-void-canvas">
            {o.label}
          </option>
        ))}
      </select>
    </FieldWrap>
  );
}

const YNU_OPTIONS: { value: YesNoUnsure; label: string; icon: ReactNode }[] = [
  { value: 'yes', label: 'Yes', icon: <Check size={14} /> },
  { value: 'no', label: 'No', icon: <X size={14} /> },
  { value: 'unsure', label: 'Not sure', icon: <HelpCircle size={14} /> },
];

export function YesNoUnsureField({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: YesNoUnsure | undefined;
  onChange: (v: YesNoUnsure) => void;
}) {
  return (
    <FieldWrap label={label} hint={hint}>
      <div className="grid grid-cols-3 gap-2">
        {YNU_OPTIONS.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              aria-pressed={active}
              className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg border text-caption font-bold uppercase tracking-wide transition-all ${
                active
                  ? 'border-arterial-red bg-arterial-red/10 text-bone-white'
                  : 'border-iron/25 text-pebble hover:border-arterial-red/60 hover:text-bone-white'
              }`}
            >
              {o.icon}
              {o.label}
            </button>
          );
        })}
      </div>
    </FieldWrap>
  );
}

export function Banner({ tone = 'warning', children }: { tone?: 'warning' | 'info'; children: ReactNode }) {
  const isWarning = tone === 'warning';
  return (
    <div
      className={`flex items-start gap-4 rounded-lg border p-5 text-body leading-relaxed ${
        isWarning ? 'border-[#e0a83e]/30 bg-[#e0a83e]/10 text-bone-white' : 'border-iron/25 bg-charcoal-plate/30 text-ash'
      }`}
    >
      <AlertTriangle size={18} className={isWarning ? 'text-[#e0a83e] shrink-0 mt-0.5' : 'text-pebble shrink-0 mt-0.5'} />
      <div>{children}</div>
    </div>
  );
}

export function StatTile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col gap-2 p-6 rounded-lg border border-iron/15 bg-charcoal-plate/30">
      <span className="text-caption text-pebble tracking-[0.15em] uppercase">{label}</span>
      <span className="text-heading-sm text-bone-white leading-none">{value}</span>
      {sub && <span className="text-body text-ash/60">{sub}</span>}
    </div>
  );
}

export function PrimaryButton({ children, onClick, disabled, type = 'button' }: { children: ReactNode; onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-bone-white text-void-canvas text-caption font-bold uppercase tracking-widest hover:bg-arterial-red hover:text-bone-white disabled:opacity-30 disabled:pointer-events-none transition-all"
    >
      {children}
    </button>
  );
}

// A text-only "shareable card": the verdict and its reasoning, never the
// private numbers the user entered (bankroll, stakes, odds, amounts).
export function ShareButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied — silently no-op rather than throw.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg border border-iron/20 text-pebble text-caption uppercase tracking-widest hover:text-bone-white hover:border-arterial-red transition-all"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      {copied ? 'Copied' : 'Copy shareable summary'}
    </button>
  );
}

export function GhostButton({ children, onClick, disabled }: { children: ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg border border-iron/20 text-pebble text-caption uppercase tracking-widest hover:text-bone-white hover:border-arterial-red disabled:opacity-30 disabled:pointer-events-none transition-all"
    >
      {children}
    </button>
  );
}
