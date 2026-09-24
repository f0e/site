export declare global {
  var ThemeProvider: {
    getPreference(): string;
    setPreference(preference: string): void;
    isDarkTheme(): boolean;
    applyTheme(): void;
  };
}
