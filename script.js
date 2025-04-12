document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Scan button functionality
    const scanBtn = document.getElementById('scan-btn');
    const targetUrl = document.getElementById('target-url');
    const scanStatus = document.getElementById('scan-status');
    const scanProgress = document.getElementById('scan-progress');
    
    scanBtn.addEventListener('click', startScan);
    
    function startScan() {
        const url = targetUrl.value.trim();
        
        if (!url) {
            alert('Please enter a valid URL');
            return;
        }
        
        // Validate URL format
        try {
            new URL(url);
        } catch (e) {
            alert('Please enter a valid URL (include http:// or https://)');
            return;
        }
        
        // Reset UI
        scanStatus.textContent = 'Scanning...';
        scanProgress.style.width = '0%';
        
        // Reset all result cards
        document.querySelectorAll('.result-card .risk-level').forEach(el => {
            el.className = 'risk-level unknown';
            el.textContent = 'Scanning...';
        });
        
        // Reset all result details
        document.querySelectorAll('.result-details').forEach(el => {
            el.innerHTML = '<p>Scanning...</p>';
        });
        
        // Simulate scanning process
        simulateScan(url);
    }
    
    function simulateScan(url) {
        // This is a simulation - in a real app, you would make API calls to a backend scanner
        
        // Update progress in stages
        updateProgress(10, 'Checking SSL/TLS configuration...');
        setTimeout(() => {
            checkSSL(url);
            updateProgress(30, 'Testing for SQL injection vulnerabilities...');
            
            setTimeout(() => {
                checkSQLi(url);
                updateProgress(50, 'Testing for XSS vulnerabilities...');
                
                setTimeout(() => {
                    checkXSS(url);
                    updateProgress(70, 'Testing for CSRF vulnerabilities...');
                    
                    setTimeout(() => {
                        checkCSRF(url);
                        updateProgress(90, 'Testing for directory traversal vulnerabilities...');
                        
                        setTimeout(() => {
                            checkDirectoryTraversal(url);
                            updateProgress(100, 'Scan complete!');
                            scanStatus.textContent = 'Scan complete';
                            
                            // Show overview tab by default
                            document.querySelector('.tab-btn[data-tab="overview"]').click();
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 2000);
    }
    
    function updateProgress(percent, status) {
        scanProgress.style.width = percent + '%';
        scanStatus.textContent = status;
    }
    
    // Vulnerability check functions (simulated)
    function checkSSL(url) {
        // Simulate SSL check
        const isHTTPS = url.startsWith('https://');
        const randomRisk = Math.random();
        let riskLevel, details;
        
        if (!isHTTPS) {
            riskLevel = 'critical';
            details = `
                <div class="vulnerability critical">
                    <h4>Critical: No HTTPS</h4>
                    <p>The website is not using HTTPS, exposing all traffic to interception.</p>
                    <p><strong>Risk:</strong> All data transmitted is unencrypted and vulnerable to MITM attacks.</p>
                </div>
            `;
        } else if (randomRisk < 0.2) {
            riskLevel = 'none';
            details = `<p>No SSL/TLS vulnerabilities detected. Configuration appears secure.</p>`;
        } else if (randomRisk < 0.5) {
            riskLevel = 'low';
            details = `
                <div class="vulnerability low">
                    <h4>Low: Weak Cipher Suites</h4>
                    <p>The server supports some weak cipher suites that should be disabled.</p>
                </div>
            `;
        } else if (randomRisk < 0.8) {
            riskLevel = 'medium';
            details = `
                <div class="vulnerability medium">
                    <h4>Medium: TLS 1.0/1.1 Enabled</h4>
                    <p>The server supports outdated TLS versions (1.0 or 1.1) which have known vulnerabilities.</p>
                </div>
            `;
        } else {
            riskLevel = 'high';
            details = `
                <div class="vulnerability high">
                    <h4>High: Invalid Certificate</h4>
                    <p>The SSL certificate is invalid or self-signed, which may trigger browser warnings.</p>
                </div>
            `;
        }
        
        updateResult('ssl', riskLevel, details);
    }
    
    function checkSQLi(url) {
        // Simulate SQLi check
        const randomRisk = Math.random();
        let riskLevel, details;
        
        if (randomRisk < 0.3) {
            riskLevel = 'none';
            details = `<p>No SQL injection vulnerabilities detected in tested parameters.</p>`;
        } else if (randomRisk < 0.6) {
            riskLevel = 'low';
            details = `
                <div class="vulnerability low">
                    <h4>Low: Potential SQLi Vector</h4>
                    <p>One parameter was found to be vulnerable to blind SQL injection under specific conditions.</p>
                </div>
            `;
        } else if (randomRisk < 0.9) {
            riskLevel = 'high';
            details = `
                <div class="vulnerability high">
                    <h4>High: SQL Injection Detected</h4>
                    <p>The parameter 'id' is vulnerable to SQL injection attacks.</p>
                    <p><strong>Example:</strong> <code>${url}/product?id=1' OR '1'='1</code></p>
                </div>
            `;
        } else {
            riskLevel = 'critical';
            details = `
                <div class="vulnerability critical">
                    <h4>Critical: Multiple SQLi Vulnerabilities</h4>
                    <p>Multiple parameters are vulnerable to SQL injection, including login forms.</p>
                    <p><strong>Example:</strong> <code>${url}/login?username=admin'--</code></p>
                </div>
            `;
        }
        
        updateResult('sql', riskLevel, details);
    }
    
    function checkXSS(url) {
        // Simulate XSS check
        const randomRisk = Math.random();
        let riskLevel, details;
        
        if (randomRisk < 0.4) {
            riskLevel = 'none';
            details = `<p>No XSS vulnerabilities detected in tested parameters.</p>`;
        } else if (randomRisk < 0.7) {
            riskLevel = 'medium';
            details = `
                <div class="vulnerability medium">
                    <h4>Medium: Reflected XSS Detected</h4>
                    <p>The parameter 'search' reflects user input without proper encoding.</p>
                    <p><strong>Example:</strong> <code>${url}/search?q=&lt;script&gt;alert(1)&lt;/script&gt;</code></p>
                </div>
            `;
        } else {
            riskLevel = 'high';
            details = `
                <div class="vulnerability high">
                    <h4>High: Stored XSS Detected</h4>
                    <p>User input in comments is stored and displayed without sanitization.</p>
                    <p><strong>Impact:</strong> Attackers can inject malicious scripts viewed by all users.</p>
                </div>
            `;
        }
        
        updateResult('xss', riskLevel, details);
    }
    
    function checkCSRF(url) {
        // Simulate CSRF check
        const randomRisk = Math.random();
        let riskLevel, details;
        
        if (randomRisk < 0.5) {
            riskLevel = 'none';
            details = `<p>CSRF protections (tokens or SameSite cookies) appear to be implemented.</p>`;
        } else if (randomRisk < 0.8) {
            riskLevel = 'medium';
            details = `
                <div class="vulnerability medium">
                    <h4>Medium: Potential CSRF Vulnerability</h4>
                    <p>Forms lack visible anti-CSRF tokens, though other protections may exist.</p>
                </div>
            `;
        } else {
            riskLevel = 'high';
            details = `
                <div class="vulnerability high">
                    <h4>High: CSRF Vulnerable</h4>
                    <p>State-changing actions can be performed without CSRF tokens.</p>
                    <p><strong>Example:</strong> <code>&lt;img src="${url}/change-email?new=attacker@example.com"&gt;</code></p>
                </div>
            `;
        }
        
        updateResult('csrf', riskLevel, details);
    }
    
    function checkDirectoryTraversal(url) {
        // Simulate directory traversal check
        const randomRisk = Math.random();
        let riskLevel, details;
        
        if (randomRisk < 0.7) {
            riskLevel = 'none';
            details = `<p>No directory traversal vulnerabilities detected in tested parameters.</p>`;
        } else if (randomRisk < 0.9) {
            riskLevel = 'medium';
            details = `
                <div class="vulnerability medium">
                    <h4>Medium: Partial Path Traversal</h4>
                    <p>Some file operations may be vulnerable to path traversal under specific conditions.</p>
                </div>
            `;
        } else {
            riskLevel = 'critical';
            details = `
                <div class="vulnerability critical">
                    <h4>Critical: Directory Traversal</h4>
                    <p>The parameter 'file' allows accessing arbitrary files on the server.</p>
                    <p><strong>Example:</strong> <code>${url}/download?file=../../etc/passwd</code></p>
                </div>
            `;
        }
        
        updateResult('directory', riskLevel, details);
    }
    
    function updateResult(vulnType, riskLevel, details) {
        // Update overview card
        const card = document.querySelector(`.result-card[data-vuln="${vulnType}"] .risk-level`);
        card.className = `risk-level ${riskLevel}`;
        card.textContent = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
        
        // Update detailed results
        const detailsContainer = document.getElementById(`${vulnType}-results`);
        detailsContainer.innerHTML = details;
    }
    
    // Create matrix rain effect
    createMatrixEffect();
    
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        const container = document.querySelector('.matrix-background');
        container.appendChild(canvas);
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        
        // Set the font size and type
        ctx.font = '15px "Source Code Pro", monospace';
        
        // Calculate how many columns fit based on font size
        const cols = Math.floor(w / 15);
        
        // Create an array for each column, initialized to a random y position
        const ypos = Array(cols).fill(0).map(() => Math.random() * -100);
        
        function matrix() {
            // Draw a semi-transparent black rectangle over the entire canvas
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, w, h);
            
            // Set the color and font for the "raindrops"
            ctx.fillStyle = '#0f0';
            
            // For each column
            ypos.forEach((y, i) => {
                // Randomly select a character
                const text = String.fromCharCode(Math.random() * 128);
                
                // Draw the character
                ctx.fillText(text, i * 15, y);
                
                // Randomly reset the end of the column if it's at least 100px high
                if (y > 100 + Math.random() * 10000) {
                    ypos[i] = 0;
                } else {
                    ypos[i] = y + 15;
                }
            });
        }
        
        // Run the animation
        setInterval(matrix, 50);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            canvas.width = container.offsetWidth;
            canvas.height = container.offsetHeight;
        });
    }
});