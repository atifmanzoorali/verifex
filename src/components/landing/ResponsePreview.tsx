import { highlight } from '@/lib/shiki';

const VALID = `{
  "success": true,
  "data": {
    "valid": true,
    "email": "user@example.com",
    "domain": "example.com",
    "checks": {
      "format": true,
      "mx": true
    },
    "mx_records": ["mail.example.com"],
    "duration_ms": 18
  }
}`;

const INVALID = `{
  "success": true,
  "data": {
    "valid": false,
    "email": "user@fakedomain.xyz",
    "domain": "fakedomain.xyz",
    "checks": {
      "format": true,
      "mx": false
    },
    "mx_records": [],
    "reason": "No MX records found for domain",
    "duration_ms": 22
  }
}`;

export async function ResponsePreview(): Promise<React.JSX.Element> {
  const [validHtml, invalidHtml] = await Promise.all([
    highlight(VALID, 'json'),
    highlight(INVALID, 'json'),
  ]);

  return (
    <section className="bg-[#111111] py-24 lg:py-32">
      <div className="mx-auto w-full max-w-7xl px-8 lg:px-12">

        {/* Overline */}
        <div className="mb-16 flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A8278]">
            Response preview
          </span>
          <span className="h-px w-10 bg-[#333]" />
          <span className="text-xs font-medium text-[#8A8278]">JSON</span>
        </div>

        {/* Headline */}
        <h2 className="mb-4 text-[40px] font-black leading-none tracking-[-0.03em] text-[#F0ECE3] lg:text-[56px]">
          Exactly what you get back.
        </h2>
        <p className="mb-16 text-sm text-[#8A8278]">
          Every response follows the same structure — predictable, typed, and easy to handle.
        </p>

        {/* Code blocks */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Valid */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#7A9638]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7A9638]">
                Valid email
              </span>
            </div>
            <div
              className="overflow-auto rounded-[2px] border border-[#222] text-sm [&_pre]:!bg-transparent [&_pre]:p-6"
              dangerouslySetInnerHTML={{ __html: validHtml }}
            />
          </div>

          {/* Invalid */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#B83232]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B83232]">
                Invalid email
              </span>
            </div>
            <div
              className="overflow-auto rounded-[2px] border border-[#222] text-sm [&_pre]:!bg-transparent [&_pre]:p-6"
              dangerouslySetInnerHTML={{ __html: invalidHtml }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
