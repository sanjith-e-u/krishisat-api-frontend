import React from "react"

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto mt-8 pb-20 px-6 font-sans">
      <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">Legal</span>
      <h1 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">Terms of Service</h1>
      <p className="text-xs text-slate-400 mt-2 font-mono">Last updated: June 12, 2026</p>

      <div className="mt-8 prose prose-slate max-w-none text-slate-650 text-sm leading-relaxed space-y-6">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">1. Acceptance of Terms</h2>
          <p>
            By creating a developer account, obtaining API credentials, or querying our agricultural endpoints (including weather, vegetation, and water indices), you agree to be bound by these Terms of Service. If you are accepting on behalf of an agritech firm or enterprise organization, you verify you have full authority to bind that entity.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">2. Service Usage & Credit Quotas</h2>
          <p>
            KrishiSat services are billed based on monthly index credits. Each calculated endpoint consumes credits as specified in the API Catalog (e.g. NDVI costs 2 credits, GDD weather costs 1 credit). Credits reset at the start of each billing cycle. Unused developer credits do not roll over, and accounts exceeding quotas will have query returns throttled until upgrades are configured.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">3. Spatial Coordinates & Boundaries</h2>
          <p>
            You retain ownership of all farm polygons and GeoJSON boundary structures uploaded to our registration service. You grant KrishiSat a limited, non-exclusive license to process these coordinates through our satellite analysis loops to generate telemetry reports. You represent that you have acquired all rights to query data for the uploaded coordinates.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">4. Restrictions on Use</h2>
          <p>
            Developers may not use KrishiSat APIs to build competing satellite analytics indices, scrape data blocks in bulk, bypass rate limits, or deploy secret credential keys on public repositories. Any automated script found abusing telemetry lookups will result in immediate API key suspension.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">5. Limitation of Liability</h2>
          <p>
            Satellite crop intelligence values, canopy weather parameters, and water stress indicators are generated via computational AI modeling. We do not guarantee crop yields or represent that our indices are free from orbital sensor interference. KrishiSat is not liable for business losses resulting from calculations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">6. Termination</h2>
          <p>
            We reserve the right to suspend API credential keys for accounts violating usage parameters or failing to settle billing balances. You can close your workspace settings and terminate coordinates registries at any time.
          </p>
        </section>
      </div>
    </div>
  )
}
