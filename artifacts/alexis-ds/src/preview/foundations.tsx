import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';

// Brand palette with named roles from the brand guidelines
const BRAND_SWATCHES = [
  { name: 'Obsidian', hex: '#000000', role: 'Headings, section labels, bold lead-ins', className: 'bg-foreground' },
  { name: 'Body', hex: '#3F3B36', role: 'Paragraph and bullet copy', className: 'bg-secondary-foreground' },
  { name: 'Gravel', hex: '#777169', role: 'Contact lines, dates, secondary paragraphs', className: 'bg-muted-foreground' },
  { name: 'Slate', hex: '#A59F97', role: 'Metadata suffixes, footer secondary text', className: '' },
  { name: 'Chalk', hex: '#E5E5E5', role: 'Hairline rules and table borders', className: 'bg-border' },
  { name: 'Powder', hex: '#F5F3F1', role: 'Callout fills, input/response cell fills', className: 'bg-muted border' },
  { name: 'Card white', hex: '#FFFFFF', role: 'Base background', className: 'bg-card border' },
  { name: 'Ember', hex: '#FF4704', role: 'The only saturated color. A small dot, or a short bold lead-in phrase.', className: '' },
] as const;

const SUPPORTING_SWATCHES = [
  { name: 'Background', className: 'border bg-background' },
  { name: 'Foreground', className: 'bg-foreground' },
  { name: 'Muted', className: 'bg-muted border' },
  { name: 'Border', className: 'bg-border' },
] as const;

// Type scale matching brand guidelines
const TYPE_SCALE = [
  {
    label: 'Name / masthead',
    spec: 'Cormorant Garamond · 76 px · 300',
    style: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '4.75rem', fontWeight: 300, lineHeight: 1, color: '#000000' },
    sample: 'Alexis Brochu',
  },
  {
    label: 'Document title',
    spec: 'Cormorant Garamond · 24 px · 400',
    style: { fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.5rem', fontWeight: 400, color: '#000000' },
    sample: 'Product design · North Conway, NH',
  },
  {
    label: 'Section label',
    spec: 'Inter · 11 px · 700 · uppercase · tracked',
    style: { fontFamily: 'Inter, Arial, sans-serif', fontSize: '0.6875rem', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: '0.08em', color: '#000000' },
    sample: 'Work experience',
  },
  {
    label: 'Body / bullets',
    spec: 'Inter · 14 px · 400',
    style: { fontFamily: 'Inter, Arial, sans-serif', fontSize: '0.875rem', fontWeight: 400, color: '#3F3B36' },
    sample: 'Led end-to-end discovery on three simultaneous client engagements, delivering validated scope within four-week cycles.',
  },
  {
    label: 'Contact / metadata',
    spec: 'Inter · 12.5 px · 400',
    style: { fontFamily: 'Inter, Arial, sans-serif', fontSize: '0.78125rem', fontWeight: 400, color: '#777169' },
    sample: 'alexis.brochu@gmail.com · North Conway, NH · Remote',
  },
  {
    label: 'Eyebrow label',
    spec: 'Geist Mono · 10 px · 400 · uppercase · tracked',
    style: { fontFamily: '"Geist Mono", ui-monospace, monospace', fontSize: '0.625rem', fontWeight: 400, textTransform: 'uppercase' as const, letterSpacing: '0.1em', color: '#777169' },
    sample: 'Case study · 2024',
  },
  {
    label: 'Lead-in phrase',
    spec: 'Inter · 12.5 px · 600 · Ember',
    style: { fontFamily: 'Inter, Arial, sans-serif', fontSize: '0.78125rem', fontWeight: 600, color: '#FF4704' },
    sample: 'Reduced onboarding time',
  },
] as const;

const SPACING_SCALE = [
  { label: '4', className: 'w-4' },
  { label: '8', className: 'w-8' },
  { label: '12', className: 'w-12' },
  { label: '16', className: 'w-16' },
  { label: '24', className: 'w-24' },
] as const;

