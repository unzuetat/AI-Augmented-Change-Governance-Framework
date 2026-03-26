import { ChangeRecord } from '../types';

export interface SimilarityMatch {
  change: ChangeRecord;
  score: number;
  reasons: string[];
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

function textSimilarity(a: string, b: string): number {
  const tokensA = new Set(tokenize(a));
  const tokensB = new Set(tokenize(b));
  if (tokensA.size === 0 || tokensB.size === 0) return 0;

  let intersection = 0;
  for (const t of tokensA) {
    if (tokensB.has(t)) intersection++;
  }

  const union = new Set([...tokensA, ...tokensB]).size;
  return union > 0 ? intersection / union : 0;
}

function arrayOverlap(a: string[], b: string[]): number {
  if (a.length === 0 || b.length === 0) return 0;
  const setB = new Set(b);
  let matches = 0;
  for (const item of a) {
    if (setB.has(item)) matches++;
  }
  const union = new Set([...a, ...b]).size;
  return union > 0 ? matches / union : 0;
}

export function findSimilarChanges(
  target: ChangeRecord,
  allChanges: ChangeRecord[],
  maxResults: number = 3,
  minScore: number = 0.15
): SimilarityMatch[] {
  const results: SimilarityMatch[] = [];

  for (const candidate of allChanges) {
    if (candidate.id === target.id) continue;

    let score = 0;
    const reasons: string[] = [];

    const titleSim = textSimilarity(target.title, candidate.title);
    if (titleSim > 0.1) {
      score += titleSim * 30;
      reasons.push(`Similar title (${Math.round(titleSim * 100)}% match)`);
    }

    const descSim = textSimilarity(target.description, candidate.description);
    if (descSim > 0.1) {
      score += descSim * 20;
      reasons.push(`Similar description (${Math.round(descSim * 100)}% match)`);
    }

    if (target.category === candidate.category) {
      score += 15;
      reasons.push(`Same category: ${candidate.category}`);
    }

    if (target.scope === candidate.scope) {
      score += 10;
      reasons.push(`Same scope: ${candidate.scope.replace(/-/g, ' ')}`);
    }

    if (target.type === candidate.type) {
      score += 5;
      reasons.push(`Same type: ${candidate.type}`);
    }

    const serviceOverlap = arrayOverlap(target.affectedServices, candidate.affectedServices);
    if (serviceOverlap > 0) {
      score += serviceOverlap * 20;
      reasons.push(`Shared affected services (${Math.round(serviceOverlap * 100)}% overlap)`);
    }

    const projectOverlap = arrayOverlap(target.affectedProjects, candidate.affectedProjects);
    if (projectOverlap > 0) {
      score += projectOverlap * 15;
      reasons.push(`Shared affected projects (${Math.round(projectOverlap * 100)}% overlap)`);
    }

    if (target.risk === candidate.risk) {
      score += 5;
      reasons.push(`Same risk level: ${candidate.risk}`);
    }

    const normalizedScore = Math.min(score / 100, 1);

    if (normalizedScore >= minScore && reasons.length > 0) {
      results.push({
        change: candidate,
        score: normalizedScore,
        reasons,
      });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

export function getSimilarityLabel(score: number): { text: string; color: string } {
  if (score >= 0.7) return { text: 'Very similar', color: 'text-red-600 bg-red-50' };
  if (score >= 0.45) return { text: 'Similar', color: 'text-orange-600 bg-orange-50' };
  if (score >= 0.25) return { text: 'Somewhat similar', color: 'text-yellow-600 bg-yellow-50' };
  return { text: 'Loosely related', color: 'text-gray-600 bg-gray-50' };
}
