import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// KVKK ve çerez sayfaları için kurumsal belge düzeni:
// koyu başlık bandı · masaüstünde yapışkan içindekiler · numaralı bölüm kartları

const DOCS = [
  { to: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { to: "/cerez-politikasi", label: "Çerez Politikası" },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary-blue" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

LegalList.propTypes = { items: PropTypes.arrayOf(PropTypes.node).isRequired };

// Masaüstünde tablo, telefonda satır başına kart
export function LegalTable({ columns, rows, widths }) {
  return (
    <div>
      <div className="hidden md:block overflow-x-auto rounded-card border border-border-soft">
        <table className={`w-full text-left text-[13px] leading-6 ${widths ? "table-fixed" : ""}`}>
          {widths && (
            <colgroup>
              {widths.map((width, i) => (
                <col key={i} style={{ width }} />
              ))}
            </colgroup>
          )}
          <thead className="bg-surface-accent text-text-main">
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col" className="px-4 py-3 font-semibold align-bottom">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft bg-white">
            {rows.map((row, r) => (
              <tr key={r} className="align-top">
                {row.map((cell, c) => (
                  <td key={c} className={`px-4 py-3 ${c === 0 ? "font-semibold text-text-main" : "text-text-muted"}`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {rows.map((row, r) => (
          <div key={r} className="rounded-card border border-border-soft bg-white p-4">
            <p className="font-semibold text-text-main">{row[0]}</p>
            <dl className="mt-2 space-y-2">
              {row.slice(1).map((cell, c) => (
                <div key={c}>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-subtle">{columns[c + 1]}</dt>
                  <dd className="text-[13px] leading-6 text-text-muted">{cell}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

LegalTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.node)).isRequired,
  widths: PropTypes.arrayOf(PropTypes.string),
};

export function InfoGrid({ items }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className={`rounded-card border border-border-soft bg-surface-muted p-4 ${item.wide ? "sm:col-span-2" : ""}`}>
          <dt className="text-[11px] font-semibold uppercase tracking-wide text-text-subtle">{item.label}</dt>
          <dd className="mt-1 text-sm font-semibold text-text-main break-words">
            {item.href ? (
              <a href={item.href} className="hover:text-primary-blue transition-colors duration-200">
                {item.value}
              </a>
            ) : (
              item.value
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}

InfoGrid.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.node.isRequired,
      href: PropTypes.string,
      wide: PropTypes.bool,
    })
  ).isRequired,
};

export function Callout({ children }) {
  return (
    <div className="flex gap-3 rounded-card border-l-4 border-primary-blue bg-primary-blue-light px-4 py-3 text-[13px] leading-6 text-text-main">
      <svg className="mt-1 h-4 w-4 shrink-0 text-primary-blue" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.25v3.25a.75.75 0 001.5 0V10A1 1 0 009.75 9H9z" clipRule="evenodd" />
      </svg>
      <div>{children}</div>
    </div>
  );
}

Callout.propTypes = { children: PropTypes.node.isRequired };

function LegalPage({ title, intro, updated, badges, sections, current }) {
  const { i18n } = useTranslation();

  return (
    <div className="bg-surface-muted text-text-main">
      {/* Başlık bandı */}
      <div className="relative overflow-hidden bg-footer-bg text-white">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-blue/25 to-transparent" />
        <div className="relative mx-auto max-w-screen-xl px-4 py-10 md:py-14">
          <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <Link to="/" className="hover:text-white transition-colors duration-200">
              Ana Sayfa
            </Link>
            <span aria-hidden="true">/</span>
            <span>Yasal Bilgiler</span>
            <span aria-hidden="true">/</span>
            <span className="text-gray-200">{title}</span>
          </nav>
          <h1 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
          <span className="mt-4 block h-1 w-16 rounded-full bg-primary-blue" />
          <p className="mt-5 max-w-3xl text-sm md:text-[15px] leading-7 text-gray-300">{intro}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[updated, ...badges].map((badge) => (
              <span key={badge} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-gray-200">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-4 py-8 md:py-12 lg:grid lg:grid-cols-[270px_1fr] lg:gap-10">
        {/* İçindekiler */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-4">
            <div className="rounded-card border border-border-soft bg-white p-5 shadow-card">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-subtle">Bu Sayfada</p>
              <ol className="mt-3 space-y-1">
                {sections.map((section, i) => (
                  <li key={section.id}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(section.id)}
                      className="flex w-full gap-2 rounded-btn px-2 py-1.5 text-left text-[13px] leading-5 text-text-muted hover:bg-primary-blue-light hover:text-primary-blue-dark transition-colors duration-200"
                    >
                      <span className="w-5 shrink-0 font-semibold text-primary-blue">{i + 1}.</span>
                      <span>{section.heading}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-card border border-border-soft bg-white p-5 shadow-card">
              <p className="text-[11px] font-bold uppercase tracking-wider text-text-subtle">Yasal Belgeler</p>
              <ul className="mt-3 space-y-1">
                {DOCS.map((doc) => (
                  <li key={doc.to}>
                    <Link
                      to={doc.to}
                      className={`block rounded-btn px-2 py-1.5 text-[13px] ${
                        doc.to === current
                          ? "bg-primary-blue text-white font-semibold"
                          : "text-text-muted hover:bg-primary-blue-light hover:text-primary-blue-dark"
                      } transition-colors duration-200`}
                    >
                      {doc.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-5">
          {i18n.language === "en" && (
            <Callout>
              This notice is published in Turkish, the language of the applicable law. For questions, write to{" "}
              <a href="mailto:info@emirotomatcnc.com" className="font-semibold text-primary-blue">
                info@emirotomatcnc.com
              </a>
              .
            </Callout>
          )}

          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 rounded-card border border-border-soft bg-white p-5 shadow-card md:p-8"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-blue-light text-sm font-bold text-primary-blue-dark">
                  {i + 1}
                </span>
                <h2 className="text-lg md:text-xl font-bold text-text-main">{section.heading}</h2>
              </div>
              <div className="mt-5 space-y-4 text-sm leading-7 text-text-muted">{section.content}</div>
            </section>
          ))}

          {/* Telefonda belgeler arası geçiş */}
          <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
            {DOCS.filter((doc) => doc.to !== current).map((doc) => (
              <Link
                key={doc.to}
                to={doc.to}
                className="flex items-center justify-between rounded-card border border-border-soft bg-white p-4 text-sm font-semibold text-text-main shadow-card hover:text-primary-blue"
              >
                {doc.label}
                <span aria-hidden="true" className="text-primary-blue">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

LegalPage.propTypes = {
  title: PropTypes.string.isRequired,
  intro: PropTypes.node.isRequired,
  updated: PropTypes.string.isRequired,
  badges: PropTypes.arrayOf(PropTypes.string),
  current: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      heading: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

LegalPage.defaultProps = { badges: [] };

export default LegalPage;
