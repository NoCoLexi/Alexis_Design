import headshot from "@assets/headshot_bw_1774321770406.png";

interface AboutSectionProps {
  onOpenAwardModal?: () => void;
}

const DISCIPLINES = [
  "Product Management",
  "UX / AX Design",
  "User Research",
  "Change Management",
];

const CREDENTIALS = [
  { label: "Education", items: [
    "BFA Visual Communications, Washington University in St. Louis",
    "UX/UI Design, Project Management and Scrum Master, Applied Business Science. University of New Hampshire",
  ]},
  { label: "Certifications", items: [
    "Project Management Professional (PMP), Project Management Institute",
    "Prosci Certified Change Management Practitioner (CMP)",
    "AI for Product Management and Product-Led Design, Pendo",
  ]},
  { label: "Recognition", items: [
    "2023 California Government Technology Innovation Award: Best Application Serving the Public",
    "AIxUX Summit, Closing Keynote",
    "Pontifical Catholic University of Chile, Invited Lecturer",
    "Co-Create SKOOL, Core Instructor",
    "Rhode Island School of Design, Former Guest Instructor",
    "UX Collective, Author",
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
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5em',
          }}
        >
          <span style={{ color: '#FF4704' }}>&#x25CF;</span>
          <span style={{ color: '#A59F97' }}>About</span>
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
              About the Founder.
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
              Alexis has spent her career inside the gap between what teams build and what
              people actually adopt.
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
              My outcome is adoption. I work across product, experience, technology,
              marketing, and change management depending on barrier. The common thread is
              adoption: getting people to understand, use, and stick with what&rsquo;s being
              built.
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
              Most organizations don&rsquo;t struggle because they build the wrong software.
              They struggle because the right software never becomes part of how people
              actually work. I&rsquo;m the person who helps companies reduce organizational
              friction and make complex products understandable, usable, and ultimately
              adopted.
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
              &ldquo;In the product trifecta of Business, Engineering, and User Experience,
              the human layer is often the secret sauce to undeniable success.&rdquo;
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
