# EarForge v1

A polished static ear training site with:

- interval recognition
- chord quality drills
- scale / mode identification
- Web Audio playback
- local streak + progress tracking
- mobile-friendly responsive UI

## Run locally

Because this is a static site, you can open `index.html` directly or serve it:

```bash
cd ear-training-v1
python3 -m http.server 8000
```

Then visit <http://localhost:8000>

## Notes

- Progress is stored in `localStorage`
- No backend required
- Good base for future additions like melodic dictation, rhythm drills, or microphone input
