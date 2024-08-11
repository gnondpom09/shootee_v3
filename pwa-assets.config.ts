import {
  createAppleSplashScreens,
  defineConfig,
  minimal2023Preset,
} from "@vite-pwa/assets-generator/config";

export default defineConfig({
  headLinkOptions: {
    preset: "2023",
  },
  preset: {
    ...minimal2023Preset,
    png: {
      compressionLevel: 9,
      quality: 60,
    },
    appleSplashScreens: createAppleSplashScreens(
      {
        padding: 0.3,
        resizeOptions: { background: "#14a098", fit: "contain" },
        // by default, dark splash screens are exluded
        // darkResizeOptions: { background: 'black' },
        linkMediaOptions: {
          // will log the links you need to add to your html pages
          log: true,
          // add screen to media attribute link?
          // by default:
          // <link rel="apple-touch-startup-image" href="..." media="screen and ...">
          addMediaScreen: true,
          basePath: "/",
          // add closing link tag?
          // by default:
          // <link rel="apple-touch-startup-image" href="..." media="...">
          // with xhtml enabled:
          // <link rel="apple-touch-startup-image" href="..." media="..." />
          xhtml: false,
        },
        png: {
          compressionLevel: 9,
          quality: 60,
        },
        name: (landscape, size, dark) => {
          return `apple-splash-${landscape ? "landscape" : "portrait"}-${
            typeof dark === "boolean" ? (dark ? "dark-" : "light-") : ""
          }${size.width}x${size.height}.png`;
        },
      },
      [
        'iPad Air 9.7"',
        'iPad Air 10.5"',
        "iPhone 14",
        "iPhone 14 Plus",
        "iPhone 14 Pro",
        "iPhone 13",
        "iPhone 13 Pro",
        "iPhone 13 Pro Max",
        "iPhone 12",
        "iPhone 12 Pro",
        "iPhone 12 Pro Max",
        "iPhone 11",
        "iPhone 11 Pro",
        "iPhone 11 Pro Max",
        "iPhone 8",
        "iPhone 8 Plus",
        "iPhone 6",
        "iPhone 6 Plus",
      ]
    ),
  },
  images: ["public/logo.svg", "public/logo.png", "public/success.png"],
});
