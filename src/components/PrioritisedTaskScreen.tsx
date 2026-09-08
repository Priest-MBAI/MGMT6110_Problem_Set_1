import React from 'react';
import { Task } from '../types';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  MapPin, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  Layers,
  Lightbulb,
  GraduationCap
} from 'lucide-react';

interface PrioritisedTaskScreenProps {
  task: Task;
  remainingCount: number;
  totalCount: number;
  onOpenActionSteps: () => void;
}

export const PrioritisedTaskScreen: React.FC<PrioritisedTaskScreenProps> = ({
  task,
  remainingCount,
  totalCount,
  onOpenActionSteps
}) => {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-5 flex flex-col gap-4">
      {/* Top Banner: Dynamic academic hero card with gradient layering */}
      <div className="bg-gradient-to-br from-white via-emerald-50/20 to-sky-50/30 rounded-2xl p-5 sm:p-6 shadow-md shadow-slate-900/5 border-2 border-emerald-300/80 relative overflow-hidden">
        {/* Subtle decorative gradient glow orbs for visual depth */}
        <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-emerald-200/25 to-teal-200/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-gradient-to-tr from-sky-200/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-2 mb-2.5 relative z-1">
          <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            Top Prioritised Task
          </div>
          <span className="text-xs font-bold text-slate-600 bg-white/90 px-2.5 py-1 rounded-full border border-slate-200/90 shadow-2xs">
            Task {totalCount - remainingCount + 1} of {totalCount}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug mt-2 relative z-1">
          {task.title}
        </h1>

        {/* Core module name: wraps naturally to 2 lines on mobile without being cut off */}
        <div className="flex items-start gap-2.5 mt-3.5 pt-3 border-t border-slate-200/80 text-sm relative z-1">
          <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 mt-0.5 border border-blue-200/60 shadow-2xs">
            <BookOpen className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="flex-1 leading-snug">
            <span className="font-black text-blue-900 tracking-wide mr-1.5 inline-block">
              {task.courseCode}
            </span>
            <span className="text-slate-700 font-semibold break-words">
              • {task.courseName}
            </span>
          </div>
        </div>
      </div>

      {/* Critical Metadata Grid - Fresh academic card with distinct meaningful colors & layered gradients */}
      <div className="bg-gradient-to-br from-white via-slate-50/50 to-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col gap-3.5">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-600 border-b border-slate-100 pb-2.5 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            Task Specifications
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
            {task.taskType}
          </span>
        </div>

        {/* 1. Deadline & Submission Guidelines / Weightage (Vibrant Coral / Warm Amber) */}
        <div className="flex items-start gap-3.5 p-3.5 bg-gradient-to-br from-amber-50 via-orange-50/30 to-white rounded-xl border-2 border-amber-200/90 shadow-2xs">
          <div className="p-2.5 bg-amber-500 text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
            <Calendar className="w-5 h-5 text-white stroke-[2.25]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800">
                Deadline
              </span>
              <span className="text-xs font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-md border border-amber-300">
                Next Cut-off
              </span>
            </div>
            <div className="text-xl font-black text-amber-950 mt-0.5">
              {task.deadline}
            </div>
            <div className="mt-2 pt-2 border-t border-amber-200/80 text-xs text-amber-950">
              <span className="font-bold text-amber-900 block mb-0.5">Submission Guidelines & Weightage:</span>
              <span className="leading-relaxed block text-amber-950/90 font-medium">{task.submissionGuidelines}</span>
            </div>
          </div>
        </div>

        {/* 2. Estimated Work Needed (Fresh Sky Blue) */}
        <div className="flex items-start gap-3.5 p-3.5 bg-gradient-to-br from-sky-50 via-cyan-50/30 to-white rounded-xl border-2 border-sky-200/90 shadow-2xs">
          <div className="p-2.5 bg-sky-500 text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
            <Clock className="w-5 h-5 text-white stroke-[2.25]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-black uppercase tracking-wider text-sky-800">
              Estimated Work Needed
            </div>
            <div className="text-xl font-black text-sky-950 mt-0.5">
              {task.estimatedWorkNeeded}
            </div>
            <div className="text-xs text-sky-800/80 mt-0.5 font-medium">
              Total effort estimated to complete this academic milestone
            </div>
          </div>
        </div>

        {/* 3. Tips on How to Complete (Sunny Yellow Lightbulb) */}
        <div className="flex items-start gap-3.5 p-3.5 bg-gradient-to-br from-yellow-50 via-amber-50/30 to-white rounded-xl border-2 border-yellow-200/90 shadow-2xs">
          <div className="p-2.5 bg-yellow-400 text-yellow-950 rounded-xl shrink-0 mt-0.5 shadow-xs">
            <Lightbulb className="w-5 h-5 text-yellow-950 fill-yellow-300 stroke-[2.25]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] font-black uppercase tracking-wider text-yellow-900">
              Tips on How to Complete
            </div>
            <p className="text-sm font-semibold text-yellow-950 mt-1 leading-relaxed">
              {task.completionTip}
            </p>
          </div>
        </div>

        {/* 4. Next Class Details (Academic Indigo with Crisp Red Pin for Location) */}
        <div className="flex items-start gap-3.5 p-3.5 bg-gradient-to-br from-indigo-50/80 via-purple-50/20 to-white rounded-xl border-2 border-indigo-200/90 shadow-2xs">
          <div className="p-2.5 bg-indigo-600 text-white rounded-xl shrink-0 mt-0.5 shadow-xs">
            <GraduationCap className="w-5 h-5 text-white stroke-[2.25]" />
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-1.5">
            <div className="text-[11px] font-black uppercase tracking-wider text-indigo-900">
              Next Class Details
            </div>
            
            {/* Next Lesson Name */}
            <div className="text-sm font-extrabold text-indigo-950 leading-snug">
              <span className="text-xs font-bold text-indigo-700 mr-1.5">Next Lesson:</span>
              <span>{task.nextLessonName}</span>
            </div>

            {/* Date & Time */}
            <div className="flex items-center gap-1.5 text-xs text-indigo-900 font-semibold mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span>{task.nextLessonDate} • {task.nextLessonTime}</span>
            </div>

            {/* Full Classroom Location */}
            <div className="flex items-start gap-1.5 text-xs text-slate-700 mt-0.5 pt-1.5 border-t border-indigo-200/60">
              <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <span className="font-medium leading-tight text-slate-800">
                <span className="font-bold text-slate-900">Location: </span>
                {task.classroomLocationFull}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Preview Card with direct path to Screen 2 (Vibrant layered CTA) */}
      <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-5 sm:p-6 border border-emerald-400/50 shadow-lg shadow-emerald-950/15 flex flex-col gap-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="flex items-center gap-2 text-emerald-200 text-xs font-black uppercase tracking-wider relative z-1">
          <AlertCircle className="w-4 h-4 text-emerald-300" />
          Ready to Make Progress?
        </div>
        <p className="text-emerald-50 text-xs sm:text-sm leading-relaxed font-medium relative z-1">
          Open the concise action steps and 3-step checklist to complete this task and tick it off your queue.
        </p>

        <button
          id="btn-view-action-steps"
          onClick={onOpenActionSteps}
          className="w-full mt-1 bg-white hover:bg-emerald-50 active:bg-emerald-100 text-emerald-950 font-black text-base sm:text-lg py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg touch-manipulation min-h-[54px] cursor-pointer relative z-1"
        >
          <span>View Action Steps & Checklist</span>
          <ArrowRight className="w-5 h-5 text-emerald-900 stroke-[2.75]" />
        </button>
      </div>

      {/* Queue Mode Footer */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-2 py-0.5">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-400" />
          Queue Mode: Prioritised by deadline
        </span>
        <span className="font-bold text-slate-700">
          {remainingCount} incomplete {remainingCount === 1 ? 'task' : 'tasks'} remaining
        </span>
      </div>
    </div>
  );
};
