const path = require("path");
const fs = require("fs");

module.exports = () => {
  // EAS_BUILD_PROFILE comes from eas.json's env section when doing EAS builds
  // Or from .env files when running locally
  // Defaults to 'development' if not set
  // Build & submit to TestFlight: `eas build --platform ios --profile staging --auto-submit --clear-cache`
  const environment = process.env.EAS_BUILD_PROFILE || "development";
  console.log(
    `🚀 Starting dynamic expo config for '${environment}' environment...`
  );

  // Map each environment to its corresponding .env file
  // This determines which configuration file to load based on EAS_BUILD_PROFILE
  const envPath = {
    development: ".env.local",
    staging: ".env.staging",
    production: ".env.production",
  }[environment];
  console.log("envPath", envPath);
  // Load all environment variables from the selected .env file
  require("dotenv").config({
    path: path.resolve(__dirname, envPath),
  });

  // Default version and build number
  let version = "0.0.1";
  let buildNumber = "1";

  // Check if this is an EAS build
  const isEasBuild =
    process.env.EAS_BUILD === "true" ||
    process.env.npm_lifecycle_script?.includes("eas build");

  // Only try to read build numbers during EAS builds
  if (isEasBuild) {
    try {
      const buildConfigPath = path.join(__dirname, "build-config.json");

      // Check if file exists
      if (!fs.existsSync(buildConfigPath)) {
        console.log("❌ File does not exist at path");
        // List contents of directory to see what's there
        const dirContents = fs.readdirSync(__dirname);
        console.log("📂 Current directory:", __dirname);
        console.log(" Directory contents:", dirContents);
      } else {
        const buildConfig = JSON.parse(
          fs.readFileSync(buildConfigPath, "utf8")
        );

        version = buildConfig.version;
        buildNumber = buildConfig.buildNumber;

        console.log(`\n💡 Building v${version} (Build: ${buildNumber})`);
        console.log(
          "🚨 To cancel, press Ctrl+C now... You will need to `rm -rf build-config.json` manually\n"
        );
      }
    } catch (error) {
      console.error("❌ Error processing build-config.json:", error.message);
      process.exit(1);
    }
  } else {
    console.log(
      "⏭️  Using default version and build number - not in EAS build context"
    );
  }

  const bundleIdentifier = {
    development: "com.aretelabsllc.promise",
    staging: "com.aretelabsllc.promise", // Not currently using com.aretelabsllc.promise.staging
    production: "com.aretelabsllc.promise",
  }[environment];

  return {
    expo: {
      name: {
        development: "ExpoBoilerplate-Dev",
        staging: "ExpoBoilerplate-Stg",
        production: "ExpoBoilerplate",
      }[environment],
      slug: "expoboilerplate-rn",
      version,
      orientation: "portrait",
      icon: {
        development: "./assets/images/adaptive-icon-white.png",
        staging: "./assets/images/adaptive-icon-white.png",
        production: "./assets/images/icon-black.png",
      }[environment],
      scheme: "ipromise",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      owner: "promise-app",

      ios: {
        supportsTablet: true,
        bundleIdentifier: bundleIdentifier,
        associatedDomains: [
          "applinks:api.ipromise.app",
          "applinks:www.api.ipromise.app",
          "applinks:staging.ipromise.app",
          "applinks:link.ipromise.app",
        ],
        appleTeamId: "36KD3AY26K",
        usesAppleSignIn: true,
        deploymentTarget: "12.0",
        infoPlist: {
          ITSAppUsesNonExemptEncryption: false,
          SKStoreReviewUsageDescription:
            "Your feedback helps us improve Promise and build a better experience for everyone.",
          NSPhotoLibraryUsageDescription:
            "Promise needs photo library access to set your profile picture, helping others recognize you in chats and personalizing your experience. You can change your photo anytime in settings.",
          NSAppleSignInUsageDescription: "Allow Promise to use Apple Sign In",
        },
        buildNumber: buildNumber,
      },

      android: {
        adaptiveIcon: {
          foregroundImage: {
            development: "./assets/images/android-icon-white.png",
            staging: "./assets/images/android-icon-white.png",
            production: "./assets/images/android-icon-black.png",
          }[environment],
          backgroundColor: {
            development: "#000000", // Black background for white icon
            staging: "#000000", // Black background for white icon
            production: "#ffffff", // White background for black icon
          }[environment],
        },
        permissions: [
          "android.permission.READ_CONTACTS",
          "android.permission.WRITE_CONTACTS",
        ],
        package: bundleIdentifier,
        versionCode: parseInt(buildNumber, 10),
      },

      web: {
        bundler: "metro",
        output: "static",
        favicon: "./assets/images/icon-black.png",
      },

      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            backgroundColor: "#ffffff",
            image: "./assets/images/splash-screen.png",
            dark: {
              image: "./assets/images/splash-screen-dark.png",
              backgroundColor: "#000000",
            },
            resizeMode: "cover",
            imageWidth: 450,
          },
        ],

        [
          "expo-notifications",
          {
            icon: "./assets/images/icon-black.png",
            color: "#ffffff",
            androidMode: "default",
            androidCollapsedTitle: "Promise",
            iosDisplayInForeground: true,
          },
        ],
      ],

      experiments: {
        typedRoutes: true,
      },

      extra: {
        router: {
          origin: false,
        },
        eas: {
          projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        },
        apiUrl: process.env.EXPO_PUBLIC_API_URL,
        projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
        version: version,
        buildNumber: buildNumber,
      },

      runtimeVersion: `${version}-${
        environment === "production"
          ? "prod"
          : environment === "staging"
          ? "stg"
          : "dev"
      }`,

      updates: {
        url: "https://u.expo.dev/a388c88a-4d51-4cd2-8672-13f8990fba6d",
        enabled: true,
        checkAutomatically: "ON_LOAD",
        fallbackToCacheTimeout: 10000,
      },
    },
  };
};