function BrandSwatch({
  name,
  hex,
  role,
  className,
}: {
  name: string;
  hex: string;
  role: string;
  className: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className={`h-14 ${className}`} style={!className ? { backgroundColor: hex } : undefined} />
      <p className="text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{name}</p>
      <p className="font-mono text-xs text-muted-foreground">{hex}</p>
      <p className="text-xs text-muted-foreground leading-snug">{role}</p>
    </div>
  );
}

function Swatch({
  name,
  className,
}: {
  name: string;
  className: string;
}) {
  return (
    <div className="space-y-2">
      <div className={`h-16 ${className}`} />
      <p className="text-sm font-medium">{name}</p>
    </div>
  );
}

export function OverviewPage() {
  return (
    <div className="space-y-4">
      {/* Masthead */}
      <section className="border bg-card p-6 text-card-foreground">
        <div className="flex items-baseline gap-2">
          <span style={{ color: '#FF4704', fontSize: '1.25rem', lineHeight: 1 }}>·</span>
          <span
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: '3.5rem',
              fontWeight: 300,
              lineHeight: 1,
              color: '#000000',
            }}
          >
            Alexis Brochu
          </span>
        </div>
        <p
          className="mt-2 text-xs"
          style={{
            fontFamily: '"Geist Mono", ui-monospace, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#777169',
          }}
        >
          Product design · North Conway, NH · Remote
        </p>
      </section>

      {/* Core palette */}
      <section className="border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
          Core palette
        </h2>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {BRAND_SWATCHES.map((swatch) => (
            <div key={swatch.name} className="space-y-1.5">
              <div
                className={`h-10 ${swatch.className}`}
                style={!swatch.className ? { backgroundColor: swatch.hex } : undefined}
              />
              <p className="text-xs font-medium truncate">{swatch.name}</p>
              <p className="font-mono text-xs text-muted-foreground">{swatch.hex}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Type scale */}
        <section className="border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
            Typography
          </h2>
          <div className="mt-4 space-y-4">
            <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '2rem', fontWeight: 300, lineHeight: 1, color: '#000000' }}>
              Alexis Brochu
            </p>
            <p style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '0.875rem', color: '#3F3B36' }}>
              Led end-to-end discovery on three simultaneous client engagements.
            </p>
            <p style={{ fontFamily: '"Geist Mono", ui-monospace, monospace', fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#777169' }}>
              Case study · 2024
            </p>
            <p style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '0.78125rem', fontWeight: 600, color: '#FF4704' }}>
              Reduced onboarding time
            </p>
          </div>
        </section>

        {/* In use */}
        <section className="border bg-card p-5 text-card-foreground">
          <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
            In use
          </h2>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Work inquiry</CardTitle>
              <CardDescription>
                Components composed from the tokens above.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="overview-name">Your name</Label>
                <Input id="overview-name" placeholder="Enter your name" />
              </div>
              <div className="flex items-center gap-2">
                <Switch defaultChecked id="overview-notify" />
                <Label htmlFor="overview-notify">Send confirmation</Label>
                <Badge className="ml-auto">New</Badge>
              </div>
            </CardContent>
            <CardFooter className="gap-2">
              <Button>Submit</Button>
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </section>
      </div>

      {/* Components strip */}
      <section className="space-y-4 border bg-card p-5 text-card-foreground">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
          Components
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>
    </div>
  );
}

