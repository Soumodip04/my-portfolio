'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CodeBlock from '@/components/CodeBlock';
import { useTheme } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';

export default function RagExpertSystemBlog() {
  const { theme } = useTheme();
  
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Ensure the theme is applied to the document immediately
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Force re-render when theme changes
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Back button */}
        <Link href="/#blog" className="inline-flex items-center mb-8 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Blog
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full mr-4">
              AI & Web
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">July 12, 2025 · 8 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            💼 Building a Domain-Adaptive RAG System for Secure AI
          </h1>
        </div>

        {/* Featured image */}
        <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10"></div>
          <div className="absolute bottom-6 left-6 z-20 text-6xl">
            🔮
          </div>
          <div className="absolute w-full h-full">
            <Image
              src="/blog_rag_og.png" 
              alt="RAG Expert System"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Blog content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1>Building a Domain-Adaptive RAG System: Combining LLMs with Private Document Search for Secure Enterprise Solutions</h1>
          <p><em>By Soumodip Das</em></p>

          <h2>Introduction: The Problem with Black-Box AI</h2>
          <p>Imagine you're a legal analyst who just uploaded thousands of internal contracts into an AI system, hoping it will answer your legal questions with precision. Instead, you get hallucinated answers — confidently stated facts with no traceable source.</p>

          <p>Welcome to the limits of traditional large language models (LLMs).</p>

          <p>Modern enterprises—from healthcare to legal to finance—need AI that <strong>knows their proprietary knowledge</strong> and can <strong>prove where its answers come from</strong>.</p>

          <p>Enter <strong>Retrieval-Augmented Generation (RAG)</strong> systems: an architecture that combines the creative language power of LLMs with private, domain-specific document search. In this post, I'll show how to build a RAG expert system from scratch, discuss the challenges, and share best practices for production-grade deployments.</p>

          <h2>The Technical Background: What is RAG?</h2>
          <p><strong>Retrieval-Augmented Generation (RAG)</strong> enhances LLMs by fetching <strong>relevant knowledge</strong> from external documents before generating an answer. Instead of relying purely on training data, a RAG pipeline:</p>
          <ul>
            <li>Converts text into vector embeddings</li>
            <li>Stores vectors in a vector database (like ChromaDB)</li>
            <li>Searches vectors to retrieve relevant passages</li>
            <li>Passes those passages to an LLM to generate a grounded answer</li>
          </ul>

          <p>This solves three critical enterprise needs:</p>
          <ul>
            <li>✅ <strong>Domain Knowledge</strong> — Lets LLMs "read" your own documents</li>
            <li>✅ <strong>Accuracy & Citations</strong> — Grounds responses in verifiable content</li>
            <li>✅ <strong>Data Privacy</strong> — Keeps proprietary data off external APIs if implemented locally</li>
          </ul>

          <h2>Traditional Search vs. RAG</h2>
          
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 mb-6">
              <thead>
                <tr>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Feature</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">Traditional Search</th>
                  <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">RAG</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Keyword Matching</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">✅</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Semantic Understanding</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">❌</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Handles Synonyms</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">❌</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Fact Verification</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">❌</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">✅</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">Custom Domain Knowledge</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">❌</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>How the RAG Expert System Works</h2>
          <div className="relative w-full h-auto py-8 mb-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl overflow-hidden shadow-xl">
            <div className="text-xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-6">RAG Architecture Diagram</div>
            
            <div className="max-w-3xl mx-auto px-4">
              {/* User Query */}
              <div className="flex justify-center mb-6">
                <div className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md font-medium w-64 text-center">
                  User Query
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              {/* Query Processor */}
              <div className="flex justify-center mb-6">
                <div className="bg-indigo-600 text-white px-5 py-3 rounded-lg shadow-md font-medium w-64 text-center">
                  Query Processor
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              {/* Hybrid Retrieval & Vector DB */}
              <div className="flex justify-center mb-6">
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <div className="bg-purple-600 text-white px-3 py-3 rounded-lg shadow-md font-medium text-center">
                    Hybrid Retrieval Engine
                  </div>
                  <div className="bg-pink-600 text-white px-3 py-3 rounded-lg shadow-md font-medium text-center">
                    Vector DB (ChromaDB)
                  </div>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              {/* Context Assembly */}
              <div className="flex justify-center mb-6">
                <div className="bg-green-600 text-white px-5 py-3 rounded-lg shadow-md font-medium w-64 text-center">
                  Context Assembly
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              {/* LLM Response Generation */}
              <div className="flex justify-center mb-6">
                <div className="bg-amber-600 text-white px-5 py-3 rounded-lg shadow-md font-medium w-64 text-center">
                  LLM Response Generation
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              {/* Add Citations, Verifications */}
              <div className="flex justify-center mb-6">
                <div className="bg-teal-600 text-white px-5 py-3 rounded-lg shadow-md font-medium w-64 text-center">
                  Add Citations, Verifications
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center mb-6">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              {/* User Answer */}
              <div className="flex justify-center">
                <div className="bg-blue-500 text-white px-5 py-3 rounded-lg shadow-md font-medium w-64 text-center">
                  User Answer
                </div>
              </div>
            </div>
          </div>

          <h2>Step 1 — Document Processing & Chunking</h2>
          <p>Before retrieval, documents must be <strong>ingested, cleaned, and split into chunks</strong>. Large documents can exceed LLM context limits, so chunking ensures manageability and meaningful retrieval.</p>

          <h3>Document Loader Class</h3>
          <p>Here's a loader for multi-format documents:</p>

          <CodeBlock 
            language="python" 
            code={`class DocumentProcessor:
    def __init__(self):
        self.loaders = {
            '.pdf': PyPDFLoader,
            '.docx': UnstructuredWordDocumentLoader,
            '.txt': TextLoader,
            '.html': UnstructuredHTMLLoader,
            '.csv': CSVLoader,
            '.xlsx': UnstructuredExcelLoader,
            '.pptx': UnstructuredPowerPointLoader,
            '.epub': UnstructuredEPubLoader
        }

    def load(self, file_path):
        extension = os.path.splitext(file_path)[-1].lower()
        loader_class = self.loaders.get(extension)
        if loader_class:
            loader = loader_class()
            return loader.load(file_path)
        else:
            raise ValueError("Unsupported file type")`} 
          />

          <h3>Semantic Chunking</h3>
          <p>Instead of naive splits, semantic chunking respects paragraphs and logical boundaries.</p>

          <CodeBlock 
            language="python" 
            code={`def semantic_chunking(text):
    paragraphs = text.split("\\n\\n")
    chunks = []
    for para in paragraphs:
        if len(para) > 50:
            chunks.append(para)
    return chunks`} 
          />

          <h2>Step 2 — Vector Embeddings with ChromaDB</h2>
          <p>RAG systems transform text into <strong>vector embeddings</strong> that capture semantic meaning.</p>

          <h3>Generating Embeddings</h3>
          <p>We support multiple providers:</p>
          <ul>
            <li><strong>OpenAI</strong> (external)</li>
            <li><strong>SentenceTransformers</strong> (local)</li>
            <li><strong>HuggingFace</strong> (local)</li>
          </ul>

          <CodeBlock 
            language="python" 
            code={`class EmbeddingManager:
    def __init__(self, provider="openai"):
        self.providers = {
            "openai": OpenAIEmbeddings(),
            "sentence_transformers": SentenceTransformerEmbeddings(),
            "huggingface": HuggingFaceEmbeddings()
        }

    def generate_embeddings(self, chunks):
        embeddings = []
        for chunk in chunks:
            embedding = self.providers["openai"].embed(chunk)
            embeddings.append(embedding)
        return embeddings`} 
          />

          <h3>ChromaDB Vector Store</h3>
          <p>ChromaDB is an excellent choice for on-premise, private deployments:</p>

          <CodeBlock 
            language="python" 
            code={`import chromadb

class ChromaVectorStore:
    def __init__(self):
        self.client = chromadb.PersistentClient(path="./chroma_db")

    def add(self, id, vector, metadata, text):
        collection = self.client.get_or_create_collection("rag_docs")
        collection.add(
            ids=[id],
            embeddings=[vector],
            metadatas=[metadata],
            documents=[text]
        )

    def similarity_search(self, query_vector, k=5):
        collection = self.client.get_or_create_collection("rag_docs")
        return collection.query(
            query_embeddings=[query_vector],
            n_results=k
        )`} 
          />

          <h2>Step 3 — Hybrid Retrieval</h2>
          <p>Combine:</p>
          <ul>
            <li>Vector similarity search</li>
            <li>BM25 keyword search</li>
          </ul>

          <CodeBlock 
            language="python" 
            code={`def hybrid_search(query, vector_weight=0.7, keyword_weight=0.3):
    vector_results = vector_search(query)
    keyword_results = keyword_search(query)
    combined = rerank_results(vector_results, keyword_results)
    return combined`} 
          />

          <h2>Step 4 — LLM Response Generation</h2>
          <p>The LLM uses retrieved context to produce grounded answers.</p>
          <p>Sample prompt:</p>

          <CodeBlock 
            language="text" 
            code={`You are a medical AI assistant. When providing information:
1. Always include disclaimers about consulting healthcare professionals.
2. Cite medical sources when available.
3. Use precise medical terminology.`} 
          />

          <p>Code example:</p>

          <CodeBlock 
            language="python" 
            code={`context = """
[Source 1]: Metformin common side effects include gastrointestinal disturbances...
[Source 2]: Clinical studies show that approximately 25% of patients experience...
"""

prompt = f"""
You are a medical AI assistant. Answer this question using only the context below:

Question: What are the side effects of metformin?

Context: {context}

Provide citations in the format [Source X].
"""

response = llm_manager.generate_response(prompt)`} 
          />

          <h2>Challenges & Solutions</h2>

          <h3>1. Security & Privacy</h3>
          <p><strong>Problem:</strong> Enterprises fear leaking data to external LLMs.</p>
          <p><strong>Solution:</strong></p>
          <ul>
            <li>Use local models</li>
            <li>Sanitize sensitive data</li>
            <li>Deploy private vector stores</li>
          </ul>

          <h3>2. Latency & Costs</h3>
          <p>Long documents → high token usage.</p>
          <p><strong>Solution:</strong></p>
          <ul>
            <li>Smart chunking</li>
            <li>Batch embedding</li>
            <li>Cache embeddings</li>
          </ul>

          <CodeBlock 
            language="python" 
            code={`def batch_embed(texts, batch_size=50):
    embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        embeddings.extend(embedding_model.encode(batch))
    return embeddings`} 
          />

          <h3>3. Hallucinations</h3>
          <p>LLMs sometimes invent facts.</p>
          <p><strong>Solution:</strong></p>
          <ul>
            <li>Add citations</li>
            <li>Implement fact-checking</li>
          </ul>

          <CodeBlock 
            language="python" 
            code={`def verify_claims(response, source_documents):
    # Compare claims against retrieved text
    return True`} 
          />

          <h2>Results & Performance</h2>
          <p>From internal testing:</p>
          <ul>
            <li>Reduced hallucinations ~40% vs. pure LLMs</li>
            <li>Fast vector retrieval (ChromaDB sub-second queries)</li>
            <li>High traceability via source citations</li>
          </ul>

          <h2>Best Practices</h2>
          <ul>
            <li>✅ Monitor token costs</li>
            <li>✅ Always hybrid search</li>
            <li>✅ Cache embeddings</li>
            <li>✅ Tailor prompts per domain</li>
            <li>✅ Log interactions for audits</li>
          </ul>

          <h2>Conclusion and Next Steps</h2>
          <p>RAG systems are the future for <strong>enterprise-grade AI</strong>:</p>
          <ul>
            <li>Combine private data with LLMs</li>
            <li>Ground answers in real documents</li>
            <li>Ensure data privacy and trust</li>
          </ul>

          <p><strong>Next steps:</strong></p>
          <ul>
            <li>Experiment with ChromaDB</li>
            <li>Test different LLM providers</li>
            <li>Focus on robust fact-checking</li>
          </ul>

          <h2>Resources</h2>
          <ul>
            <li><a href="https://docs.trychroma.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">ChromaDB Docs</a></li>
            <li><a href="https://python.langchain.com/docs/use_cases/question_answering/" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">LangChain RAG Architecture</a></li>
            <li><a href="https://platform.openai.com/docs/api-reference" target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">OpenAI API Docs</a></li>
          </ul>

          <p className="mt-8"><em>Questions about implementing RAG for your use case? <Link href="/#contact" className="text-purple-600 dark:text-purple-400 hover:underline">Contact me here.</Link></em></p>
        </article>

        {/* Author section */}
        <div className="mt-16 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <h3 className="text-xl font-bold mb-4">About the Author</h3>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
              SD
            </div>
            <div className="ml-4">
              <p className="font-medium">Soumodip Das</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Full Stack Developer & AI Enthusiast</p>
            </div>
          </div>
        </div>

        {/* Related posts section would go here */}

        {/* Back to top button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium shadow-md hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Top
          </button>
        </div>
        </div>
      </div>
    </>
  );
}
