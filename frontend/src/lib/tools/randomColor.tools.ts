export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getColorFromName = (name: string): string => {
  // Convertir le nom en un nombre en utilisant un hash simple
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convertir le hash en une teinte HSL (0 à 360 degrés)
  const hue = Math.abs(hash % 360);

  // Générer la couleur HSL avec une saturation et une luminosité fixes
  return `hsl(${hue}, 73%, 70%)`;
};

