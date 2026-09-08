import { useState } from 'react';
import { Task, ScreenView } from './types';
import { INITIAL_TASKS, CURRENT_STUDENT } from './data/tasks';
import { Header } from './components/Header';
import { PrioritisedTaskScreen } from './components/PrioritisedTaskScreen';
import { ActionStepsScreen } from './components/ActionStepsScreen';
import { AllCompletedScreen } from './components/AllCompletedScreen';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [currentScreen, setCurrentScreen] = useState<ScreenView>('prioritised-task');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Derive incomplete tasks and current prioritised task
  const incompleteTasks = tasks.filter(t => t.status === 'Incomplete');
  const currentTask = incompleteTasks[0] || null;
  const totalCompleted = tasks.filter(t => t.status === 'Complete').length;

  const handleTickComplete = (taskId: string) => {
    // 1. Update task status in state to Complete
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'Complete' } : task
      )
    );

    // 2. Return to the prioritised task screen without reloading the page
    setCurrentScreen('prioritised-task');

    // 3. Show brief feedback toast
    setToastMessage('Task ticked complete! Next academic milestone loaded.');
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleResetQueue = () => {
    setTasks(INITIAL_TASKS.map(t => ({ ...t, status: 'Incomplete' })));
    setCurrentScreen('prioritised-task');
    setToastMessage('Queue reset with 10 sample tasks.');
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-emerald-50/20 to-sky-50/25 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 relative overflow-x-hidden">
      {/* Dynamic atmospheric ambient gradients for subtle visual depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/20 via-teal-100/10 to-transparent pointer-events-none -z-10" />
      <div className="absolute top-44 -right-20 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 -left-20 w-80 h-80 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Application Header */}
      <Header 
        incompleteCount={incompleteTasks.length} 
        totalCount={tasks.length} 
        student={CURRENT_STUDENT}
      />

      {/* Floating Status Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl border-2 border-emerald-400 flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Screen Container */}
      <main className="flex-1 pb-10">
        {currentTask ? (
          currentScreen === 'prioritised-task' ? (
            <PrioritisedTaskScreen
              task={currentTask}
              remainingCount={incompleteTasks.length}
              totalCount={tasks.length}
              onOpenActionSteps={() => setCurrentScreen('action-steps')}
            />
          ) : (
            <ActionStepsScreen
              task={currentTask}
              onBack={() => setCurrentScreen('prioritised-task')}
              onTickComplete={handleTickComplete}
            />
          )
        ) : (
          <AllCompletedScreen
            totalCompleted={totalCompleted}
            onReset={handleResetQueue}
          />
        )}
      </main>

      {/* Subtle fresh academic footer */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        <div className="max-w-xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-1 text-[11px]">
          <span className="font-semibold text-slate-600">TICK Academic Assistant • MGMT 6110 Human-AI Collaboration</span>
          <span className="text-slate-400">Postgraduate Study Queue • University School Portal</span>
        </div>
      </footer>
    </div>
  );
}
