export const whatsappNumber = "+44 7735 473196";
export const whatsappUrl = "https://wa.me/447735473196";

export function whatsappLink(message: string) {
  return `${whatsappUrl}?text=${encodeURIComponent(message)}`;
}
