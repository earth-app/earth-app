#!/usr/bin/env node

/**
 * Scans `src/` for claims the behaviour-design evidence does not support.
 *
 * A plain node script rather than a test: this site has no test runner, and a guard that needs one
 * installed first would not have been written. cloud, crust and sky run the same pattern list from
 * their own vitest suites.
 *
 * Comments are stripped before matching, so a note explaining why a figure was rejected may name it.
 */

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');

const BANNED = [
	{
		pattern: /\baddict(ion|ive|ed|s)\b/i,
		why: 'behavioural addiction is a contested construct, not a DSM-5/ICD-11 diagnosis'
	},
	{
		pattern:
			/within\s+300\s*m(eters?|etres?)?\b|300\s*m(eters?|etres?)?\s+of\s+(green|a park|nature)/i,
		why: 'the 300 m green-space threshold is a planning convention with no behavioural derivation'
	},
	{
		pattern: /120\s*min(ute)?s?\s*(a|per|\/)\s*week|two hours a week (outside|outdoors|in nature)/i,
		why: 'White 2019 is cross-sectional and its authors declined to turn 120 min/week into guidance'
	},
	{
		pattern: /the amount linked to|the dose linked to/i,
		why: 'reads as a prescribed dose; there is no established one'
	},
	{
		pattern: /(reduces|cures|prevents|treats)\s+(stress|anxiety|loneliness|depression)/i,
		why: 'no causal claim is available; more contact does not even reduce loneliness (Masi 2011)'
	},
	{
		pattern: /(scientifically|clinically)\s+proven|proven\s+to\s+(reduce|improve|boost)/i,
		why: 'nothing in this evidence base is at proof strength'
	},
	{
		pattern: /verif(y|ies|ied)\s+(you|your|that you)\s+(were|are|went)/i,
		why: 'nature minutes are self-reported time outside, never verified presence'
	},
	{
		pattern: /\bmeet (new )?people\b/i,
		why: 'the app has no feed and no matching; this overclaim was already removed once'
	}
];

const EXTENSIONS = ['.vue', '.ts', '.js', '.md'];

function sourceFiles(dir) {
	const out = [];
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = join(dir, entry.name);
		if (entry.isDirectory()) out.push(...sourceFiles(full));
		else if (EXTENSIONS.includes(extname(entry.name))) out.push(full);
	}
	return out;
}

function stripComments(text) {
	return text
		.replace(/<!--[\s\S]*?-->/g, ' ')
		.replace(/\/\*[\s\S]*?\*\//g, ' ')
		.replace(/(^|[^:])\/\/[^\n]*/g, '$1');
}

const files = sourceFiles(SRC);
if (files.length === 0) {
	console.error('copy-guard: found no source files under src/, refusing to pass');
	process.exit(1);
}

const offenders = [];
for (const file of files) {
	const text = stripComments(readFileSync(file, 'utf-8'));
	for (const { pattern, why } of BANNED) {
		const match = text.match(pattern);
		if (match) offenders.push({ file: relative(ROOT, file), found: match[0], why });
	}
}

// a guard that cannot fail is not a guard; prove the matcher still bites
const canary = 'aim for 120 minutes a week';
if (!BANNED.some(({ pattern }) => pattern.test(canary))) {
	console.error('copy-guard: the pattern list no longer matches its own canary');
	process.exit(1);
}

if (offenders.length > 0) {
	console.error(`copy-guard: ${offenders.length} banned claim(s) in user-facing copy\n`);
	for (const { file, found, why } of offenders) {
		console.error(`  ${file}\n    found: "${found}"\n    why:   ${why}\n`);
	}
	process.exit(1);
}

console.log(`copy-guard: ${files.length} files scanned, no banned claims`);
