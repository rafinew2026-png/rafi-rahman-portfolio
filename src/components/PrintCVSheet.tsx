import type { CVData } from '../types/cv';

interface PrintCVSheetProps {
  cv: CVData;
}

export default function PrintCVSheet({ cv }: PrintCVSheetProps) {
  return (
    <article className="mx-auto max-w-[820px] rounded-xl bg-white p-8 sm:p-12 text-slate-900 shadow-2xl print:rounded-none print:p-0 print:shadow-none">
      {/* Header */}
      <header className="flex flex-col-reverse sm:flex-row sm:items-start sm:justify-between gap-6 border-b-2 border-[#0A192F] pb-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0A192F]">
            Curriculum Vitae
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 uppercase">
            {cv.name}
          </h1>
          <p className="text-sm font-medium text-slate-700">{cv.roleTitle}</p>
          <div className="pt-2 space-y-1 text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Phone:</span>{' '}
              <a
                href={`tel:${cv.contact.phone.replace(/\s+/g, '')}`}
                className="tabular-nums text-[#0A192F] underline-offset-2 hover:underline print:no-underline"
              >
                {cv.contact.phone}
              </a>
            </p>
            <p>
              <span className="font-semibold text-slate-900">Email:</span>{' '}
              <a
                href={`mailto:${cv.contact.email}`}
                className="text-[#0A192F] underline-offset-2 hover:underline print:no-underline"
              >
                {cv.contact.email}
              </a>
            </p>
            <p>
              <span className="font-semibold text-slate-900">Address:</span>{' '}
              {cv.contact.address}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          {cv.photoUrl && (
            <img
              src={cv.photoUrl}
              alt={`${cv.name} photograph`}
              referrerPolicy="no-referrer"
              className="h-36 w-32 rounded border border-slate-300 object-cover object-top"
            />
          )}
        </div>
      </header>

      {/* Career Objective */}
      <section className="mt-6">
        <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
          Career Objective
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-800">
          {cv.careerObjective}
        </p>
      </section>

      {/* Professional Experience */}
      <section className="mt-6">
        <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
          Experience
        </h2>
        <div className="mt-3 space-y-4">
          {cv.experience.map((exp) => (
            <div key={exp.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-bold text-slate-950">
                  {exp.company} | <span className="font-semibold">{exp.designation}</span>
                </h3>
                <span className="font-mono text-xs text-slate-600 tabular-nums">
                  {exp.id === 'axionet-it-systems'
                    ? '2 Months 2025 (Dec – Jan)'
                    : `${exp.startDate} – ${exp.endDate}`}
                </span>
              </div>
              <p className="text-xs text-slate-600">Company Location: {exp.location}</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate-800">
                {exp.responsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="mt-6">
        <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
          Education &amp; Certifications
        </h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-300 bg-slate-100 text-xs font-semibold text-slate-800">
                <th className="px-3 py-2">Qualification</th>
                <th className="px-3 py-2">Board / Institution</th>
                <th className="px-3 py-2">Year</th>
                <th className="px-3 py-2">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {cv.education.map((edu) => (
                <tr key={edu.id}>
                  <td className="px-3 py-2 font-medium text-slate-900">{edu.title}</td>
                  <td className="px-3 py-2 text-slate-700">{edu.boardOrAuthority}</td>
                  <td className="px-3 py-2 font-mono text-xs text-slate-700 tabular-nums">
                    {edu.passingYear}
                  </td>
                  <td className="px-3 py-2 font-mono text-xs text-slate-700 tabular-nums">
                    {edu.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Computer Skill */}
      <section className="mt-6">
        <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
          Computer Skill
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-800">
          MS Office (Word, Excel, PowerPoint), Computer Fundamentals, Hardware &amp; Software
          Troubleshooting, CCTV &amp; Surveillance Operations, Internet Applications &amp; Network
          Basics.
        </p>
      </section>

      {/* Specialization, Languages & Hobbies */}
      <section className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
            Specialization
          </h2>
          <ul className="mt-2.5 list-disc space-y-1 pl-5 text-sm text-slate-800">
            {cv.specialization.map((spec) => (
              <li key={spec.id}>{spec.name}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
              Languages
            </h2>
            <ul className="mt-2.5 list-disc space-y-1 pl-5 text-sm text-slate-800">
              {cv.languages.map((lang) => (
                <li key={lang.id}>{lang.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
              Hobbies
            </h2>
            <ul className="mt-2.5 list-disc space-y-1 pl-5 text-sm text-slate-800">
              {cv.hobbies.map((hobby, idx) => (
                <li key={idx}>{hobby}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Personal Profile */}
      <section className="mt-6">
        <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
          Personal Profile
        </h2>
        <dl className="mt-2.5 grid gap-x-8 gap-y-1.5 text-sm sm:grid-cols-2">
          {cv.personalProfile.map((field) => (
            <div key={field.label} className="flex justify-between gap-4 border-b border-slate-100 py-1">
              <dt className="font-medium text-slate-700">{field.label}</dt>
              <dd className="text-right text-slate-900">{field.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Declaration & Signature */}
      <section className="mt-6">
        <h2 className="border-b border-slate-300 pb-1 text-sm font-bold uppercase tracking-wider text-[#0A192F]">
          Declaration
        </h2>
        <p className="mt-2.5 text-sm leading-relaxed text-slate-800">{cv.declaration}</p>

        <div className="mt-8 flex items-end justify-between">
          <div className="text-xs text-slate-600">Date:</div>
          <div className="text-center">
            {cv.signatureUrl && (
              <img
                src={cv.signatureUrl}
                alt={`${cv.name} signature`}
                referrerPolicy="no-referrer"
                className="mx-auto mb-1 h-12 max-w-[180px] object-contain"
              />
            )}
            <div className="border-t border-slate-800 px-4 pt-1 text-xs font-semibold text-slate-900">
              SIGNATURE ({cv.name})
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
