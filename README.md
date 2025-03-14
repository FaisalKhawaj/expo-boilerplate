# Making new project from this boilerplate with your new project name and a new bundleIdentifier

> **Note**: I had create-project.sh in dev-scripts folder ,so you can create dev-scripts folder and can add create-project.sh in that folder.

## You need to create a script file (create-project.sh)

```bash
touch create-expo-project.sh
```

> **Note**: This is for MacOS users

## You need to write below lines in that script file(create-project.sh)

```bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <NewProjectName>"
    exit 1
fi

PROJECT_NAME=$1

REPO_URL="git@github.com:FaisalKhawaj/expo-boilerplate.git"

git clone $REPO_URL $PROJECT_NAME


cd $PROJECT_NAME || exit



npm install


# Rename the project manually for Expo
echo "Renaming project to $PROJECT_NAME in app.json and package.json..."

# Update app.json with new project name and slug
sed -i '' "s/\"name\": \".*\"/\"name\": \"$PROJECT_NAME\"/" app.json
sed -i '' "s/\"slug\": \".*\"/\"slug\": \"$PROJECT_NAME\"/" app.json

# Update package.json (optional but good practice)
sed -i '' "s/\"name\": \".*\"/\"name\": \"$PROJECT_NAME\"/" package.json


rm -rf .git
git init
git add .
git commit -m "Initial commit for $PROJECT_NAME"

if [ $? -ne 0 ]; then
  echo "Failed to rename project"
  exit 1
fi


echo "Project $PROJECT_NAME created successfully"

```

---

## Run the following command to make the script executable:

```bash
chmod +x create-expo-project.sh
```

## In order to clone this boilerplate with your ProjectName and bundle identifier, you need to run this command with name of your project instead of YourAppName and bundleIdentifer instead of com.your.bundle.identifier

```bash
~/dev-scripts/create-expo-project.sh YourAppName
```

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
