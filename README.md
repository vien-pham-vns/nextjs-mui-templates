# Material UI - Next.js App Router example in TypeScript

This is a [Next.js](https://nextjs.org/) project demonstrating Material-UI integration with TypeScript and App Router. It serves as a template for building Material-UI applications with Next.js 15.

## Key Technologies

-   **Framework**: Next.js 15 with App Router
-   **UI Library**: Material-UI (MUI) v7 with Emotion styling
-   **Language**: TypeScript with strict mode enabled
-   **Theme**: Material-UI CSS variables with light/dark mode support
-   **Font**: Noto Sans from Google Fonts
-   **Package Manager**: pnpm

## Getting Started

Install dependencies and run the development server:

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

-   `pnpm run dev` - Start development server
-   `pnpm run build` - Build the Next.js application
-   `pnpm start` - Start production server
-   `pnpm run lint` - Run ESLint with Next.js configuration
-   `pnpm run post-update` - Update dependencies to latest versions

## Project Structure

-   `src/app/` - Next.js App Router pages and layouts
-   `src/components/` - Reusable UI components
-   `src/theme.ts` - Material-UI theme configuration

## Key Features

-   **App Router Layout**: Root layout with MUI providers and theme setup
-   **Color Scheme**: Light/dark/system theme switching with `ModeSwitch` component
-   **Typography**: Custom Noto Sans font integration
-   **CSS Baseline**: Material-UI's CssBaseline for consistent styling
-   **Path Aliases**: `@/*` resolves to `src/*` for clean imports

## Configuration

-   **TypeScript**: Strict mode with path mapping (`@/*` → `src/*`)
-   **ESLint**: Next.js + TypeScript + Prettier configuration with MUI import restrictions
-   **Next.js**: React Strict Mode enabled, minimal configuration
-   **MUI Setup**: AppRouterCacheProvider with CSS layer enabled for better performance

## Learn More

To learn more about this example:

-   [Next.js documentation](https://nextjs.org/docs) - learn about Next.js features and API
-   [Customizing Material UI](https://mui.com/material-ui/customization/how-to-customize/) - approaches to customizing Material UI
-   [Material-UI Templates](https://mui.com/material-ui/getting-started/templates/) - browse additional templates
