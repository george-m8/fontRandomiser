interface FontRandomiserOptions {
  fonts?: string[]
  selectors?: string[]
  fallback?: string | string[]
}

interface FontRandomiser {
  init(options?: FontRandomiserOptions): void
  randomise(options?: FontRandomiserOptions): void
  fonts: string[]
  selectors: string[]
  fallback: string | string[]
}

declare const fontRandomiser: FontRandomiser
export = fontRandomiser
