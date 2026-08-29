/**
 * Minúsculas y sin acentos, para comparar texto escrito a mano: los buscadores
 * del dashboard tienen que encontrar "Nuñez" escribiendo "nunez".
 */
export const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
