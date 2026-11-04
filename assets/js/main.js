// بيانات وهمية للفعاليات (feat = فعالية بارزة تظهر في السلايدر)
const EVENTS = [
  {
    id: 1,
    title: "معرض الكتاب الرقمي",
    cat: "ثقافة",
    date: "2026-11-05",
    place: "دمشق",
    feat: 1,
    desc: "معرض يجمع دور النشر والكتّاب مع عروض للكتب الإلكترونية والصوتية ولقاءات مع المؤلفين.",
  },
  {
    id: 2,
    title: "ماراثون المدينة الخيري",
    cat: "رياضة",
    date: "2026-11-14",
    place: "حلب",
    feat: 1,
    desc: "سباق جري مفتوح لجميع الأعمار بمسارات 5 كم و10 كم، يعود ريعه لدعم منح الطلاب.",
  },
  {
    id: 3,
    title: "أمسية موسيقى الشرق",
    cat: "موسيقى",
    date: "2026-10-27",
    place: "دمشق",
    feat: 1,
    desc: "أمسية موسيقية تضم عزفًا على العود والقانون والكمان مع فرقة الجامعة.",
  },
  {
    id: 4,
    title: "يوم العائلة المفتوح",
    cat: "عائلي",
    date: "2026-11-21",
    place: "اللاذقية",
    feat: 0,
    desc: "يوم ترفيهي وتعليمي للعائلات يتضمن ألعابًا وورشًا للأطفال وركن طعام.",
  },
  {
    id: 5,
    title: "مؤتمر الذكاء الاصطناعي للطلاب",
    cat: "تقني",
    date: "2026-12-02",
    place: "عبر الإنترنت",
    feat: 1,
    desc: "مؤتمر مباشر عبر الإنترنت يضم جلسات عن تعلّم الآلة وتطبيقاته ومسابقة مشاريع.",
  },
  {
    id: 6,
    title: "ورشة الخط العربي",
    cat: "ثقافة",
    date: "2026-11-09",
    place: "حمص",
    feat: 0,
    desc: "ورشة عملية لتعلّم أساسيات خط الثلث والنسخ على يد خطاطين محترفين.",
  },
  {
    id: 7,
    title: "بطولة كرة الطاولة الجامعية",
    cat: "رياضة",
    date: "2026-12-10",
    place: "دمشق",
    feat: 0,
    desc: "بطولة بين طلاب الجامعة بنظام الإقصاء مع جوائز للفائزين.",
  },
  {
    id: 8,
    title: "ورشة تطوير الواجهات الأمامية للويب",
    cat: "تقني",
    date: "2026-12-18",
    place: "دمشق",
    feat: 1,
    desc: "ورشة عملية تعلّم المشاركين بناء مواقع متجاوبة باستخدام HTML وCSS وJavaScript وBootstrap، وتنتهي ببناء موقع كامل خلال اليوم.",
  },
];
const COLORS = {
  ثقافة: "#7b3fa0",
  رياضة: "#2a9d5c",
  موسيقى: "#d1495b",
  عائلي: "#e07a1f",
  تقني: "#12406b",
};
const $ = (s) => document.querySelector(s);
const fmt = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("ar", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
const todayISO = () => {
  const t = new Date();
  return (
    t.getFullYear() +
    "-" +
    String(t.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(t.getDate()).padStart(2, "0")
  );
};
const img = (e) => `assets/img/ev${e.id}.jpg`;

// بطاقة فعالية (Bootstrap Card)
function card(e) {
  const today =
    e.date === todayISO()
      ? '<span class="badge today-badge">الحدث اليوم</span>'
      : "";
  return `<div class="col-12 col-sm-6 col-lg-3"><div class="card event-card h-100">
 <div class="position-relative"><img src="${img(e)}" alt="${e.title}">
 <span class="badge cat-badge" style="background:${COLORS[e.cat]}">${e.cat}</span>${today}</div>
 <div class="card-body d-flex flex-column"><h5 class="fw-bold">${e.title}</h5>
 <div class="meta">📅 ${fmt(e.date)}<br>📍 ${e.place}</div>
 <p class="small mt-2">${e.desc.slice(0, 70)}...</p>
 <a href="event.html?id=${e.id}" class="btn btn-warning mt-auto fw-bold">التفاصيل</a></div></div></div>`;
}

function initHome() {
  // سلايدر الفعاليات البارزة (Bootstrap Carousel)
  const f = EVENTS.filter((e) => e.feat);
  $("#slides").innerHTML = f
    .map(
      (
        e,
        i,
      ) => `<div class="carousel-item ${i ? "" : "active"}"><img src="${img(e)}" alt="${e.title}">
 <div class="carousel-caption"><h5>${e.title}</h5><p class="mb-1">📅 ${fmt(e.date)} — 📍 ${e.place}</p>
 <a href="event.html?id=${e.id}" class="btn btn-warning btn-sm fw-bold">التفاصيل</a></div></div>`,
    )
    .join("");
  // أزرار التصنيفات السريعة (Badges)
  $("#cats").innerHTML = Object.keys(COLORS)
    .map(
      (c) =>
        `<a class="chip" style="background:${COLORS[c]}" href="events.html?cat=${c}">${c}</a>`,
    )
    .join("");
  // أحدث الفعاليات
  $("#latest").innerHTML = [...EVENTS]
    .sort((a, b) => b.id - a.id)
    .slice(0, 4)
    .map(card)
    .join("");
}

function initEvents() {
  const cat = $("#fCat"),
    place = $("#fPlace"),
    date = $("#fDate"),
    q = $("#fQ");
  cat.innerHTML += Object.keys(COLORS)
    .map((c) => `<option>${c}</option>`)
    .join("");
  place.innerHTML += [...new Set(EVENTS.map((e) => e.place))]
    .map((p) => `<option>${p}</option>`)
    .join("");
  const p = new URLSearchParams(location.search).get("cat");
  try {
    cat.value = p || localStorage.getItem("prefCat") || "";
  } catch (_) {}
  function render() {
    try {
      localStorage.setItem("prefCat", cat.value);
    } catch (_) {}
    const r = EVENTS.filter(
      (e) =>
        (!cat.value || e.cat === cat.value) &&
        (!place.value || e.place === place.value) &&
        (!date.value || e.date >= date.value) &&
        (!q.value || (e.title + e.desc).includes(q.value.trim())),
    );
    $("#grid").innerHTML = r.map(card).join("");
    $("#none").classList.toggle("d-none", r.length > 0);
    $("#count").textContent = r.length;
  }
  [cat, place, date, q].forEach((el) => el.addEventListener("input", render));
  $("#reset").onclick = () => {
    cat.value = place.value = date.value = q.value = "";
    render();
  };
  render();
}

function initEvent() {
  const id = +new URLSearchParams(location.search).get("id") || 1;
  const e = EVENTS.find((x) => x.id === id) || EVENTS[0];
  document.title = e.title + " | دليل فعاليات الجامعة الافتراضية";
  $("#evImg").src = img(e);
  $("#evTitle").textContent = e.title;
  $("#evCat").textContent = e.cat;
  $("#evCat").style.background = COLORS[e.cat];
  $("#evDate").textContent = fmt(e.date);
  $("#evPlace").textContent = e.place;
  $("#evDesc").textContent =
    e.desc +
    " تفتح الأبواب قبل ساعة من البدء، والدخول مجاني لطلاب الجامعة مع إبراز البطاقة الجامعية. ننصح بالحضور مبكرًا لضمان مقعد جيد، وستتوفر استراحات ومرطبات خلال الفعالية.";
  $("#gal").innerHTML = [e.id, (e.id % 8) + 1, ((e.id + 3) % 8) + 1]
    .map(
      (i) =>
        `<div class="col-4"><img src="assets/img/ev${i}.jpg" alt="معرض صور"></div>`,
    )
    .join("");
  $("#related").innerHTML = EVENTS.filter(
    (x) => x.cat === e.cat && x.id !== e.id,
  )
    .concat(EVENTS.filter((x) => x.cat !== e.cat && x.id !== e.id))
    .slice(0, 4)
    .map(card)
    .join("");
  // أضف للتقويم: توليد ملف ICS
  $("#btnCal").onclick = () => {
    const d = e.date.replace(/-/g, "");
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${e.title}\nDTSTART;VALUE=DATE:${d}\nLOCATION:${e.place}\nDESCRIPTION:${e.desc}\nEND:VEVENT\nEND:VCALENDAR`;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    a.download = "event.ics";
    a.click();
    alert2(
      "#evAlert",
      "تمت إضافة الفعالية إلى ملف التقويم (event.ics).",
      "success",
    );
  };
  // شارك
  $("#btnShare").onclick = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: e.title, url: location.href });
      } else {
        await navigator.clipboard.writeText(location.href);
        alert2("#evAlert", "تم نسخ رابط الفعالية.", "success");
      }
    } catch (_) {}
  };
  // نافذة الحجز الوهمي (Modal)
  $("#bookForm").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const n = $("#bName").value.trim();
    if (n.length < 3) {
      alert2("#bookAlert", "أدخل اسمًا من 3 أحرف على الأقل.", "danger");
      return;
    }
    alert2(
      "#bookAlert",
      `تم حجز ${$("#bSeats").value} مقعد(مقاعد) باسم ${n} (حجز وهمي).`,
      "success",
    );
  });
}
function alert2(sel, msg, type) {
  $(sel).innerHTML =
    `<div class="alert alert-${type} alert-dismissible" role="alert">${msg}<button class="btn-close" data-bs-dismiss="alert"></button></div>`;
}

function initContact() {
  $("#contactForm").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const n = $("#cName"),
      m = $("#cMail"),
      t = $("#cMsg");
    const ok = [
      [n, n.value.trim().length >= 3],
      [m, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m.value)],
      [t, t.value.trim().length >= 10],
    ];
    ok.forEach(([el, v]) => {
      el.classList.toggle("is-invalid", !v);
      el.classList.toggle("is-valid", v);
    });
    if (ok.every((x) => x[1])) {
      alert2("#cAlert", "تم إرسال رسالتك بنجاح. سنرد عليك قريبًا.", "success");
      ev.target.reset();
      ok.forEach(([el]) => el.classList.remove("is-valid"));
    } else
      alert2(
        "#cAlert",
        "تعذّر الإرسال: صحّح الحقول المحددة بالأحمر.",
        "danger",
      );
  });
}

document.addEventListener("DOMContentLoaded", () => {
  try {
    if (localStorage.getItem("dark") === "1")
      document.body.classList.add("dark");
  } catch (_) {}
  $("#darkBtn").onclick = () => {
    const d = document.body.classList.toggle("dark");
    try {
      localStorage.setItem("dark", d ? "1" : "0");
    } catch (_) {}
  };
  const t = $("#toTop");
  addEventListener(
    "scroll",
    () => (t.style.display = scrollY > 300 ? "block" : "none"),
  );
  t.onclick = () => scrollTo({ top: 0, behavior: "smooth" });
  const p = document.body.dataset.page;
  ({
    home: initHome,
    events: initEvents,
    event: initEvent,
    contact: initContact,
  })[p]?.();
});
