import headshot from "@assets/headshot_bw_1774321770406.png";

interface AboutSectionProps {
  onOpenAwardModal?: () => void;
}

const DISCIPLINES = [
  "Product Management",
  "UX Design",
  "User Research",
  "Change Management",
];

const CREDENTIALS = [
  { label: "Education", items: [
    "Johnson & Wales University — Graphic Design, BFA",
    "University of Rhode Island — Continuing Education",
    "Cal OES Leadership Excellence Program",
  ]},
  { label: "Certifications", items: [
    "Pragmatic Institute — Product Management (PMC I–III)",
    "Prosci — Change Management Practitioner (ADKAR)",
    "SAFe 6 — Scaled Agile Framework Practitioner",
    "NASM — Certified Personal Trainer (CPT)",
    "NASM — Nutrition Coach",
    "AFAA — Group Fitness Instructor",
    "Les Mills — BodyCOMBAT Instructor",
  ]},
  { label: "Recognition", items: [
    "GovTech Innovation Award — Public Assistance Closeouts App",
    "Top 3 Best Personal Trainer — Mount Washington Valley",
  ]},
];

export default function AboutSection({ onOpenAwardModal: _onOpenAwardModal }: AboutSectionProps) {
  return (
    <section id="about" className="border-t border-[#E5E5E5] py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section label */}
        <p
          style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            fontSize: '0.625rem',
            fontWeight: 400,
            color: '#A59F97',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          About
        </p>

        {/* Two-column: portrait + bio */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-12 lg:gap-20 mb-16">

          {/* Portrait */}
          <div className="flex-shrink-0">
            <img
              src={headshot}
              alt="Alexis Brochu"
              className="w-full object-cover object-top"
              style={{ aspectRatio: '3/4', maxWidth: '320px' }}
              loading="lazy"
            />
            {/* Discipline tags below portrait */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {DISCIPLINES.map((d) => (
                <span
                  key={d}
                  style={{
                    fontFamily: '"Geist Mono", ui-monospace, monospace',
                    fontSize: '0.5rem',
                    color: '#A59F97',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    border: '1px solid #E5E5E5',
                    padding: '2px 7px',
                  }}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-5">
            <h2
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: '#000000',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
              }}
            >
              About the founder.
            </h2>

            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1rem',
                fontWeight: 400,
                color: '#3F3B36',
                lineHeight: 1.7,
              }}
            >
              Alexis has spent her career inside the gap between what teams build
              and what people actually adopt.
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                fontWeight: 400,
                color: '#777169',
                lineHeight: 1.7,
              }}
            >
              The code is solid. The UX is clean. But adoption still stalls because
              no one designed for the office misunderstandings, the training gap, or
              the stakeholders who never bought in.
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                fontWeight: 400,
                color: '#777169',
                lineHeight: 1.7,
              }}
            >
              She built Alexis Brochu around a single belief: the human side of
              change is just as engineerable as the product itself.
            </p>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9375rem',
                fontWeight: 400,
                color: '#777169',
                lineHeight: 1.7,
              }}
            >
              With 20+ years across brand development, product management, UX design,
              and organizational change, she brings the full arc from vision to
              adoption. From California state government systems handling $2.1B in
              disaster relief to consumer brands and startups, her work centers on
              one question: after the build, what happens to the people?
            </p>

            {/* Pull quote */}
            <blockquote
              style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontStyle: 'italic',
                fontWeight: 300,
                fontSize: '1.25rem',
                color: '#3F3B36',
                lineHeight: 1.5,
                borderLeft: '2px solid #FF4704',
                paddingLeft: '1.25rem',
                margin: '0.5rem 0',
              }}
            >
              "Strategy that can't survive first contact with real people is just
              a presentation."
            </blockquote>
          </div>
        </div>

        {/* Credentials */}
        <div className="border-t border-[#E5E5E5] pt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {CREDENTIALS.map((group) => (
            <div key={group.label}>
              <p
                style={{
                  fontFamily: '"Geist Mono", ui-monospace, monospace',
                  fontSize: '0.5625rem',
                  color: '#A59F97',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                {group.label}
              </p>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.8125rem',
                      color: '#3F3B36',
                      lineHeight: 1.55,
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
