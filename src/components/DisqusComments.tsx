import { useEffect } from 'react';

const DISQUS_SHORTNAME = 'aaa-mbai';
const PAGE_URL = 'https://mgmt-6110-problem-set-1.vercel.app';
const PAGE_IDENTIFIER = 'home';
const SCRIPT_ID = 'dsq-embed-scr';

declare global {
  interface Window {
    disqus_config?: (this: { page: { url: string; identifier: string } }) => void;
  }
}

export function DisqusComments() {
  useEffect(() => {
    // Load the Disqus Universal Code once, even if this effect runs again
    if (document.getElementById(SCRIPT_ID)) return;

    window.disqus_config = function () {
      this.page.url = PAGE_URL;
      this.page.identifier = PAGE_IDENTIFIER;
    };

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://${DISQUS_SHORTNAME}.disqus.com/embed.js`;
    script.setAttribute('data-timestamp', String(+new Date()));
    document.body.appendChild(script);
  }, []);

  return <div id="disqus_thread" />;
}
