import React, { useEffect } from 'react';

declare global {
  interface Window {
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: any) => void;
      }) => void;
    };
    disqus_config?: (this: any) => void;
  }
}

export const DisqusComments: React.FC = () => {
  useEffect(() => {
    const disqusShortname = 'aaa-mbai';
    const disqusUrl = 'https://mgmt-6110-problem-set-1.vercel.app/';
    const disqusIdentifier = 'home';

    const configureDisqus = function (this: any) {
      this.page.url = disqusUrl;
      this.page.identifier = disqusIdentifier;
    };

    // If DISQUS is already loaded, reset the thread cleanly into the container
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: configureDisqus,
      });
      return;
    }

    // Set configuration on window for the initial script load
    window.disqus_config = configureDisqus;

    // Load the Disqus Universal Code script only once
    const scriptId = 'disqus-embed-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://${disqusShortname}.disqus.com/embed.js`;
      script.setAttribute('data-timestamp', String(+new Date()));
      script.async = true;
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <div className="w-full bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col gap-3 mt-1">
      <p className="text-xs sm:text-sm text-slate-600 font-medium">
        Tell us what clicked, and what didn't.
      </p>
      <div id="disqus_thread" className="min-h-[140px]" style={{ color: '#334155', backgroundColor: '#ffffff' }} />
    </div>
  );
};
