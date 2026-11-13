import { Config } from "@remotion/cli/config";

// Serve the app's own assets (fonts, icon) instead of duplicating them here.
Config.setPublicDir("../client/assets");
Config.setEntryPoint("src/index.ts");
