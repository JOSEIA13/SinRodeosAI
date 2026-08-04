'use client';
import React from 'react';
import Link from 'next/link';

export default function DiagnosticoPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center">
      <div className="max-w-md w-full bg-[#111827] p-8 rounded-xl border border-[#233044] text-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenido al Diagnóstico</h1>
        <p className="text-[#94A3B8] mb-8">Esta es la entrevista estratégica.</p>
        <Link href="/diagnostico/entrevista" className="bg-[#D4A53A] text-black px-6 py-3 rounded-lg font-bold">
          Comenzar entrevista
        </Link>
      </div>
    </div>
  );
}