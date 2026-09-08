import React from 'react';
import { CheckCircle2, RotateCcw, Award } from 'lucide-react';

interface AllCompletedScreenProps {
  totalCompleted: number;
  onReset: () => void;
}

export const AllCompletedScreen: React.FC<AllCompletedScreenProps> = ({
  totalCompleted,
  onReset
}) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-12 flex flex-col items-center text-center gap-6">
      <div className="w-20 h-20 rounded-3xl bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center text-emerald-600 shadow-inner">
        <CheckCircle2 className="w-12 h-12 stroke-[2.75]" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-1.5 self-center bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
          <Award className="w-4 h-4 text-emerald-600" />
          Queue Cleared
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          All Academic Tasks Completed!
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          You have finished all <strong>{totalCompleted}</strong> prioritised tasks in your university school queue. No incomplete tasks remain pending.
        </p>
      </div>

      <div className="w-full bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/20 rounded-2xl p-6 border-2 border-emerald-300/80 shadow-md flex flex-col gap-4 relative overflow-hidden">
        <div className="text-sm font-bold text-slate-800">
          Want to test or demonstrate the task flow again?
        </div>
        <button
          id="btn-reset-tasks"
          onClick={onReset}
          className="w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 text-white font-black text-base rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer touch-manipulation min-h-[52px] shadow-md shadow-emerald-700/20"
        >
          <RotateCcw className="w-5 h-5 text-white" />
          <span>Reset Sample Queue ({totalCompleted} Tasks)</span>
        </button>
      </div>
    </div>
  );
};
