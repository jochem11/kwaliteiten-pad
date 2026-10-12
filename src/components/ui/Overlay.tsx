import type { CSSProperties } from "react";
import {
  MIN_INPUTS,
  PART_COLORS,
  PART_LABELS,
  SECTIONS,
  WORKBOOK_LABELS,
  allSources,
  usedInputs,
  type WorkbookInput,
} from "~/constants/sections";
import { journey, useJourney } from "~/providers/journey";

/** De HTML-laag bovenop de 3D-scene: infopaneel, voortgang, navigatie. */
export function Overlay() {
  const { active, progress } = useJourney();
  const section = SECTIONS[active];
  const color = PART_COLORS[section.part];

  return (
    <div className="overlay">
      <div className="progress" style={{ width: `${progress * 100}%` }} />

      <nav className="dots" aria-label="Stations">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            className={i === active ? "is-active" : ""}
            style={{ "--c": PART_COLORS[s.part] } as CSSProperties}
            onClick={() => journey.goTo(i)}
            title={s.title}
            aria-label={`Ga naar ${s.title}`}
          />
        ))}
      </nav>

      <article key={section.id} className="panel" style={{ borderTopColor: color }}>
        <p className="part" style={{ color }}>
          {PART_LABELS[section.part]} · {active + 1}/{SECTIONS.length}
        </p>
        <h1>{section.title}</h1>
        <p className="question">{section.question}</p>

        {section.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {section.examples && (
          <>
            <h2>Voorbeelden</h2>
            <ul>
              {section.examples.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </>
        )}

        {section.id === "bronnen" ? <Summary /> : <Meta inputs={section.inputs} sources={section.sources} />}

        <div className="nav-buttons">
          <button disabled={active === 0} onClick={() => journey.goTo(active - 1)}>← Vorige</button>
          <button disabled={active === SECTIONS.length - 1} onClick={() => journey.goTo(active + 1)}>Volgende →</button>
        </div>
      </article>

      {progress < 0.02 && <p className="hint">Scroll om het pad te volgen ↓</p>}
    </div>
  );
}

function Meta({ inputs, sources }: { inputs: WorkbookInput[]; sources: typeof SECTIONS[number]["sources"] }) {
  if (!inputs.length && !sources.length) return null;
  return (
    <footer className="meta">
      {inputs.length > 0 && (
        <div className="tags">
          {inputs.map((i) => (
            <span key={i} className="tag">{WORKBOOK_LABELS[i]}</span>
          ))}
        </div>
      )}
      {sources.length > 0 && (
        <p className="sources">
          Bronnen:{" "}
          {sources.map((s, i) => (
            <span key={i}>
              {s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a> : s.label}
              {i < sources.length - 1 ? "; " : ""}
            </span>
          ))}
        </p>
      )}
    </footer>
  );
}

/** Laatste station: verzamelt automatisch welke deelopdrachten en bronnen gebruikt zijn. */
function Summary() {
  const used = usedInputs();
  const ok = used.length >= MIN_INPUTS;
  return (
    <>
      <h2>Gebruikte deelopdrachten ({used.length}/{MIN_INPUTS} minimaal)</h2>
      <ul className="checklist">
        {(Object.keys(WORKBOOK_LABELS) as WorkbookInput[]).map((k) => (
          <li key={k} className={used.includes(k) ? "done" : ""}>
            {used.includes(k) ? "✓" : "○"} {WORKBOOK_LABELS[k]}
          </li>
        ))}
      </ul>
      {!ok && <p className="warn">Nog {MIN_INPUTS - used.length} onderdeel/onderdelen nodig.</p>}
      <h2>Bronnen</h2>
      <ul>
        {allSources().map((s, i) => (
          <li key={i}>{s.url ? <a href={s.url} target="_blank" rel="noreferrer">{s.label}</a> : s.label}</li>
        ))}
      </ul>
    </>
  );
}
