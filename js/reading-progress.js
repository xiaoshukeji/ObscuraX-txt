// Reading Progress Bar
class ReadingProgress {
  constructor() {
    this.progressBar = null;
    this.init();
  }

  init() {
    // Only show on post pages
    if (!document.querySelector('.post-content')) return;

    this.createProgressBar();
    this.bindEvents();
    this.updateProgress();
  }

  createProgressBar() {
    // Create progress bar container
    const progressContainer = document.createElement('div');
    progressContainer.id = 'reading-progress-container';
    progressContainer.innerHTML = `
      <div id="reading-progress-bar">
        <div id="reading-progress-fill"></div>
        <span id="reading-progress-text">0%</span>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      #reading-progress-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        z-index: 1000;
        background: transparent;
      }

      #reading-progress-bar {
        height: 100%;
        background: rgba(0, 122, 204, 0.1);
        position: relative;
        overflow: hidden;
      }

      #reading-progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #007acc, #00aaff);
        width: 0%;
        transition: width 0.25s ease;
        box-shadow: 0 0 4px rgba(0, 122, 204, 0.3);
      }

      #reading-progress-text {
        position: absolute;
        right: 10px;
        top: -20px;
        font-size: 12px;
        font-weight: bold;
        color: #007acc;
        background: rgba(255, 255, 255, 0.9);
        padding: 2px 6px;
        border-radius: 3px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      #reading-progress-container:hover #reading-progress-text {
        opacity: 1;
      }

      /* Dark mode support */
      [data-theme="dark"] #reading-progress-text {
        background: rgba(0, 0, 0, 0.8);
        color: #00aaff;
      }

      /* Mobile optimization */
      @media screen and (max-width: 768px) {
        #reading-progress-text {
          display: none;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.insertBefore(progressContainer, document.body.firstChild);
    this.progressBar = document.getElementById('reading-progress-fill');
    this.progressText = document.getElementById('reading-progress-text');
  }

  bindEvents() {
    window.addEventListener('scroll', () => {
      this.updateProgress();
    });

    window.addEventListener('resize', () => {
      this.updateProgress();
    });
  }

  updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );

    // Calculate reading progress
    const scrollPercent = Math.min((scrollTop / (documentHeight - windowHeight)) * 100, 100);

    // Update progress bar
    if (this.progressBar) {
      this.progressBar.style.width = scrollPercent + '%';
    }

    // Update progress text
    if (this.progressText) {
      this.progressText.textContent = Math.round(scrollPercent) + '%';
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ReadingProgress();
});

// Re-initialize on pjax page change
document.addEventListener('pjax:complete', () => {
  new ReadingProgress();
});
