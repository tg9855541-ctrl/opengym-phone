# openGym personal PWA

Personal, non-commercial static deployment of [DuarteSantos8/openGym](https://github.com/DuarteSantos8/openGym), version 1.4.1, upstream commit e348fc17c42c7e9a211c5972e573ad3698190ee2.

The app runs on the phone, keeps training records in browser storage, and supports manual JSON backup through the iOS share sheet (Save to Files → iCloud Drive). There is no backend, sign-in, automatic iCloud sync, paid provider, or seeded demo history. Install from Safari using Add to Home Screen. Export a backup before clearing website data or removing the app.

Local changes add `VITE_LOCAL_ONLY=1`, default Chinese configuration, a local-only boot path, disabled server API calls and account UI, and a manual backup share action. Training logic and original exercise media are retained.

## Build

```
cd frontend
npm ci --ignore-scripts
VITE_LOCAL_ONLY=1 npm run build
cd ..
node scripts/catalogue/stage-media.mjs frontend/dist
```

Deploy `frontend/dist/` as static files. GitHub Pages uses the repository workflow. No training data or credentials belong in this repository.

## License and attribution

Application source: GNU AGPL v3, see LICENSE. The full corresponding source of this deployment is this repository. The original code and wider project are linked above. See NOTICE.md for third-party attribution.

Exercise media are © Aliaksandr Makatserchyk / Gym visual, licensed for openGym only. Their unchanged 180px stills and animations are retained solely in this non-commercial openGym deployment, with the original notice at catalogue/media/NOTICE.md. The media are not licensed under the AGPL.
