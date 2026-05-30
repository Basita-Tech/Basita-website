declare module "*.css" {
  export const content: Record<string, string>;
  const defaultExport: Record<string, string>;
  export default defaultExport;
}
