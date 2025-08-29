# alifeWSL | wsl | yarn 

Yarn : Linux, WSL
Accessing the project follow below steps:
Open VS code, any folder is fine.
select bash / Ubuntu terminal, or type 'wsl' at powershell terminal,
you will be at root/home/rger aka ~/

cd ~nextjs/techupz into project directory, and type `code .`



Branching: 
|## git  |    vercel             |     special code setup                                        |
|--------|-----------------------|---------------------------------------------------------------|
|  prod  |  production           |  remove searchUserParams() fr Categories.tsx, CategoryBox.tsx |
|  main  |  production           |  remove searchUserParams() fr Categories.tsx, CategoryBox.tsx |
|  dev   |  preview/development  |  full code as per video                                       |

## file location
loc: /home/rger/nextjs/techupz
terminal: ubuntu-wsl
github: https://github.com/KeenGWatanabe/techupz


# initialize project @ 02:21
```shell  (window/WSL)
npx create-next-app --typescript --use-yarn
```
```bash
npx create-next-app --typescript
```
![nextjs setup](/DOCS/PICS/npxNextjsCreate.png)

cd .. >techupz
```shell (window/WSL)
yarn dev
```
```bash (debian)
npm run dev
```
clear globals.css
install tailwindcss v3.x  (latest is v4.1/ https://tailwindcss.com/ vite projects only)

https://v3.tailwindcss.com/docs/installation (recommended)

# install tailwindcss
```shell (window/WSL)
yarn add -D tailwindcss@3 postcss autoprefixer
yarn tailwindcss init -p
```
```bash (debian)
npm install -D tailwindcss@3 postcss autoprefixer

npx tailwindcss init -p
```

# add these to tailwind.config.js
"./app/**/*.{js,ts,jsx,tsx}",
"./pages/**/*.{js,ts,jsx,tsx}",
"./components/**/*.{js,ts,jsx,tsx}",
# add these to global.css
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;   

html,
body,
:root {
  height: 100%;
}
```
# create /app/components folder @ 09:30

# react-icons
```shell (window/WSL)
yarn add react-icons zustand axios react-hook-form react-hot-toast
```

# prisma @ 1:51:23
https://authjs.dev
https://authjs.dev/getting-started/adapters/prisma
```shell (window/WSL)
yarn add @prisma/client @auth/prisma-adapter

yarn add -D prisma
yarn prisma init
```bash
npm install -D prisma

npx prisma init
```
![yarn prisma init]
Change postgresql to mongodb

# install prisma.io extension

CHECK: db name: / swim / nextjs

# prisma db 
```shell
(window/WSL)
yarn add @prisma/client 
yarn add prisma --dev
yarn prisma db push
```
```bash
(debian)
npm install @prisma/client 

npx prisma db push
```
![npx prisma db push](/alife_wsl/DOCS/PICS/npxPrismaDbPush.png)

# prima next-auth
src: https://authjs.dev/getting-started/adapters/prisma
```shell
(window/WSL)
yarn add @prisma/client @auth/prisma-adapter

yarn add next-auth@^4

(debian)
npm install @prisma/client @auth/prisma-adapter
npm install prisma --save-dev
```

# bcrypt @ 2:09:27
```shell
(window/WSL-js provides its own types defn)
yarn add bcryptjs
(debian/linux)
npm install bcrypt
npm install -D @types/bcrypt
```
![mongoUserAPI](/DOCS/PICS/2:09:09mongoUser.png)

For Vercel deployment:
Set Mongo Atlas whitelist IP address or access from anywhere 0.0.0.0/0


# github auth
github settings > Developer settings > 
OAuth Apps > New OAuth App > 
Homepage URL* http://localhost:3000/
Authorization callback URL * http://localhost:3000/

copy Client ID and Client secret into .env

# google auth
goto https://console.cloud.google.com
[do not click activate account-use free trial]
Project > New Project > project name: "alifeWSL" > No organisation > create
> SELECT PROJECT > APIs and services >
OAuth consent screen > 
1. App Information
2. Audience: External
3. Contact Information: mck.it
4. Finish: agree
> Create

Clients > Create OAuth client ID > 
Application type * : Web Application;
Authorized redirect URIs: 
http://localhost:3000/api/auth/callback/google
> Create

copy google_client_id and google_client_secret to .env

> Create

## Query String

```bash
(window/WSL)
yarn add query-string

(debian/linux)
npm install query-string
```

## Query String 3:11:36
```bash
(window/WSL)
yarn add query-string

(debian/linux)
npm install query-string
```
'dev' works without useSearchParams() which is breaking the deployment.
'main' will stick with the main course until the end.
Or when useSearchParams() is resolved #

## world-countries 3:41:23, 3:44:33
```bash
(window/WSL)
yarn add world-countries
yarn add country-flag-icons
yarn add react-select

(debian/linux)
npm install world-countries
npm install country-flag-icons
npm install react-select
```

## Map.tsx 3:54:04
```bash
(window/WSL)
yarn add leaflet
yarn add -D @types/leaflet
yarn add react-leaflet
(debian/linux)
npm install leaflet
npm install -D @types/leaflet
npm install react-leaflet
```

## React Leaflet project
https://react-leaflet.js.org/
Copy  
 <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

## Marker issues so the follow were added
create mode 100644 app/components/Map.tsx
create mode 100644 app/components/Map/MarkerWrapper.tsx
create mode 100644 public/images/location.svg
```bash
(window/WSL)
yarn add file-loader --save-dev
(debian/linux)
npm add file-loader --save-dev
```

Map/MarkerWrapper.tsx 3:54:04
Counter.tsx 4:17:02

# Cloudinary 4:19:07
https://cloudinary.com/
sign up for free, 
sign up with google (mckeen.it)

# next-cloudinary 4:19:50
https://next.cloudinary.dev/installation
1. Installation
```bash
(window/WSL)
yarn add next-cloudinary
(debian/linux)
npm install next-cloudinary
```
2. Configuration: add .env from cloudinary account
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="<Your Cloud Name>"
<Your Cloud Name> is from your https://cloudinary.com/ account

3. uploadPreset="" 4:27:40
login cloudinary 
> settings 
> Product environment settings 
> Upload 
> + Add Upload Preset
![UploadPresetSettings](/DOCS/PICS/UploadPresetSettings.png)
> Upload preset name: <anyName>
> Signing mode: Unsigned
Update the created preset name in your uploadPreset="<anyName>" ImageUpload.tsx ln28
![uploadPreset](/DOCS/PICS/uploadPreset.png)

# Date fns
```bash
(window/WSL)
yarn add date-fns
(debian/linux)
npm install date-fns
```

# api if dynamic route, 
sub folder, must always [listingID]/route.ts
route.ts handles /api/favorites/${listingId}
[dynamicRouteApi](/DOCS/4DynamicRouteApi.md)

# install react-date-range
```bash
(window/WSL)
yarn add react-date-range
yarn add -D @types/react-date-range
(debian/linux)
npm install react-date-range
npm install -D @types/react-date-range
```
stop at 6:44:49 Reservations

```bash
(window/WSL)

(debian/linux)

```
stop at : :
# Deployment to Vercel ##############################
```shell
yarn build
  OR
yarn next build --debug
```

```bash
npm run lint

npm run build
# Or for full production simulation:
npx vercel build
```
Push to github main

# goto Vercel
Add new project;
Import Git Repository;
Configure Project;
copy paste .env to Environment Variables;
Click Deploy
