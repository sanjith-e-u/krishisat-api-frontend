import React from "react"

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto mt-8 pb-20 px-6 font-sans">
      <span className="text-xs font-bold text-primary bg-primary/8 px-3 py-1 rounded-full uppercase tracking-widest">Legal</span>
      <h1 className="text-3xl font-extrabold text-slate-900 mt-4 tracking-tight">Privacy Policy</h1>
      <p className="text-xs text-slate-400 mt-2 font-mono">Last updated: June 12, 2026</p>

      <div className="mt-8 prose prose-slate max-w-none text-slate-650 text-sm leading-relaxed space-y-6">
        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">1. Information Collection</h2>
          <p>
            We collect information you provide directly to us when creating a developer account, requesting API credentials, purchasing subscription tokens, or contacting support. This includes contact details such as name, work email address, organization name, and transaction details.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">2. Satellite & Crop Telemetry Data</h2>
          <p>
            In providing our crop classification, GDD tracking, NDWI water delineation, and vegetation index services (including NDVI/NDRE calculation), X-AGI processes geo-coordinate inputs and farm boundary polygons you upload. We cache computed telemetry raster blocks and metadata solely to enhance query performance and track your monthly index credit usage.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">3. Cookies and Usage Analytics</h2>
          <p>
            We use cookies to maintain your login status, preserve workspace selections, and capture system performance metrics on our developer settings pages. All console dashboard metrics (latency grids, query histories, active session indices) are monitored internally to prevent service outages and verify SLA compliance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">4. Information Sharing</h2>
          <p>
            We do not sell, rent, or trade your developer profile coordinate information or uploaded GeoJSON crop boundaries. We share workspace data only with third-party service providers (such as cloud hosting nodes, satellite image distribution registries, and transaction processors) necessary to maintain API operations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">5. Security Standards</h2>
          <p>
            Developer access credentials and secret API keys are hashed and encrypted. We maintain transport layer security (TLS) on all incoming requests to our unified agricultural endpoints. You are responsible for keeping your secret integration keys secure and out of client-side source code repositories.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-bold text-slate-800">6. Developer Rights & Access</h2>
          <p>
            You can review, modify, or terminate your account coordinates directly through the setting tabs. To delete cache blocks associated with your crop boundaries, contact our operations desk at <a href="mailto:privacy@X-AGI.dev" className="text-primary hover:underline font-semibold">privacy@X-AGI.dev</a>.
          </p>
        </section>
      </div>
    </div>
  )
}
