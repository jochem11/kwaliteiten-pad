# Kwaliteiten-pad

3D-website (React + React Three Fiber) voor Eindopdracht 2: *Jouw kwaliteiten en ambities*.
Je scrollt over een pad langs stations; elk station behandelt een onderdeel van de opdracht.

## Starten

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # productiebuild in dist/
```

## Waar zit wat

| Bestand | Wat |
|---|---|
| `src/constants/sections.ts` | **Alle inhoud.** Eén object per station: titel, vraag, tekst, voorbeelden, werkboek-onderdelen, bronnen. Hier vul je de TODO's in. |
| `src/constants/path.ts` | Vorm van het pad (CatmullRom-curve) en waar de stations staan. |
| `src/providers/journey.ts` | Kleine store die de 3D-wereld en de HTML-overlay koppelt (actief station, voortgang, `goTo`). |
| `src/components/three/` | 3D: `Scene`, `Path`, `Station`, `CameraRig` (camera volgt het pad o.b.v. scroll). |
| `src/components/three/environment/` | Omgeving: `Terrain` (heuvels, vlak rond het pad), `Scatter` (bomen/rotsen/kristallen), `Lamps`, `FloatingBits` (blokjes + sparkles bij stations), `Backdrop` (bergen + maan). Los aan/uit te zetten in `environment/index.tsx`. |
| `src/constants/world.ts` | Hulpfuncties voor de omgeving: terreinhoogte, afstand tot pad/station, zonekleur, seeded random. |
| `src/components/ui/Overlay.tsx` | Infopaneel, voortgangsbalk, navigatiebolletjes, vorige/volgende. |

## Handig

- Het laatste station ("Bronnen & deelopdrachten") telt automatisch welke werkboek-onderdelen je
  via `inputs` gekoppeld hebt en waarschuwt als je onder de 7 zit.
- Station toevoegen = object toevoegen aan `SECTIONS`; pad en navigatie schalen vanzelf mee.
- Eigen 3D-object per station: maak een component en render die in `Station.tsx` op basis van `section.id`.
- Klik op een vorm in de wereld of op een bolletje links om ernaartoe te gaan.
