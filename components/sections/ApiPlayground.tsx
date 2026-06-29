"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal, Send, Copy, Check, Loader2 } from "lucide-react";
import { PROJECTS, TIMELINE, AWARDS, GITHUB_USERNAME, LINKEDIN_URL, RESUME_PATH, EMAIL_ADDRESS, PHONE_NUMBER } from "@/lib/data";
import ScrollReveal from "../ui/ScrollReveal";

type Method = "GET" | "POST";

interface Preset {
  id: string;
  method: Method;
  endpoint: string;
  description: string;
  defaultBody?: string;
}

const PRESETS: Preset[] = [
  {
    id: "get-about",
    method: "GET",
    endpoint: "/about",
    description: "Get developer biography and interests",
  },
  {
    id: "get-experience",
    method: "GET",
    endpoint: "/experience",
    description: "Fetch experience and leadership timeline",
  },
  {
    id: "get-projects",
    method: "GET",
    endpoint: "/projects",
    description: "Retrieve featured projects list",
  },
  {
    id: "get-achievements",
    method: "GET",
    endpoint: "/achievements",
    description: "Retrieve awards and publication records",
  },
  {
    id: "get-education",
    method: "GET",
    endpoint: "/education",
    description: "Get educational details and coursework",
  },
  {
    id: "get-links",
    method: "GET",
    endpoint: "/links",
    description: "Retrieve social profiles and resume links",
  },
  {
    id: "get-contact",
    method: "GET",
    endpoint: "/contact",
    description: "Retrieve email and phone number",
  },
  {
    id: "post-message",
    method: "POST",
    endpoint: "/message",
    description: "Validate contact message payload",
    defaultBody: JSON.stringify(
      {
        name: "Jane Doe",
        email: "jane@example.com",
        message: "Hey Rudransh, let's collaborate on an IoT project!",
      },
      null,
      2
    ),
  },
];

