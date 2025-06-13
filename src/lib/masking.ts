export function maskName(name: string) {
  if (!name) return '';
  return name.slice(0, 2) + '*'.repeat(Math.max(0, name.length - 2));
}
 
export function maskDocNumber(doc: string) {
  if (!doc) return '';
  if (doc.length <= 4) return doc[0] + '*'.repeat(doc.length - 2) + doc.slice(-1);
  return doc.slice(0, 2) + '*'.repeat(doc.length - 4) + doc.slice(-2);
} 