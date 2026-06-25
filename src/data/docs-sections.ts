const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.X-AGI.dev";

export interface DocSection {
  id: string;
  title: string;
  subtitle: string;
  group: 'getting-started' | 'core-apis' | 'reference';
  description: string[];
  endpoint?: {
    method: 'POST' | 'GET';
    path: string;
    credits: number;
  };
  code: {
    curl: string;
    python: string;
    node: string;
  };
  response: string;
}

export const docsSections: DocSection[] = [
  {
    id: "introduction",
    title: "Introduction",
    subtitle: "GETTING STARTED",
    group: "getting-started",
    description: [
      "X-AGI is a developer-first REST API platform that fuses multi-spectral satellite imagery, weather arrays, and agronomic AI models to provide real-time agricultural telemetry.",
      "By registering field boundaries as GeoJSON polygons once, developers can immediately request high-resolution vegetation health indices, moisture analytics, and hyperlocal weather telemetry without dealing with raw raster band mathematics.",
      "All requests require a secure API Key transmitted over SSL. The production base URL is centralized as defined below:"
    ],
    code: {
      curl: `curl -I ${API_URL}/health`,
      python: `import requests\n\nresponse = requests.get("${API_URL}/health")\nprint(response.status_code)`,
      node: `const axios = require('axios');\n\naxios.get('${API_URL}/health')\n  .then(res => console.log(res.status))\n  .catch(err => console.error(err));`
    },
    response: `{\n  "status": "healthy",\n  "api_version": "v1.2.0",\n  "satellite_ingress": "active"\n}`
  },
  {
    id: "authentication",
    title: "Authentication",
    subtitle: "SECURITY",
    group: "getting-started",
    description: [
      "The X-AGI API uses standard HTTP Bearer token authentication to authorize requests. All API requests must be made over HTTPS. Requests made over plain HTTP will fail.",
      "To authenticate, provide your API key in the `Authorization` header of all outbound requests.",
      "Authentication headers should adhere to the following schema:"
    ],
    code: {
      curl: `curl ${API_URL}/v1/farms \\\n  -H "Authorization: Bearer YOUR_API_KEY"`,
      python: `import requests\n\nheaders = {\n    "Authorization": "Bearer YOUR_API_KEY"\n}\nresponse = requests.get("${API_URL}/v1/farms", headers=headers)`,
      node: `const fetch = require('node-fetch');\n\nfetch('${API_URL}/v1/farms', {\n  headers: { 'Authorization': 'Bearer YOUR_API_KEY' }\n})\n.then(res => res.json())\n.then(json => console.log(json));`
    },
    response: `{\n  "error": {\n    "code": "unauthorized",\n    "message": "Valid API key required in Authorization header."\n  }\n}`
  },
  {
    id: "api-keys",
    title: "API Keys",
    subtitle: "SANDBOX VS LIVE",
    group: "getting-started",
    description: [
      "X-AGI supports dual environments using key prefixes. Sandbox keys are intended for testing and development, pointing to mock satellite tiles. Production keys invoke real sensor computation pipelines.",
      "• Sandbox Keys: Prefixed with \`ks_sandbox_\`. Free, capped at 1,000 requests per month.",
      "• Production Keys: Prefixed with \`ks_live_\`. Billed based on index credit consumption.",
      "Keep API keys private. Never hardcode them in browser applications or commit them to version control."
    ],
    code: {
      curl: `# Set environment variables in your terminal\nexport KSAT_API_KEY="ks_sandbox_your_secret_key"`,
      python: `import os\n\n# Read key from local environment configuration\napi_key = os.environ.get("KSAT_API_KEY")`,
      node: `// Read key from process environment variables\nconst apiKey = process.env.KSAT_API_KEY;`
    },
    response: `{\n  "environment": "sandbox",\n  "quota_used": 142,\n  "quota_limit": 1000\n}`
  },
  {
    id: "rate-limits",
    title: "Rate Limits",
    subtitle: "THROTTLING & CREDITS",
    group: "getting-started",
    description: [
      "Requests are throttled to ensure infrastructure stability. The sandbox tier allows up to 10 requests per second. The production tier scales based on SLA agreements.",
      "Additionally, endpoints consume credits based on compute load:",
      "• Weather API: 1 credit per call (Farm Registration is 0 credits).",
      "• Crop Health & Moisture Indices (NDVI: 1 credit; SAVI, NDWI, NDMI, NDRE: 2 credits).",
      "• High-resolution Chlorophyll Index (CI): 3 credits per call.",
      "Look for the following headers in API responses to check remaining capacity:"
    ],
    code: {
      curl: `curl -I ${API_URL}/v1/weather \\\n  -H "Authorization: Bearer ks_sandbox_key"`,
      python: `import requests\n\nres = requests.post("${API_URL}/v1/weather", headers={"Authorization": "Bearer ks_sandbox_key"})\nprint(res.headers.get("X-RateLimit-Remaining"))`,
      node: `const axios = require('axios');\n\naxios.post('${API_URL}/v1/weather', {}, {\n  headers: { 'Authorization': 'Bearer ks_sandbox_key' }\n}).then(res => {\n  console.log(res.headers['x-ratelimit-remaining']);\n});`
    },
    response: `HTTP/2 200 OK\nContent-Type: application/json\nX-RateLimit-Limit: 100\nX-RateLimit-Remaining: 98\nX-RateLimit-Reset: 1776204000\nX-Credits-Remaining: 840`
  },
  {
    id: "farm-registration",
    title: "Farm Registration",
    subtitle: "FARM REGISTRY",
    group: "core-apis",
    endpoint: {
      method: "POST",
      path: "/v1/farms",
      credits: 0
    },
    description: [
      "Farms are represented by boundaries. Submit a name and GeoJSON polygon boundary. The system creates a spatial index and gathers historical satellite imagery.",
      "Save the returned \`farm_id\` reference. You will supply this ID in all subsequent index and weather API computations."
    ],
    code: {
      curl: `curl -X POST ${API_URL}/v1/farms \\\n  -H "Authorization: Bearer $KSAT_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "farm_name": "East Field",\n    "polygon": {\n      "type": "Polygon",\n      "coordinates": [[[77.56, 12.98], [77.57, 12.98], [77.57, 12.97], [77.56, 12.97], [77.56, 12.98]]]\n    }\n  }'`,
      python: `import requests\n\npayload = {\n    "farm_name": "East Field",\n    "polygon": {\n        "type": "Polygon",\n        "coordinates": [[[77.56, 12.98], [77.57, 12.98], [77.57, 12.97], [77.56, 12.97], [77.56, 12.98]]]\n    }\n}\nres = requests.post(\n    "${API_URL}/v1/farms",\n    headers={"Authorization": f"Bearer {api_key}"},\n    json=payload\n)`,
      node: `const fetch = require('node-fetch');\n\nfetch('${API_URL}/v1/farms', {\n  method: 'POST',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({\n    farm_name: 'East Field',\n    polygon: {\n      type: 'Polygon',\n      coordinates: [[[77.56, 12.98], [77.57, 12.98], [77.57, 12.97], [77.56, 12.97], [77.56, 12.98]]]\n    }\n  })\n}).then(res => res.json());`
    },
    response: `{\n  "farm_id": "farm_001",\n  "status": "registered",\n  "created_at": "2026-06-11T10:00:00Z"\n}`
  },
  {
    id: "ndvi",
    title: "NDVI — Crop Health",
    subtitle: "VEGETATION ANALYSIS",
    group: "core-apis",
    endpoint: {
      method: "POST",
      path: "/v1/vegetation/ndvi",
      credits: 1
    },
    description: [
      "The Normalized Difference Vegetation Index (NDVI) is computed from Sentinel-2 Multi-Spectral bands: \`(NIR - Red) / (NIR + Red)\`.",
      "It estimates live green vegetation density and overall plant vigor. Values range from \`-1.0\` to \`1.0\`. Scores above \`0.6\` represent dense, healthy crops."
    ],
    code: {
      curl: `curl -X POST ${API_URL}/v1/vegetation/ndvi \\\n  -H "Authorization: Bearer $KSAT_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "farm_id": "farm_001",\n    "date": "2026-06-11"\n  }'`,
      python: `import requests\n\nres = requests.post(\n    "${API_URL}/v1/vegetation/ndvi",\n    headers={"Authorization": f"Bearer {api_key}"},\n    json={"farm_id": "farm_001", "date": "2026-06-11"}\n)`,
      node: `const fetch = require('node-fetch');\n\nfetch('${API_URL}/v1/vegetation/ndvi', {\n  method: 'POST',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({ farm_id: 'farm_001', date: '2026-06-11' })\n}).then(res => res.json());`
    },
    response: `{\n  "farm_id": "farm_001",\n  "ndvi": 0.82,\n  "health": "Healthy",\n  "date": "2026-06-11"\n}`
  },
  {
    id: "ndre",
    title: "NDRE — Chlorophyll Vigor",
    subtitle: "VEGETATION ANALYSIS",
    group: "core-apis",
    endpoint: {
      method: "POST",
      path: "/v1/vegetation/ndre",
      credits: 2
    },
    description: [
      "The Normalized Difference Red Edge index is computed as: \`(NIR - RedEdge) / (NIR + RedEdge)\`.",
      "Because Red Edge wavelengths penetrate canopy layers deeper than Red bands, NDRE is ideal for monitoring thick crops or detecting early nitrogen deficiencies."
    ],
    code: {
      curl: `curl -X POST ${API_URL}/v1/vegetation/ndre \\\n  -H "Authorization: Bearer $KSAT_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "farm_id": "farm_001"\n  }'`,
      python: `import requests\n\nres = requests.post(\n    "${API_URL}/v1/vegetation/ndre",\n    headers={"Authorization": f"Bearer {api_key}"},\n    json={"farm_id": "farm_001"}\n)`,
      node: `const fetch = require('node-fetch');\n\nfetch('${API_URL}/v1/vegetation/ndre', {\n  method: 'POST',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({ farm_id: 'farm_001' })\n}).then(res => res.json());`
    },
    response: `{\n  "farm_id": "farm_001",\n  "ndre": 0.58,\n  "chlorophyll_indication": "Optimum",\n  "date": "2026-06-11"\n}`
  },
  {
    id: "savi",
    title: "SAVI — Sparse Canopy Index",
    subtitle: "VEGETATION ANALYSIS",
    group: "core-apis",
    endpoint: {
      method: "POST",
      path: "/v1/vegetation/savi",
      credits: 2
    },
    description: [
      "The Soil Adjusted Vegetation Index incorporates a soil correction factor L: \`((NIR - Red) / (NIR + Red + L)) * (1 + L)\`.",
      "It limits background soil color reflections, making it extremely reliable for young crops, sparse orchards, or vineyards."
    ],
    code: {
      curl: `curl -X POST ${API_URL}/v1/vegetation/savi \\\n  -H "Authorization: Bearer $KSAT_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "farm_id": "farm_001"\n  }'`,
      python: `import requests\n\nres = requests.post(\n    "${API_URL}/v1/vegetation/savi",\n    headers={"Authorization": f"Bearer {api_key}"},\n    json={"farm_id": "farm_001"}\n)`,
      node: `const fetch = require('node-fetch');\n\nfetch('${API_URL}/v1/vegetation/savi', {\n  method: 'POST',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({ farm_id: 'farm_001' })\n}).then(res => res.json());`
    },
    response: `{\n  "farm_id": "farm_001",\n  "savi": 0.61,\n  "soil_adjusted_index": 0.61,\n  "date": "2026-06-11"\n}`
  },
  {
    id: "ci",
    title: "CI — Chlorophyll Content",
    subtitle: "CANOPY TELEMETRY",
    group: "core-apis",
    endpoint: {
      method: "POST",
      path: "/v1/vegetation/ci",
      credits: 3
    },
    description: [
      "The Chlorophyll Index estimates crop canopy absolute chlorophyll loading, derived from Red-Edge and Near-Infrared sensors.",
      "It offers an accurate representation of leaf nitrogen levels and photosynthetic potential, aiding precision fertilization programs."
    ],
    code: {
      curl: `curl -X POST ${API_URL}/v1/vegetation/ci \\\n  -H "Authorization: Bearer $KSAT_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "farm_id": "farm_001"\n  }'`,
      python: `import requests\n\nres = requests.post(\n    "${API_URL}/v1/vegetation/ci",\n    headers={"Authorization": f"Bearer {api_key}"},\n    json={"farm_id": "farm_001"}\n)`,
      node: `const fetch = require('node-fetch');\n\nfetch('${API_URL}/v1/vegetation/ci', {\n  method: 'POST',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({ farm_id: 'farm_001' })\n}).then(res => res.json());`
    },
    response: `{\n  "farm_id": "farm_001",\n  "chlorophyll_index": 3.45,\n  "nitrogen_estimate": "Adequate",\n  "date": "2026-06-11"\n}`
  },
  {
    id: "ndmi",
    title: "NDMI — Canopy Moisture",
    subtitle: "WATER INTENSITY",
    group: "core-apis",
    endpoint: {
      method: "POST",
      path: "/v1/water/ndmi",
      credits: 2
    },
    description: [
      "The Normalized Difference Moisture Index utilizes Near-Infrared (NIR) and Short-Wave Infrared (SWIR) bands: \`(NIR - SWIR) / (NIR + SWIR)\`.",
      "It monitors plant canopy moisture saturation, aiding drought warnings and crop water stress profiling."
    ],
    code: {
      curl: `curl -X POST ${API_URL}/v1/water/ndmi \\\n  -H "Authorization: Bearer $KSAT_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "farm_id": "farm_001"\n  }'`,
      python: `import requests\n\nres = requests.post(\n    "${API_URL}/v1/water/ndmi",\n    headers={"Authorization": f"Bearer {api_key}"},\n    json={"farm_id": "farm_001"}\n)`,
      node: `const fetch = require('node-fetch');\n\nfetch('${API_URL}/v1/water/ndmi', {\n  method: 'POST',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({ farm_id: 'farm_001' })\n}).then(res => res.json());`
    },
    response: `{\n  "farm_id": "farm_001",\n  "ndmi": 0.45,\n  "water_stress": "Low Stress",\n  "date": "2026-06-11"\n}`
  },
  {
    id: "ndwi",
    title: "NDWI — Water Logging",
    subtitle: "WATER INTENSITY",
    group: "core-apis",
    endpoint: {
      method: "POST",
      path: "/v1/water/ndwi",
      credits: 2
    },
    description: [
      "The Normalized Difference Water Index highlights open water boundaries: \`(Green - NIR) / (Green + NIR)\`.",
      "It is optimal for tracking irrigation progress, delineating flooded areas, and measuring surface pooling risks."
    ],
    code: {
      curl: `curl -X POST ${API_URL}/v1/water/ndwi \\\n  -H "Authorization: Bearer $KSAT_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "farm_id": "farm_001"\n  }'`,
      python: `import requests\n\nres = requests.post(\n    "${API_URL}/v1/water/ndwi",\n    headers={"Authorization": f"Bearer {api_key}"},\n    json={"farm_id": "farm_001"}\n)`,
      node: `const fetch = require('node-fetch');\n\nfetch('${API_URL}/v1/water/ndwi', {\n  method: 'POST',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({ farm_id: 'farm_001' })\n}).then(res => res.json());`
    },
    response: `{\n  "farm_id": "farm_001",\n  "ndwi": 0.15,\n  "water_pooling_risk": "Negligible",\n  "date": "2026-06-11"\n}`
  },
  {
    id: "weather",
    title: "Weather — Microclimate",
    subtitle: "METEOROLOGY FEED",
    group: "core-apis",
    endpoint: {
      method: "POST",
      path: "/v1/weather",
      credits: 1
    },
    description: [
      "Retrieves hyperlocal atmospheric measurements matched to the geographic centroid of your registered field polygon.",
      "Telemetry updates hourly, providing localized temperature, precipitation probability, relative humidity, wind speed, and computed growing degree days (GDD)."
    ],
    code: {
      curl: `curl -X POST ${API_URL}/v1/weather \\\n  -H "Authorization: Bearer $KSAT_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "farm_id": "farm_001"\n  }'`,
      python: `import requests\n\nres = requests.post(\n    "${API_URL}/v1/weather",\n    headers={"Authorization": f"Bearer {api_key}"},\n    json={"farm_id": "farm_001"}\n)`,
      node: `const fetch = require('node-fetch');\n\nfetch('${API_URL}/v1/weather', {\n  method: 'POST',\n  headers: {\n    'Authorization': \`Bearer \${apiKey}\`,\n    'Content-Type': 'application/json'\n  },\n  body: JSON.stringify({ farm_id: 'farm_001' })\n}).then(res => res.json());`
    },
    response: `{\n  "farm_id": "farm_001",\n  "temperature": 29,\n  "rainfall": 12,\n  "humidity": 74,\n  "wind_speed": 14,\n  "growing_degree_days": 8.4,\n  "updated_at": "2026-06-11T10:00:00Z"\n}`
  },
  {
    id: "errors",
    title: "Errors",
    subtitle: "TROUBLESHOOTING",
    group: "reference",
    description: [
      "X-AGI uses standard HTTP response status codes to indicate API success or failure. Status codes in the \`2xx\` range represent success. Codes in the \`4xx\` range represent user error, and \`5xx\` codes indicate server issues.",
      "• 400 Bad Request: Missing request parameters or invalid polygon format.",
      "• 401 Unauthorized: Invalid API key or missing Bearer token headers.",
      "• 404 Not Found: Requested resources or farm_id do not exist.",
      "• 429 Too Many Requests: Rate limit throttled.",
      "Error responses return a detailed diagnostic payload:"
    ],
    code: {
      curl: `# Example request prompting a 404 response\ncurl ${API_URL}/v1/vegetation/ndvi \\\n  -H "Authorization: Bearer ks_sandbox_key" \\\n  -d '{"farm_id":"farm_invalid"}'`,
      python: `import requests\n\n# Simulated payload query triggering a rate throttle\nres = requests.post(\n    "${API_URL}/v1/vegetation/ndvi",\n    headers={"Authorization": "Bearer ks_sandbox_key"},\n    json={"farm_id": "farm_invalid"}\n)\nprint(res.status_code)\nprint(res.json())`,
      node: `// Querying with an invalid token\nconst axios = require('axios');\n\naxios.post('${API_URL}/v1/vegetation/ndvi', { farm_id: 'farm_invalid' }, {\n  headers: { 'Authorization': 'Bearer ks_invalid_token' }\n}).catch(err => {\n  console.log(err.response.status);\n  console.log(err.response.data);\n});`
    },
    response: `{\n  "error": {\n    "code": "resource_not_found",\n    "message": "No farm registration matching farm_id 'farm_invalid' was found.",\n    "param": "farm_id"\n  }\n}`
  },
  {
    id: "response-schema",
    title: "Response Schema",
    subtitle: "DATA DESIGN",
    group: "reference",
    description: [
      "All success payloads return standard JSON. The structure wraps query references, execution metadata, and target results.",
      "Each index endpoint includes a primary score variable (e.g. \`ndvi\`), a descriptive health classification string, and the timestamp representing when the satellite snapshot was captured."
    ],
    code: {
      curl: `curl ${API_URL}/v1/vegetation/ndvi \\\n  -d '{"farm_id": "farm_001"}'`,
      python: `# View standard index payload responses\nres = requests.post("${API_URL}/v1/vegetation/ndvi", json={"farm_id": "farm_001"})\ndata = res.json()\nprint(f"Index: {data.get('ndvi')}, Status: {data.get('health')}")`,
      node: `// Read telemetry keys dynamically\naxios.post('${API_URL}/v1/vegetation/ndvi', { farm_id: 'farm_001' })\n  .then(res => {\n    const { ndvi, health, date } = res.data;\n    console.log(\`Score: \${ndvi}, Classification: \${health}\`);\n  });`
    },
    response: `{\n  "farm_id": "farm_001",\n  "ndvi": 0.82,\n  "health": "Healthy",\n  "date": "2026-06-11"\n}`
  },
  {
    id: "support",
    title: "Support",
    subtitle: "DEVELOPER ASSISTANCE",
    group: "reference",
    description: [
      "Need help integrating X-AGI telemetry? Connect with our developer success team through the following channels:",
      "• Dashboard Help desk: Open a ticket directly inside the developer workspace.",
      "• Email Support: <a href=\"mailto:support@X-AGI.dev\" class=\"text-primary hover:underline font-semibold\">support@X-AGI.dev</a> (SLA targets: 2 hours for production accounts, 1 business day for sandbox testers).",
      "• SLA Status Dashboard: Keep track of incidents or service warnings on the active Status route."
    ],
    code: {
      curl: `# Test API network latency to check connectivity\nping api.X-AGI.dev`,
      python: `# Simple diagnostics logging ping test\nimport urllib.request\ntry:\n    urllib.request.urlopen("${API_URL}/health", timeout=5)\n    print("Connection: Successful")\nexcept Exception as e:\n    print(f"Connection Failed: {e}")`,
      node: `// Check connectivity using ping hooks\nconst dns = require('dns');\n\ndns.lookup('api.X-AGI.dev', (err, address, family) => {\n  if (err) console.error('Offline:', err);\n  else console.log('Resolved address:', address);\n});`
    },
    response: `{\n  "support_status": "online",\n  "active_escalations": 0,\n  "average_ticket_response": "14m"\n}`
  }
];
