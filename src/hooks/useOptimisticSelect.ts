import { useMemo, useState } from 'react';

type BaseOpt = { id: string; label: string; companyId?: string | null };

/**
 * Hook para gerenciar a seleção otimista de opções. A ideia do "optimistic" é que o usuário possa selecionar uma opção imediatamente após criar uma nova opção, e que o servidor carregue as opções adicionais.
 * @param serverOptions - Opções do servidor.
 * @returns {Object} - Objeto com as opções otimizadas e funções para marcar opções adicionadas e removidas.
 */
export function useOptimisticSelect<T extends BaseOpt>(serverOptions: T[]) {
  const [added, setAdded] = useState<T[]>([]);
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  const merged = useMemo(() => {
    const map = new Map<string, T>();
    (serverOptions || []).forEach((o) => map.set(o.id, o));
    added.forEach((o) => map.set(o.id, o));
    removedIds.forEach((id) => map.delete(id));
    return Array.from(map.values());
  }, [serverOptions, added, removedIds]);

  const markAdded = (o: T) => {
    setAdded((prev) => [o, ...prev]);
    setRemovedIds((prev) => prev.filter((id) => id !== o.id));
  };

  return { merged, markAdded } as const;
}
