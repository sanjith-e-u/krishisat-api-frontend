"use client"

import React from "react"
import LanguageTabs from "./language-tabs"
import CopyButton from "./copy-button"
import { DocSection } from "@/data/docs-sections"

interface DocsCodePanelProps {
  activeSectionData: DocSection;
  activeTab: "curl" | "python" | "node";
  setActiveTab: (tab: "curl" | "python" | "node") => void;
  onCopySuccess: (msg: string) => void;
}

export default function DocsCodePanel({
  activeSectionData,
  activeTab,
  setActiveTab,
  onCopySuccess
}: DocsCodePanelProps) {
  return (
    <aside className="hidden lg:flex w-[380px] shrink-0 bg-[#111827] border-l border-slate-800 text-slate-300 px-6 py-8 h-[calc(100vh-88px)] sticky top-[88px] overflow-y-auto z-10 flex-col select-none">
      <div className="space-y-6">
        
        {/* Clean header label replacing Active sync flag */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
            Example Request
          </span>
        </div>

        {/* Request Panel Section */}
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-t-lg px-4 py-2 flex items-center justify-between">
            <LanguageTabs
              activeTab={activeTab}
              onChange={setActiveTab}
              sectionId={activeSectionData.id}
            />
            
            <CopyButton
              text={activeSectionData.code[activeTab]}
              label="Copy"
              onCopySuccess={onCopySuccess}
              toastMessage="Request snippet copied to clipboard"
            />
          </div>

          <div
            role="tabpanel"
            id={`panel-${activeSectionData.id}-${activeTab}`}
            aria-labelledby={`tab-${activeSectionData.id}-${activeTab}`}
          >
            <pre
              tabIndex={0}
              aria-label={`${activeTab} request example for ${activeSectionData.title}`}
              className="bg-slate-950/40 p-4 text-[11px] font-mono leading-relaxed overflow-x-auto text-left whitespace-pre text-slate-300 border border-slate-850 rounded-b-lg max-h-[300px] focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1 focus:ring-offset-slate-950"
            >
              <code>{activeSectionData.code[activeTab]}</code>
            </pre>
          </div>
        </div>

        {/* Response Panel Section */}
        <div className="space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-t-lg px-4 py-2 flex items-center justify-between">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest font-semibold">
              Response payload
            </span>
            
            <CopyButton
              text={activeSectionData.response}
              label="Copy"
              onCopySuccess={onCopySuccess}
              toastMessage="Response payload copied to clipboard"
            />
          </div>

          <pre
            tabIndex={0}
            aria-label={`Expected JSON response payload for ${activeSectionData.title}`}
            className="bg-slate-950/40 p-4 text-[11px] font-mono leading-relaxed overflow-x-auto text-left whitespace-pre text-slate-300 border border-slate-850 rounded-b-lg max-h-[300px] focus:outline-none focus:ring-1 focus:ring-accent focus:ring-offset-1 focus:ring-offset-slate-950"
          >
            <code>{activeSectionData.response}</code>
          </pre>
        </div>

      </div>
    </aside>
  )
}
