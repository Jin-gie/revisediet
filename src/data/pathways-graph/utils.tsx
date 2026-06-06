import { SourcePosition, TargetPosition } from ".";
import { metabolites, glycolysisOnlyMetabolites, krebsOnlyMetabolites, ureaOnlyMetabolites } from "./metabolites";

// Map globale id → position, accessible partout
export const positionById: Record<string, { x: number; y: number }> = Object.fromEntries(
  Object.values({
    ...metabolites,
    ...glycolysisOnlyMetabolites,
    ...krebsOnlyMetabolites,
    ...ureaOnlyMetabolites,
  }).map(n => [n.id, n.position])
)

// Calcule automatiquement sourceHandle et targetHandle selon les positions
export function getHandles(
  source: { x: number; y: number },
  target: { x: number; y: number },
  threshold = 100  // en dessous de ce delta, on considère que c'est aligné
): { sourceHandle: string; targetHandle: string } {
  const dx = target.x - source.x
  const dy = target.y - source.y

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0
      ? { sourceHandle: 'source-right', targetHandle: 'target-left' }
      : { sourceHandle: 'source-left',  targetHandle: 'target-right' }
  }

  return dy > 0
    ? { sourceHandle: 'source-bottom', targetHandle: 'target-top' }
    : { sourceHandle: 'source-top',    targetHandle: 'target-bottom' }

  // Si le déplacement horizontal est dominant
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0
      ? { sourceHandle: 'source-right', targetHandle: 'target-left' }
      : { sourceHandle: 'source-left',  targetHandle: 'target-right' }
  }

  // Si le déplacement vertical est dominant
  return dy > 0
    ? { sourceHandle: 'source-bottom', targetHandle: 'target-top' }
    : { sourceHandle: 'source-top',    targetHandle: 'target-bottom' }
}

export function autoHandles(sourceId: string, targetId: string) {
  const sourcePos = positionById[sourceId];
  const targetPos = positionById[targetId];
  if (!sourcePos || !targetPos) {
    // Si on n'a pas la position, on retourne des handles par défaut
    return {
      sourceHandle: 'source-bottom' as SourcePosition,
      targetHandle: 'target-top' as TargetPosition,
    };
  }
  return getHandles(sourcePos, targetPos);
}