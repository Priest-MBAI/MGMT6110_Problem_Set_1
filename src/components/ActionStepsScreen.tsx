import React, { useState } from 'react';
import { Task } from '../types';
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  BookOpen, 
  Sparkles,
  Check,
  Lightbulb,
  AlertTriangle,
  Lock
} from 'lucide-react';

interface ActionStepsScreenProps {
  task: Task;
  onBack: () => void;
  onTickComplete: (taskId: string) => void;
}

export const ActionStepsScreen: React.FC<ActionStepsScreenProps> = ({
  task,
  onBack,
  onTickComplete
}) => {
  // Local state for checking individual checklist steps
  const [checkedSteps, setCheckedSteps] = useState<{ [index: number]: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleStep = (index: number) => {
    setCheckedSteps(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const totalSteps = task.checklist.length;
  const completedCount = Object.values(checkedSteps).filter(Boolean).length;
  const isAllChecked = completedCount === totalSteps;

  const handleTickComplete = () => {
    if (!isAllChecked) return;
    setIsSubmitting(true);
    // Brief visual confirmation then proceed
    setTimeout(() => {
      onTickComplete(task.id);
    }, 280);
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-5 flex flex-col gap-4">
      {/* Top Navigation / Back bar */}
      <div className="flex items-center justify-between">
        <button
          id="btn-back-to-overview"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-950 font-bold text-sm bg-white hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs transition-colors cursor-pointer touch-manipulation min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4 text-slate-700" />
          <span>Back to Overview</span>
        </button>

        <span className="text-xs font-bold px-3 py-1 bg-sky-50 text-sky-800 rounded-full border border-sky-200">
          Screen 2: Action Steps
        </span>
      </div>

      {/* Task Summary Banner - Dynamic layered card with multi-line course details */}
      <div className="bg-gradient-to-br from-white via-sky-50/30 to-white rounded-2xl p-5 border-2 border-sky-200/90 shadow-sm flex flex-col gap-2 relative overflow-hidden">
        <div className="flex items-start gap-2 text-xs font-black">
          <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 border border-blue-200/60 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="leading-snug">
            <span className="text-blue-900 tracking-wide mr-1.5 uppercase font-black">{task.courseCode}</span>
            <span className="text-slate-700 font-semibold break-words">• {task.courseName}</span>
            <span className="ml-2 inline-block px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-blue-50 text-blue-800 border border-blue-200">
              {task.taskType}
            </span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug break-words mt-1">
          {task.title}
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs mt-2 pt-2.5 border-t border-slate-200/70">
          <div className="flex items-center gap-1.5 text-amber-900 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Deadline: <strong className="text-amber-950 font-black">{task.deadline}</strong></span>
          </div>
          <span className="text-emerald-800 text-[11px] font-bold bg-emerald-100/70 px-2.5 py-0.5 rounded-full border border-emerald-300 inline-block w-fit">
            {task.submissionGuidelines.split('•')[0]}
          </span>
        </div>
      </div>

      {/* Section 1: Next Action Card with dynamic gradient layering */}
      <div className="bg-gradient-to-br from-white via-emerald-50/25 to-teal-50/15 rounded-2xl p-5 border-2 border-emerald-400 shadow-sm flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 px-3 py-1 rounded-md border border-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            Next Action
          </span>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-900 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>Estimated time: <strong className="text-sky-950">{task.estimatedTimeNextAction}</strong></span>
          </div>
        </div>

        <p className="text-lg sm:text-xl font-bold text-slate-900 leading-snug mt-1">
          {task.nextAction}
        </p>

        {/* Action Completion Tip - Bright Sunny Yellow Lightbulb with subtle gradient */}
        <div className="flex items-start gap-2.5 p-3.5 bg-gradient-to-br from-yellow-50 via-amber-50/40 to-white rounded-xl border border-yellow-300/80 text-xs text-yellow-950 mt-1 shadow-2xs">
          <Lightbulb className="w-4 h-4 text-yellow-600 fill-yellow-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-yellow-950 font-black">Tip on how to complete: </strong>
            <span className="text-yellow-900 font-medium">{task.completionTip}</span>
          </div>
        </div>

        <div className="text-xs text-slate-500 mt-0.5 font-medium">
          Execute this primary milestone to advance your academic standing.
        </div>
      </div>

      {/* Section 2: Three-Step Checklist with gradient selection states */}
      <div className="bg-gradient-to-br from-white via-slate-50/40 to-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">
              Three-Step Checklist
            </h3>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
              isAllChecked 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}>
              {completedCount} / {totalSteps} Ticked
            </span>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            Tap step to check off
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {task.checklist.map((step, idx) => {
            const isChecked = !!checkedSteps[idx];
            return (
              <button
                key={idx}
                id={`checklist-step-${idx + 1}`}
                onClick={() => toggleStep(idx)}
                type="button"
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3.5 cursor-pointer touch-manipulation min-h-[52px] ${
                  isChecked 
                    ? 'bg-gradient-to-r from-emerald-50 via-teal-50/40 to-white border-emerald-400 text-slate-800 shadow-2xs' 
                    : 'bg-gradient-to-r from-slate-50/80 to-white hover:from-sky-50/40 hover:to-white border-slate-200 text-slate-900'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isChecked ? (
                    <div className="w-6 h-6 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-xs">
                      <Check className="w-4 h-4 stroke-[3.5]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-lg border-2 border-slate-300 bg-white shadow-inner" />
                  )}
                </div>
                <div className="flex-1 text-sm sm:text-base font-medium leading-relaxed">
                  <span className={`block ${isChecked ? 'line-through text-slate-500 font-normal' : 'text-slate-900 font-bold'}`}>
                    <span className={`text-xs font-bold mr-2 ${isChecked ? 'text-emerald-700' : 'text-blue-700'}`}>
                      Step {idx + 1}:
                    </span>
                    {step}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Section 3: Task Complete Card with Gated Unlock & Animated Tick */}
      <div className="bg-gradient-to-br from-white via-slate-50/30 to-white rounded-2xl p-5 border-2 border-slate-200 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700">
            Task Completion
          </span>
          <span className="text-xs font-bold text-slate-500">
            Final Step
          </span>
        </div>

        {/* Dynamic Status / Warning Callout */}
        {!isAllChecked ? (
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-900 flex items-start gap-2.5 shadow-2xs">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-black text-amber-950 block">Checklist Pending:</strong>
              <span>Please tick all 3 checklist boxes above to unlock the completion button ({completedCount} of 3 done).</span>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-300 text-xs text-emerald-950 flex items-start gap-2.5 shadow-2xs animate-in fade-in duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="font-black text-emerald-950 block">All Checklist Steps Done!</strong>
              <span>You have unlocked the task completion action. Click below to tick this task off your queue.</span>
            </div>
          </div>
        )}

        {/* Task Complete Button: Gated, Animated Tick (Yellow to Green enlarged pop out) */}
        <button
          id="btn-tick-complete"
          onClick={handleTickComplete}
          disabled={!isAllChecked || isSubmitting}
          className={`w-full py-4 px-6 rounded-xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 transition-all duration-300 touch-manipulation min-h-[58px] ${
            !isAllChecked
              ? 'bg-amber-50/70 border-2 border-amber-200 text-amber-800/80 cursor-not-allowed opacity-90'
              : isSubmitting
              ? 'bg-emerald-600 text-white scale-[0.98]'
              : 'bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 cursor-pointer scale-100 hover:scale-[1.01]'
          }`}
        >
          {/* Animated Tick Mark: Turn from Yellow to Green with enlarged pop-out when unlocked */}
          <div 
            className={`transition-all duration-500 flex items-center justify-center shrink-0 ${
              isAllChecked
                ? 'w-8 h-8 rounded-full bg-white text-emerald-600 shadow-md transform scale-110 animate-bounce'
                : 'w-7 h-7 rounded-full bg-amber-100 border border-amber-300 text-amber-600'
            }`}
          >
            {isAllChecked ? (
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-5 h-5 text-emerald-600 stroke-[3.5]"
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="w-4 h-4 text-amber-600 stroke-[3]"
                stroke="currentColor" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>

          <span>
            {!isAllChecked
              ? `Complete 3 Steps to Unlock (${completedCount}/3)`
              : isSubmitting
              ? 'Updating Status...'
              : 'Tick Complete'}
          </span>
        </button>
      </div>
    </div>
  );
};
