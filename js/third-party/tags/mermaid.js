/* global NexT, CONFIG, mermaid */

document.addEventListener('page:loaded', async () => {
  const mermaidElements = document.querySelectorAll('pre > .mermaid');
  if (mermaidElements.length) {
    await NexT.utils.getScript(CONFIG.mermaid.js, {
      condition: window.mermaid
    });
    mermaidElements.forEach(element => {
      const box = document.createElement('div');
      box.className = 'code-container';
      const newElement = document.createElement('div');
      newElement.innerHTML = element.innerHTML;
      newElement.className = 'mermaid';
      box.appendChild(newElement);
      if (CONFIG.codeblock.copy_button.enable) {
        NexT.utils.registerCopyButton(box, box, element.textContent);
      }
      const parent = element.parentNode;
      parent.parentNode.replaceChild(box, parent);
    });
    // 检测暗黑模式
    const isDark = document.documentElement.classList.contains('darkmode--activated') || 
                   (CONFIG.darkmode && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    mermaid.initialize({
      theme    : isDark ? 'dark' : 'default',
      logLevel : 3,
      flowchart: { 
        curve: 'linear',
        htmlLabels: true
      },
      gantt    : { axisFormat: '%m/%d/%Y' },
      sequence : { actorMargin: 50 }
    });
    
    mermaid.run();
  }
});
