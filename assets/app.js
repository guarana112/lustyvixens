const storageKey = "lustyvixens_submissions";

function readSubmissions() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

function writeSubmissions(rows) {
  localStorage.setItem(storageKey, JSON.stringify(rows));
}

function addSubmission(payload) {
  const rows = readSubmissions();
  rows.unshift({
    id: `LV-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    status: "Review",
    ...payload
  });
  writeSubmissions(rows);
}

function exportSubmissions() {
  const rows = readSubmissions();
  const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `lustyvixens-submissions-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function setUploadMode(mode) {
  document.querySelectorAll("[data-tab]").forEach(button => {
    button.classList.toggle("active", button.dataset.tab === mode);
  });
  document.querySelectorAll("[data-source-panel]").forEach(panel => {
    panel.classList.toggle("hidden", panel.dataset.sourcePanel !== mode);
  });
  const source = document.querySelector("#source");
  if (source) source.value = mode;
}

function initCreatorForm() {
  const form = document.querySelector("#creator-form");
  if (!form) return;

  // File input feedback
  const fileInput = document.querySelector("#videoFile");
  const fileFeedback = document.querySelector("#file-feedback");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files[0]) {
        const file = e.target.files[0];
        const maxSize = 500 * 1024 * 1024; // 500MB
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        if (file.size > maxSize) {
          fileFeedback.textContent = `❌ File too large (${sizeMB}MB > 500MB)`;
          e.target.value = "";
        } else {
          fileFeedback.textContent = `✅ ${file.name} (${sizeMB}MB)`;
        }
      } else {
        fileFeedback.textContent = "";
      }
    });
  }

  document.querySelectorAll("[data-tab]").forEach(button => {
    button.addEventListener("click", () => setUploadMode(button.dataset.tab));
  });

  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const source = data.get("source");

    // Validate required fields
    if (!data.get("creatorName") || !data.get("creatorEmail") || !data.get("title") || !data.get("category")) {
      alert("All fields are required");
      return;
    }

    if (source === "link" && !data.get("videoUrl")) {
      alert("Video link is required");
      return;
    }

    if (source === "file" && !data.get("videoFile")) {
      alert("Video file is required");
      return;
    }

    const payload = {
      creatorName: data.get("creatorName"),
      creatorEmail: data.get("creatorEmail"),
      title: data.get("title"),
      category: data.get("category"),
      source,
      videoUrl: source === "link" ? data.get("videoUrl") : "",
      fileName: source === "file" && data.get("videoFile") ? data.get("videoFile").name : "",
      rightsConfirmed: data.get("rightsConfirmed") === "on",
      notes: data.get("notes")
    };
    addSubmission(payload);
    form.reset();
    fileFeedback.textContent = "";
    setUploadMode("link");
    const result = document.querySelector("#form-result");
    result.textContent = "✅ Submission saved to the local review queue. Connect Formspree or Supabase when you are ready to receive live submissions.";
    result.classList.remove("hidden");
  });

  setUploadMode("link");
}

function initAdmin() {
  const body = document.querySelector("#submission-rows");
  if (!body) return;

  const render = () => {
    const rows = readSubmissions();
    body.innerHTML = rows.map(row => `
      <tr>
        <td><span class="badge">${row.status}</span></td>
        <td>${escapeHtml(row.title || "")}</td>
        <td>${escapeHtml(row.creatorName || "")}<br>${escapeHtml(row.creatorEmail || "")}</td>
        <td>${escapeHtml(row.category || "")}</td>
        <td>${row.source === "link" ? escapeHtml(row.videoUrl || "") : escapeHtml(row.fileName || "")}</td>
        <td>${new Date(row.createdAt).toLocaleString()}</td>
      </tr>
    `).join("") || `<tr><td colspan="6">No submissions yet. Try the creator form first.</td></tr>`;
  };

  document.querySelector("#export-json")?.addEventListener("click", exportSubmissions);
  document.querySelector("#clear-demo")?.addEventListener("click", () => {
    if (confirm("Clear local demo submissions?")) {
      writeSubmissions([]);
      render();
    }
  });
  render();
}

function initAnalytics() {
  const rows = readSubmissions();
  const set = (id, value) => {
    const node = document.querySelector(id);
    if (node) node.textContent = value;
  };
  set("#metric-submissions", rows.length);
  set("#metric-links", rows.filter(row => row.source === "link").length);
  set("#metric-files", rows.filter(row => row.source === "file").length);
  set("#metric-creators", new Set(rows.map(row => row.creatorEmail).filter(Boolean)).size);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

// Admin password protection
function checkAdminAuth() {
  const pass = document.querySelector("#auth-pass").value;
  const correct = "Adaptivesync*09"; // CHANGE THIS TO YOUR PASSWORD
  if (pass === correct) {
    sessionStorage.setItem("admin_auth", "true");
    document.querySelector("#auth-gate").style.display = "none";
    document.querySelector("header").style.display = "flex";
    document.querySelector("main").style.display = "block";
    initAdmin();
  } else {
    alert("Incorrect password");
  }
}

if (document.querySelector("#auth-gate")) {
  if (!sessionStorage.getItem("admin_auth")) {
    document.querySelector("header").style.display = "none";
    document.querySelector("main").style.display = "none";
  } else {
    document.querySelector("#auth-gate").style.display = "none";
    initAdmin();
  }
  document.querySelector("#auth-pass").addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkAdminAuth();
  });
}

initCreatorForm();
initAnalytics();