export function ColorsPage() {
  return (
    <div className="space-y-8 border bg-card p-6 text-card-foreground">
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold">Brand palette</h2>
          <p className="text-sm text-muted-foreground">
            Eight named colors. Ember is the sole saturated value: never as a fill, never as a border, only a dot or a two-to-three word bold lead-in.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {BRAND_SWATCHES.map((swatch) => (
            <BrandSwatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-4 border-t pt-6">
        <div>
          <h2 className="font-semibold">Semantic and surface colors</h2>
          <p className="text-sm text-muted-foreground">
            Roles for text, backgrounds, borders, and muted content.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SUPPORTING_SWATCHES.map((swatch) => (
            <Swatch key={swatch.name} {...swatch} />
          ))}
        </div>
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="font-semibold">Ember usage rules</h2>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>Never use Ember as a background fill or a border color.</li>
          <li>Use it sparingly: one dot in a header, or a two-to-three word bold lead-in phrase.</li>
          <li>It is the only saturated color in the system. Restraint is what makes it effective.</li>
        </ul>
      </section>
    </div>
  );
}

export function FontsPage() {
  return (
    <div className="space-y-8 border bg-card p-6 text-card-foreground">
      <section className="space-y-3">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
          Font families
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1 border-t pt-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={{ fontFamily: '"Geist Mono", monospace' }}>Display</p>
            <p style={{ fontFamily: '"Cormorant Garamond", Georgia, serif', fontSize: '1.5rem', fontWeight: 300 }}>Cormorant Garamond</p>
            <p className="text-xs text-muted-foreground">Name / masthead (300), entry titles (400)</p>
          </div>
          <div className="space-y-1 border-t pt-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={{ fontFamily: '"Geist Mono", monospace' }}>Body / UI</p>
            <p style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '1.125rem', fontWeight: 400 }}>Inter</p>
            <p className="text-xs text-muted-foreground">All body copy, UI, labels, bullets (400-700)</p>
          </div>
          <div className="space-y-1 border-t pt-3">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={{ fontFamily: '"Geist Mono", monospace' }}>Labels</p>
            <p style={{ fontFamily: '"Geist Mono", ui-monospace, monospace', fontSize: '0.875rem', fontWeight: 400 }}>Geist Mono</p>
            <p className="text-xs text-muted-foreground">Small technical labels only: eyebrows, rail labels (400)</p>
          </div>
        </div>
      </section>

      <section className="space-y-6 border-t pt-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
          Type scale
        </h2>
        {TYPE_SCALE.map((entry) => (
          <div key={entry.label} className="grid gap-1.5 border-b pb-4 sm:grid-cols-[200px_1fr]">
            <div>
              <p className="text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>{entry.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: '"Geist Mono", monospace' }}>{entry.spec}</p>
            </div>
            <p style={entry.style}>{entry.sample}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3 border-t pt-6">
        <h2 className="font-semibold">Copy rules</h2>
        <ul className="space-y-1.5 text-sm text-muted-foreground">
          <li>No em dashes. Use commas, colons, semicolons, or "to" for ranges.</li>
          <li>Sentence case for headlines. ALL CAPS with letter-spacing is reserved for small section labels only.</li>
          <li>Declarative and restrained. No exclamation points, no hype language.</li>
          <li>Use the middot (·) between metadata items: role, location, contact details.</li>
        </ul>
      </section>
    </div>
  );
}

export function LayoutPage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section className="border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Spacing</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          The spacing scale, derived from the base spacing token.
        </p>
        <div className="mt-6 space-y-4">
          {SPACING_SCALE.map((space) => (
            <div key={space.label} className="flex items-center gap-4">
              <span className="w-8 text-xs text-muted-foreground">
                {space.label}
              </span>
              <div className={`h-3 bg-primary ${space.className}`} />
            </div>
          ))}
        </div>
      </section>

      <section className="border bg-card p-6 text-card-foreground">
        <h2 className="font-semibold">Radius</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Radius is 0 throughout. Document-grade surfaces do not use rounded corners.
        </p>
        <div className="mt-6 space-y-3">
          <div className="flex h-20 items-end border bg-muted p-3">
            <span className="text-xs font-medium">All elements</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Sharp corners reinforce the editorial, document-grade character of this brand. Do not add rounding to cards, inputs, or buttons.
          </p>
        </div>
      </section>
    </div>
  );
}
