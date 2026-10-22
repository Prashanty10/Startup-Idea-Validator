<div align="center">

# 🚀 Startup Validator AI
### Autonomous Multi-Agent Startup Feasibility & Market Validation Engine

An end-to-end AI platform that takes a startup concept and executes a comprehensive, multi-stage validation pipeline powered by **LangGraph**, **Groq**, **Tavily Web Search**, and a local **ChromaDB RAG Knowledge Base**.

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![LangGraph](https://img.shields.io/badge/LangGraph-StateGraph-FF6F00?style=for-the-badge&logo=langchain&logoColor=white)](https://langchain-ai.github.io/langgraph/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_Store-fc521f?style=for-the-badge)](https://www.trychroma.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-Ultra_Fast_Inference-f55036?style=for-the-badge)](https://groq.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

</div>

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Multi-Agent Pipeline Architecture](#-multi-agent-pipeline-architecture)
- [The 7-Point Scoring Engine](#-the-7-point-scoring-engine)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository & Setup Virtual Environment](#1-clone-repository--setup-virtual-environment)
  - [2. Configure Environment Variables](#2-configure-environment-variables)
  - [3. Ingest Startup Literature (RAG Knowledge Base)](#3-ingest-startup-literature-rag-knowledge-base)
  - [4. Start the Backend API Server](#4-start-the-backend-api-server)
  - [5. Launch the React Frontend](#5-launch-the-react-frontend)
- [Running Standalone CLI Research](#-running-standalone-cli-research)
- [API Reference](#-api-reference)
- [Caching & Persistence](#-caching--persistence)
- [License](#-license)

---

## 💡 Overview

Over 90% of startups fail, primarily due to building something the market does not want, underestimating competition, miscalculating unit economics, or failing to identify real customer willingness-to-pay.

**Startup Validator AI** automates the due diligence process typically performed by venture scouts and accelerators. By feeding a startup idea, target country, and target region into the platform, a team of specialized AI agents analyzes the proposition against real academic venture literature, live market search data, and competitor signals to produce an actionable, objective feasibility dossier.

---

## ✨ Key Features

- **Multi-Agent LangGraph Pipeline**: 15+ specialized nodes handling idea quality gating, market research, competitor landscape, buyer personas, unit economics, SWOT, MVP scoping, and risk discovery.
- **Hybrid RAG Knowledge Base**: Uses local ChromaDB loaded with real venture failure studies, startup frameworks, and case studies embedded using `sentence-transformers/all-MiniLM-L6-v2`.
- **Live Market Grounding**: Enriches internal knowledge with live web research powered by Tavily Search.
- **Deterministic 7-Point Evaluation**: Eliminates hallucinated scores using a weighted, criterion-by-criterion mathematical evaluation engine with confidence tiers (`HIGH`, `MEDIUM`, `LOW`).
- **Built-in Quality Critic**: Performs reflection and sanity checking over the evaluation output before finalizing.
- **Fail-Fast Idea Gating**: Detects and rejects nonsensical, joke, or invalid ideas early to conserve API tokens and compute.
- **Durable Checkpointing & Caching**: SQLite checkpointing with `langgraph-checkpoint-sqlite` and SHA-256 persistent disk cache for instant reloads of previously analyzed ideas.
- **Interactive Modern UI**: Clean React 19 + Tailwind CSS v4 dashboard featuring radar scores, competitor matrixes, SWOT quadrants, failure scenarios, and research source citations.

---

## 🧠 Multi-Agent Pipeline Architecture

The validation workflow is modeled as a directed acyclic graph (DAG) using **LangGraph**:

```mermaid
flowchart TD
    START([User Input: Idea + Market]) --> IdeaAgent[1. Idea Extraction Node]
    IdeaAgent --> IdeaQuality{Idea Quality Gate}
    
    IdeaQuality -- "Invalid / Gibberish" --> InvalidNode[Invalid Idea Node] --> END_REJECT([Early Exit])
    
    IdeaQuality -- "Valid Idea" --> ResearchPlanner[2. Research Planner Node]
    ResearchPlanner --> MarketAgent[3. Market Sizing & Trends Node]
    MarketAgent --> CompetitorAgent[4. Competitor & Moat Analysis Node]
    CompetitorAgent --> PersonaAgent[5. Customer Personas & WTP Node]
    PersonaAgent --> PricingAgent[6. Pricing Model Node]
    PricingAgent --> EvidenceSynthesizer[7. Evidence Synthesizer & RAG Ledger Node]
    EvidenceSynthesizer --> UnitEconomics[8. Unit Economics & CAC/LTV Node]
    UnitEconomics --> SWOTAgent[9. SWOT Analysis Node]
    SWOTAgent --> MVPAgent[10. MVP Scope & Feature Cutlist Node]
    MVPAgent --> RiskAgent[11. Failure Modes & Unknowns Node]
    RiskAgent --> ValidationExps[12. Lean Validation Experiments Node]
    ValidationExps --> EvalAgent[13. 7-Point Criterion Evaluation Node]
    EvalAgent --> CriticAgent[14. Quality Critic Node]
    CriticAgent --> ScoringEngine[15. Deterministic Scoring Engine]
    ScoringEngine --> ReportSynthesis[16. Executive Report Synthesis Node]
    ReportSynthesis --> END_SUCCESS([Final Structured Dossier & UI Dashboard])

    subgraph Data Layer
        Chroma[(ChromaDB RAG\nVenture Docs)] -.-> EvidenceSynthesizer
        TavilySearch[Tavily Web Search] -.-> ResearchPlanner
        SQLiteCheckpoints[(SQLite DB\nCheckpointer)] -.-> ScoringEngine
    end
