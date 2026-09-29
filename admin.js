const elements = {
  loginView: document.querySelector("[data-login-view]"),
  loginForm: document.querySelector("[data-login-form]"),
  loginFeedback: document.querySelector("[data-login-feedback]"),
  dashboard: document.querySelector("[data-dashboard]"),
  logout: document.querySelector("[data-logout]"),
  refresh: document.querySelector("[data-refresh]"),
  search: document.querySelector("[data-search]"),
  list: document.querySelector("[data-request-list]"),
  resultCount: document.querySelector("[data-result-count]"),
  totalCount: document.querySelector("[data-total-count]"),
  todayCount: document.querySelector("[data-today-count]"),
  latestDate: document.querySelector("[data-latest-date]"),
  dialog: document.querySelector("[data-detail-dialog]"),
  detailTitle: document.querySelector("[data-detail-title]"),
  detailGrid: document.querySelector("[data-detail-grid]"),
  closeDetail: document.querySelector("[data-close-detail]"),
  emailCustomer: document.querySelector("[data-email-customer]"),
  emptyTemplate: document.querySelector("[data-empty-template]")
};

let submissions = [];

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw Object.assign(new Error(payload.error || "Request failed."), { status: response.status });
  return payload;
}

function showLogin() {
  elements.dashboard.hidden = true;
  elements.loginView.hidden = false;
}

function showDashboard() {
  elements.loginView.hidden = true;
  elements.dashboard.hidden = false;
}

function formatDate(value, includeTime = true) {
  if (!value) return "Not provided";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(includeTime ? { hour: "2-digit", minute: "2-digit" } : {})
  }).format(date);
}

function textElement(tag, className, value) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  element.textContent = value || "Not provided";
  return element;
}

function requestRow(submission) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "request-row";
  button.addEventListener("click", () => openDetails(submission));

  const customer = document.createElement("div");
  customer.append(textElement("strong", "", submission.name), textElement("span", "", submission.email));
  const tour = document.createElement("div");
  tour.className = "request-tour";
  tour.append(textElement("strong", "", submission.tour), textElement("span", "", submission.id));
  const date = document.createElement("div");
  date.className = "request-date";
  date.append(textElement("strong", "", submission.tourPeriod || submission.date), textElement("span", "", `${submission.guests || "?"} guest${submission.guests === "1" ? "" : "s"}`));
  const received = document.createElement("div");
  received.className = "request-time";
  received.append(textElement("strong", "", formatDate(submission.createdAt)), textElement("span", "", submission.source || "Website"));
  button.append(customer, tour, date, received);
  return button;
}

function filteredSubmissions() {
  const query = elements.search.value.trim().toLowerCase();
  if (!query) return submissions;
  return submissions.filter((submission) =>
    [submission.id, submission.name, submission.email, submission.phone, submission.tour, submission.date, submission.tourPeriod]
      .some((value) => String(value || "").toLowerCase().includes(query))
  );
}

function renderList() {
  const visible = filteredSubmissions();
  elements.list.replaceChildren();
  elements.resultCount.textContent = `${visible.length} request${visible.length === 1 ? "" : "s"}`;
  if (!visible.length) {
    elements.list.append(elements.emptyTemplate.content.cloneNode(true));
    return;
  }
  elements.list.append(...visible.map(requestRow));
}

function updateSummary() {
  const today = new Date().toDateString();
  elements.totalCount.textContent = submissions.length;
  elements.todayCount.textContent = submissions.filter((item) => new Date(item.createdAt).toDateString() === today).length;
  elements.latestDate.textContent = submissions.length ? formatDate(submissions[0].createdAt) : "None yet";
}

function detailItem(label, value, wide = false) {
  const wrapper = document.createElement("div");
  wrapper.className = `detail-item${wide ? " wide" : ""}`;
  wrapper.append(textElement("span", "", label), textElement(wide ? "p" : "strong", "", value));
  return wrapper;
}

function openDetails(submission) {
  elements.detailTitle.textContent = submission.id;
  elements.detailGrid.replaceChildren(
    detailItem("Received", formatDate(submission.createdAt)),
    detailItem("Tour", submission.tour),
    detailItem("Name", submission.name),
    detailItem("Email", submission.email),
    detailItem("Phone / WhatsApp", submission.phone),
    detailItem("Guests", submission.guests),
    detailItem("Start date", submission.date),
    detailItem("End date", submission.endDate),
    detailItem("Tour period", submission.tourPeriod, true),
    detailItem("Hotel / pickup", submission.pickup, true),
    detailItem("Notes", submission.notes, true),
    detailItem("Source", submission.source, true)
  );
  elements.emailCustomer.href = `mailto:${encodeURIComponent(submission.email)}?subject=${encodeURIComponent(`Your GambianTour request ${submission.id}`)}`;
  elements.dialog.showModal();
}

async function loadSubmissions() {
  elements.refresh.disabled = true;
  try {
    const payload = await api("/api/admin/submissions");
    submissions = payload.submissions || [];
    showDashboard();
    updateSummary();
    renderList();
  } catch (error) {
    if (error.status === 401) showLogin();
    else elements.list.textContent = error.message;
  } finally {
    elements.refresh.disabled = false;
  }
}

elements.loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const button = elements.loginForm.querySelector('button[type="submit"]');
  const formData = new FormData(elements.loginForm);
  button.disabled = true;
  elements.loginFeedback.textContent = "";
  try {
    await api("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ username: formData.get("username"), password: formData.get("password") })
    });
    elements.loginForm.reset();
    await loadSubmissions();
  } catch (error) {
    elements.loginFeedback.textContent = error.message;
  } finally {
    button.disabled = false;
  }
});

elements.logout.addEventListener("click", async () => {
  await api("/api/admin/logout", { method: "POST", body: "{}" }).catch(() => {});
  submissions = [];
  showLogin();
});
elements.refresh.addEventListener("click", loadSubmissions);
elements.search.addEventListener("input", renderList);
elements.closeDetail.addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("click", (event) => {
  if (event.target === elements.dialog) elements.dialog.close();
});

api("/api/admin/session")
  .then((session) => session.authenticated ? loadSubmissions() : showLogin())
  .catch(showLogin);