function renderHighlightedJson(json: string) {
  const tokenPattern = /("[^"\\]*(?:\\.[^"\\]*)*"(?=\s*:))|("[^"\\]*(?:\\.[^"\\]*)*")|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  Array.from(json.matchAll(tokenPattern)).forEach((match, index) => {
    if (match.index === undefined) return;

    if (match.index > lastIndex) {
      nodes.push(json.slice(lastIndex, match.index));
    }

    const token = match[0];
    let className = "text-amber-400 font-bold";

    if (match[1]) {
      className = "text-[#00F2FE] font-bold";
    } else if (match[2]) {
      className = "text-emerald-300";
    } else if (match[3]) {
      className = "text-rose-400 font-bold";
    }

    nodes.push(
      <span key={`${token}-${index}`} className={className}>
        {token}
      </span>
    );
    lastIndex = match.index + token.length;
  });

  if (lastIndex < json.length) {
    nodes.push(json.slice(lastIndex));
  }

  return nodes;
}

export default function ApiPlayground() {
  const [selectedMethod, setSelectedMethod] = useState<Method>("GET");
  const [endpoint, setEndpoint] = useState<string>("/about");
  const [requestBody, setRequestBody] = useState<string>("");
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string>("");
  const [latency, setLatency] = useState<number | null>(null);
  const [payloadSize, setPayloadSize] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedCurl, setCopiedCurl] = useState<boolean>(false);

  // Rate Limiting Easter Egg Ref
  const clickTimestamps = useRef<number[]>([]);

  // Automatically load default body when method/endpoint changes
  useEffect(() => {
    if (selectedMethod === "POST" && endpoint === "/message") {
      const preset = PRESETS.find((p) => p.endpoint === "/message");
      setRequestBody(preset?.defaultBody || "");
    } else {
      setRequestBody("");
    }
  }, [selectedMethod, endpoint]);

  // Load a preset configuration
  const handlePresetSelect = (preset: Preset) => {
    setSelectedMethod(preset.method);
    setEndpoint(preset.endpoint);
    if (preset.method === "POST" && preset.defaultBody) {
      setRequestBody(preset.defaultBody);
    } else {
      setRequestBody("");
    }
  };

  // Dynamic cURL Command Generator
  const generateCurlCommand = () => {
    const baseUrl = "https://api.rudransh.dev/v1";
    if (selectedMethod === "GET") {
      return `curl -X GET ${baseUrl}${endpoint}`;
    } else {
      // Clean JSON string formatting for terminal single-quotes
      const bodyClean = requestBody.replace(/'/g, "'\\''").replace(/\n/g, "");
      return `curl -X POST ${baseUrl}${endpoint} \\\n  -H "Content-Type: application/json" \\\n  -d '${bodyClean}'`;
    }
  };

  const handleCopyCurl = () => {
    const curlCommand = generateCurlCommand();
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  // Mock API Route Processor
  const processRequest = () => {
    const normalizedEndpoint = endpoint.trim().toLowerCase();

    // 1. Rate limiter check (Easter Egg)
    const now = Date.now();
    clickTimestamps.current = clickTimestamps.current.filter((ts) => now - ts < 2000); // 2 second window
    clickTimestamps.current.push(now);

    if (clickTimestamps.current.length > 4) {
      // Trigger 429
      setResponseStatus(429);
      setStatusText("Too Many Requests");
      const errPayload = {
        error: "Too Many Requests",
        message: "Slow down, space cadet! You are hitting the API too fast. Easter-egg rate limiter activated.",
        limit: "4 requests / 2 seconds",
        retryAfterSeconds: 5,
      };
      const dataStr = JSON.stringify(errPayload, null, 2);
      setResponseData(dataStr);
      setPayloadSize(`${new Blob([dataStr]).size} B`);
      return;
    }

    // 2. Routing logic
    if (selectedMethod === "GET") {
      if (normalizedEndpoint === "/about") {
        const payload = {
          name: "Rudransh Srivastava",
          role: "Full-Stack Developer & IoT Engineer",
          bio: "An aspiring AI/software engineer focused on full-stack development, system design, and applied ML.",
          interests: [
            "Hardware-Software Integrations",
            "Applied Machine Learning",
            "High-Performance Server Backends",
          ],
          location: "Varanasi, India",
        };
        setResponseStatus(200);
        setStatusText("OK");
        const dataStr = JSON.stringify(payload, null, 2);
        setResponseData(dataStr);
        setPayloadSize(`${new Blob([dataStr]).size} B`);
      } else if (normalizedEndpoint === "/projects") {
        setResponseStatus(200);
        setStatusText("OK");
        const dataStr = JSON.stringify(PROJECTS, null, 2);
        setResponseData(dataStr);
        setPayloadSize(`${(new Blob([dataStr]).size / 1024).toFixed(2)} KB`);
      } else if (normalizedEndpoint === "/experience") {
        setResponseStatus(200);
        setStatusText("OK");
        const dataStr = JSON.stringify(TIMELINE, null, 2);
        setResponseData(dataStr);
        setPayloadSize(`${(new Blob([dataStr]).size / 1024).toFixed(2)} KB`);
      } else if (normalizedEndpoint === "/education") {
        const payload = {
          institution: "Sunbeam English School, Varanasi",
          board: "Central Board of Secondary Education (CBSE)",
          grade: "Class 12th Graduation",
          subjects: ["Physics", "Chemistry", "Mathematics", "English", "Computer Science", "Entrepreneurship"],
        };
        setResponseStatus(200);
        setStatusText("OK");
        const dataStr = JSON.stringify(payload, null, 2);
        setResponseData(dataStr);
        setPayloadSize(`${new Blob([dataStr]).size} B`);
      } else if (normalizedEndpoint === "/achievements") {
        setResponseStatus(200);
        setStatusText("OK");
        const dataStr = JSON.stringify(AWARDS, null, 2);
        setResponseData(dataStr);
        setPayloadSize(`${(new Blob([dataStr]).size / 1024).toFixed(2)} KB`);
      } else if (normalizedEndpoint === "/links") {
        const payload = {
          github: `https://github.com/${GITHUB_USERNAME}`,
          linkedin: LINKEDIN_URL,
          resume: RESUME_PATH,
        };
        setResponseStatus(200);
        setStatusText("OK");
        const dataStr = JSON.stringify(payload, null, 2);
        setResponseData(dataStr);
        setPayloadSize(`${new Blob([dataStr]).size} B`);
      } else if (normalizedEndpoint === "/contact") {
        const payload = {
          email: EMAIL_ADDRESS,
          phone: PHONE_NUMBER,
        };
        setResponseStatus(200);
        setStatusText("OK");
        const dataStr = JSON.stringify(payload, null, 2);
        setResponseData(dataStr);
        setPayloadSize(`${new Blob([dataStr]).size} B`);
      } else {
        // 404
        setResponseStatus(404);
        setStatusText("Not Found");
        const errPayload = {
          error: "Not Found",
          message: `Endpoint '${endpoint}' does not exist on this mock API server.`,
          availableEndpoints: [
            "GET /about",
            "GET /projects",
            "GET /experience",
            "GET /education",
            "GET /achievements",
            "GET /links",
            "GET /contact",
            "POST /message",
          ],
        };
        const dataStr = JSON.stringify(errPayload, null, 2);
        setResponseData(dataStr);
        setPayloadSize(`${new Blob([dataStr]).size} B`);
      }
    } else {
      // POST requests
      if (normalizedEndpoint === "/message") {
        try {
          if (!requestBody.trim()) {
            throw new Error("Empty request body");
          }

          const parsed = JSON.parse(requestBody);
          const errors: Record<string, string> = {};

          if (!parsed.name || typeof parsed.name !== "string" || !parsed.name.trim()) {
            errors.name = "Name field is required and must be a non-empty string.";
          }
          if (!parsed.email || typeof parsed.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.email)) {
            errors.email = "A valid email address is required.";
          }
          if (!parsed.message || typeof parsed.message !== "string" || !parsed.message.trim()) {
            errors.message = "Message field is required.";
          }

          if (Object.keys(errors).length > 0) {
            setResponseStatus(400);
            setStatusText("Bad Request");
            const errPayload = {
              error: "Validation Error",
              message: "Some payload fields failed validation.",
              details: errors,
            };
            const dataStr = JSON.stringify(errPayload, null, 2);
            setResponseData(dataStr);
            setPayloadSize(`${new Blob([dataStr]).size} B`);
          } else {
            setResponseStatus(201);
            setStatusText("Created");
            const successPayload = {
              success: true,
              message: "Mock validation succeeded! Your payload is structured correctly.",
              receivedMessage: {
                name: parsed.name.trim(),
                email: parsed.email.trim(),
                message: parsed.message.trim(),
                timestamp: new Date().toISOString(),
              },
            };
            const dataStr = JSON.stringify(successPayload, null, 2);
            setResponseData(dataStr);
            setPayloadSize(`${new Blob([dataStr]).size} B`);
          }
        } catch (e) {
          setResponseStatus(400);
          setStatusText("Bad Request");
          const errPayload = {
            error: "JSON Parsing Error",
            message: "Failed to parse request body as valid JSON. Ensure standard quotation marks are used.",
            details: e instanceof Error ? e.message : "Unknown parsing error",
          };
          const dataStr = JSON.stringify(errPayload, null, 2);
          setResponseData(dataStr);
          setPayloadSize(`${new Blob([dataStr]).size} B`);
        }
      } else {
        // 405 Method Not Allowed or 404
        setResponseStatus(405);
        setStatusText("Method Not Allowed");
        const errPayload = {
          error: "Method Not Allowed",
          message: `Method POST is not supported on endpoint '${endpoint}'.`,
          hint: "Did you mean POST /message?",
        };
        const dataStr = JSON.stringify(errPayload, null, 2);
        setResponseData(dataStr);
        setPayloadSize(`${new Blob([dataStr]).size} B`);
      }
    }
  };

  const handleSend = () => {
    setLoading(true);
    setResponseStatus(null);
    setResponseData("");

    const startTime = performance.now();
    // Simulate network latency (250ms - 500ms)
    const simulatedLatency = Math.floor(Math.random() * 250) + 250;

    setTimeout(() => {
      processRequest();
      setLatency(Math.round(performance.now() - startTime));
      setLoading(false);
    }, simulatedLatency);
  };

  return (
    <section id="playground" className="py-20 scroll-mt-24 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-left">
          <span className="block font-mono text-xs font-semibold text-neutral-600 dark:text-neutral-300 leading-none mb-2 tracking-widest uppercase">
            07 // API PLAYGROUND
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight uppercase text-[var(--text-primary)]">
            Live API Playground
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Quick Click Presets Sidebar (3 Cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <ScrollReveal className="h-full">
              <div className="bg-[#121214] border border-neutral-800 rounded-xl p-5 flex flex-col h-full text-left font-mono select-none">
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-4">
                  {"// Request Presets"}
                </span>
                <div className="space-y-2 h-[295px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-neutral-800 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-track]:bg-transparent pr-1">
                  {PRESETS.map((preset) => {
                    const isActive = selectedMethod === preset.method && endpoint === preset.endpoint;
                    return (
                      <button
                        type="button"
                        key={preset.id}
                        onClick={() => handlePresetSelect(preset)}
                        aria-pressed={isActive}
                        className={`w-full text-left p-3 rounded-lg border text-xs transition-all duration-150 flex flex-col gap-1.5 ${
                          isActive
                            ? "bg-neutral-900 border-neutral-700 text-white shadow-sm"
                            : "bg-transparent border-transparent hover:bg-neutral-900/50 text-neutral-400 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-black tracking-wider px-1.5 py-0.5 rounded text-[9px] ${
                              preset.method === "GET"
                                ? "bg-emerald-950/50 text-emerald-400 border border-emerald-900/50"
                                : "bg-sky-950/50 text-sky-400 border border-sky-900/50"
                            }`}
                          >
                            {preset.method}
                          </span>
                          <span className="font-semibold">{preset.endpoint}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500">{preset.description}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="border-t border-neutral-900 pt-4 mt-4">
                  <div className="flex items-center gap-2 text-neutral-500 text-[10px]">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Double-click Send to test rate-limiting</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Mini Postman Playground Interface (9 Cols) */}
          <div className="lg:col-span-9 flex flex-col justify-between">
            <ScrollReveal className="h-full">
              <div className="bg-[#121214] border border-neutral-800 rounded-xl flex flex-col h-full overflow-hidden text-left font-mono">
                
                {/* Console Header Bar */}
                <div className="bg-[#0B0B0C] border-b border-neutral-800 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    <span className="text-[10px] text-neutral-500 ml-2">playground v1.0.0</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCurl}
                    className="flex items-center gap-1.5 text-[10px] text-neutral-400 hover:text-white px-2 py-1 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 rounded transition-all"
                    aria-label="Copy request as cURL"
                    title="Copy request as cURL"
                  >
                    {copiedCurl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy as cURL</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Request URL Input Bar */}
                <div className="p-4 border-b border-neutral-900 flex flex-col sm:flex-row gap-2">
                  <div className="flex-grow flex border border-neutral-850 rounded-lg bg-neutral-950 overflow-hidden">
                    <select
                      aria-label="HTTP method"
                      value={selectedMethod}
                      onChange={(e) => {
                        const m = e.target.value as Method;
                        setSelectedMethod(m);
                        if (m === "GET") setEndpoint("/about");
                        else setEndpoint("/message");
                      }}
                      className="bg-[#0f0f11] text-xs font-bold text-neutral-300 border-r border-neutral-850 px-3 focus:outline-none cursor-pointer"
                    >
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                    </select>
                    <div className="flex-grow flex items-center px-3 text-neutral-600 text-xs">
                      <span className="hidden sm:inline select-none">https://api.rudransh.dev/v1</span>
                      <input
                        aria-label="API endpoint"
                        type="text"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                        placeholder="/about"
                        className="bg-transparent text-neutral-200 border-none outline-none focus:ring-0 w-full pl-0.5"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={loading}
                    aria-label="Send mock API request"
                    className="bg-neutral-100 hover:bg-white text-neutral-950 text-xs font-bold px-5 py-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Dynamic Body Input Area (For POST requests) */}
                {selectedMethod === "POST" && (
                  <div className="p-4 border-b border-neutral-900 bg-neutral-950/20">
                    <span className="text-[10px] text-neutral-500 font-semibold block mb-2 uppercase tracking-wider">
                      Request Body (JSON)
                    </span>
                    <textarea
                      aria-label="Request body JSON"
                      value={requestBody}
                      onChange={(e) => setRequestBody(e.target.value)}
                      placeholder="{}"
                      className="w-full h-28 bg-neutral-950 text-neutral-300 border border-neutral-850 rounded-lg p-3 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-neutral-700 resize-none"
                    />
                  </div>
                )}

                {/* Response Section */}
                <div className="flex-grow flex flex-col bg-neutral-950/30">
                  {/* Status Bar */}
                  <div className="border-b border-neutral-900 bg-[#0B0B0C] px-4 py-2 flex flex-wrap items-center justify-between text-[11px] gap-2 select-none" role="status" aria-live="polite">
                    <span className="text-neutral-500 font-semibold uppercase tracking-wider">Response Details</span>
                    <div className="flex items-center gap-4">
                      {responseStatus && (
                        <div className="flex items-center gap-1">
                          <span className="text-neutral-500">Status:</span>
                          <span
                            className={`font-bold ${
                              responseStatus >= 200 && responseStatus < 300
                                ? "text-emerald-400"
                                : responseStatus === 429
                                ? "text-orange-400"
                                : "text-rose-500"
                            }`}
                          >
                            {responseStatus} {statusText}
                          </span>
                        </div>
                      )}
                      {latency && (
                        <div>
                          <span className="text-neutral-500">Time:</span>{" "}
                          <span className="text-neutral-300 font-semibold">{latency} ms</span>
                        </div>
                      )}
                      {payloadSize && (
                        <div>
                          <span className="text-neutral-500">Size:</span>{" "}
                          <span className="text-neutral-300 font-semibold">{payloadSize}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* JSON Output View */}
                  <div className="flex-grow p-4 min-h-[180px] overflow-y-auto max-h-[300px] flex flex-col bg-[#070708]">
                    {loading ? (
                      <div className="flex-grow flex items-center justify-center text-neutral-500 text-xs gap-2 select-none">
                        <Loader2 className="w-4 h-4 animate-spin text-neutral-400" />
                        <span>Awaiting response from mock API server...</span>
                      </div>
                    ) : responseData ? (
                      <pre className="text-neutral-300 text-xs overflow-x-auto w-full leading-relaxed scrollbar-thin">
                        <code>{renderHighlightedJson(responseData)}</code>
                      </pre>
                    ) : (
                      <div className="flex-grow flex flex-col items-center justify-center text-neutral-600 text-xs select-none py-10 gap-2">
                        <Terminal className="w-6 h-6 text-neutral-700" />
                        <span>Select a preset or enter an endpoint above and click Send.</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
