import React from 'react';
import { StudentProfile } from '../types';
import { User, IdCard, GraduationCap } from 'lucide-react';

interface HeaderProps {
  incompleteCount: number;
  totalCount: number;
  student: StudentProfile;
}

export const Header: React.FC<HeaderProps> = ({ incompleteCount, totalCount, student }) => {
  return (
    <header className="bg-white/95 backdrop-blur-md text-slate-900 shadow-xs relative z-10 border-b border-slate-200/90 border-t-4 border-t-emerald-500">
      <div className="max-w-xl mx-auto px-3.5 sm:px-5 py-3 sm:py-3.5 flex flex-col gap-2.5 sm:gap-3">
        {/* Top Row: TICK Logo and Pending Tasks (bulletproof mobile spacing, never cut off) */}
        <div className="flex items-center justify-between gap-2">
          {/* Combined TICK Brand Logo Lockup */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div 
              id="app-brand-logo"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-2xl shadow-sm border border-emerald-400/40 ring-2 ring-emerald-500/15 shrink-0"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white flex items-center justify-center shadow-xs shrink-0">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-emerald-600 stroke-[3.5]"
                  stroke="currentColor" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white select-none drop-shadow-xs">
                TICK
              </span>
            </div>

            {/* Desktop / Tablet Context Label */}
            <div className="hidden min-[460px]:flex flex-col min-w-0">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300 inline-block w-fit truncate">
                Postgraduate Task Queue
              </span>
              <p className="text-[10px] sm:text-xs text-slate-500 font-semibold truncate mt-0.5">
                Specialised School • University Portal
              </p>
            </div>
          </div>

          {/* Pending Tasks counter - flex-shrink-0 to guarantee 100% visibility on all mobile widths */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-white px-2.5 sm:px-3.5 py-1.5 rounded-xl border-2 border-emerald-300/90 shrink-0 text-right shadow-2xs">
            <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-emerald-900 font-extrabold whitespace-nowrap">
              Pending Tasks
            </div>
            <div className="text-sm sm:text-base font-black tracking-tight text-slate-900 leading-tight">
              <span className="text-emerald-700 text-base sm:text-lg font-black">{incompleteCount}</span>
              <span className="text-slate-400 font-semibold text-xs"> / {totalCount}</span>
            </div>
          </div>
        </div>

        {/* Mobile-only secondary label (< 460px) so context is never lost and never squashed */}
        <div className="flex min-[460px]:hidden items-center justify-between gap-1 text-[10px] text-slate-500 -mt-1 px-0.5">
          <span className="font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md border border-emerald-300 shrink-0">
            Postgraduate Task Queue
          </span>
          <span className="font-medium text-slate-500 truncate text-right">
            Specialised School Portal
          </span>
        </div>

        {/* Student Details: Clean, bright academic card with gradient layering */}
        <div className="bg-gradient-to-br from-white via-slate-50/90 to-emerald-50/20 rounded-xl p-3 border border-slate-200/90 flex flex-col gap-2 text-xs shadow-2xs">
          {/* Line 1: Student Name */}
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/70">
            <div className="flex items-center gap-2 text-slate-500 shrink-0">
              <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="font-bold text-slate-600 text-[11px] uppercase tracking-wider">Student Name</span>
            </div>
            <span className="font-black text-slate-900 text-sm tracking-tight text-right">
              {student.name}
            </span>
          </div>

          {/* Line 2: Student Number */}
          <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/70">
            <div className="flex items-center gap-2 text-slate-500 shrink-0">
              <IdCard className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="font-bold text-slate-600 text-[11px] uppercase tracking-wider">Student Number</span>
            </div>
            <span className="font-mono font-bold text-teal-800 text-xs bg-white px-2 py-0.5 rounded border border-teal-300/80 shadow-2xs text-right">
              {student.studentNumber}
            </span>
          </div>

          {/* Line 3: Masters Programme - wraps cleanly without truncation */}
          <div className="flex items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-500 shrink-0 mt-0.5 sm:mt-0">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="font-bold text-slate-600 text-[11px] uppercase tracking-wider">Programme</span>
            </div>
            <span className="font-semibold text-slate-900 text-xs text-right leading-snug break-words">
              {student.mastersProgramme}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
